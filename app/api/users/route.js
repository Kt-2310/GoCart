import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// GET all users
export async function GET() {
  const data = await prisma.user.findMany();
  return Response.json(data);
}

// CREATE user
export async function POST(req) {
  const body = await req.json();

  const data = await prisma.user.create({
    data: body,
  });

  return Response.json(data);
}