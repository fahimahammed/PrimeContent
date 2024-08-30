import { Category } from '@prisma/client';
import prisma from '../../../db/prismaClient';


const createCategory = async (data: Omit<Category, 'id'>): Promise<Category> => {
    return prisma.category.create({ data });
};

const getAllCategorys = async () => {
    // Implement filtering, pagination, and sorting logic here

    const data = await prisma.category.findMany();
    return {
        meta: {
            page: 1,
            limit: 10,
            total: 20
        }, data
    };
};

const getCategoryById = async (id: string): Promise<Category | null> => {
    return prisma.category.findUnique({ where: { id } });
};

const updateCategory = async (id: string, data: Partial<Category>): Promise<Category> => {
    return prisma.category.update({
        where: { id },
        data,
    });
};

const deleteCategory = async (id: string): Promise<Category> => {
    return prisma.category.delete({ where: { id } });
};

export const CategoryService = {
    createCategory,
    getAllCategorys,
    getCategoryById,
    updateCategory,
    deleteCategory,
};