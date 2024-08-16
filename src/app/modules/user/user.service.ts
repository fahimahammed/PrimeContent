import prisma from "../../../db/prismaClient";

const getAllUsers = async () => {
    return await prisma.user.findMany();
};

const addUser = async (userData: { name: string; email: string }) => {
    return await prisma.user.create({
        data: userData,
    });
};

export const userServices = {
    addUser,
    getAllUsers
};
