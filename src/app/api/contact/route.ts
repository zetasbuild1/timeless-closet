import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { token, formData } = await request.json();

    if (!token) {
      return NextResponse.json({ success: false, message: 'reCAPTCHA token missing.' }, { status: 400 });
    }

    const recaptchaRes = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
    });
    
    const recaptchaData = await recaptchaRes.json();
    
    if (!recaptchaData.success) {
      return NextResponse.json({ success: false, message: 'reCAPTCHA verification failed.' }, { status: 400 });
    }

    const web3FormData = { 
      ...formData, 
      access_key: process.env.WEB3FORMS_ACCESS_KEY,
      subject: "New Contact Form Submission - Timeless Closet"
    };

    const web3Res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(web3FormData),
    });
    
    const web3Data = await web3Res.json();
    
    if (web3Data.success) {
      return NextResponse.json({ success: true, message: 'Message sent successfully!' });
    } else {
      return NextResponse.json({ success: false, message: web3Data.message || 'Failed to send message.' }, { status: 400 });
    }
  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json({ success: false, message: `Server Error: ${error?.message || error}` }, { status: 500 });
  }
}
