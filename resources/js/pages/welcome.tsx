import { Head, usePage } from "@inertiajs/react";
import MainLayout from "@/layouts/MainLayout";
import Hero from "./home/Hero";
import WhatsAppChat from "@/components/WhatsappChat";
import PackageList from "./home/Packages";
import Services from "./home/Services";
import Promotions from "./home/Promotions";
import About from "./home/About";
import MapSection from "./home/MapSection";
import Contact from "./home/Contact";

import { Package, Promotion, Service } from "@/types";

export default function Welcome() {
    const { services, packages, promotions } = usePage().props as {
        services?: Service[]
        packages?: Package[]
        promotions?: Promotion[]
    }

    console.log(services, 'servicios')
    console.log(packages, 'paquetes')
    console.log(promotions, 'promociones')

    if (!promotions) return null;
    if (!services) return null;
    if (!packages) return null;

    return (
        <>
            <Head title="Uñas & Mechas | Salón de Belleza en Managua">
                <meta
                    name="description"
                    content="Salón de belleza en Managua especializado en uñas acrílicas, mechas, cortes, maquillaje y spa. Reserva tu cita online en Uñas & Mechas."
                />
                <meta
                    name="keywords"
                    content="salón de belleza Managua, uñas acrílicas Managua, mechas, cortes, spa, maquillaje, uñas y mechas"
                />
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href="http://72.61.5.146/" />

                {/* Open Graph */}
                <meta property="og:locale" content="es_NI" />
                <meta property="og:title" content="Uñas & Mechas | Salón de Belleza en Managua" />
                <meta
                    property="og:description"
                    content="Descubre nuestros servicios de uñas, peinados y spa en el mejor salón de Managua."
                />
                <meta property="og:image" content="http://72.61.5.146/preview.jpg" />
                <meta property="og:url" content="http://72.61.5.146/" />
                <meta property="og:type" content="website" />

                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Uñas & Mechas | Salón de Belleza en Managua" />
                <meta
                    name="twitter:description"
                    content="Agenda tu cita en línea para uñas, peinados y spa."
                />
                <meta name="twitter:image" content="http://72.61.5.146/preview.jpg" />

                {/* Fonts */}
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />

                {/* JSON-LD Schema.org */}
                <script type="application/ld+json">{`
  {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    "name": "Uñas & Mechas",
    "image": "http://72.61.5.146/preview.jpg",
    "@id": "http://72.61.5.146/",
    "url": "http://72.61.5.146/",
    "telephone": "+50512345678",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Carretera Masaya km 5",
      "addressLocality": "Managua",
      "addressCountry": "NI"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 12.136389,
      "longitude": -86.251389
    },
    "openingHours": "Mo-Sa 08:00-18:00",
    "priceRange": "$$"
  }
  `}</script>
            </Head>

            <MainLayout>
                <main className="bg-amber-50">
                    <section id="inicio">
                        <Hero />
                    </section>

                    <section id="servicios">
                        <Services services={services} />
                    </section>

                    <section id="promociones">
                        <Promotions promotions={promotions} />
                    </section>

                    <section id="paquetes">
                        <PackageList packages={packages} />
                    </section>

                    <section id="nosotros">
                        <About />
                    </section>

                    <section id="ubicacion">
                        <MapSection />
                    </section>

                    <section id="contacto">
                        <Contact />
                    </section>
                </main>


                <WhatsAppChat phoneNumber="+505 7820 6792" />
            </MainLayout>
        </>
    )
}