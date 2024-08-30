import express from "express"
import morgan from "morgan"
import cookieParser from "cookie-parser";
import authRoutes from './routes/auth.routes.js'
import operationRoutes from './routes/operation.routes.js'
import recordRoutes from './routes/record.routes.js';

const app = express();

app.use(morgan('dev'));

app.use(express.json());

app.use(cookieParser());

app.use("/api", authRoutes);

app.use("/api", operationRoutes);

app.use("/api", recordRoutes);

export default app;
