import * as fs from 'fs';
import * as path from 'path';

// Function to create a module directory with files and basic CRUD code
function createModule(moduleName: string): void {
    const baseDir = path.join(__dirname, '..', 'app', 'modules', moduleName);

    // Helper function to recursively create directories
    function createDirectories(dirPath: string): void {
        if (!fs.existsSync(dirPath)) {
            createDirectories(path.dirname(dirPath));
            fs.mkdirSync(dirPath);
        }
    }

    // Create the module directory with all parent directories
    createDirectories(baseDir);

    console.log(`Module directory '${moduleName}' created successfully.`);

    // Code templates for the files
    const templates: { [key: string]: string } = {
        [`${moduleName}.controller.ts`]: `
import { Request, Response } from 'express';
import { ${capitalize(moduleName)}Service } from './${moduleName}.service';
import catchAsync from '../utils/catchAsync';
import sendResponse from '../utils/sendResponse';
import httpStatus from 'http-status';


const create${capitalize(moduleName)}Handler = catchAsync(async (req: Request, res: Response) => {
    const data = await ${capitalize(moduleName)}Service.create${capitalize(moduleName)}(req.body);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: '${capitalize(moduleName)} created successfully',
        data,
    });
});

 const getAll${capitalize(moduleName)}sHandler = catchAsync(async (req: Request, res: Response) => {
    const result = await ${capitalize(moduleName)}Service.getAll${capitalize(moduleName)}s();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: '${capitalize(moduleName)}s retrieved successfully',
        meta: result.meta,
        data: result.data,
    });
});

 const get${capitalize(moduleName)}ByIdHandler = catchAsync(async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const data = await ${capitalize(moduleName)}Service.get${capitalize(moduleName)}ById(id);
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: '${capitalize(moduleName)} retrieved successfully',
            data,
        });
});

 const update${capitalize(moduleName)}Handler = catchAsync(async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const data = await ${capitalize(moduleName)}Service.update${capitalize(moduleName)}(id, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: '${capitalize(moduleName)} updated successfully',
        data,
    });
});

 const delete${capitalize(moduleName)}Handler = catchAsync(async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    await ${capitalize(moduleName)}Service.delete${capitalize(moduleName)}(id);
    sendResponse(res, {
        statusCode: httpStatus.NO_CONTENT,
        success: true,
        message: '${capitalize(moduleName)} deleted successfully',
    });
});

export const ${capitalize(moduleName)}Controller = {
    create${capitalize(moduleName)}Handler,
    getAll${capitalize(moduleName)}sHandler,
    get${capitalize(moduleName)}ByIdHandler,
    update${capitalize(moduleName)}Handler,
    delete${capitalize(moduleName)}Handler,
};
`,
        [`${moduleName}.routes.ts`]: `
import { Router } from 'express';
import { ${capitalize(moduleName)}Controller } from './${moduleName}.controller';

const router = Router();

router.post('/', ${capitalize(moduleName)}Controller.create${capitalize(moduleName)}Handler);
router.get('/', ${capitalize(moduleName)}Controller.getAll${capitalize(moduleName)}sHandler);
router.get('/:id', ${capitalize(moduleName)}Controller.get${capitalize(moduleName)}ByIdHandler);
router.put('/:id', ${capitalize(moduleName)}Controller.update${capitalize(moduleName)}Handler);
router.delete('/:id', ${capitalize(moduleName)}Controller.delete${capitalize(moduleName)}Handler);

export const ${capitalize(moduleName)}Routes = router;
`,
        [`${moduleName}.service.ts`]: `
import { PrismaClient, ${capitalize(moduleName)} } from '@prisma/client';

const prisma = new PrismaClient();

 const create${capitalize(moduleName)} = async (data: Omit<${capitalize(moduleName)}, 'id'>): Promise<${capitalize(moduleName)}> => {
    return prisma.${moduleName}.create({ data });
};

 const getAll${capitalize(moduleName)}s = async (filters: Record<string, any>, options: Record<string, any>): Promise<{ meta: any, data: ${capitalize(moduleName)}[] }> => {
    // Implement filtering, pagination, and sorting logic here
    const data = await prisma.${moduleName}.findMany();
    return { meta: {}, data };
};

 const get${capitalize(moduleName)}ById = async (id: number): Promise<${capitalize(moduleName)} | null> => {
    return prisma.${moduleName}.findUnique({ where: { id } });
};

 const update${capitalize(moduleName)} = async (id: number, data: Partial<${capitalize(moduleName)}>): Promise<${capitalize(moduleName)}> => {
    return prisma.${moduleName}.update({
        where: { id },
        data,
    });
};

 const delete${capitalize(moduleName)} = async (id: number): Promise<${capitalize(moduleName)}> => {
    return prisma.${moduleName}.delete({ where: { id } });
};

export const ${capitalize(moduleName)}Service = {
    create${capitalize(moduleName)},
    getAll${capitalize(moduleName)}s,
    get${capitalize(moduleName)}ById,
    update${capitalize(moduleName)},
    delete${capitalize(moduleName)},
};
`
    };

    // Create each file within the module directory with the corresponding template
    for (const [file, content] of Object.entries(templates)) {
        const filePath = path.join(baseDir, file);
        if (!fs.existsSync(filePath)) {
            fs.writeFileSync(filePath, content.trim(), 'utf8'); // Creates the file with template content
            console.log(`File '${file}' created successfully in '${moduleName}' with basic CRUD code.`);
        } else {
            console.log(`File '${file}' already exists.`);
        }
    }
}

// Helper function to capitalize the first letter of the module name
function capitalize(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1);
}

// Dynamically input module name
const moduleName: string | undefined = process.argv[2]; // Input module name as a command-line argument

if (moduleName) {
    createModule(moduleName);
} else {
    console.log('Please provide a module name.');
}
