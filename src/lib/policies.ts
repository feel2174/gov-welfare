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

function enrichGuide(guide: Guide): Guide {
    return {
        ...guide,
        reviewedAt: CONTENT_REVIEWED_AT,
        sources: guideSources[guide.id] || commonSources,
    };
}

export const getAllGuides = async (): Promise<Guide[]> => {
    return (guidesData as Guide[]).map(enrichGuide);
};

export const getGuideById = async (id: string): Promise<Guide | undefined> => {
    const guide = (guidesData as Guide[]).find(item => item.id === id);
    return guide ? enrichGuide(guide) : undefined;
};
