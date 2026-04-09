import { PrismaPg } from "@prisma/adapter-pg";
import {PrismaClient} from "../generated/prisma/client.js";

import dotenv from "dotenv";
dotenv.config()

const globalForPrisma = globalThis;

export const db = globalForPrisma.prisma || new PrismaClient({
    adapter: new PrismaPg({
      connectionString: process.env.DATABASE_URL,
    }),
  });


if(process.env.NODE_ENV !=="production") globalForPrisma.prisma = db;