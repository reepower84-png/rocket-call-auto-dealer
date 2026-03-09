import { NextRequest, NextResponse } from 'next/server';

// POST: 새 문의 접수 - Discord 웹훅으로 직접 알림 전송
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

    // Discord 웹훅으로 직접 전송
    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

    if (!webhookUrl) {
      console.error('Discord webhook URL이 설정되지 않았습니다.');
      return NextResponse.json(
        { error: '알림 전송 설정이 되어있지 않습니다.' },
        { status: 500 }
      );
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

    const discordResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        embeds: [embed]
      }),
    });

    if (!discordResponse.ok) {
      console.error('Discord 웹훅 전송 실패:', discordResponse.status, discordResponse.statusText);
      return NextResponse.json(
        { error: '알림 전송에 실패했습니다.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: '상담 신청이 완료되었습니다.' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error processing inquiry:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
