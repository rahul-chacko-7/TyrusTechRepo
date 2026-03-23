import type { APIRoute } from 'astro';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import nodemailer from 'nodemailer';

type ProposalPayload = {
  name: string;
  company: string;
  email: string;
  phone: string;
  city: string;
  pages: number;
  message: string;
};

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(Math.max(0, value));
}

function safeText(value: unknown, fallback = 'Not provided'): string {
  const text = String(value ?? '').trim();
  return text || fallback;
}

async function buildProposalPdf(payload: ProposalPayload): Promise<Uint8Array> {
  const now = new Date();
  const refNo = `Tyrus/PRO/${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}/${Math.floor(
    100 + Math.random() * 900
  )}`;
  const estimatedPrice = (payload.pages || 0) * 1.5;

  const pdf = await PDFDocument.create();
  const page = pdf.addPage([595, 842]);
  const height = page.getHeight();
  const margin = 48;
  let y = height - margin;

  const font = await pdf.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdf.embedFont(StandardFonts.HelveticaBold);
  const lineHeight = 16;

  const write = (text: string, size = 11, bold = false, color = rgb(0.1, 0.1, 0.1)) => {
    page.drawText(text, {
      x: margin,
      y,
      size,
      color,
      font: bold ? fontBold : font
    });
    y -= lineHeight + (size > 12 ? 2 : 0);
  };

  write('Business Proposal', 20, true, rgb(0.02, 0.33, 0.25));
  write('Tyrus Technologies Pvt Ltd', 14, true);
  write(`Ref No: ${refNo}`);
  write(`Date: ${now.toLocaleDateString('en-GB')}`);
  y -= 8;

  write('Client Details', 13, true, rgb(0.02, 0.33, 0.25));
  write(`Name: ${payload.name}`);
  write(`Organization: ${safeText(payload.company)}`);
  write(`Email: ${payload.email}`);
  write(`Phone: ${safeText(payload.phone)}`);
  write(`City: ${safeText(payload.city)}`);
  y -= 8;

  write('Scope of Engagement', 13, true, rgb(0.02, 0.33, 0.25));
  write('1. Document collection and preparation (de-stapling, sorting, indexing).');
  write('2. High-quality scanning at 200 DPI in color/greyscale as required.');
  write('3. Quality control checks, indexing validation, and file naming.');
  write('4. Secure PDF delivery as per agreed folder and metadata structure.');
  write('5. Post-delivery support for corrections and reconciliation.');
  y -= 8;

  write('Commercials', 13, true, rgb(0.02, 0.33, 0.25));
  write(`Approx. pages/images: ${payload.pages || 0}`);
  write('Rate: INR 1.50 per image');
  write(`Estimated value: ${formatCurrency(estimatedPrice)} (excluding GST)`, 11, true);
  y -= 8;

  write('Client Notes', 13, true, rgb(0.02, 0.33, 0.25));
  write(safeText(payload.message));
  y -= 8;

  write('Terms & Conditions', 13, true, rgb(0.02, 0.33, 0.25));
  write('1. Price quoted is exclusive of GST @ 18%.');
  write('2. Delivery timeline is finalized after work order confirmation.');
  write('3. Final invoice is based on actual processed image count.');
  write('4. Client to provide required infrastructure at project location.');
  y -= 8;

  write('Contact: sales@tyrustech.com | +91 80898 89853', 10, true);
  write('This is a system-generated proposal based on submitted contact details.', 9);

  return pdf.save();
}

async function sendProposalEmail(
  payload: ProposalPayload,
  pdfBytes: Uint8Array,
  fileName: string
): Promise<'sent' | 'skipped' | 'failed'> {
  const host = import.meta.env.SMTP_HOST;
  const port = Number(import.meta.env.SMTP_PORT || 587);
  const user = import.meta.env.SMTP_USER;
  const pass = import.meta.env.SMTP_PASS;
  const from = import.meta.env.MAIL_FROM || 'sales@tyrustech.com';

  if (!host || !user || !pass || !payload.email) {
    return 'skipped';
  }

  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass }
    });

    await transporter.sendMail({
      from,
      to: payload.email,
      cc: import.meta.env.MAIL_CC || undefined,
      subject: `Business Proposal - Tyrus Technologies (${safeText(payload.company, payload.name)})`,
      text: `Hi ${payload.name},\n\nPlease find attached your business proposal based on the submitted requirements.\n\nRegards,\nTyrus Technologies`,
      attachments: [
        {
          filename: fileName,
          content: Buffer.from(pdfBytes)
        }
      ]
    });
    return 'sent';
  } catch {
    return 'failed';
  }
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = (await request.json()) as Partial<ProposalPayload>;
    const payload: ProposalPayload = {
      name: safeText(body.name, ''),
      company: safeText(body.company),
      email: safeText(body.email, ''),
      phone: safeText(body.phone),
      city: safeText(body.city),
      pages: Number(body.pages) || 0,
      message: safeText(body.message)
    };

    if (!payload.name || !payload.email) {
      return new Response(JSON.stringify({ error: 'Name and email are required.' }), {
        status: 400,
        headers: { 'content-type': 'application/json' }
      });
    }

    const pdfBytes = await buildProposalPdf(payload);
    const fileName = `Tyrus-Proposal-${safeText(payload.company, payload.name).replace(/[^a-zA-Z0-9-_]/g, '-')}.pdf`;
    const emailStatus = await sendProposalEmail(payload, pdfBytes, fileName);

    return new Response(Buffer.from(pdfBytes), {
      status: 200,
      headers: {
        'content-type': 'application/pdf',
        'content-disposition': `attachment; filename="${fileName}"`,
        'x-email-status': emailStatus
      }
    });
  } catch {
    return new Response(JSON.stringify({ error: 'Unable to generate proposal right now.' }), {
      status: 500,
      headers: { 'content-type': 'application/json' }
    });
  }
};
