# Ada Ruhu Otel Website

Modern Turkish hotel promotional website built with Next.js, TypeScript, Tailwind CSS, Prisma, and PostgreSQL.

This project intentionally does **not** include room reservations, booking, availability search, payments, checkout, or price-based flows. It is for promotion, content management, hotel information, rooms, gallery, services, announcements, calendar items, nearby places, and contact messages.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create your environment file:

```bash
cp .env.example .env
```

3. Edit `.env` and set:

```env
DATABASE_URL_DATABASE_URL="postgresql://USER:PASSWORD@HOST/DATABASE?sslmode=require"
ADMIN_EMAIL="admin@example.com"
ADMIN_PASSWORD="change-me-now"
AUTH_SECRET="use-a-long-random-secret"
```

For Vercel + Neon, use the database URL that Neon injects into the Vercel project.

4. Create the database tables and seed Turkish sample content:

```bash
npm run prisma:init
npm run prisma:seed
```

5. Start the development server:

```bash
npm run dev
```

Open `http://localhost:3000`.

## Admin

Admin panel: `http://localhost:3000/admin`

Use the `ADMIN_EMAIL` and `ADMIN_PASSWORD` from `.env` for the seeded admin account.

The admin can update:

- Hotel name, slogan, about/location text, contact info, social links, map embed, hero image
- Rooms and room images
- Gallery images and categories
- Services/facilities
- Breakfast/event/activity calendar items
- Announcements
- Nearby places
- Contact messages, including read/unread state

## Architecture

- `app`: Next.js App Router pages, admin routes, API upload route
- `components/public`: public website navigation, footer, hero, contact form
- `components/admin`: dashboard shell, login form, image upload field
- `components/ui`: small shared form/button components
- `lib/db.ts`: Prisma client singleton
- `lib/auth.ts`: signed HTTP-only cookie admin auth
- `lib/actions.ts`: server actions for contact and admin CRUD
- `lib/upload.ts`: local upload implementation for `/public/uploads`
- `lib/validations.ts`: Zod validation schemas
- `prisma/schema.prisma`: database models
- `prisma/seed.ts`: Turkish sample data and seeded admin user

## Future English Support

The current content is Turkish by default. The schema separates content from presentation, so future language support can be added by introducing locale fields, translation tables, or a CMS-style localized content layer without changing the core page structure.
