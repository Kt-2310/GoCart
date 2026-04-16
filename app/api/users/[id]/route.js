import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function DELETE(req, { params }) {
  try {
    await prisma.user.delete({
      where: { id: Number(params.id) },
    });

    return Response.json({ message: "User deleted" });
  } catch (error) {
    return Response.json({ error: "Failed to delete user" }, { status: 500 });
  }
}