/**
 * RSVP → Google Sheets receiver.
 *
 * SETUP
 * 1. Create a new Google Sheet.
 * 2. In row 1, add these headers exactly:
 *      Timestamp | Name | Guests | Attending | Message
 * 3. In the Sheet, go to Extensions → Apps Script.
 * 4. Delete any starter code and paste this whole file in.
 * 5. Click "Deploy" → "New deployment".
 *      - Select type: "Web app"
 *      - Execute as: "Me"
 *      - Who has access: "Anyone"
 * 6. Click Deploy, authorize when prompted (click through the
 *    "unsafe" warning — it's your own script, that's expected).
 * 7. Copy the "Web app URL" it gives you (ends in /exec).
 * 8. Paste that URL into `rsvpEndpoint` in src/data/invitation.ts.
 *
 * Every RSVP submission from the website will now appear as a new
 * row in this sheet, in real time. To reuse for a different client,
 * duplicate the sheet and repeat steps 3–8 — each client gets their
 * own spreadsheet and their own URL.
 */
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const params = e.parameter;

  sheet.appendRow([
    new Date(),
    params.name || '',
    params.guests || '',
    params.attending || '',
    params.message || '',
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ result: 'success' }))
    .setMimeType(ContentService.MimeType.JSON);
}
