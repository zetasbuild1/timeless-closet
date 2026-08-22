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
    
    const recaptchaText = await recaptchaRes.text();
    let recaptchaData;
    try {
      recaptchaData = JSON.parse(recaptchaText);
    } catch (e) {
      throw new Error(`reCAPTCHA API returned non-JSON: ${recaptchaText.substring(0, 100)}`);
    }
    
    if (!recaptchaData.success) {
      return NextResponse.json({ success: false, message: 'reCAPTCHA verification failed.' }, { status: 400 });
    }

    // Instead of sending to Web3Forms from the server (which gets blocked by Cloudflare),
    // we return the access key to the client so the browser can send it directly.
    return NextResponse.json({ 
      success: true, 
      message: 'reCAPTCHA verified',
      web3Key: process.env.WEB3FORMS_ACCESS_KEY 
    });

  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json({ success: false, message: `Server Error: ${error?.message || error}` }, { status: 500 });
  }
}
