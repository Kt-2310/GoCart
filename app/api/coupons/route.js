import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// GET all coupons
export async function GET() {
  const data = await prisma.coupon.findMany();
  return Response.json(data);
}

// CREATE coupon
export async function POST(req) {
  const body = await req.json();

  const data = await prisma.coupon.create({
    data: body,
  });

  return Response.json(data);
}