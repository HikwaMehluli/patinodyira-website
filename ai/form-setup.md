# Form Setup — Resend API

## Overview

The contact and booking forms use the [Resend](https://resend.com) email API. PHP form handlers in `forms/` call the Resend REST API directly via cURL (no Composer required). The client-side JS (`assets/js/form-handler.js`) handles AJAX submission and UI states.

## Prerequisites

1. **Resend account** — Sign up at [resend.com](https://resend.com). Free tier allows 3,000 emails/month and 100/day.
2. **Verified domain** — You must verify `patinodyira.co.zw` in the Resend dashboard before sending from addresses on that domain.
3. **PHP 7.4+** with the **cURL extension** enabled on your shared host.

## Setup Steps

### 1. Verify your domain in Resend

1. Log in to [resend.com/domains](https://resend.com/domains)
2. Click **Add Domain** and enter `patinodyira.co.zw`
3. Resend will provide DNS records to add (SPF, DKIM CNAME records, optional DMARC)
4. Add these records in your DNS provider (wherever `patinodyira.co.zw` is managed)
5. Go back to Resend and click **Verify DNS Records**
6. Wait for the status to change to **Verified** (usually a few minutes, up to an hour)

### 2. Create an API key

1. Go to [resend.com/api-keys](https://resend.com/api-keys)
2. Click **Create API Key**
3. Name it (e.g., `patinodyira.co.zw production`)
4. Permission: **Sending access** is sufficient
5. Copy the key immediately — Resend only shows it once

### 3. Configure `forms/config.php`

Edit `forms/config.php` with your values:

```php
return [
    'api_key'    => 're_xxxxxxxxxxxxxxxxxxxx',   // Your Resend API key
    'from_email' => 'noreply@patinodyira.co.zw', // Must be on your verified domain
    'from_name'  => 'Patinodyira',
    'contact_to' => 'info@patinodyira.co.zw',    // Where contact form emails are delivered
    'booking_to' => 'info@patinodyira.co.zw',    // Where booking form emails are delivered
];
```

**Important:** `forms/config.php` is listed in `.gitignore` and will not be committed to version control because it contains your API key.

### 4. Verify cURL is enabled

Most shared hosts have cURL enabled by default. To check, create a `phpinfo.php` file in your web root with:

```php
<?php phpinfo();
```

Search for "cURL" in the output. If it's not listed, contact your hosting provider to enable it.

## How It Works

### Frontend (JS)

`assets/js/form-handler.js` intercepts form submit events on all `.php-email-form` elements. It:
- Shows a loading spinner (`.loading` div)
- POSTs the form data via `fetch()` to the PHP handler
- Parses the JSON response
- Shows `.sent-message` on success, `.error-message` on failure
- Reuses existing CSS classes — no styling changes needed

### Backend (PHP)

Both `forms/contact.php` and `forms/book-a-table.php`:
1. Validate required fields
2. Build an HTML email body
3. Call the Resend API at `https://api.resend.com/emails` via `curl_init()`
4. Return `{"ok": true}` on success or `{"ok": false, "error": "..."}` on failure

### Email Format

Form submissions arrive as HTML emails with formatted fields:
- **Contact form:** Name, Email, Subject, Message
- **Booking form:** Name, Email, Phone, Date, Time, People, Message (optional)

The `Reply-To` header is set to the submitter's email address for easy replies.

## Troubleshooting

| Problem | Likely Cause |
|---------|-------------|
| "Failed to connect to email service" | cURL not enabled on your host, or network issue |
| "Email delivery failed" | Domain not verified in Resend, or API key is wrong |
| Forms submit but no email received | Check Resend dashboard → Emails tab for delivery status |
| 405 error | Form is being accessed via GET instead of POST |
| 422 error with "All fields required" | A required form field is empty |
