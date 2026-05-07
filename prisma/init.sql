CREATE TABLE IF NOT EXISTS "AdminUser" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "name" TEXT NOT NULL,
  "email" TEXT NOT NULL UNIQUE,
  "passwordHash" TEXT NOT NULL,
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" DATETIME NOT NULL
);

CREATE TABLE IF NOT EXISTS "HotelInfo" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "hotelName" TEXT NOT NULL DEFAULT 'Ada Ruhu Otel',
  "slogan" TEXT NOT NULL DEFAULT 'Denize, doğaya ve sakinliğe açılan butik konaklama.',
  "aboutText" TEXT NOT NULL,
  "locationText" TEXT NOT NULL,
  "phone" TEXT NOT NULL,
  "whatsapp" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "address" TEXT NOT NULL,
  "googleMapsUrl" TEXT,
  "googleMapsEmbed" TEXT,
  "instagramUrl" TEXT,
  "facebookUrl" TEXT,
  "heroImageUrl" TEXT,
  "logoUrl" TEXT,
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" DATETIME NOT NULL
);

CREATE TABLE IF NOT EXISTS "Room" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "name" TEXT NOT NULL,
  "slug" TEXT NOT NULL UNIQUE,
  "description" TEXT NOT NULL,
  "capacity" TEXT NOT NULL,
  "bedType" TEXT NOT NULL,
  "amenities" TEXT NOT NULL,
  "viewType" TEXT NOT NULL,
  "notes" TEXT,
  "status" TEXT NOT NULL DEFAULT 'PUBLISHED',
  "sortOrder" INTEGER NOT NULL DEFAULT 0,
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" DATETIME NOT NULL
);

CREATE TABLE IF NOT EXISTS "RoomImage" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "roomId" TEXT NOT NULL,
  "imageUrl" TEXT NOT NULL,
  "altText" TEXT NOT NULL,
  "sortOrder" INTEGER NOT NULL DEFAULT 0,
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" DATETIME NOT NULL,
  CONSTRAINT "RoomImage_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS "GalleryImage" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "title" TEXT NOT NULL,
  "altText" TEXT NOT NULL,
  "imageUrl" TEXT NOT NULL,
  "category" TEXT NOT NULL,
  "sortOrder" INTEGER NOT NULL DEFAULT 0,
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" DATETIME NOT NULL
);

CREATE TABLE IF NOT EXISTS "Service" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "title" TEXT NOT NULL,
  "slug" TEXT NOT NULL UNIQUE,
  "icon" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "imageUrl" TEXT,
  "status" TEXT NOT NULL DEFAULT 'PUBLISHED',
  "sortOrder" INTEGER NOT NULL DEFAULT 0,
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" DATETIME NOT NULL
);

CREATE TABLE IF NOT EXISTS "CalendarItem" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "title" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "date" DATETIME NOT NULL,
  "startTime" TEXT,
  "endTime" TEXT,
  "category" TEXT NOT NULL,
  "imageUrl" TEXT,
  "status" TEXT NOT NULL DEFAULT 'PUBLISHED',
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" DATETIME NOT NULL
);

CREATE TABLE IF NOT EXISTS "Announcement" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "title" TEXT NOT NULL,
  "slug" TEXT NOT NULL UNIQUE,
  "summary" TEXT NOT NULL,
  "content" TEXT NOT NULL,
  "date" DATETIME NOT NULL,
  "imageUrl" TEXT,
  "status" TEXT NOT NULL DEFAULT 'PUBLISHED',
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" DATETIME NOT NULL
);

CREATE TABLE IF NOT EXISTS "NearbyPlace" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "name" TEXT NOT NULL,
  "slug" TEXT NOT NULL UNIQUE,
  "description" TEXT NOT NULL,
  "distance" TEXT NOT NULL,
  "imageUrl" TEXT,
  "mapUrl" TEXT,
  "status" TEXT NOT NULL DEFAULT 'PUBLISHED',
  "sortOrder" INTEGER NOT NULL DEFAULT 0,
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" DATETIME NOT NULL
);

CREATE TABLE IF NOT EXISTS "ContactMessage" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "name" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "phone" TEXT,
  "subject" TEXT NOT NULL,
  "message" TEXT NOT NULL,
  "isRead" BOOLEAN NOT NULL DEFAULT false,
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" DATETIME NOT NULL
);
