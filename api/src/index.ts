import express, { type NextFunction, type Request, type Response } from "express";
import cors from "cors";
import helmet from "helmet";
import { ZodError } from "zod";
import { Prisma } from "@prisma/client";
import { authRouter } from "./routes/auth.js";
import { postsRouter } from "./routes/posts.js";
import { taxonomyRouter } from "./routes/taxonomy.js";

const app = express();

app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN?.split(",") ?? "*" }));
app.use(express.json({ limit: "1mb" }));

app.get("/health", (_req, res) => res.json({ ok: true }));
app.use("/api/auth", authRouter);
app.use("/api/posts", postsRouter);
app.use("/api", taxonomyRouter);

// Express 5 forwards rejected async handlers here automatically.
app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof ZodError) {
    return res.status(400).json({ error: "Validation failed", issues: err.flatten().fieldErrors });
  }
  if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2025") {
    return res.status(404).json({ error: "Not found" });
  }
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
});

const port = Number(process.env.PORT ?? 4000);
app.listen(port, () => console.log(`API listening on :${port}`));
