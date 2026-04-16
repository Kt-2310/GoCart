import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function DELETE(req, { params }) {
  try {
    await prisma.order.delete({
      where: { id: Number(params.id) },
    });

    return Response.json({ message: "Order deleted" });
  } catch (error) {
    return Response.json({ error: "Failed to delete order" }, { status: 500 });
  }
}