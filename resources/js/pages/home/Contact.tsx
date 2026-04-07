import type React from "react"
import { useForm } from "@inertiajs/react"
import { toast } from "sonner"
import { MapPin, Phone, MessageSquare, Clock, Loader2 } from "lucide-react"
import { contactUs } from "@/utils/data"
import { FormEvent } from "react"

// Componente personalizado para los campos de entrada
type InputFieldProps = {
  label: string
  type: string
  placeholder: string
  value: string
  name: string
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  required?: boolean
}

const InputField = ({ label, type, placeholder, value, name, onChange, required = false }: InputFieldProps) => (
  <div className="input-group">
    <label>{label}</label>
    {type === "textarea" ? (
      <textarea
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        rows={5}
        required={required}
      />
    ) : (
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
      />
    )}
  </div>
)

// Componente personalizado para los elementos de información de contacto
type ContactInfoItemProps = {
  icon: React.ReactNode
  title: string
  content: React.ReactNode
}

const ContactInfoItem = ({ icon, title, content }: ContactInfoItemProps) => (
  <div className="info-item">
    <div className="icon-container">
      <div className="icon">{icon}</div>
    </div>
    <div className="info-content">
      <h4 className="info-label">{title}</h4>
      <div className="info-detail">{content}</div>
    </div>
  </div>
)

export default function Contact() {
  const { data, setData, post, processing, reset, errors } = useForm({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setData(name as any, value)
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    
    // @ts-ignore
    post(route('contact.send'), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success("Mensaje enviado correctamente. Nos comunicaremos contigo pronto.")
        reset()
      },
      onError: () => {
        toast.error("Hubo un error al enviar el mensaje. Revisa los campos.")
      }
    })
  }

  return (
    <section className="contact-section" id="contacto">
      <div className="contact-container">
        {/* Título y descripción */}
        <div className="contact-header">
          <h2 className="title">Contáctanos</h2>
          <p className="subtitle">
            Estamos aquí para responder tus preguntas y ayudarte a programar tu cita.
          </p>
        </div>

        <div className="contact-grid">
          {/* Columna izquierda: Información de contacto */}
          <div className="contact-card">
            <h3 className="card-title">Información de Contacto</h3>
            <p className="card-description">Encuentra todas las formas de comunicarte con nosotros</p>

            <div className="contact-info-list">
              <ContactInfoItem
                icon={<MapPin />}
                title="Dirección"
                content={<p>{contactUs.address}</p>}
              />

              <ContactInfoItem icon={<Phone />} title="Teléfono" content={<p>{contactUs.phone}</p>} />

              <ContactInfoItem
                icon={<MessageSquare />}
                title="WhatsApp"
                content={<p>{contactUs.whatsapp}</p>}
              />

              <ContactInfoItem
                icon={<Clock />}
                title="Horario"
                content={
                  <div>
                    <p>{contactUs.schedule.normal}</p>
                    <p>{contactUs.schedule.sunday}</p>
                  </div>
                }
              />
            </div>

            <button
              className="whatsapp-action-btn"
              onClick={() => window.open(`https://wa.me/${contactUs.whatsapp.replace(/\D/g, "")}`, "_blank")}
            >
              <MessageSquare className="icon" />
              Enviar mensaje
            </button>
          </div>

          {/* Columna derecha: Formulario de contacto */}
          <div className="contact-card">
            <h3 className="card-title">Envíanos un Mensaje</h3>
            <p className="card-description">Completa el formulario y te responderemos a la brevedad</p>

            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-row">
                <div>
                  <InputField
                    label="Nombre"
                    type="text"
                    placeholder="Tu nombre"
                    value={data.name}
                    onChange={handleChange}
                    name="name"
                    required
                  />
                  {errors.name && <p className="error-msg">{errors.name}</p>}
                </div>
                
                <div>
                  <InputField
                    label="Email"
                    type="email"
                    placeholder="tu@email.com"
                    value={data.email}
                    onChange={handleChange}
                    name="email"
                    required
                  />
                  {errors.email && <p className="error-msg">{errors.email}</p>}
                </div>
              </div>

              <InputField
                label="Teléfono"
                type="tel"
                placeholder="+123 456 7890"
                value={data.phone}
                onChange={handleChange}
                name="phone"
              />
              {errors.phone && <p className="error-msg">{errors.phone}</p>}

              <InputField
                label="Mensaje"
                type="textarea"
                placeholder="¿En qué podemos ayudarte?"
                value={data.message}
                onChange={handleChange}
                name="message"
                required
              />
              {errors.message && <p className="error-msg">{errors.message}</p>}

              <button
                type="submit"
                disabled={processing}
                className="submit-btn"
              >
                {processing && <Loader2 className="spinner" />}
                {processing ? "Enviando..." : "Enviar mensaje"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
