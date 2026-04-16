import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// GET all order items
export async function GET() {
  const data = await prisma.orderItem.findMany();
  return Response.json(data);
}

// CREATE order item
export async function POST(req) {
  const body = await req.json();

  const data = await prisma.orderItem.create({
    data: body,
  });

  return Response.json(data);
}