import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Geçerli bir e-posta girin."),
  password: z.string().min(8, "Şifre en az 8 karakter olmalı.")
});

export const contactSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email(),
  phone: z.string().max(40).optional(),
  subject: z.string().min(2).max(160),
  message: z.string().min(10).max(4000)
});

export const hotelInfoSchema = z.object({
  hotelName: z.string().min(2),
  slogan: z.string().min(2),
  aboutText: z.string().min(10),
  locationText: z.string().min(10),
  phone: z.string().min(5),
  whatsapp: z.string().min(5),
  email: z.string().email(),
  address: z.string().min(5),
  googleMapsUrl: z.string().optional(),
  googleMapsEmbed: z.string().optional(),
  instagramUrl: z.string().optional(),
  facebookUrl: z.string().optional(),
  heroImageUrl: z.string().optional(),
  logoUrl: z.string().optional()
});

export const roomSchema = z.object({
  name: z.string().min(2),
  description: z.string().min(10),
  capacity: z.string().min(1),
  bedType: z.string().min(1),
  amenities: z.string().min(1),
  viewType: z.string().min(1),
  notes: z.string().optional(),
  imageUrl: z.string().optional(),
  imageAlt: z.string().optional(),
  status: z.enum(["DRAFT", "PUBLISHED"]),
  sortOrder: z.coerce.number().int().default(0)
});

export const gallerySchema = z.object({
  title: z.string().min(2),
  altText: z.string().min(2),
  imageUrl: z.string().min(1),
  category: z.enum(["ROOMS", "EXTERIOR", "VIEW", "BREAKFAST", "RESTAURANT", "EVENTS", "NEARBY"]),
  sortOrder: z.coerce.number().int().default(0)
});

export const serviceSchema = z.object({
  title: z.string().min(2),
  icon: z.string().min(1),
  description: z.string().min(10),
  imageUrl: z.string().optional(),
  status: z.enum(["DRAFT", "PUBLISHED"]),
  sortOrder: z.coerce.number().int().default(0)
});

export const calendarSchema = z.object({
  title: z.string().min(2),
  description: z.string().min(10),
  date: z.string().min(1),
  startTime: z.string().optional(),
  endTime: z.string().optional(),
  category: z.enum(["BREAKFAST", "EVENT", "ANNOUNCEMENT", "LOCAL_ACTIVITY"]),
  imageUrl: z.string().optional(),
  status: z.enum(["DRAFT", "PUBLISHED"])
});

export const announcementSchema = z.object({
  title: z.string().min(2),
  summary: z.string().min(10),
  content: z.string().min(20),
  date: z.string().min(1),
  imageUrl: z.string().optional(),
  status: z.enum(["DRAFT", "PUBLISHED"])
});

export const nearbySchema = z.object({
  name: z.string().min(2),
  description: z.string().min(10),
  distance: z.string().min(1),
  imageUrl: z.string().optional(),
  mapUrl: z.string().optional(),
  status: z.enum(["DRAFT", "PUBLISHED"]),
  sortOrder: z.coerce.number().int().default(0)
});
