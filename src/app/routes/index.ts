import express from "express";
import { userRoutes } from "../modules/user/user.routes";
import { CategoryRoutes } from "../modules/category/category.routes";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/users",
    route: userRoutes,
  },
  {
    path: "/categories",
    route: CategoryRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
