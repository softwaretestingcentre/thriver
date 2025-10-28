import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { dataEntries: true },
  });
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
  // Example: Aggregate data entries by type for charting
  const chartData: Record<string, number> = {};
  user.dataEntries.forEach(entry => {
    chartData[entry.type] = (chartData[entry.type] || 0) + 1;
  });
  return NextResponse.json({ chartData });
}
