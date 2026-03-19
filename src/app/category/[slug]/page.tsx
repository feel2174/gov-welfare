import { getPoliciesByCategory, getCategories } from '@/lib/policies';
import { notFound } from 'next/navigation';
import PolicyList from '@/components/PolicyList';

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    const categories = await getCategories();
    return categories.map((cat) => ({
        slug: cat.slug,
    }));
}

export async function generateMetadata({ params }: Props) {
    const { slug } = await params;
    const categories = await getCategories();
    const category = categories.find(c => c.slug === slug);
    if (!category) return { title: '카테고리를 찾을 수 없습니다.' };
    return {
        title: `${category.name} - 정부복지 알리미`,
    };
}

export default async function CategoryPage({ params }: Props) {
    const { slug } = await params;
    const policies = await getPoliciesByCategory(slug);
    const categories = await getCategories();
    const category = categories.find(c => c.slug === slug);

    if (!category || policies.length === 0) {
        notFound();
    }

    return (
        <PolicyList 
            policies={policies}
            title={`${category.name}`}
            description={`${category.name}에 해당하는 정책 및 지원금입니다.`}
        />
    );
}
