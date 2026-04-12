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
  <div className="mb-4">
    <label className="block text-gray-700 mb-2">{label}</label>
    {type === "textarea" ? (
      <textarea
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        rows={5}
        required={required}
        className="w-full p-3 rounded-lg border border-gray-300 transition-all duration-300 outline-none focus:border-beauty-medium focus:ring-2 focus:ring-beauty-medium/30"
      />
    ) : (
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full p-3 rounded-lg border border-gray-300 transition-all duration-300 outline-none focus:border-beauty-medium focus:ring-2 focus:ring-beauty-medium/30"
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
  <div className="flex items-start gap-4 mb-6">
    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-beauty-light shrink-0 mt-1 text-beauty-deep">
      {icon}
    </div>
    <div>
      <h4 className="font-medium text-gray-800 mb-1">{title}</h4>
      <div className="text-gray-600 [&>p]:m-0">{content}</div>
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
    <section className="py-20 bg-gradient-to-b from-beauty-light to-white" id="contacto">
      <div className="max-w-[1280px] mx-auto px-4">
        {/* Título y descripción */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-beauty-deep mb-4 md:text-5xl">Contáctanos</h2>
          <p className="text-gray-600 font-bold max-w-2xl mx-auto">
            Estamos aquí para responder tus preguntas y ayudarte a programar tu cita.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Columna izquierda: Información de contacto */}
          <div className="bg-white rounded-2xl p-8 shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] border border-gray-100">
            <h3 className="text-xl font-bold text-beauty-deep mb-6">Información de Contacto</h3>
            <p className="text-gray-600 mb-8">Encuentra todas las formas de comunicarte con nosotros</p>

            <div>
              <ContactInfoItem
                icon={<MapPin className="w-5 h-5"/>}
                title="Dirección"
                content={<p>{contactUs.address}</p>}
              />

              <ContactInfoItem icon={<Phone className="w-5 h-5"/>} title="Teléfono" content={<p>{contactUs.phone}</p>} />

              <ContactInfoItem
                icon={<MessageSquare className="w-5 h-5"/>}
                title="WhatsApp"
                content={<p>{contactUs.whatsapp}</p>}
              />

              <ContactInfoItem
                icon={<Clock className="w-5 h-5"/>}
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
              className="mt-4 inline-flex items-center justify-center py-3 px-6 bg-white border border-beauty-medium text-beauty-medium rounded-full cursor-pointer transition-all duration-300 hover:bg-beauty-medium/10"
              onClick={() => window.open(`https://wa.me/${contactUs.whatsapp.replace(/\D/g, "")}`, "_blank")}
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              Enviar mensaje
            </button>
          </div>

          {/* Columna derecha: Formulario de contacto */}
          <div className="bg-white rounded-2xl p-8 shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] border border-gray-100">
            <h3 className="text-xl font-bold text-beauty-deep mb-6">Envíanos un Mensaje</h3>
            <p className="text-gray-600 mb-8">Completa el formulario y te responderemos a la brevedad</p>

            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 sm:grid-cols-2">
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
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
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
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
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
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}

              <InputField
                label="Mensaje"
                type="textarea"
                placeholder="¿En qué podemos ayudarte?"
                value={data.message}
                onChange={handleChange}
                name="message"
                required
              />
              {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}

              <button
                type="submit"
                disabled={processing}
                className="w-full mt-4 py-3 bg-beauty-deep text-white rounded-lg border-none font-semibold cursor-pointer flex items-center justify-center gap-2 transition-colors duration-300 hover:bg-beauty-dark disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {processing && <Loader2 className="w-4 h-4 animate-spin" />}
                {processing ? "Enviando..." : "Enviar mensaje"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
