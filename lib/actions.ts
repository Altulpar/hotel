"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { loginAdmin, logoutAdmin, requireAdmin } from "@/lib/auth";
import {
  announcementSchema,
  calendarSchema,
  contactSchema,
  gallerySchema,
  hotelInfoSchema,
  nearbySchema,
  roomSchema,
  serviceSchema
} from "@/lib/validations";
import { slugify } from "@/lib/utils";

function asString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function optionalString(formData: FormData, key: string) {
  const value = asString(formData, key);
  return value.length ? value : undefined;
}

export async function adminLoginAction(_: unknown, formData: FormData) {
  const result = {
    email: asString(formData, "email"),
    password: asString(formData, "password")
  };
  const parsed = await import("@/lib/validations").then(({ loginSchema }) =>
    loginSchema.safeParse(result)
  );
  if (!parsed.success) return { error: "E-posta veya şifre formatı geçersiz." };
  const ok = await loginAdmin(parsed.data.email, parsed.data.password);
  if (!ok) return { error: "E-posta veya şifre hatalı." };
  redirect("/admin");
}

export async function adminLogoutAction() {
  await logoutAdmin();
  redirect("/admin/login");
}

export async function contactAction(_: unknown, formData: FormData) {
  const parsed = contactSchema.safeParse({
    name: asString(formData, "name"),
    email: asString(formData, "email"),
    phone: optionalString(formData, "phone"),
    subject: asString(formData, "subject"),
    message: asString(formData, "message")
  });
  if (!parsed.success) return { error: "Lütfen form alanlarını kontrol edin." };
  await prisma.contactMessage.create({ data: parsed.data });
  revalidatePath("/admin/messages");
  return { success: "Mesajınız ulaştı. En kısa sürede dönüş yapacağız." };
}

export async function updateHotelInfoAction(formData: FormData) {
  await requireAdmin();
  const parsed = hotelInfoSchema.parse({
    hotelName: asString(formData, "hotelName"),
    slogan: asString(formData, "slogan"),
    aboutText: asString(formData, "aboutText"),
    locationText: asString(formData, "locationText"),
    phone: asString(formData, "phone"),
    whatsapp: asString(formData, "whatsapp"),
    email: asString(formData, "email"),
    address: asString(formData, "address"),
    googleMapsUrl: optionalString(formData, "googleMapsUrl"),
    googleMapsEmbed: optionalString(formData, "googleMapsEmbed"),
    instagramUrl: optionalString(formData, "instagramUrl"),
    facebookUrl: optionalString(formData, "facebookUrl"),
    heroImageUrl: optionalString(formData, "heroImageUrl"),
    logoUrl: optionalString(formData, "logoUrl")
  });
  const existing = await prisma.hotelInfo.findFirst();
  if (existing) {
    await prisma.hotelInfo.update({ where: { id: existing.id }, data: parsed });
  } else {
    await prisma.hotelInfo.create({ data: parsed });
  }
  revalidatePath("/", "layout");
}

export async function saveRoomAction(formData: FormData) {
  await requireAdmin();
  const id = optionalString(formData, "id");
  const parsed = roomSchema.parse({
    name: asString(formData, "name"),
    description: asString(formData, "description"),
    capacity: asString(formData, "capacity"),
    bedType: asString(formData, "bedType"),
    amenities: asString(formData, "amenities"),
    viewType: asString(formData, "viewType"),
    notes: optionalString(formData, "notes"),
    imageUrl: optionalString(formData, "imageUrl"),
    imageAlt: optionalString(formData, "imageAlt"),
    status: asString(formData, "status") || "PUBLISHED",
    sortOrder: asString(formData, "sortOrder") || "0"
  });
  const data = {
    name: parsed.name,
    slug: slugify(parsed.name),
    description: parsed.description,
    capacity: parsed.capacity,
    bedType: parsed.bedType,
    amenities: parsed.amenities,
    viewType: parsed.viewType,
    notes: parsed.notes,
    status: parsed.status,
    sortOrder: parsed.sortOrder
  };
  const room = id
    ? await prisma.room.update({ where: { id }, data })
    : await prisma.room.create({ data });
  if (parsed.imageUrl) {
    await prisma.roomImage.create({
      data: {
        roomId: room.id,
        imageUrl: parsed.imageUrl,
        altText: parsed.imageAlt || parsed.name,
        sortOrder: 99
      }
    });
  }
  revalidatePath("/odalar");
  revalidatePath("/admin/rooms");
}

export async function deleteRoomAction(formData: FormData) {
  await requireAdmin();
  await prisma.room.delete({ where: { id: asString(formData, "id") } });
  revalidatePath("/odalar");
  revalidatePath("/admin/rooms");
}

export async function deleteRoomImageAction(formData: FormData) {
  await requireAdmin();
  await prisma.roomImage.delete({ where: { id: asString(formData, "id") } });
  revalidatePath("/odalar");
  revalidatePath("/admin/rooms");
}

export async function saveGalleryAction(formData: FormData) {
  await requireAdmin();
  const id = optionalString(formData, "id");
  const parsed = gallerySchema.parse({
    title: asString(formData, "title"),
    altText: asString(formData, "altText"),
    imageUrl: asString(formData, "imageUrl"),
    category: asString(formData, "category"),
    sortOrder: asString(formData, "sortOrder") || "0"
  });
  if (id) await prisma.galleryImage.update({ where: { id }, data: parsed });
  else await prisma.galleryImage.create({ data: parsed });
  revalidatePath("/galeri");
  revalidatePath("/admin/gallery");
}

export async function deleteGalleryAction(formData: FormData) {
  await requireAdmin();
  await prisma.galleryImage.delete({ where: { id: asString(formData, "id") } });
  revalidatePath("/galeri");
  revalidatePath("/admin/gallery");
}

export async function saveServiceAction(formData: FormData) {
  await requireAdmin();
  const id = optionalString(formData, "id");
  const parsed = serviceSchema.parse({
    title: asString(formData, "title"),
    icon: asString(formData, "icon"),
    description: asString(formData, "description"),
    imageUrl: optionalString(formData, "imageUrl"),
    status: asString(formData, "status") || "PUBLISHED",
    sortOrder: asString(formData, "sortOrder") || "0"
  });
  const data = { ...parsed, slug: slugify(parsed.title) };
  if (id) await prisma.service.update({ where: { id }, data });
  else await prisma.service.create({ data });
  revalidatePath("/hizmetler");
  revalidatePath("/admin/services");
}

export async function deleteServiceAction(formData: FormData) {
  await requireAdmin();
  await prisma.service.delete({ where: { id: asString(formData, "id") } });
  revalidatePath("/hizmetler");
  revalidatePath("/admin/services");
}

export async function saveCalendarAction(formData: FormData) {
  await requireAdmin();
  const id = optionalString(formData, "id");
  const parsed = calendarSchema.parse({
    title: asString(formData, "title"),
    description: asString(formData, "description"),
    date: asString(formData, "date"),
    startTime: optionalString(formData, "startTime"),
    endTime: optionalString(formData, "endTime"),
    category: asString(formData, "category"),
    imageUrl: optionalString(formData, "imageUrl"),
    status: asString(formData, "status") || "PUBLISHED"
  });
  const data = { ...parsed, date: new Date(parsed.date) };
  if (id) await prisma.calendarItem.update({ where: { id }, data });
  else await prisma.calendarItem.create({ data });
  revalidatePath("/etkinlik-takvimi");
  revalidatePath("/admin/calendar");
}

export async function deleteCalendarAction(formData: FormData) {
  await requireAdmin();
  await prisma.calendarItem.delete({ where: { id: asString(formData, "id") } });
  revalidatePath("/etkinlik-takvimi");
  revalidatePath("/admin/calendar");
}

export async function saveAnnouncementAction(formData: FormData) {
  await requireAdmin();
  const id = optionalString(formData, "id");
  const parsed = announcementSchema.parse({
    title: asString(formData, "title"),
    summary: asString(formData, "summary"),
    content: asString(formData, "content"),
    date: asString(formData, "date"),
    imageUrl: optionalString(formData, "imageUrl"),
    status: asString(formData, "status") || "PUBLISHED"
  });
  const data = { ...parsed, slug: slugify(parsed.title), date: new Date(parsed.date) };
  if (id) await prisma.announcement.update({ where: { id }, data });
  else await prisma.announcement.create({ data });
  revalidatePath("/duyurular");
  revalidatePath("/admin/announcements");
}

export async function deleteAnnouncementAction(formData: FormData) {
  await requireAdmin();
  await prisma.announcement.delete({ where: { id: asString(formData, "id") } });
  revalidatePath("/duyurular");
  revalidatePath("/admin/announcements");
}

export async function saveNearbyAction(formData: FormData) {
  await requireAdmin();
  const id = optionalString(formData, "id");
  const parsed = nearbySchema.parse({
    name: asString(formData, "name"),
    description: asString(formData, "description"),
    distance: asString(formData, "distance"),
    imageUrl: optionalString(formData, "imageUrl"),
    mapUrl: optionalString(formData, "mapUrl"),
    status: asString(formData, "status") || "PUBLISHED",
    sortOrder: asString(formData, "sortOrder") || "0"
  });
  const data = { ...parsed, slug: slugify(parsed.name) };
  if (id) await prisma.nearbyPlace.update({ where: { id }, data });
  else await prisma.nearbyPlace.create({ data });
  revalidatePath("/gor-yap");
  revalidatePath("/admin/nearby");
}

export async function deleteNearbyAction(formData: FormData) {
  await requireAdmin();
  await prisma.nearbyPlace.delete({ where: { id: asString(formData, "id") } });
  revalidatePath("/gor-yap");
  revalidatePath("/admin/nearby");
}

export async function toggleMessageReadAction(formData: FormData) {
  await requireAdmin();
  const id = asString(formData, "id");
  const isRead = asString(formData, "isRead") === "true";
  await prisma.contactMessage.update({ where: { id }, data: { isRead: !isRead } });
  revalidatePath("/admin/messages");
}

export async function deleteMessageAction(formData: FormData) {
  await requireAdmin();
  await prisma.contactMessage.delete({ where: { id: asString(formData, "id") } });
  revalidatePath("/admin/messages");
}
