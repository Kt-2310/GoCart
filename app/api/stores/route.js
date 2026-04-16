import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// GET all stores
export async function GET() {
  const data = await prisma.store.findMany();
  return Response.json(data);
}

// CREATE store
export async function POST(req) {
  const body = await req.json();

  const data = await prisma.store.create({
    data: body,
  });

  return Response.json(data);
}