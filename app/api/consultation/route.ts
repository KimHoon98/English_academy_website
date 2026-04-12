import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();
  const { parentName, phoneNumber, childName, childGrade, message } = body;

  try {
    // TODO: 구글 시트 저장 (나중에 연동)
    // TODO: 이메일 발송 (나중에 연동)

    console.log('상담 신청 접수:', { parentName, phoneNumber, childName, childGrade, message });

    return NextResponse.json({ message: 'Success' }, { status: 200 });
  } catch (error) {
    console.error('API 에러:', error);
    return NextResponse.json({ message: 'Error' }, { status: 500 });
  }
}