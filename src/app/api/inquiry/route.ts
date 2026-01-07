import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// Discord 웹훅으로 알림 전송
async function sendDiscordNotification(name: string, phone: string, message: string) {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

  if (!webhookUrl) {
    console.warn('Discord webhook URL이 설정되지 않았습니다.');
    return;
  }

  const currentTime = new Date().toLocaleString('ko-KR', {
    timeZone: 'Asia/Seoul',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  const embed = {
    title: '📞 새로운 상담 문의가 접수되었습니다!',
    color: 0x5865F2,
    fields: [
      {
        name: '👤 이름',
        value: name,
        inline: true
      },
      {
        name: '📱 전화번호',
        value: phone,
        inline: true
      },
      {
        name: '💬 문의 내용',
        value: message || '(내용 없음)',
        inline: false
      },
      {
        name: '🕐 접수 시간',
        value: currentTime,
        inline: false
      }
    ],
    footer: {
      text: '로켓콜-자동차'
    },
    timestamp: new Date().toISOString()
  };

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        embeds: [embed]
      }),
    });

    if (!response.ok) {
      console.error('Discord 웹훅 전송 실패:', response.status, response.statusText);
    }
  } catch (error) {
    console.error('Discord 웹훅 오류:', error);
  }
}

// POST: 새 문의 접수
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, message } = body;

    // 유효성 검사
    if (!name || !phone) {
      return NextResponse.json(
        { error: '이름과 전화번호는 필수입니다.' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('inquiries')
      .insert([
        {
          name,
          phone,
          message: message || '',
          status: 'pending'
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: '데이터 저장 중 오류가 발생했습니다.' },
        { status: 500 }
      );
    }

    // Discord로 알림 전송 (완료될 때까지 대기)
    await sendDiscordNotification(name, phone, message);

    return NextResponse.json(
      { message: '상담 신청이 완료되었습니다.', id: data.id },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error saving inquiry:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

// GET: 모든 문의 조회 (어드민용)
export async function GET() {
  try {
    const { data, error } = await supabase
      .from('inquiries')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: '데이터 조회 중 오류가 발생했습니다.' },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching inquiries:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
