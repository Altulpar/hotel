import "server-only";

import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createHmac, timingSafeEqual } from "crypto";
import { prisma } from "@/lib/db";

const COOKIE_NAME = "hotel_admin_session";
const ONE_WEEK = 60 * 60 * 24 * 7;

function secret() {
  return process.env.AUTH_SECRET || "development-only-change-this-secret";
}

function sign(value: string) {
  return createHmac("sha256", secret()).update(value).digest("base64url");
}

function encodeSession(adminId: string) {
  const payload = Buffer.from(
    JSON.stringify({ adminId, expiresAt: Date.now() + ONE_WEEK * 1000 })
  ).toString("base64url");
  return `${payload}.${sign(payload)}`;
}

function decodeSession(token?: string) {
  if (!token) return null;
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return null;
  const expected = sign(payload);
  const valid =
    expected.length === signature.length &&
    timingSafeEqual(Buffer.from(expected), Buffer.from(signature));
  if (!valid) return null;

  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString()) as {
      adminId: string;
      expiresAt: number;
    };
    if (data.expiresAt < Date.now()) return null;
    return data;
  } catch {
    return null;
  }
}

export async function loginAdmin(email: string, password: string) {
  const admin = await prisma.adminUser.findUnique({ where: { email } });
  if (!admin) return false;
  const matches = await bcrypt.compare(password, admin.passwordHash);
  if (!matches) return false;

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, encodeSession(admin.id), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: ONE_WEEK
  });
  return true;
}

export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export async function getAdmin() {
  const cookieStore = await cookies();
  const session = decodeSession(cookieStore.get(COOKIE_NAME)?.value);
  if (!session) return null;
  return prisma.adminUser.findUnique({
    where: { id: session.adminId },
    select: { id: true, name: true, email: true }
  });
}

export async function requireAdmin() {
  const admin = await getAdmin();
  if (!admin) redirect("/admin/login");
  return admin;
}
