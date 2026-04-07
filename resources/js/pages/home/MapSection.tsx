export default function MapSection() {
  return (
    <section className="map-section" id="ubicacion">
      {/* Elementos decorativos de fondo */}
      <div className="map-background">
        <div className="circle-1"></div>
        <div className="circle-2"></div>
      </div>

      <div className="map-container">
        {/* Título y descripción */}
        <div className="map-header">
          <h2 className="title">Nuestra Ubicación</h2>
          <p className="subtitle">
            Visítanos en nuestra ubicación central, fácil de encontrar y con amplio estacionamiento.
          </p>
        </div>

        {/* Mapa con iframe responsivo */}
        <div className="map-wrapper">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3900.6169504110308!2d-86.22957!3d12.1383402!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f73fdcef3d07047%3A0xd2aa398a04d21d90!2sU%C3%B1as%20%26%20Mechas%20Salon%20Spa!5e0!3m2!1ses!2sni!4v1749285833134!5m2!1ses!2sni"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  )
}
