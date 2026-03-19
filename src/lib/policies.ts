import policiesData from '../data/policies.json';

export interface Policy {
    id: string;
    title: string;
    category: string;
    categorySlug: string;
    description: string;
    target: string;
    amount: string;
    application_url: string;
    date_posted: string;
}

export const getAllPolicies = async (): Promise<Policy[]> => {
    return policiesData as Policy[];
};

export const getPolicyById = async (id: string): Promise<Policy | undefined> => {
    return (policiesData as Policy[]).find(policy => policy.id === id);
};

export const getPoliciesByCategory = async (slug: string): Promise<Policy[]> => {
    return (policiesData as Policy[]).filter(policy => policy.categorySlug === slug);
};

export const getCategories = async () => {
    const unique = new Map<string, string>();
    (policiesData as Policy[]).forEach(p => {
        if (!unique.has(p.categorySlug)) {
            unique.set(p.categorySlug, p.category);
        }
    });
    return Array.from(unique.entries()).map(([slug, name]) => ({ slug, name }));
};
