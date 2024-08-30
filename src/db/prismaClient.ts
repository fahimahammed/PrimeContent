import { PrismaClient } from "@prisma/client";
import config from "../config";

// Initialize Prisma Client
const prisma = new PrismaClient({
  log: [
    { emit: "event", level: "query" }, // Log all queries
    { emit: "stdout", level: "info" }, // Log info level messages to stdout
    { emit: "stdout", level: "warn" }, // Log warning level messages to stdout
    { emit: "stdout", level: "error" }, // Log error level messages to stdout
  ],
});

if (config.environment === "development") {
  prisma.$on("query", (e) => {
    const border = "- ".repeat(50); // Adjust the length as needed
    const margin = " ".repeat(4); // Adjust the margin as needed

    console.log(`\x1b[36m${border}\x1b[0m`); // Cyan border
    console.log(`\x1b[36m${margin}Query: \x1b[0m%s`, e.query); // Cyan color for 'Query:' with margin
    console.log(`\x1b[32m${margin}Params: \x1b[0m%s`, e.params); // Green color for 'Params:' with margin
    console.log(`\x1b[35m${margin}Duration: \x1b[0m%d ms`, e.duration); // Magenta color for 'Duration:' with margin
    console.log(`\x1b[36m${border}\x1b[0m`); // Cyan border
  });
}

export default prisma;
