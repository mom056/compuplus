import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import rateLimit from '@/lib/rate-limit';

export async function POST(req: Request) {
    try {
        const { name, email, message } = await req.json();

        // Rate Limiting (5 requests per minute per IP)
        const limiter = rateLimit({
            interval: 60 * 1000, // 60 seconds
            uniqueTokenPerInterval: 500, // Max 500 users per second
        });

        try {
            await limiter.check(5, 'CACHE_TOKEN'); // 5 requests per minute
        } catch {
            return NextResponse.json(
                { error: 'Rate limit exceeded. Please try again later.' },
                { status: 429 }
            );
        }

        if (!name || !email || !message) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Configure Nodemailer Transporter
        // Compatible with Gmail (App Password) or standard SMTP
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || 'smtp.gmail.com',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        // Email Layout
        const mailOptions = {
            from: `"${name}" <${process.env.SMTP_USER}>`, // Sender address
            to: process.env.SMTP_USER, // Receivers (send to yourself)
            replyTo: email, // When you reply, it goes to the client
            subject: `New Inquiry from ${name} (CompuPlus Website)`,
            text: `
        Name: ${name}
        Email: ${email}
        
        Message:
        ${message}
      `,
            html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #0891b2;">New Website Inquiry</h2>
          <p>You have received a new message from the contact form.</p>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
          
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          
          <h3 style="margin-top: 20px;">Message:</h3>
          <p style="background: #f9f9f9; padding: 15px; border-radius: 5px; color: #333;">${message.replace(/\n/g, '<br>')}</p>
          
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
          <p style="font-size: 12px; color: #888;">This email was sent from your website compuplus.cc</p>
        </div>
      `,
        };

        console.log('Attempting to send email to:', process.env.SMTP_USER);
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully!');

        return NextResponse.json({ success: true, message: 'Email sent successfully' }, { status: 200 });

    } catch (error) {
        console.error('Email Error Detailed:', error);
        return NextResponse.json(
            { error: 'Failed to send email' },
            { status: 500 }
        );
    }
}
