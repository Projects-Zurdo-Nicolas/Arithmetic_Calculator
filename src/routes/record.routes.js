import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  getRecords,
  saveRecord,
  getRecord,
  updateRecord,
  deleteRecord,
} from "../controllers/record.controller.js";
import {validateSchema} from '../middlewares/validator.middleware.js'
import {saveRecordSchema} from '../schemas/record.schema.js'

const router = Router();

//CRUD
router.get("/records", authRequired, getRecords);
router.get("/record/:id", authRequired, getRecord);//Borrar
router.post("/save_record", authRequired, validateSchema(saveRecordSchema), saveRecord);
router.delete("/delete_record/:id", authRequired, deleteRecord);
router.put("/update_record/:id", authRequired, updateRecord);//Borrar

export default router;
