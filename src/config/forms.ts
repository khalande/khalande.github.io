// =============================================================
// WHERE FORM SUBMISSIONS GO
// -------------------------------------------------------------
// All website forms (Contact / Book a call, Newsletter, Digital Agents
// "Notify me", Careers applications, downloads...) send here.
//
// 1) EMAIL via FormSubmit (https://formsubmit.co), free, no account.
//    FIRST-TIME SETUP: submit any form once. FormSubmit emails an
//    "Activate form" link to the address below; click it. From then on
//    every submission arrives by email. (The very first test submission
//    is used for activation and is not delivered.)
//    After activating, FormSubmit also sends you a random alias. Put that
//    alias in FORM_EMAIL instead of the real address to keep the address
//    out of the site's code.
//
// 2) DATABASE (optional) via Google Sheets.
//    Follow tools/google-sheets/SETUP.md, then paste the web app URL into
//    SHEETS_WEBHOOK_URL. Each submission is then also saved as a row.
// =============================================================

/** Temporary collection address. Replace with the FormSubmit alias after activation. */
export const FORM_EMAIL = 'khalande@gmail.com';

/** Google Apps Script web app URL (ends with /exec). Leave empty to skip the sheet. */
export const SHEETS_WEBHOOK_URL = '';

/** Shown if sending fails, so visitors can still reach you. */
export const FALLBACK_EMAIL = 'connect@bluenxt.com';
