# Save website form submissions to a Google Sheet (5 minutes)

Every Contact, Newsletter and Notify Me submission will be added as a row,
with a separate tab per form. Email delivery (FormSubmit) keeps working too.

1. Sign in to Google as the account that should own the data
   (for now: khalande@gmail.com).
2. Go to https://sheets.new and name the sheet, e.g. "Bluenxt website leads".
3. In the sheet: **Extensions → Apps Script**.
4. Delete the sample code, paste in everything from `Code.gs` (this folder),
   and click **Save** (disk icon).
5. Click **Deploy → New deployment**.
   - Click the gear next to "Select type" → **Web app**.
   - Description: `Website forms`
   - Execute as: **Me**
   - Who has access: **Anyone**
   - Click **Deploy**, then **Authorize access** and allow the permissions
     (Google may show "unverified app": click Advanced → Go to project).
6. Copy the **Web app URL** (it ends in `/exec`).
   Open it in a browser tab: it should say "Bluenxt form endpoint is running".
7. In the website project, open `src/config/forms.ts` and paste the URL:
   ```ts
   export const SHEETS_WEBHOOK_URL = 'https://script.google.com/macros/s/XXXX/exec';
   ```
8. Run `npm run dev`, submit a test form, and check the sheet: a new tab
   appears with your test row.

**Later changes to the script:** after editing `Code.gs`, use
Deploy → Manage deployments → edit (pencil) → Version: **New version** → Deploy.
The URL stays the same.

**Privacy:** the sheet holds personal data (names, emails). Keep it shared
only with people who need it, and delete rows on request (see the Privacy Policy).
