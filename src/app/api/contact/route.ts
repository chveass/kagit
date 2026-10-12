import { NextRequest, NextResponse } from 'next/server';
import { addContact, addQuote } from '@/lib/cms';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, ...data } = body;

    const emailTo = process.env.EMAIL_TO || 'zeraith1@gmail.com';
    const emailFrom = process.env.EMAIL_FROM || 'Murat Kağıtçılık <onboarding@resend.dev>';
    const apiKey = process.env.RESEND_API_KEY;

    if (type === 'quote') {
      const quote = {
        id: uuidv4(),
        ...data,
        createdAt: new Date().toISOString(),
        read: false
      };

      addQuote(quote);

      // Send email via Resend if API key is configured
      if (apiKey && apiKey !== 're_your_api_key_here') {
        try {
          const { Resend } = await import('resend');
          const resend = new Resend(apiKey);

          const emailResult = await resend.emails.send({
            from: emailFrom,
            to: emailTo,
            replyTo: data.email || undefined,
            subject: `📋 Yeni Teklif Talebi: ${data.name || 'İsimsiz'} - ${data.productName || 'Genel'}`,
            html: `
              <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #1a1918; color: #f5f5f5; border-radius: 12px; overflow: hidden; border: 1px solid #333;">
                <div style="background: linear-gradient(135deg, #c58d43, #8a5e24); padding: 24px; text-align: center;">
                  <h1 style="margin: 0; font-size: 22px; color: #ffffff; letter-spacing: 0.5px;">Murat Kağıtçılık</h1>
                  <p style="margin: 6px 0 0; color: #fdf5ea; font-size: 14px;">Web Sitesinden Yeni Teklif Talebi Geldi</p>
                </div>
                
                <div style="padding: 24px;">
                  <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                    <tr style="border-bottom: 1px solid #2e2d2b;">
                      <td style="padding: 10px 0; color: #c58d43; font-weight: bold; width: 130px;">Müşteri:</td>
                      <td style="padding: 10px 0; color: #ffffff;">${data.name || '-'}</td>
                    </tr>
                    <tr style="border-bottom: 1px solid #2e2d2b;">
                      <td style="padding: 10px 0; color: #c58d43; font-weight: bold;">Firma:</td>
                      <td style="padding: 10px 0; color: #ffffff;">${data.company || '-'}</td>
                    </tr>
                    <tr style="border-bottom: 1px solid #2e2d2b;">
                      <td style="padding: 10px 0; color: #c58d43; font-weight: bold;">E-Posta:</td>
                      <td style="padding: 10px 0; color: #ffffff;"><a href="mailto:${data.email}" style="color: #d8a25c; text-decoration: underline;">${data.email || '-'}</a></td>
                    </tr>
                    <tr style="border-bottom: 1px solid #2e2d2b;">
                      <td style="padding: 10px 0; color: #c58d43; font-weight: bold;">Telefon:</td>
                      <td style="padding: 10px 0; color: #ffffff;"><a href="tel:${data.phone}" style="color: #d8a25c; text-decoration: underline;">${data.phone || '-'}</a></td>
                    </tr>
                    <tr style="border-bottom: 1px solid #2e2d2b;">
                      <td style="padding: 10px 0; color: #c58d43; font-weight: bold;">İlgilenilen Ürün:</td>
                      <td style="padding: 10px 0; color: #ffffff; font-weight: 600;">${data.productName || '-'}</td>
                    </tr>
                    <tr style="border-bottom: 1px solid #2e2d2b;">
                      <td style="padding: 10px 0; color: #c58d43; font-weight: bold;">Miktar:</td>
                      <td style="padding: 10px 0; color: #ffffff;">${data.quantity || '-'}</td>
                    </tr>
                    <tr style="border-bottom: 1px solid #2e2d2b;">
                      <td style="padding: 10px 0; color: #c58d43; font-weight: bold;">Ebat Tercihi:</td>
                      <td style="padding: 10px 0; color: #ffffff;">${data.size || '-'}</td>
                    </tr>
                  </table>

                  ${data.message ? `
                    <div style="margin-top: 20px; padding: 16px; background-color: #252422; border-radius: 8px; border-left: 4px solid #c58d43;">
                      <div style="font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #c58d43; font-weight: bold; margin-bottom: 6px;">Müşteri Notu / Mesajı:</div>
                      <div style="font-size: 14px; color: #e0e0e0; white-space: pre-wrap; line-height: 1.5;">${data.message}</div>
                    </div>
                  ` : ''}

                  <div style="margin-top: 24px; text-align: center;">
                    <a href="mailto:${data.email}?subject=RE: Teklif Talebiniz - Murat Kağıtçılık" style="display: inline-block; background-color: #c58d43; color: #ffffff; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: bold; font-size: 14px;">Müşteriye Doğrudan Yanıtla</a>
                  </div>
                </div>

                <div style="background-color: #121211; padding: 14px; text-align: center; font-size: 12px; color: #888;">
                  Bu bildirim muratkagitcilik web sitesi teklif formu üzerinden otomatik gönderilmiştir.
                </div>
              </div>
            `
          });

          if (emailResult.error) {
            console.error('Resend API Error (Quote):', emailResult.error);
          } else {
            console.log('Quote notification email sent successfully:', emailResult.data?.id);
          }
        } catch (emailError) {
          console.error('Email send error:', emailError);
        }
      } else {
        console.warn('RESEND_API_KEY is not set. Email not sent. Saved to database only.');
      }

      return NextResponse.json({ success: true, message: 'Teklif talebiniz alındı' }, { status: 201 });
    } else {
      const contact = {
        id: uuidv4(),
        ...data,
        createdAt: new Date().toISOString(),
        read: false
      };

      addContact(contact);

      // Send email via Resend if API key is configured
      if (apiKey && apiKey !== 're_your_api_key_here') {
        try {
          const { Resend } = await import('resend');
          const resend = new Resend(apiKey);

          const emailResult = await resend.emails.send({
            from: emailFrom,
            to: emailTo,
            replyTo: data.email || undefined,
            subject: `💬 Yeni İletişim Mesajı: ${data.name || 'İsimsiz'}`,
            html: `
              <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #1a1918; color: #f5f5f5; border-radius: 12px; overflow: hidden; border: 1px solid #333;">
                <div style="background: linear-gradient(135deg, #c58d43, #8a5e24); padding: 24px; text-align: center;">
                  <h1 style="margin: 0; font-size: 22px; color: #ffffff;">Murat Kağıtçılık</h1>
                  <p style="margin: 6px 0 0; color: #fdf5ea; font-size: 14px;">Yeni İletişim Formu Mesajı</p>
                </div>
                
                <div style="padding: 24px;">
                  <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                    <tr style="border-bottom: 1px solid #2e2d2b;">
                      <td style="padding: 10px 0; color: #c58d43; font-weight: bold; width: 120px;">Ad Soyad:</td>
                      <td style="padding: 10px 0; color: #ffffff;">${data.name || '-'}</td>
                    </tr>
                    <tr style="border-bottom: 1px solid #2e2d2b;">
                      <td style="padding: 10px 0; color: #c58d43; font-weight: bold;">E-Posta:</td>
                      <td style="padding: 10px 0; color: #ffffff;"><a href="mailto:${data.email}" style="color: #d8a25c; text-decoration: underline;">${data.email || '-'}</a></td>
                    </tr>
                    <tr style="border-bottom: 1px solid #2e2d2b;">
                      <td style="padding: 10px 0; color: #c58d43; font-weight: bold;">Telefon:</td>
                      <td style="padding: 10px 0; color: #ffffff;"><a href="tel:${data.phone}" style="color: #d8a25c; text-decoration: underline;">${data.phone || '-'}</a></td>
                    </tr>
                  </table>

                  ${data.message ? `
                    <div style="margin-top: 20px; padding: 16px; background-color: #252422; border-radius: 8px; border-left: 4px solid #c58d43;">
                      <div style="font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #c58d43; font-weight: bold; margin-bottom: 6px;">Mesaj:</div>
                      <div style="font-size: 14px; color: #e0e0e0; white-space: pre-wrap; line-height: 1.5;">${data.message}</div>
                    </div>
                  ` : ''}

                  <div style="margin-top: 24px; text-align: center;">
                    <a href="mailto:${data.email}?subject=RE: İletişim Mesajınız - Murat Kağıtçılık" style="display: inline-block; background-color: #c58d43; color: #ffffff; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: bold; font-size: 14px;">Müşteriye Doğrudan Yanıtla</a>
                  </div>
                </div>

                <div style="background-color: #121211; padding: 14px; text-align: center; font-size: 12px; color: #888;">
                  Bu bildirim muratkagitcilik web sitesi iletişim formu üzerinden gönderilmiştir.
                </div>
              </div>
            `
          });

          if (emailResult.error) {
            console.error('Resend API Error (Contact):', emailResult.error);
          } else {
            console.log('Contact notification email sent successfully:', emailResult.data?.id);
          }
        } catch (emailError) {
          console.error('Email send error:', emailError);
        }
      } else {
        console.warn('RESEND_API_KEY is not set. Email not sent. Saved to database only.');
      }

      return NextResponse.json({ success: true, message: 'Mesajınız alındı' }, { status: 201 });
    }
  } catch (error) {
    console.error('Contact POST error:', error);
    return NextResponse.json({ error: 'Mesaj gönderilemedi' }, { status: 500 });
  }
}
