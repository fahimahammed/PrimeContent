import { PrismaClient, Content } from '@prisma/client';

const prisma = new PrismaClient();

const createContent = async (data: Omit<Content, 'id'>): Promise<Content> => {
    return prisma.content.create({ data });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getAllContents = async (): Promise<{ meta: any, data: Content[] }> => {
    const data = await prisma.content.findMany();
    return {
        meta: {
            page: 1,
            limit: 10,
            total: data.length
        },
        data
    };
};

const getContentById = async (id: string): Promise<Content | null> => {
    return prisma.content.findUnique({ where: { id } });
};

const updateContent = async (id: string, data: Partial<Content>): Promise<Content> => {
    return prisma.content.update({
        where: { id },
        data,
    });
};

const deleteContent = async (id: string): Promise<Content> => {
    return prisma.content.delete({ where: { id } });
};

export const ContentService = {
    createContent,
    getAllContents,
    getContentById,
    updateContent,
    deleteContent,
};