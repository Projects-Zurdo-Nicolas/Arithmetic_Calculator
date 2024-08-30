import mongoose from "mongoose";
import { connectDB } from "../db.js";
import Operation from "../models/operation.model.js";

// Data to load
const operationsData = [
  { type: "addition", cost: 0.25 },
  { type: "subtraction", cost: 0.3 },
  { type: "multiplication", cost: 0.4 },
  { type: "division", cost: 0.5 },
  { type: "square_root", cost: 0.35 },
  { type: "random_string", cost: 0.6 },
];

const initializeOperations = async () => {
  try {
    await connectDB();

    
    const count = await Operation.countDocuments();
    if (count === 0) {
      await Operation.insertMany(operationsData);
      console.log("Operaciones inicializadas exitosamente.");
    } else {
      console.log("Operaciones ya están inicializadas.");
    }

    mongoose.connection.close();
  } catch (error) {
    console.error("Error al inicializar operaciones:", error);
    mongoose.connection.close();
  }
};

initializeOperations();
