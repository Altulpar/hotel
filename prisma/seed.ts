import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL || "admin@example.com";
  const password = process.env.ADMIN_PASSWORD || "change-me-now";

  await prisma.adminUser.upsert({
    where: { email },
    update: {},
    create: {
      email,
      name: "Otel Yöneticisi",
      passwordHash: await bcrypt.hash(password, 12)
    }
  });

  const hotel = await prisma.hotelInfo.findFirst();
  if (!hotel) {
    await prisma.hotelInfo.create({
      data: {
        hotelName: "Ada Ruhu Otel",
        slogan: "Denize, doğaya ve sakin ada hayatına açılan butik otel.",
        aboutText:
          "Ada Ruhu Otel; sade tasarımı, ferah odaları ve yerel dokuyu hissettiren atmosferiyle misafirlerine huzurlu bir kaçış sunar. Sabahları taze kahvaltı kokusu, gün içinde deniz esintisi ve akşamları sakin teras sohbetleri buradaki ritmin parçasıdır.",
        locationText:
          "Otelimiz, sahile ve ada merkezindeki keşif noktalarına kolay ulaşılabilen sakin bir konumdadır. Deniz, doğa yürüyüşleri ve yerel lezzetler için iyi bir başlangıç noktasıdır.",
        phone: "+90 555 000 00 00",
        whatsapp: "+905550000000",
        email: "info@adaru.hu",
        address: "Gökçeada, Çanakkale, Türkiye",
        googleMapsUrl: "https://maps.google.com",
        googleMapsEmbed: "",
        instagramUrl: "https://instagram.com",
        heroImageUrl:
          "https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=2200&q=80"
      }
    });
  }

  for (const room of [
      {
        name: "Deniz Manzaralı Oda",
        slug: "deniz-manzarali-oda",
        description:
          "Geniş pencereleri, doğal tonları ve sakin manzarasıyla iki kişilik konforlu oda.",
        capacity: "2 yetişkin",
        bedType: "1 çift kişilik yatak",
        amenities: "Klima, Wi-Fi, mini buzdolabı, çalışma masası, banyo ürünleri",
        viewType: "Deniz manzarası",
        sortOrder: 1
      },
      {
        name: "Bahçe Katı Oda",
        slug: "bahce-kati-oda",
        description:
          "Bahçeye yakın, serin ve sade bir atmosfer isteyen misafirler için ferah oda.",
        capacity: "2 yetişkin + 1 çocuk",
        bedType: "1 çift kişilik yatak + açılır koltuk",
        amenities: "Klima, Wi-Fi, kahve köşesi, gardırop, banyo ürünleri",
        viewType: "Bahçe manzarası",
        sortOrder: 2
      }
    ]) {
    await prisma.room.upsert({
      where: { slug: room.slug },
      update: {},
      create: room
    });
  }

  const rooms = await prisma.room.findMany();
  for (const room of rooms) {
    const count = await prisma.roomImage.count({ where: { roomId: room.id } });
    if (!count) {
      await prisma.roomImage.create({
        data: {
          roomId: room.id,
          imageUrl:
            room.slug === "deniz-manzarali-oda"
              ? "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1600&q=80"
              : "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1600&q=80",
          altText: room.name,
          sortOrder: 1
        }
      });
    }
  }

  for (const service of [
      {
        title: "Ada Kahvaltısı",
        slug: "ada-kahvaltisi",
        icon: "Coffee",
        description: "Yerel ürünlerle hazırlanan, mevsime göre değişen zengin kahvaltı.",
        sortOrder: 1
      },
      {
        title: "Ücretsiz Wi-Fi",
        slug: "ucretsiz-wifi",
        icon: "Wifi",
        description: "Otel genelinde hızlı ve ücretsiz internet erişimi.",
        sortOrder: 2
      },
      {
        title: "Günlük Kat Hizmeti",
        slug: "gunluk-kat-hizmeti",
        icon: "Sparkles",
        description: "Odalarınızın konforu için düzenli temizlik ve bakım.",
        sortOrder: 3
      }
    ]) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: {},
      create: service
    });
  }

  await prisma.galleryImage.createMany({
    data: [
      {
        title: "Gün Batımı Manzarası",
        altText: "Otel çevresinden gün batımı manzarası",
        imageUrl:
          "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80",
        category: "VIEW",
        sortOrder: 1
      },
      {
        title: "Kahvaltı Masası",
        altText: "Yerel ürünlerle kahvaltı masası",
        imageUrl:
          "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=1600&q=80",
        category: "BREAKFAST",
        sortOrder: 2
      }
    ]
  });

  await prisma.calendarItem.createMany({
    data: [
      {
        title: "Hafta Sonu Ada Kahvaltısı",
        description: "Taze otlar, reçeller ve fırından sıcak lezzetlerle açık büfe kahvaltı.",
        date: new Date("2026-06-06T09:00:00.000Z"),
        startTime: "09:00",
        endTime: "11:30",
        category: "BREAKFAST"
      },
      {
        title: "Yerel Pazar Rotası",
        description: "Misafirler için ada pazarı ve yerel üretici önerileri.",
        date: new Date("2026-06-10T10:00:00.000Z"),
        startTime: "10:00",
        endTime: "13:00",
        category: "LOCAL_ACTIVITY"
      }
    ]
  });

  for (const announcement of [
      {
        title: "Yaz Sezonu Duyurusu",
        slug: "yaz-sezonu-duyurusu",
        summary: "Yaz boyunca kahvaltı saatlerimiz ve teras kullanım notları güncellendi.",
        content:
          "Yaz sezonunda kahvaltı servisimiz 08:30-11:00 saatleri arasında yapılacaktır. Teras alanımız gün boyunca misafirlerimizin kullanımına açıktır.",
        date: new Date("2026-05-20T09:00:00.000Z")
      }
    ]) {
    await prisma.announcement.upsert({
      where: { slug: announcement.slug },
      update: {},
      create: announcement
    });
  }

  for (const place of [
      {
        name: "Sahil Yürüyüş Rotası",
        slug: "sahil-yuruyus-rotasi",
        description: "Sabah yürüyüşleri ve gün batımı için sakin bir kıyı rotası.",
        distance: "Otele 8 dakika",
        mapUrl: "https://maps.google.com",
        imageUrl:
          "https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=1600&q=80",
        sortOrder: 1
      },
      {
        name: "Ada Köyleri",
        slug: "ada-koyleri",
        description: "Taş sokaklar, yerel kahveler ve ada kültürünü hissettiren keşif durakları.",
        distance: "Araçla 20 dakika",
        mapUrl: "https://maps.google.com",
        imageUrl:
          "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1600&q=80",
        sortOrder: 2
      }
    ]) {
    await prisma.nearbyPlace.upsert({
      where: { slug: place.slug },
      update: {},
      create: place
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
