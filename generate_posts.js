const fs = require('fs');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'AIzaSyBoguQbPvluAposeQzqvv9BIMnHjj_s5Io');
const model = genAI.getGenerativeModel({ model: 'gemini-3.1-flash-live-preview' });

const topics = [
  { id: 'k-pass-2026', title: '2026년 K-패스 (K-Pass) 교통비 환급 가이드: 신청부터 혜택까지 완벽 정리', category: '생활안정' },
  { id: 'small-business-elec-2026', title: '2026년 소상공인 전기요금 특별지원: 20만원 지원금 신청 조건과 방법', category: '소상공인' },
  { id: 'basic-pension-2026', title: '2026년 기초연금 수급자격 및 모의계산: 예상 수령액은 얼마일까?', category: '노후지원' },
  { id: 'newborn-loan-2026', title: '2026년 신생아 특례대출 완벽 정리: 1%대 금리로 내 집 마련하는 법', category: '주거지원' },
  { id: 'youth-rent-2026', title: '청년월세 특별지원 신청 방법: 매월 20만원씩 12개월 월세 지원받기', category: '청년지원' },
  { id: 'energy-voucher-2026', title: '2026년 에너지바우처 신청 자격: 여름/겨울 냉난방비 정부 지원 완벽 가이드', category: '생활안정' },
  { id: 'infertility-support-2026', title: '난임부부 시술비 지원 2026년 확대 내용: 소득 기준 폐지 및 지원 횟수 증가', category: '임신/출산' },
  { id: 'neulbom-school-2026', title: '2026년 늘봄학교 전면 확대: 초등학생 돌봄 공백 해소 및 이용 방법', category: '보육/교육' },
  { id: 'multi-child-housing-2026', title: '다자녀 가구 특별공급 청약 가이드: 2자녀부터 적용되는 혜택 총정리', category: '주거지원' },
  { id: 'senior-job-2026', title: '2026년 노인 일자리 및 사회활동 지원사업: 자격 조건 및 신청 일정', category: '노후지원' },
  { id: 'military-savings-2026', title: '장병내일준비적금 2026년 혜택: 전역 시 천만원 목돈 마련 가이드', category: '청년지원' },
  { id: 'freelancer-maternity-2026', title: '프리랜서 및 1인 자영업자 출산급여 지원: 고용보험 미적용자 혜택', category: '임신/출산' },
  { id: 'hope-savings-2026', title: '희망저축계좌 1, 2유형 차이점 및 가입 조건: 저소득층 자산 형성 지원', category: '생활안정' },
  { id: 'veteran-pension-2026', title: '2026년 국가유공자 보훈보상금 인상 안내: 수급 대상 및 신청 방법', category: '보훈지원' },
  { id: 'disability-pension-2026', title: '장애인연금 수급자격 및 2026년 기초급여 인상액 완벽 정리', category: '생활안정' }
];

async function generateArticle(topic) {
  const prompt = `당신은 대한민국 최고의 복지 정책 전문 블로거입니다. 구글 애드센스 심사를 무조건 통과할 수 있도록, 다음 주제에 대해 SEO에 최적화되고 가치가 높은 고품질 마크다운 형식의 블로그 포스팅 본문을 작성해주세요.

주제: ${topic.title}

[요구사항]
1. 분량: 공백 제외 1,500자 이상으로 매우 상세하게 작성할 것. (절대 대충 요약하지 말고, 꼼꼼하고 길게 작성)
2. HTML/Markdown 구조화: ##, ###, -, **강조** 등을 적절히 사용하여 구글 봇이 좋아할 만한 깔끔한 구조를 만들 것.
3. 시각적 요소: 포스팅 맨 처음에 퀄리티 높은 대표 이미지(썸네일) 하나, 중간에 삽화 하나를 마크다운 이미지 문법으로 넣을 것. 이미지는 반드시 ![대표 이미지](https://picsum.photos/seed/${topic.id}/800/400) 와 ![참고 이미지](https://picsum.photos/seed/${topic.id}2/800/400) 형태를 사용할 것.
4. 나만의 인사이트 추가: 글 하단에 '필자의 꿀팁' 또는 '자주 묻는 질문(FAQ)' 섹션을 반드시 포함하여 다른 정부 블로그와 차별화된 가치를 제공할 것.
5. 어투: 전문적이고 신뢰감을 주면서도 일반인이 이해하기 쉬운 '~습니다', '~합니다' 어투 사용.
6. 오직 본문(마크다운 텍스트) 내용만 출력할 것. 다른 잡담이나 마크다운 코드블록 백틱(\`\`\`)은 최상단과 최하단에 절대 포함하지 말 것. 순수 마크다운만 출력.`;

  try {
    const result = await model.generateContent(prompt);
    let text = result.response.text();
    if (text.startsWith('\`\`\`markdown')) {
        text = text.replace(/^\`\`\`markdown\n?/, '');
    }
    if (text.endsWith('\`\`\`')) {
        text = text.replace(/\n?\`\`\`$/, '');
    }
    return text.trim();
  } catch (e) {
    console.error(`Failed to generate topic: ${topic.title}`, e.message || e);
    return null;
  }
}

async function main() {
  const file = './src/data/guides.json';
  let existingData = [];
  if (fs.existsSync(file)) {
    existingData = JSON.parse(fs.readFileSync(file, 'utf8'));
  }

  console.log('Starting to generate 15 high-quality articles...');
  
  for (const topic of topics) {
    if (existingData.find(g => g.id === topic.id)) {
      console.log(`Skipping ${topic.title} (already exists)`);
      continue;
    }
    
    console.log(`Generating: ${topic.title}`);
    const content = await generateArticle(topic);
    
    if (content) {
      existingData.unshift({
        id: topic.id,
        title: topic.title,
        description: `${topic.title.split(':')[0]}에 대해 자세히 알아보고 실생활에 필요한 유용한 정보와 꿀팁을 확인하세요.`,
        content: content,
        date: new Date().toISOString().split('T')[0],
        category: topic.category
      });
      fs.writeFileSync(file, JSON.stringify(existingData, null, 2), 'utf8');
      console.log(`-> Saved: ${topic.title} (Total: ${existingData.length} articles)`);
    } else {
        console.log(`-> Failed: ${topic.title}`);
    }
    
    await new Promise(r => setTimeout(r, 1000));
  }
  
  console.log('Finished generating articles!');
}

main();
