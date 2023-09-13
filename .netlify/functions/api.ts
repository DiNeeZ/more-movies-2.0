import express, { Router } from "express";
import serverless from "serverless-http";

const api = express();

const router = Router();
router.get("/hello", (req, res) => res.send("Hello Pain in the Ass!!!"));

api.use("/.netlify/functions/", router);

export const handler = serverless(api);
