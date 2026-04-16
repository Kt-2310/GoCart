import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// GET all products
export async function GET() {
  const data = await prisma.product.findMany();
  return Response.json(data);
}

// CREATE product
export async function POST(req) {
  try {
    const body = await req.json();

    const data = await prisma.product.create({
      data: body,
    });

    return Response.json(data);
  } catch (error) {
    console.error("CREATE ERROR:", error); // 👈 ADD THIS
    return Response.json({ error: error.message }, { status: 500 });
  }
}