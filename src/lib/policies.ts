import guidesData from '../data/guides.json';

export interface Guide {
    id: string;
    title: string;
    description: string;
    content: string;
    date: string;
    category: string;
}

export const getAllGuides = async (): Promise<Guide[]> => {
    return guidesData as Guide[];
};

export const getGuideById = async (id: string): Promise<Guide | undefined> => {
    return (guidesData as Guide[]).find(guide => guide.id === id);
};
