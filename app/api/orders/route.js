import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// GET all orders
export async function GET() {
  const data = await prisma.order.findMany();
  return Response.json(data);
}

// CREATE order
export async function POST(req) {
  const body = await req.json();

  const data = await prisma.order.create({
    data: body,
  });

  return Response.json(data);
}