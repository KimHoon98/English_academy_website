import { google } from 'googleapis';
import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();
  const { parentName, phoneNumber, childName, childGrade, message } = body;

  try {
    // 1. 구글 시트 저장 로직
    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY!),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'Sheet1!A:E',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[parentName, phoneNumber, childName, childGrade, message, new Date().toLocaleString()]],
      },
    });

    // 2. 이메일 알림 발송 로직
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // 앱 비밀번호 사용 권장
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: 'daniel3954@gmail.com',
      subject: `[디아크 잉글리시] ${parentName}님의 상담 신청서`,
      text: `신규 상담 신청이 들어왔습니다.\n\n이름: ${parentName}\n연락처: ${phoneNumber}\n학생: ${childName}(${childGrade})\n내용: ${message}`,
    });

    return NextResponse.json({ message: 'Success' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error' }, { status: 500 });
  }
}