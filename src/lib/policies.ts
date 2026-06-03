import guidesData from '../data/guides.json';
import { CONTENT_REVIEWED_AT } from './site';

export interface Guide {
    id: string;
    title: string;
    description: string;
    content: string;
    date: string;
    category: string;
    reviewedAt?: string;
    sources?: GuideSource[];
    indexable?: boolean;
}

export interface GuideSource {
    title: string;
    url: string;
}

const commonSources: GuideSource[] = [
    { title: '정부24 보조금24', url: 'https://www.gov.kr/portal/rcvfvrSvc/main' },
    { title: '복지로', url: 'https://www.bokjiro.go.kr' },
];

const guideSources: Record<string, GuideSource[]> = {
    'k-pass-2026-guide': [
        { title: 'K-패스 공식 누리집', url: 'https://www.korea-pass.kr/info/intro.do' },
        { title: '국토교통부 K-패스 도입 안내', url: 'https://www.molit.go.kr/2024plan_traffic/total/total_05.jsp' },
    ],
    'small-business-elec-2026': [
        { title: '소상공인시장진흥공단', url: 'https://www.semas.or.kr' },
        { title: '소상공인24', url: 'https://www.sbiz24.kr' },
    ],
    'newborn-loan-2026': [
        { title: '주택도시기금 대출 안내', url: 'https://nhuf.molit.go.kr' },
        { title: '국토교통부', url: 'https://www.molit.go.kr' },
    ],
    'youth-rent-2026': [
        { title: '복지로 청년월세 지원', url: 'https://www.bokjiro.go.kr' },
        { title: '국토교통부', url: 'https://www.molit.go.kr' },
    ],
    'energy-voucher-2026': [
        { title: '에너지바우처 지원대상 안내', url: 'https://www.energyv.or.kr/info/support_info.do?tab=1' },
        { title: '에너지바우처 신청 안내', url: 'https://www.energyv.or.kr/info/apl_info.do' },
    ],
    'youth-leap-account-2026': [
        { title: '청년도약계좌 상품 안내', url: 'https://ylaccount.kinfa.or.kr/main' },
        { title: '금융위원회', url: 'https://www.fsc.go.kr' },
    ],
    'parental-allowance-2026': [
        { title: '복지로 부모급여', url: 'https://www.bokjiro.go.kr' },
        { title: '정부24 행복출산', url: 'https://www.gov.kr' },
    ],
    'national-tomorrow-learning-card': [
        { title: '고용24', url: 'https://www.work24.go.kr' },
        { title: '고용노동부', url: 'https://www.moel.go.kr' },
    ],
    'jeonse-deposit-guarantee-guide': [
        { title: '주택도시보증공사', url: 'https://www.khug.or.kr' },
        { title: '안심전세포털', url: 'https://www.khug.or.kr/jeonse' },
    ],
    'national-employment-support-system': [
        { title: '국민취업지원제도', url: 'https://www.kua.go.kr' },
        { title: '고용24', url: 'https://www.work24.go.kr' },
    ],
    'small-business-policy-funds': [
        { title: '소상공인 정책자금', url: 'https://ols.semas.or.kr' },
        { title: '소상공인시장진흥공단', url: 'https://www.semas.or.kr' },
    ],
    'infertility-treatment-support': [
        { title: '정부24 난임부부 지원', url: 'https://www.gov.kr' },
        { title: '보건복지부', url: 'https://www.mohw.go.kr' },
    ],
    'youth-rent-special-support': [
        { title: '복지로 청년월세 지원', url: 'https://www.bokjiro.go.kr' },
        { title: '정부24 보조금24', url: 'https://www.gov.kr/portal/rcvfvrSvc/main' },
    ],
    'basic-livelihood-security-customized': [
        { title: '복지로 기초생활보장', url: 'https://www.bokjiro.go.kr' },
        { title: '보건복지부', url: 'https://www.mohw.go.kr' },
    ],
    'emergency-welfare-support': [
        { title: '복지로 긴급복지지원', url: 'https://www.bokjiro.go.kr' },
        { title: '보건복지부', url: 'https://www.mohw.go.kr' },
    ],
    'energy-voucher-guide': [
        { title: '에너지바우처 지원대상 안내', url: 'https://www.energyv.or.kr/info/support_info.do?tab=1' },
        { title: '에너지바우처 사용 안내', url: 'https://www.energyv.or.kr/info/use_info.do' },
    ],
    'disabled-activity-support-service': [
        { title: '복지로 장애인활동지원', url: 'https://www.bokjiro.go.kr' },
        { title: '보건복지부', url: 'https://www.mohw.go.kr' },
    ],
    'long-term-care-insurance-elderly': [
        { title: '노인장기요양보험', url: 'https://www.longtermcare.or.kr' },
        { title: '국민건강보험공단', url: 'https://www.nhis.or.kr' },
    ],
    'housing-allowance-guide': [
        { title: '주거급여', url: 'https://www.myhome.go.kr' },
        { title: '복지로 주거급여', url: 'https://www.bokjiro.go.kr' },
    ],
    'culture-nuri-card-guide': [
        { title: '문화누리카드 공식 누리집', url: 'https://www.mnuri.kr' },
        { title: '문화체육관광부', url: 'https://www.mcst.go.kr' },
    ],
};

export const INDEXABLE_GUIDE_IDS = [
    'k-pass-2026-guide',
    'youth-rent-2026',
    'energy-voucher-2026',
    'national-tomorrow-learning-card',
    'basic-livelihood-security-customized',
    'emergency-welfare-support',
    'housing-allowance-guide',
    'long-term-care-insurance-elderly',
];

const mergedGuideTargets: Record<string, string> = {
    'youth-rent-special-support': 'youth-rent-2026',
    'energy-voucher-guide': 'energy-voucher-2026',
};

export function isIndexableGuideId(id: string): boolean {
    return INDEXABLE_GUIDE_IDS.includes(id);
}

export function getMergedGuideTarget(id: string): string | undefined {
    return mergedGuideTargets[id];
}

const sharedApprovalSections = `

## 신청 전 공통 점검 순서

1. **신청자 기준을 먼저 고정합니다.** 같은 제도라도 본인 단독 가구인지, 부모 또는 배우자를 포함한 가구인지, 주민등록상 세대와 실제 거주지가 일치하는지에 따라 판단이 달라질 수 있습니다.
2. **소득 자료의 기준 기간을 확인합니다.** 건강보험료, 기준 중위소득, 사업소득, 근로소득, 재산 환산액은 제도마다 보는 기간과 반영 방식이 다릅니다. 최근 급여명세서만 보고 판단하지 말고 공식 신청 화면에서 요구하는 기준 월 또는 기준 연도를 확인해야 합니다.
3. **중복 지원 제한을 확인합니다.** 이미 받고 있는 급여, 바우처, 지자체 지원, 회사 복지제도가 있다면 같은 목적의 지원으로 보아 조정되거나 제외될 수 있습니다.
4. **서류의 이름과 발급일을 맞춥니다.** 가족관계증명서, 주민등록등본, 임대차계약서, 통장 사본, 납부 영수증처럼 자주 쓰이는 서류도 발급일 제한이 있는 경우가 있습니다.
5. **최종 판단은 공식 신청 화면 기준으로 확인합니다.** 이 글은 신청 전 준비를 돕기 위한 안내이며, 실제 선정 여부는 담당 기관의 조사와 심사 결과에 따라 달라집니다.

## 신청이 지연되거나 반려되는 흔한 이유

- 신청자 본인 명의가 아닌 계약서, 계좌, 카드, 고객번호를 제출한 경우
- 주민등록 주소와 실제 거주지 또는 사업장 주소가 서로 다른데 별도 설명 자료가 없는 경우
- 같은 목적의 다른 지원을 이미 받고 있는데 중복 가능 여부를 확인하지 않은 경우
- 소득이나 재산 변동이 있었지만 신청서에는 이전 정보가 들어간 경우
- 가족관계, 세대분리, 임대차 관계처럼 심사에 영향을 주는 사실을 증빙하지 못한 경우

## 공식 출처 확인 방법

본문의 제도 설명은 2026년 5월 기준 공개된 공식 안내를 바탕으로 정리했습니다. 다만 복지 제도는 예산, 고시, 지자체 공고, 신청 시점에 따라 세부 조건이 바뀔 수 있습니다. 신청 직전에는 아래 순서로 다시 확인하는 것이 안전합니다.

1. 제도명으로 공식 사이트에서 최신 공고를 검색합니다.
2. 신청 화면의 대상자 자가진단 또는 모의계산 기능이 있으면 먼저 실행합니다.
3. 금액, 기간, 소득 기준처럼 숫자가 들어간 항목은 공고문 원문과 신청 화면을 함께 확인합니다.
4. 판단이 애매하면 주민센터, 전담 콜센터, 담당 기관 문의 창구에 본인의 상황을 설명하고 확인합니다.
`;

const pillarGuideSections: Record<string, string> = {
    'k-pass-2026-guide': `

## K-패스 신청 전 세부 확인표

K-패스는 교통카드만 발급받는다고 바로 적용되는 제도가 아닙니다. 카드 발급, 회원가입, 카드 등록, 주소지 검증, 실제 대중교통 이용 실적이 함께 맞아야 합니다. 특히 기존 알뜰교통카드 이용자는 전환 절차를 완료했는지, 신규 이용자는 카드사 앱과 K-패스 공식 누리집의 등록 상태가 서로 맞는지 확인해야 합니다.

- 이용 횟수: 월 기준 최소 이용 횟수와 첫 달 예외 적용 여부를 공식 안내에서 확인합니다.
- 적용 교통수단: 시내버스, 지하철, 광역버스, GTX 등 본인이 쓰는 노선이 포함되는지 확인합니다.
- 카드 등록: 실물 카드 또는 모바일 교통카드가 K-패스 계정에 연결됐는지 확인합니다.
- 주소지: 주민등록상 주소지가 참여 지자체인지 확인합니다.
- 정산 방식: 카드 청구 할인, 계좌 입금, 마일리지 등 카드사별 정산 방식을 확인합니다.

### 이런 경우는 별도로 확인하세요

- 월 이용 횟수가 일정하지 않은 프리랜서, 재택근무자, 방학 중 학생
- 광역버스와 지하철을 함께 이용하지만 일부 구간이 별도 요금 체계인 경우
- 모바일 교통카드로만 이용하고 실물 카드를 거의 쓰지 않는 경우
- 이사 직후 주소지 검증이 아직 반영되지 않은 경우
`,
    'youth-rent-2026': `

## 청년월세 신청 전 세부 확인표

청년월세 지원은 월세 금액만으로 판단하기 어렵습니다. 청년 본인 가구와 원가구, 임대차계약, 실제 월세 납부, 다른 주거 지원 수급 여부가 함께 검토됩니다. 신청 전에는 “내가 월세를 내고 있다”는 사실뿐 아니라 그 월세를 어떤 계약과 어떤 계좌 이체로 증명할 수 있는지가 중요합니다.

- 독립 거주: 부모와 별도 거주 중인지, 주민등록상 주소가 실제 거주지와 맞는지 확인합니다.
- 임대차계약: 신청자 명의 계약인지, 공동계약이면 본인 부담액을 설명할 수 있는지 확인합니다.
- 월세 증빙: 최근 납부 내역, 이체 메모, 임대인 계좌 정보가 계약서와 연결되는지 확인합니다.
- 소득 기준: 청년 본인 가구와 원가구를 각각 보는지 확인합니다.
- 중복 지원: 지자체 청년월세, 주거급여, 회사 주거비 지원과의 관계를 확인합니다.

### 자주 놓치는 부분

고시원, 셰어하우스, 하숙집처럼 일반 주택과 계약 형태가 다른 곳은 계약서와 납부 증빙을 더 꼼꼼히 준비해야 합니다. 부모와 주민등록상 세대가 분리되어 있어도 실제 생계가 독립됐는지 추가 확인이 필요한 경우가 있습니다. 또한 주거급여 수급자는 월세 지원액이 그대로 더해지는 것이 아니라 조정될 수 있으므로 공식 안내에서 산정 방식을 확인해야 합니다.
`,
    'energy-voucher-2026': `

## 에너지바우처 신청 전 세부 확인표

에너지바우처는 소득 기준과 세대원 특성 기준을 함께 보는 제도입니다. 생계·의료·주거·교육급여 수급 여부만 확인하고 끝내면 안 되고, 세대원 중 노인, 영유아, 장애인, 임산부, 중증질환자 등 특성 기준에 해당하는 사람이 있는지도 함께 확인해야 합니다.

- 수급 자격: 국민기초생활보장 급여 수급 여부와 세대원 특성 기준을 함께 확인합니다.
- 사용 방식: 요금 차감과 국민행복카드 중 실제 생활 패턴에 맞는 방식을 선택합니다.
- 고객번호: 전기, 도시가스, 지역난방 고객번호가 신청자 주소와 맞는지 확인합니다.
- 이사 여부: 전입 후 고객번호가 바뀌면 재신청 또는 정보 변경이 필요할 수 있습니다.
- 잔액 관리: 하절기와 동절기 사용 기간, 잔액 이월 가능 여부를 확인합니다.

### 사용 방식 선택 기준

도시가스나 지역난방 고지서가 본인 세대 기준으로 나오는 경우에는 요금 차감 방식이 편합니다. 등유, LPG, 연탄을 직접 구입하는 가구라면 국민행복카드 방식이 더 적합할 수 있습니다. 아파트 관리비에 에너지 비용이 포함되는 경우에는 고객번호 확인이 어려울 수 있으므로 관리사무소 또는 주민센터에 먼저 문의하는 것이 좋습니다.
`,
    'national-tomorrow-learning-card': `

## 국민내일배움카드 신청 전 세부 확인표

국민내일배움카드는 단순히 카드를 발급받는 제도가 아니라 직업훈련 참여를 위한 계정, 카드, 훈련과정 선택, 자부담 확인이 함께 움직입니다. 특히 재직자, 구직자, 자영업자, 특수형태근로종사자는 본인의 고용 상태에 따라 안내받는 과정과 지원 비율이 달라질 수 있습니다.

- 고용 상태: 구직자, 재직자, 자영업자 등 현재 상태를 정확히 선택합니다.
- 훈련 목적: 취업, 이직, 직무 전환, 자격 취득 등 목적에 맞는 과정인지 확인합니다.
- 자부담: 과정별 본인부담금과 환급 조건을 수강 전에 확인합니다.
- 출석 기준: 중도 포기, 결석, 지각이 수강 제한이나 비용 부담에 미치는 영향을 확인합니다.
- 카드 사용: 발급 카드와 고용24 계정의 과정 신청 상태가 연결됐는지 확인합니다.

### 훈련과정 선택 시 주의할 점

과정명이 비슷해도 훈련기관, 시간표, 수료 기준, 자부담금, 취업 연계 방식은 다를 수 있습니다. 후기나 광고 문구만 보고 고르기보다 고용24의 과정 상세 정보, 훈련기관 정보, 시간표, 실제 수업 방식, 수료 후 활용 가능성을 함께 확인해야 합니다.
`,
    'basic-livelihood-security-customized': `

## 기초생활보장 신청 전 세부 확인표

기초생활보장 급여는 생계, 의료, 주거, 교육 급여가 모두 같은 기준으로 결정되는 것이 아닙니다. 가구의 소득인정액, 부양의무자 기준 적용 여부, 재산의 소득환산, 자동차, 금융재산, 주거 형태가 복합적으로 반영됩니다. 신청 전에는 단순 월급보다 “소득인정액”이 어떻게 계산되는지 이해하는 것이 중요합니다.

- 가구 범위: 실제 생계를 같이하는 사람과 주민등록상 세대의 차이를 확인합니다.
- 소득 자료: 근로소득, 사업소득, 연금, 공적 이전소득을 구분합니다.
- 재산 자료: 주택, 보증금, 자동차, 금융재산의 반영 여부를 확인합니다.
- 급여별 기준: 생계·의료·주거·교육 급여의 선정 기준이 서로 다름을 확인합니다.
- 변동 신고: 취업, 이사, 가구원 변동, 재산 변동 시 신고 의무를 확인합니다.

### 상담 전 준비하면 좋은 자료

최근 급여명세서, 임대차계약서, 통장 거래 내역, 부채 관련 서류, 가족관계증명서, 자동차 관련 자료를 준비하면 주민센터 상담에서 본인의 상황을 더 구체적으로 설명할 수 있습니다. 결과가 애매한 경우에도 신청 자체는 가능하므로, 자가 판단만으로 포기하지 않는 것이 좋습니다.
`,
    'emergency-welfare-support': `

## 긴급복지지원 신청 전 세부 확인표

긴급복지지원은 일반 복지 신청과 달리 위기 상황의 긴급성이 중요합니다. 주소득자의 실직, 휴·폐업, 중한 질병, 화재, 가정폭력, 단전·단수 등 갑작스러운 사유로 생계 유지가 어려워진 경우를 중심으로 검토됩니다. 신청 전에는 위기 사유를 설명할 수 있는 자료를 최대한 모아두는 것이 좋습니다.

- 위기 사유: 실직, 질병, 사고, 휴폐업, 화재 등 갑작스러운 사유가 있는지 확인합니다.
- 생계 곤란: 현재 생활비, 의료비, 주거비를 감당하기 어려운 상황인지 정리합니다.
- 증빙 자료: 진단서, 퇴직 확인, 폐업 자료, 고지서, 체납 자료 등을 준비합니다.
- 다른 지원: 기존 복지 급여와 중복 또는 연계 여부를 확인합니다.
- 사후 조사: 선지원 후조사 방식이 적용될 수 있음을 이해합니다.

### 긴급 상황에서의 신청 요령

긴급복지지원은 서류를 완벽히 준비한 뒤에만 상담할 수 있는 제도가 아닙니다. 당장 생계나 의료비가 막힌 상황이라면 먼저 보건복지상담센터 또는 주민센터에 연락해 위기 상황을 설명하고, 담당자의 안내에 따라 필요한 서류를 보완하는 방식이 현실적입니다.
`,
    'housing-allowance-guide': `

## 주거급여 신청 전 세부 확인표

주거급여는 월세 가구와 자가 가구의 지원 방식이 다릅니다. 임차 가구는 임대차계약과 실제 임차료를 기준으로 보고, 자가 가구는 주택 노후도와 수선 필요성을 조사합니다. 생계급여 대상이 아니어도 주거급여만 따로 검토될 수 있으므로, 월세 부담이 큰 가구라면 별도 확인이 필요합니다.

- 주거 형태: 월세, 전세, 반전세, 자가, 무상거주 여부를 구분합니다.
- 계약 관계: 임대차계약서 명의와 실제 납부자가 일치하는지 확인합니다.
- 임차료 증빙: 월세 이체 내역, 영수증, 보증금 자료를 준비합니다.
- 소득인정액: 기준 중위소득 대비 선정 기준을 공식 안내에서 확인합니다.
- 현장 조사: 자가 가구는 주택 상태 조사와 수선 범위를 확인합니다.

### 전세·반전세 가구가 확인할 부분

전세나 반전세는 보증금을 월세로 환산해 판단하는 경우가 있습니다. 보증금이 크고 월세가 낮은 계약이라도 환산 방식에 따라 결과가 달라질 수 있으므로, 신청 전 보증금과 월세를 모두 정확히 정리해 두는 것이 좋습니다.
`,
    'long-term-care-insurance-elderly': `

## 노인장기요양보험 신청 전 세부 확인표

노인장기요양보험은 나이만으로 자동 이용되는 제도가 아니라, 장기요양인정 신청과 방문조사, 등급판정위원회 심의를 거쳐 등급이 결정됩니다. 가족이 느끼는 돌봄 부담과 등급 판정 결과가 항상 같지는 않기 때문에, 일상생활에서 실제로 어려운 동작과 돌봄 필요 시간을 구체적으로 정리해야 합니다.

- 신청 대상: 만 65세 이상 또는 노인성 질병이 있는 만 65세 미만인지 확인합니다.
- 일상생활: 식사, 이동, 배변, 목욕, 약 복용 등 도움 필요 항목을 정리합니다.
- 의료 자료: 진단서, 약 처방, 입퇴원 기록, 인지 저하 관련 자료를 준비합니다.
- 서비스 선택: 방문요양, 주야간보호, 시설급여 등 필요한 형태를 구분합니다.
- 본인부담: 재가급여와 시설급여의 본인부담 구조를 확인합니다.

### 방문조사 전 가족이 준비할 내용

조사 당일의 컨디션만으로 판단하면 평소 어려움이 충분히 전달되지 않을 수 있습니다. 최근 낙상, 배회, 식사 거부, 약 복용 누락, 야간 돌봄 필요, 보호자의 돌봄 시간 등을 날짜별로 메모해 두면 실제 생활 상태를 설명하는 데 도움이 됩니다.
`,
};

function normalizePromotionalLanguage(content: string): string {
    return content
        .replaceAll('혜택', '지원 내용')
        .replaceAll('최대 53%까지 환급받을 수 있는지', '환급 비율과 적용 조건이 어떻게 달라지는지')
        .replaceAll('최대 20만 원', '공식 공고에서 정한 지원 한도')
        .replaceAll('최대 5억 원', '공식 안내에서 정한 대출 한도')
        .replaceAll('월 최대 20만 원씩, 1년 동안 240만 원의 월세를 현금으로 돌려받을 수 있는', '월세 일부를 정해진 기간 동안 지원받을 수 있는')
        .replaceAll('현금으로 직접 입금', '계좌 지급 방식으로 처리')
        .replaceAll('현금이 입금', '계좌로 지급')
        .replaceAll('현금 지급', '계좌 지급')
        .replaceAll('현금 입금', '계좌 지급')
        .replaceAll('현금으로 지급', '정해진 방식으로 지급')
        .replaceAll('최대 6개월', '공식 기준에 따른 기간')
        .replaceAll('최대 300만 원', '공식 기준에 따른 의료비 한도')
        .replaceAll('최대 기준', '상한 기준')
        .replaceAll('반드시', '신청 전')
        .replaceAll('꼭', '가급적')
        .replaceAll('가능합니다', '가능할 수 있습니다')
        .replaceAll('받을 수 있습니다', '검토될 수 있습니다')
        .replaceAll('누릴 수 있습니다', '이용할 수 있습니다')
        .replaceAll('돌려받게 되며', '정산될 수 있으며')
        .replaceAll('돌려받을 수', '정산받을 수')
        .replaceAll('지원받을 수', '지원 대상으로 검토될 수')
        .replaceAll('신청하시기를 권장합니다', '신청 가능 여부를 확인해 보세요')
        .replaceAll('가장 중요한 혜택', '중요한 확인 항목')
        .replaceAll('큰 혜택', '중요한 지원 내용')
        .replaceAll('유리합니다', '상황에 맞는지 확인해야 합니다');
}

function buildApprovalContent(guide: Guide): string {
    const normalizedContent = normalizePromotionalLanguage(guide.content);

    if (!isIndexableGuideId(guide.id)) {
        return normalizedContent;
    }

    return `${normalizedContent}${pillarGuideSections[guide.id] || ''}${sharedApprovalSections}`;
}

function enrichGuide(guide: Guide): Guide {
    const indexable = isIndexableGuideId(guide.id);
    return {
        ...guide,
        content: buildApprovalContent(guide),
        indexable,
        reviewedAt: CONTENT_REVIEWED_AT,
        sources: guideSources[guide.id] || commonSources,
    };
}

export const getAllGuides = async (): Promise<Guide[]> => {
    return (guidesData as Guide[]).map(enrichGuide);
};

export const getIndexableGuides = async (): Promise<Guide[]> => {
    const guides = await getAllGuides();
    return INDEXABLE_GUIDE_IDS
        .map((id) => guides.find((guide) => guide.id === id))
        .filter((guide): guide is Guide => Boolean(guide));
};

export const getGuideById = async (id: string): Promise<Guide | undefined> => {
    const guide = (guidesData as Guide[]).find(item => item.id === id);
    return guide ? enrichGuide(guide) : undefined;
};
