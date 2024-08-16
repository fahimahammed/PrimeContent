import { PrismaClient } from '@prisma/client';

// Initialize Prisma Client
const prisma = new PrismaClient({
    log: [
        { emit: 'event', level: 'query' }, // Log all queries
        { emit: 'stdout', level: 'info' }, // Log info level messages to stdout
        { emit: 'stdout', level: 'warn' }, // Log warning level messages to stdout
        { emit: 'stdout', level: 'error' }, // Log error level messages to stdout
    ],
});

// Query logging with color and formatting
prisma.$on('query', (e) => {
    console.log("Query: " + e.query);
    console.log("Params: " + e.params);
    console.log("Duration: " + e.duration + "ms");
});


export default prisma;
