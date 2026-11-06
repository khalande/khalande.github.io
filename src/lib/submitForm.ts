import { FORM_EMAIL, SHEETS_WEBHOOK_URL } from '../config/forms.ts';

export type FormKind = 'Contact' | 'Newsletter' | 'Notify Me';

export interface SubmitResult {
  ok: boolean;
  /** True when FormSubmit is waiting for the one-time email activation. */
  needsActivation?: boolean;
  /** True when we stopped waiting and delivery is finishing in the background. */
  pending?: boolean;
}

/**
 * Longest a visitor waits before seeing the confirmation. FormSubmit sends the
 * email while the request is open, which can take several seconds; the request
 * keeps going in the background (keepalive) after we show "thank you".
 * Real failures (offline, blocked, rejected) come back fast and still show an error.
 */
const MAX_WAIT_MS = 1200;
/** Give up on a destination entirely after this long. */
const HARD_TIMEOUT_MS = 20000;

function withTimeout(ms: number) {
  const controller = new AbortController();
  const id = window.setTimeout(() => controller.abort(), ms);
  return { signal: controller.signal, done: () => window.clearTimeout(id) };
}

async function sendToSheet(payload: Record<string, string>): Promise<boolean> {
  if (!SHEETS_WEBHOOK_URL) return false;
  const t = withTimeout(HARD_TIMEOUT_MS);
  try {
    // Apps Script can't return CORS headers, so the response is opaque;
    // a network error still throws.
    await fetch(SHEETS_WEBHOOK_URL, {
      method: 'POST',
      mode: 'no-cors',
      keepalive: true,
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload),
      signal: t.signal,
    });
    return true;
  } catch {
    return false;
  } finally {
    t.done();
  }
}

async function sendToEmail(subject: string, payload: Record<string, string>, replyTo?: string): Promise<{ ok: boolean; needsActivation: boolean }> {
  if (!FORM_EMAIL) return { ok: false, needsActivation: false };
  const t = withTimeout(HARD_TIMEOUT_MS);
  try {
    const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(FORM_EMAIL)}`, {
      method: 'POST',
      keepalive: true,
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        _subject: `[bluenxt.ai] ${subject}`,
        _template: 'table',
        _captcha: 'false',
        ...(replyTo ? { _replyto: replyTo } : {}),
        ...payload,
      }),
      signal: t.signal,
    });
    const data = (await res.json().catch(() => ({}))) as { success?: unknown; message?: string };
    const needsActivation = /activat/i.test(String(data.message ?? ''));
    return { ok: res.ok && (String(data.success) === 'true' || needsActivation), needsActivation };
  } catch {
    return { ok: false, needsActivation: false };
  } finally {
    t.done();
  }
}

/**
 * Sends a form submission to email (FormSubmit) and, if configured, the Google
 * Sheet database, in parallel. Resolves as soon as delivery is confirmed, or
 * after MAX_WAIT_MS while requests are still in flight (they finish in the
 * background). Resolves with ok:false only when every destination failed.
 *
 * `honeypot` is the hidden spam-trap value: bots fill it, people never see it.
 */
export async function submitForm(
  kind: FormKind,
  subject: string,
  fields: Record<string, string>,
  honeypot = ''
): Promise<SubmitResult> {
  if (honeypot) return { ok: true };

  const payload: Record<string, string> = {
    ...fields,
    'Form': kind,
    'Page': window.location.pathname,
    'Submitted at': new Date().toLocaleString('en-GB', { timeZone: 'Asia/Dubai' }) + ' (Gulf time)',
  };

  const sheet = sendToSheet({ sheet: kind, ...payload });
  const email = sendToEmail(subject, payload, fields['Email']);

  const all: Promise<SubmitResult> = Promise.all([sheet, email]).then(([sheetOk, mail]) => ({
    ok: sheetOk || mail.ok,
    needsActivation: mail.needsActivation,
  }));

  // Whichever comes first: a confirmed result, or the wait limit.
  let settled = false;
  all.then(() => (settled = true));
  const waited = new Promise<SubmitResult | null>((resolve) => window.setTimeout(() => resolve(null), MAX_WAIT_MS));
  const first = await Promise.race([all, waited]);

  if (first) return first;
  // Still in flight after MAX_WAIT_MS: requests are on their way and will finish
  // in the background. Show the confirmation now.
  if (!settled) {
    all.then((r) => {
      if (!r.ok) console.warn('[forms] Background delivery failed for', kind, subject);
    });
  }
  return { ok: true, pending: true };
}
