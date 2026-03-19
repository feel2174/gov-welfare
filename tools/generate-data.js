const fs = require('fs');
const path = require('path');

const categories = [
    { name: '청년/주거', slug: 'youth' },
    { name: '노후/건강', slug: 'senior' },
    { name: '아동/보육', slug: 'child' },
    { name: '일자리/창업', slug: 'job' },
    { name: '문화/생활', slug: 'culture' }
];

const prefixes = ["서울시", "경기도", "정부", "보건복지부", "고용노동부", "국토교통부"];
const suffixes = [
    { cat: 'youth', nouns: ["월세지원금", "전세보증금 반환보증", "청약저축 매칭지원", "도약계좌", "희망디딤돌", "면접정장 대여"] },
    { cat: 'senior', nouns: ["기초건강수당", "치매안심센터 방문지원", "노인일자리 알선", "장기요양급여 특례", "틀니 지원금", "백내장 수술비 지원"] },
    { cat: 'child', nouns: ["영아수당", "육아휴직 급여 보전", "다자녀 주거안정", "방과후 돌봄서비스", "입학축하금", "우유바우처"] },
    { cat: 'job', nouns: ["내일채움공제", "창업성공패키지", "중장년 재취업지원", "구직촉진수당", "국민취업지원제도", "프리랜서 산재보험"] },
    { cat: 'culture', nouns: ["문화누리카드", "체육시설 이용바우처", "도서구입비 환급", "예술인 창작지원", "여행바우처", "반려동물 의료비 지원"] }
];

const policies = [];

for (let i = 1; i <= 100; i++) {
    const categoryInfo = categories[Math.floor(Math.random() * categories.length)];
    const catSuffixes = suffixes.find(s => s.cat === categoryInfo.slug).nouns;
    
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const noun = catSuffixes[Math.floor(Math.random() * catSuffixes.length)];
    
    const title = `${prefix} ${noun} 사업 2026`;
    
    policies.push({
        id: `policy-${categoryInfo.slug}-${i}`,
        title: title,
        category: categoryInfo.name,
        categorySlug: categoryInfo.slug,
        description: `본 사업은 ${categoryInfo.name} 대상자들의 실질적인 혜택을 돕기 위해 ${prefix}에서 주관하는 "${noun}" 관련 맞춤형 지원 정책입니다. 신청 자격과 금액을 꼼꼼히 확인하시어 혜택을 누리시기 바랍니다.`,
        target: "해당 카테고리 자격 조건 충족자 (소득분위 제한 있음)",
        amount: `최대 ${(Math.floor(Math.random() * 200 + 10) * 10000).toLocaleString('ko-KR')}원 지원`,
        application_url: "https://www.bokjiro.go.kr/",
        date_posted: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString().split('T')[0]
    });
}

// Write to json
const dest = path.join(__dirname, '../src/data/policies.json');
fs.writeFileSync(dest, JSON.stringify(policies, null, 2), 'utf8');

console.log('Successfully generated 100 fake policies for 2026 in utf8');
