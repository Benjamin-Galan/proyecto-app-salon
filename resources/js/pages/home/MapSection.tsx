export default function MapSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-beauty-soft/30 to-beauty-light py-20" id="ubicacion">
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[10%] right-[5%] w-64 h-64 rounded-full bg-beauty-soft/60 opacity-40 blur-[100px]"></div>
        <div className="absolute bottom-[10%] left-[5%] w-64 h-64 rounded-full bg-beauty-medium/60 opacity-40 blur-[100px]"></div>
      </div>

      <div className="relative z-10 max-w-[1280px] mx-auto px-4">
        {/* Título y descripción */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-[#52525b] md:text-5xl">Nuestra Ubicación</h2>
          <p className="text-[#4b5563] font-bold max-w-2xl mx-auto">
            Visítanos en nuestra ubicación central, fácil de encontrar y con amplio estacionamiento.
          </p>
        </div>

        {/* Mapa con iframe responsivo */}
        <div className="aspect-video rounded-2xl overflow-hidden shadow-lg border border-gray-200">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3900.6169504110308!2d-86.22957!3d12.1383402!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f73fdcef3d07047%3A0xd2aa398a04d21d90!2sU%C3%B1as%20%26%20Mechas%20Salon%20Spa!5e0!3m2!1ses!2sni!4v1749285833134!5m2!1ses!2sni"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full border-0"
          />
        </div>
      </div>
    </section>
  )
}
