/**
 * @OnlyCurrentDoc
 *
 * Certificate.gs — completion certificates for the Cybersecurity Awareness
 * Training.
 *
 * Runs inside the completion form's RESPONSES SHEET (Extensions > Apps Script).
 * Each time someone submits the completion form, it builds a PDF certificate
 * from that response — the verified email, name, timestamp and module scores —
 * and emails it to them. Because the certificate is made from the sheet, the
 * form stays the official record, and any certificate can be reissued later
 * from its row.
 *
 * Setup is in training/README.md, under "Completion certificates".
 * After pasting this in, run setUp() once.
 *
 * @OnlyCurrentDoc (above) limits the script to this one spreadsheet.
 */

/* ------------------------------------------------------------------ settings */

var CERT = {
  org: "Inner Journey Consulting",
  course: "Cybersecurity Awareness Training",
  topics: [
    "Recognizing phishing and social engineering",
    "Passwords and multi-factor authentication",
    "Safe handling of client information",
    "Reporting incidents immediately"
  ],
  // Optional: where replies to the certificate email should go.
  replyTo: "",
  // Header of the column this script adds to record when it sent a certificate.
  sentColumn: "Certificate sent",
  // The modules, and words that identify each one's score columns in the sheet.
  // A score column's header must contain one of these words AND "before" or "after",
  // for example "Phishing: before (%)".
  modules: [
    { label: "Recognizing phishing",      match: ["phishing"] },
    { label: "Passwords and MFA",         match: ["password"] },
    { label: "Safe handling",             match: ["handling"] },
    { label: "Reporting incidents",       match: ["reporting"] }
  ]
};

/* --------------------------------------------------------------- entry points */

/** Run once from the editor: installs the form-submit trigger. Safe to re-run. */
function setUp() {
  var ss = SpreadsheetApp.getActive();
  ScriptApp.getProjectTriggers().forEach(function (t) {
    if (t.getHandlerFunction() === "onFormSubmitCertificate") ScriptApp.deleteTrigger(t);
  });
  ScriptApp.newTrigger("onFormSubmitCertificate").forSpreadsheet(ss).onFormSubmit().create();
  SpreadsheetApp.getActive().toast("Certificates will now be emailed after each submission.", "Set up", 8);
}

/** Trigger: a new completion form response arrived. */
function onFormSubmitCertificate(e) {
  var sheet = e.range.getSheet();
  sendCertificateForRow_(sheet, e.range.getRow(), null);
}

/** Adds a Certificates menu to the sheet. */
function onOpen() {
  SpreadsheetApp.getUi().createMenu("Certificates")
    .addItem("Resend certificate for selected row", "menuResend")
    .addItem("Email me a copy for selected row", "menuCopyToMe")
    .addToUi();
}

/** Menu: resend the certificate to the person on the selected row. */
function menuResend() { withSelectedRow_(function (sheet, row) { sendCertificateForRow_(sheet, row, null); }); }

/** Menu: email a copy of the selected row's certificate to you, e.g. for an auditor. */
function menuCopyToMe() {
  withSelectedRow_(function (sheet, row) {
    sendCertificateForRow_(sheet, row, Session.getActiveUser().getEmail());
  });
}

/* ------------------------------------------------------------------ the work */

function withSelectedRow_(fn) {
  var sheet = SpreadsheetApp.getActiveSheet();
  var row = sheet.getActiveRange().getRow();
  if (row < 2) {
    SpreadsheetApp.getUi().alert("Select a cell in a response row first (not the header row).");
    return;
  }
  fn(sheet, row);
}

/**
 * Builds the certificate for one row and emails it.
 * sendTo: null sends to the person who submitted; an address sends a copy there
 * instead and leaves the "Certificate sent" column alone.
 */
function sendCertificateForRow_(sheet, row, sendTo) {
  var lastCol = sheet.getLastColumn();
  var headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
  var values = sheet.getRange(row, 1, 1, lastCol).getValues()[0];
  var tz = sheet.getParent().getSpreadsheetTimeZone();

  var data = certificateData_(headers, values, function (d, pattern) {
    return Utilities.formatDate(d, tz, pattern);
  });
  if (!data.email) throw new Error("Row " + row + " has no email address, so there is no one to send it to.");

  var html = certificateHtml_(data);
  var pdf = HtmlService.createHtmlOutput(html).getBlob()
    .getAs(MimeType.PDF)
    .setName("Certificate - " + data.name + " - " + data.dateIso + ".pdf");

  var options = {
    to: sendTo || data.email,
    subject: (sendTo ? "Copy: " : "") + "Your certificate: " + CERT.course,
    htmlBody: emailHtml_(data, !!sendTo),
    attachments: [pdf],
    name: CERT.org
  };
  if (CERT.replyTo) options.replyTo = CERT.replyTo;
  MailApp.sendEmail(options);

  if (!sendTo) {
    var col = findOrAddColumn_(sheet, headers, CERT.sentColumn);
    sheet.getRange(row, col).setValue(new Date());
  }
  try {
    SpreadsheetApp.getActive().toast("Certificate sent to " + options.to + ".", "Certificates", 5);
  } catch (err) { /* no open sheet to show it in, e.g. when run by the trigger */ }
}

function findOrAddColumn_(sheet, headers, title) {
  for (var i = 0; i < headers.length; i++) if (String(headers[i]).trim() === title) return i + 1;
  var col = headers.length + 1;
  sheet.getRange(1, col).setValue(title);
  return col;
}

/* ------------------------------------------------- pure functions (testable) */

/** Finds the useful columns by their headers, so renaming a question is harmless. */
function findColumns_(headers) {
  var h = headers.map(function (x) { return String(x).toLowerCase(); });
  function first(test) { for (var i = 0; i < h.length; i++) if (test(h[i])) return i; return -1; }
  return {
    timestamp: first(function (x) { return x === "timestamp"; }),
    email: first(function (x) { return x.indexOf("email") !== -1; }),
    name: first(function (x) { return x.indexOf("name") !== -1 && x.indexOf("email") === -1; }),
    role: first(function (x) { return x.indexOf("role") !== -1; }),
    modules: CERT.modules.map(function (m) {
      function score(kind) {
        return first(function (x) {
          return x.indexOf(kind) !== -1 && m.match.some(function (w) { return x.indexOf(w) !== -1; });
        });
      }
      return { label: m.label, before: score("before"), after: score("after") };
    })
  };
}

/** Pulls one response row into the values the certificate needs. */
function certificateData_(headers, values, formatDate) {
  var c = findColumns_(headers);
  function val(i) { return i < 0 ? "" : values[i]; }
  function pct(v) {
    if (v === "" || v === null || v === undefined) return "";
    var n = Number(v);
    return isNaN(n) ? String(v) : Math.round(n) + "%";
  }
  var ts = val(c.timestamp);
  // Duck-typed rather than instanceof Date, which fails for dates created elsewhere.
  var when = ts && typeof ts.getTime === "function" && !isNaN(ts.getTime()) ? ts : new Date();
  var email = String(val(c.email)).trim();
  var name = String(val(c.name)).trim() || email;
  return {
    name: name,
    email: email,
    role: String(val(c.role)).trim(),
    date: formatDate(when, "MMMM d, yyyy"),
    dateIso: formatDate(when, "yyyy-MM-dd"),
    // Stable, and traceable to the response by its timestamp.
    id: "IJC-" + formatDate(when, "yyyyMMdd-HHmmss"),
    scores: c.modules.map(function (m) {
      return { label: m.label, before: pct(val(m.before)), after: pct(val(m.after)) };
    }).filter(function (s) { return s.before || s.after; })
  };
}

function esc_(s) {
  return String(s).replace(/[&<>"']/g, function (ch) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch];
  });
}

/**
 * The certificate itself. Google's PDF converter supports only simple HTML and
 * CSS, so this sticks to tables, inline styles and system fonts.
 */
function certificateHtml_(d) {
  var pine = "#283a30", amber = "#c2812f", muted = "#6f6555", line = "#e3d9c6";
  var scoreRows = d.scores.map(function (s) {
    return "<tr><td style='padding:4px 10px;border-bottom:1px solid " + line + "'>" + esc_(s.label) + "</td>" +
           "<td style='padding:4px 10px;border-bottom:1px solid " + line + ";text-align:center'>" + esc_(s.before || "—") + "</td>" +
           "<td style='padding:4px 10px;border-bottom:1px solid " + line + ";text-align:center'>" + esc_(s.after || "—") + "</td></tr>";
  }).join("");
  var scores = d.scores.length
    ? "<table style='margin:18px auto 0;border-collapse:collapse;font-size:12px;color:" + pine + "'>" +
        "<tr><th style='padding:4px 10px;text-align:left;color:" + muted + "'>Module</th>" +
        "<th style='padding:4px 10px;color:" + muted + "'>Before</th>" +
        "<th style='padding:4px 10px;color:" + muted + "'>After</th></tr>" + scoreRows + "</table>"
    : "";
  return "<html><body style='margin:0;font-family:Georgia,serif;color:" + pine + "'>" +
    "<div style='border:3px solid " + pine + ";padding:6px;margin:24px'>" +
    "<div style='border:1px solid " + amber + ";padding:40px 48px;text-align:center'>" +
      "<div style='font-size:13px;letter-spacing:4px;text-transform:uppercase;color:" + amber + "'>" + esc_(CERT.org) + "</div>" +
      "<div style='font-size:34px;margin:18px 0 6px'>Certificate of Completion</div>" +
      "<div style='font-size:14px;color:" + muted + "'>This certifies that</div>" +
      "<div style='font-size:30px;margin:14px 0 4px'>" + esc_(d.name) + "</div>" +
      "<div style='font-size:12px;color:" + muted + "'>" + esc_(d.email) + (d.role ? " &middot; " + esc_(d.role) : "") + "</div>" +
      "<div style='font-size:14px;color:" + muted + ";margin-top:18px'>has completed</div>" +
      "<div style='font-size:22px;margin:8px 0 4px'>" + esc_(CERT.course) + "</div>" +
      "<div style='font-size:12px;color:" + muted + ";line-height:1.6'>covering:<br>" + CERT.topics.map(esc_).join("<br>") + "</div>" +
      "<div style='font-size:16px;margin-top:20px'>Completed " + esc_(d.date) + "</div>" +
      scores +
      "<div style='font-size:10px;color:" + muted + ";margin-top:26px;line-height:1.5'>" +
        "Certificate " + esc_(d.id) + ". Issued automatically from " + esc_(CERT.org) + "'s verified completion record.<br>" +
        "Internal workforce training; not accredited for continuing-education credit." +
      "</div>" +
    "</div></div></body></html>";
}

function emailHtml_(d, isCopy) {
  var intro = isCopy
    ? "<p>Here is a copy of the certificate issued to " + esc_(d.name) + " (" + esc_(d.email) + ").</p>"
    : "<p>Hi " + esc_(d.name.split(" ")[0]) + ",</p><p>Thank you for completing " + esc_(CERT.course) +
      ". Your certificate is attached. Your completion is already recorded, so there's nothing else you need to do.</p>";
  return "<div style='font-family:Arial,sans-serif;font-size:14px;color:#241f18'>" + intro +
         "<p style='color:#6f6555;font-size:12px'>Certificate " + esc_(d.id) + "</p></div>";
}
