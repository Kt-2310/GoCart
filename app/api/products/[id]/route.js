import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// ✅ ADD THIS (GET by ID)
export async function GET(req, { params }) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: params.id },
    });

    if (!product) {
      return Response.json({ error: "Product not found" }, { status: 404 });
    }

    return Response.json(product);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Failed to fetch product" }, { status: 500 });
  }
}

// (you already have this)
export async function DELETE(req, { params }) {
  try {
    await prisma.product.delete({
  where: { id: params.id },
});

    return Response.json({ message: "Product deleted" });
  } catch (error) {
    console.error(error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}

// ✅ UPDATE product
export async function PUT(req, { params }) {
  try {
    const body = await req.json();

    const updatedProduct = await prisma.product.update({
      where: { id: params.id },
      data: body,
    });

    return Response.json(updatedProduct);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Update failed" }, { status: 500 });
  }
}