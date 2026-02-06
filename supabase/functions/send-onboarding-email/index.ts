import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface EmailPayload {
  email: string
  name?: string
  userId: string
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const payload = await req.json()

    // Log the entire payload to debug
    console.log('Received payload:', JSON.stringify(payload, null, 2))

    // Handle different webhook payload structures
    // Supabase webhooks send data in 'record' or 'new' field
    const record = payload.record || payload.new || payload

    const email = record.email || payload.email
    const name = record.name || record.full_name || payload.name || payload.full_name
    const userId = record.id || payload.userId

    console.log('Extracted data - Email:', email, 'Name:', name, 'UserId:', userId)

    if (!email) {
      console.error('No email found in payload')
      return new Response(
        JSON.stringify({ success: false, error: 'Missing email field' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    // Log the final name that will be used in the email
    const displayName = name || 'OPERATOR'
    console.log('Sending onboarding email to:', email, 'with name:', displayName)

    // Send email via Resend
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'WHISTLE <onboarding@resend.dev>',
        to: email,
        subject: 'WHISTLE // ACCESS_GRANTED',
        html: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="x-apple-disable-message-reformatting">
    <link href="https://fonts.googleapis.com/css2?family=Audiowide&display=swap" rel="stylesheet">
    <title>WHISTLE // ONBOARDING_PROTOCOL</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            background-color: #000000 !important;
            color: #ffffff !important;
            font-family: 'Courier New', Courier, monospace !important;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            width: 100% !important;
            min-width: 100%;
        }
        table {
            border-collapse: collapse;
            border-spacing: 0;
        }
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #000000;
            border: 2px solid #39ff14;
            box-shadow: 0 0 20px rgba(57, 255, 20, 0.3);
        }
        .content-wrapper {
            padding: 40px 20px;
        }
        .header {
            text-align: center;
            margin-bottom: 48px;
        }
        .logo {
            font-size: 36px;
            font-weight: 400;
            letter-spacing: 0.4em;
            color: #39ff14;
            margin: 0;
            padding: 0;
            text-transform: uppercase;
            font-family: 'Audiowide', 'Courier New', monospace;
        }
        .version {
            font-size: 10px;
            color: #71717a;
            margin-top: 8px;
            letter-spacing: 0.15em;
        }
        .system-line {
            font-size: 14px;
            line-height: 1.8;
            color: #ffffff;
            margin-bottom: 16px;
            text-align: center;
            word-wrap: break-word;
        }
        .highlight {
            color: #39ff14;
            font-weight: bold;
        }
        .divider {
            height: 1px;
            background: linear-gradient(90deg, transparent, #39ff14, transparent);
            margin: 24px 0;
            opacity: 0.3;
        }
        .quick-start {
            margin: 32px 0;
        }
        .quick-start-title {
            color: #39ff14;
            font-size: 11px;
            font-weight: bold;
            margin-bottom: 16px;
            letter-spacing: 0.1em;
            text-align: center;
        }
        .quick-start-card {
            background-color: #0a0a0a;
            border: 1px solid #27272a;
            border-left: 3px solid #39ff14;
            padding: 12px 16px;
            margin-bottom: 12px;
            transition: all 0.2s ease;
        }
        .quick-start-card:hover {
            border-left-color: #39ff14;
            background-color: #111111;
            box-shadow: 0 0 10px rgba(57, 255, 20, 0.1);
        }
        .quick-start-item {
            font-size: 12px;
            color: #a1a1aa;
            margin: 0;
        }
        .quick-start-icon {
            color: #39ff14;
            font-weight: bold;
            margin-right: 8px;
        }
        .terminal-button {
            display: inline-block;
            margin: 32px auto;
            padding: 14px 28px;
            border: 2px solid #39ff14;
            background-color: transparent;
            color: #39ff14 !important;
            text-decoration: none;
            font-size: 12px;
            font-weight: bold;
            letter-spacing: 0.15em;
            text-align: center;
        }
        .button-wrapper {
            text-align: center;
        }
        .metadata {
            font-size: 9px;
            color: #52525b;
            margin-top: 48px;
            padding-top: 24px;
            border-top: 1px solid #18181b;
            text-align: center;
            letter-spacing: 0.1em;
        }
        .metadata-row {
            margin-bottom: 12px;
            line-height: 1.8;
        }
        @media only screen and (max-width: 600px) {
            .content-wrapper {
                padding: 24px 16px !important;
            }
            .logo {
                font-size: 22px !important;
                letter-spacing: 0.2em !important;
            }
            .system-line {
                font-size: 13px !important;
            }
            .quick-start {
                padding: 16px !important;
            }
            .terminal-button {
                padding: 12px 24px !important;
                font-size: 11px !important;
            }
            .metadata {
                font-size: 8px !important;
            }
        }
    </style>
</head>
<body style="margin: 0; padding: 0; background-color: #000000;">
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #000000;">
        <tr>
            <td align="center" style="padding: 0;">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" class="email-container" style="max-width: 600px; background-color: #000000;">
                    <tr>
                        <td class="content-wrapper" style="padding: 40px 20px;">
                            
                            <!-- Header -->
                            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                                <tr>
                                    <td class="header" style="text-align: center; padding-bottom: 48px;">
                                        <img src="https://cdadbfkxivbaznhrsswn.supabase.co/storage/v1/object/public/brand-asset/WHISTLE%20(1).png" alt="WHISTLE" style="width: 200px; max-width: 100%; height: auto; display: block; margin: 0 auto; border: 0;" />
                                        <div class="version" style="font-size: 10px; color: #71717a; margin-top: 8px; letter-spacing: 0.15em;">VER: 1.0.0 // PROTOCOL: ONBOARDING</div>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Main Content -->
                            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                                <tr>
                                    <td>
                                        <div class="system-line" style="font-size: 14px; color: #ffffff; margin-bottom: 16px; text-align: center;">
                                            <span class="highlight" style="color: #39ff14; font-weight: bold;">&gt;&gt;</span> SYSTEM_INIT: <span class="highlight" style="color: #39ff14; font-weight: bold;">ONBOARDING</span> // User provisioning complete
                                        </div>
                                        
                                        <div class="divider" style="height: 1px; background: linear-gradient(90deg, transparent, #39ff14, transparent); margin: 24px 0; opacity: 0.3;"></div>
                                        
                                        <div class="system-line" style="font-size: 14px; color: #ffffff; margin-bottom: 16px; text-align: center;">
                                            Hi <span class="highlight" style="color: #39ff14; font-weight: bold;">${name || 'OPERATOR'}</span>,
                                        </div>
                                        
                                        <div class="system-line" style="font-size: 14px; color: #ffffff; margin-bottom: 16px; text-align: center;">
                                            Thank you for joining <span class="highlight" style="color: #39ff14; font-weight: bold;">WHISTLE</span>. Your access to the analyst workbench has been provisioned and verified.
                                        </div>
                                        
                                        <div class="system-line" style="font-size: 14px; color: #ffffff; margin-bottom: 16px; text-align: center;">
                                            All systems are operational. We are ready to process your first intelligence stream.
                                        </div>
                                        
                                        <!-- Quick Start -->
                                        <div class="quick-start" style="margin: 32px 0;">
                                            <div class="quick-start-title" style="color: #39ff14; font-size: 11px; font-weight: bold; margin-bottom: 16px; letter-spacing: 0.1em; text-align: center;">// QUICK_START_PROTOCOL</div>
                                            
                                            <div class="quick-start-card" style="background-color: #0a0a0a; border: 1px solid #27272a; border-left: 3px solid #39ff14; padding: 12px 16px; margin-bottom: 12px;">
                                                <div class="quick-start-item" style="font-size: 12px; color: #a1a1aa; margin: 0;"><span style="color: #39ff14; font-weight: bold; margin-right: 8px;">&gt;</span>Initialize your profile settings</div>
                                            </div>
                                            
                                            <div class="quick-start-card" style="background-color: #0a0a0a; border: 1px solid #27272a; border-left: 3px solid #39ff14; padding: 12px 16px; margin-bottom: 12px;">
                                                <div class="quick-start-item" style="font-size: 12px; color: #a1a1aa; margin: 0;"><span style="color: #39ff14; font-weight: bold; margin-right: 8px;">&gt;</span>Configure AI model parameters</div>
                                            </div>
                                            
                                            <div class="quick-start-card" style="background-color: #0a0a0a; border: 1px solid #27272a; border-left: 3px solid #39ff14; padding: 12px 16px; margin-bottom: 12px;">
                                                <div class="quick-start-item" style="font-size: 12px; color: #a1a1aa; margin: 0;"><span style="color: #39ff14; font-weight: bold; margin-right: 8px;">&gt;</span>Launch your first analysis session</div>
                                            </div>
                                            
                                            <div class="quick-start-card" style="background-color: #0a0a0a; border: 1px solid #27272a; border-left: 3px solid #39ff14; padding: 12px 16px; margin-bottom: 12px;">
                                                <div class="quick-start-item" style="font-size: 12px; color: #a1a1aa; margin: 0;"><span style="color: #39ff14; font-weight: bold; margin-right: 8px;">&gt;</span>Access the knowledge base</div>
                                            </div>
                                        </div>
                                        
                                        <!-- Button -->
                                        <div class="button-wrapper" style="text-align: center; margin: 32px 0;">
                                            <a href="https://whistle.codes/dashboard" class="terminal-button" style="display: inline-block; padding: 14px 28px; border: 2px solid #39ff14; background-color: transparent; color: #39ff14; text-decoration: none; font-size: 12px; font-weight: bold; letter-spacing: 0.15em;">ACCESS_WORKBENCH</a>
                                        </div>
                                        
                                        <div class="divider" style="height: 1px; background: linear-gradient(90deg, transparent, #39ff14, transparent); margin: 24px 0; opacity: 0.3;"></div>
                                        
                                        <div class="system-line" style="font-size: 11px; color: #71717a; margin-bottom: 16px; text-align: center;">
                                            Need assistance? Contact support at <span class="highlight" style="color: #39ff14; font-weight: bold;">support@whistle.codes</span>
                                        </div>
                                        
                                        <div class="divider" style="height: 1px; background: linear-gradient(90deg, transparent, #39ff14, transparent); margin: 24px 0; opacity: 0.3;"></div>
                                        
                                        <div class="system-line" style="font-size: 12px; color: #a1a1aa; margin-bottom: 8px; text-align: center;">
                                            Thanks for joining us,<br>
                                            <span class="highlight" style="color: #39ff14; font-weight: bold;">Dharshan</span><br>
                                            <span style="font-size: 10px; color: #71717a;">Founder, WHISTLE</span>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Footer -->
                            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                                <tr>
                                    <td class="metadata" style="font-size: 9px; color: #52525b; margin-top: 48px; padding-top: 24px; border-top: 1px solid #18181b; text-align: center; letter-spacing: 0.1em;">
                                        <div class="metadata-row" style="margin-bottom: 12px;">
                                            SYS_STATUS: STABLE<br>
                                            ENC: AES_256<br>
                                            VER: 2.1.0-STABLE<br>
                                            NODE: 14/14
                                        </div>
                                        <div>Â© 2026 WHISTLE_SYSTEMS // ALL_RIGHTS_RESERVED</div>
                                    </td>
                                </tr>
                            </table>
                            
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
        `,
      }),
    })

    const data = await res.json()

    if (res.ok) {
      console.log('Email sent successfully:', data)
      return new Response(
        JSON.stringify({ success: true, data }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
      )
    } else {
      console.error('Resend API error:', data)
      return new Response(
        JSON.stringify({ success: false, error: data }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }
  } catch (error) {
    console.error('Error in send-onboarding-email function:', error)
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})

