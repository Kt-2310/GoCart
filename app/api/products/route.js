import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: {
        store: true,
      },
    });
    return Response.json(products);
  } catch (error) {
    return Response.json({ error: "Error fetching products" });
  }
}