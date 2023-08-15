import { PrismaClient } from "@prisma/client";
import { Ride } from "../types/ride";

const prisma = new PrismaClient();

const createRide = async ({
    name,
    start_date,
    start_date_registration,
    end_date_registration,
    additional_information,
    start_place,
    participants_limit
}: Ride) => {
    return await prisma.ride.create({
        data: {
            name,
            start_date: new Date(start_date),
            start_date_registration: new Date(start_date_registration),
            end_date_registration: new Date(end_date_registration),
            additional_information,
            start_place,
            participants_limit
        }
    });
};

const queryRide = async (
    filters: object,
    options: {
        limit?: number;
        page?: number;
        sortType?: "asc" | "desc";
        sortBy?: string;
    }
) => {
    const page = options.page || 1;
    const limit = options.limit || 10;
    const sortBy = options.sortBy;
    const sortType = options.sortType || "desc";

    return await prisma.ride.findMany({
        where: filters,
        skip: (page - 1) * limit,
        take: Number(limit),
        orderBy: sortBy ? { [sortBy]: sortType } : undefined
    });
};

const getRideById = async (id: number) => {
    return await prisma.ride.findUnique({
        where: { id }
    });
};

export default {
    createRide,
    queryRide,
    getRideById
};
