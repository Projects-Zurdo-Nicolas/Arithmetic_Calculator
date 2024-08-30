import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  getOperations,
  getOperation
} from "../controllers/operation.controller.js";

const router = Router();

//CRUD
router.get("/operations", authRequired, getOperations);
router.get("/operation/:type", authRequired, getOperation);

export default router;
