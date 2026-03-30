import policiesData from '../data/policies.json';
import guidesData from '../data/guides.json';

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

export interface Guide {
    id: string;
    title: string;
    description: string;
    content: string;
    date: string;
    category: string;
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
// Guide related functions
export const getAllGuides = async (): Promise<Guide[]> => {
    return guidesData as Guide[];
};

export const getGuideById = async (id: string): Promise<Guide | undefined> => {
    return (guidesData as Guide[]).find(guide => guide.id === id);
};
