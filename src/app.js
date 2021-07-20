import express from "express";
import cors from "cors";

import * as userController from "./controllers/userController.js";
import * as finalcialEventsController from "./controllers/financialEventsController.js";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/sign-up", userController.signUp);

app.post("/sign-in", userController.signIn);

app.post("/financial-events", finalcialEventsController.registerEvent);

app.get("/financial-events", finalcialEventsController.getEvents);

app.get("/financial-events/sum", finalcialEventsController.getSum);

export default app;
