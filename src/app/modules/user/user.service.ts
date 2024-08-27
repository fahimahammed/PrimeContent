import prisma from "../../../db/prismaClient";

const getAllUsers = async () => {

    const users = await prisma.user.findMany();
    const total = await prisma.user.count();
    return {
        data: users,
        meta: {
            page: 1,
            limit: 1000,
            total: total
        }
    };
};

const addUser = async (userData: { name: string; email: string, password: "" }) => {
    return await prisma.user.create({
        data: userData
    });
};

export const userServices = {
    addUser,
    getAllUsers
};
