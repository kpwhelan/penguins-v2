<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>New Penguins Inquiry</title>
</head>
<body style="margin:0; padding:0; background:#e8f0f4; color:#102433; font-family:Arial, Helvetica, sans-serif;">
    <div style="display:none; max-height:0; overflow:hidden; opacity:0; color:transparent;">
        {{ $name }} sent a new message through the Granite State Penguins website.
    </div>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="width:100%; background:#e8f0f4;">
        <tr>
            <td align="center" style="padding:32px 16px;">
                <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%; max-width:600px; overflow:hidden; background:#ffffff; border:1px solid #c5dfea; border-radius:24px; box-shadow:0 18px 50px rgba(7,27,45,.12);">
                    <tr><td style="height:8px; background:#2ac2f2; font-size:0; line-height:0;">&nbsp;</td></tr>
                    <tr>
                        <td align="center" style="padding:28px 32px 24px; background:#071b2d;">
                            <img src="{{ asset('assets/gsp-logo-navbar-480w@2x.png') }}" width="220" alt="Granite State Penguins" style="display:block; width:220px; max-width:100%; height:auto; border:0;">
                        </td>
                    </tr>
                    <tr>
                        <td style="padding:40px 40px 18px;">
                            <p style="margin:0 0 10px; color:#0c83ae; font-size:13px; line-height:18px; font-weight:700; letter-spacing:2px; text-transform:uppercase;">Website inquiry</p>
                            <h1 style="margin:0; color:#071b2d; font-size:32px; line-height:39px; font-weight:800; letter-spacing:-.7px;">A swimmer reached out.</h1>
                            <p style="margin:14px 0 0; color:#526879; font-size:16px; line-height:26px;">A new message was submitted through the public Granite State Penguins contact form.</p>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding:0 40px 20px;">
                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="width:100%; background:#eefaff; border:1px solid #bcecff; border-radius:16px;">
                                <tr>
                                    <td style="padding:20px 24px 8px;">
                                        <p style="margin:0 0 5px; color:#0c83ae; font-size:12px; line-height:17px; font-weight:700; letter-spacing:1.5px; text-transform:uppercase;">From</p>
                                        <p style="margin:0; color:#071b2d; font-size:19px; line-height:27px; font-weight:800;">{{ $name }}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding:8px 24px 20px;">
                                        <p style="margin:0 0 5px; color:#0c83ae; font-size:12px; line-height:17px; font-weight:700; letter-spacing:1.5px; text-transform:uppercase;">Email</p>
                                        <a href="mailto:{{ $email }}" style="color:#071b2d; font-size:16px; line-height:24px; font-weight:700; text-decoration:underline; text-decoration-color:#8ee0ff; text-decoration-thickness:2px; text-underline-offset:3px;">{{ $email }}</a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding:4px 40px 12px;">
                            <p style="margin:0 0 10px; color:#0c83ae; font-size:12px; line-height:17px; font-weight:700; letter-spacing:1.5px; text-transform:uppercase;">Their message</p>
                            <div style="padding:22px 24px; background:#f5fafc; border-left:4px solid #2ac2f2; border-radius:4px 14px 14px 4px; color:#102433; font-size:16px; line-height:27px; white-space:pre-wrap;">{{ $theMessage }}</div>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding:20px 40px 40px;">
                            <table role="presentation" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td align="center" style="border-radius:999px; background:#2ac2f2;">
                                        <a href="mailto:{{ $email }}" style="display:inline-block; padding:14px 24px; color:#071b2d; font-size:15px; line-height:20px; font-weight:800; text-decoration:none; border-radius:999px;">Reply to {{ $name }}</a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding:24px 40px; background:#f5fafc; border-top:1px solid #dfeef5;">
                            <p style="margin:0; color:#526879; font-size:12px; line-height:20px; text-align:center;">Sent from the Granite State Penguins website contact form</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
