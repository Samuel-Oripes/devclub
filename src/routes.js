//rotas

import { Router } from "express";
import multer from "multer";
import multerConfig from "./config/multer.cjs";

import SessionController from "./app/controllers/SessionController.js";
import UserController from "./app/controllers/UserController.js";
import ProductController from "./app/controllers/productController.js";

const routes = new Router();

const upload = multer(multerConfig);

routes.post("/users", UserController.store);
routes.post("/session", SessionController.store);
routes.post("/products", upload.single('file'), ProductController.store);

export default routes;
