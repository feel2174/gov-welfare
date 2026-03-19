import { getAllPolicies } from '@/lib/policies';
import PolicyList from '@/components/PolicyList';

export const metadata = {
    title: '정부 복지 알리미 - 전체 정책',
    description: '최신 정부 복지 정책 모음과 카테고리별 안내',
};

// 메인 페이지: 전체보기 (최신 100개)
export default async function Home() {
    const policies = await getAllPolicies();

    return (
        <PolicyList 
            policies={policies} 
            title="정부 정책 통합검색" 
            description="나에게 찰떡같이 맞는 정부 지원금을 조회해보세요." 
        />
    );
}
