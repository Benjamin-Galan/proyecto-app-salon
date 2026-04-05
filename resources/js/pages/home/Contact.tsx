"use client"

import type React from "react"

import { useState } from "react"
import { MapPin, Phone, MessageSquare, Clock } from "lucide-react"
import { contactUs } from "@/utils/data"

// Componente personalizado para los campos de entrada
type InputFieldProps = {
  label: string
  type: string
  placeholder: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  required?: boolean
}

const InputField = ({ label, type, placeholder, value, onChange, required = false }: InputFieldProps) => (
  <div className="mb-4">
    <label className="block text-gray-700 mb-2">{label}</label>
    {type === "textarea" ? (
      <textarea
        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-beauty-medium/30 focus:border-beauty-medium transition-colors"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        rows={5}
        required={required}
      />
    ) : (
      <input
        type={type}
        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-beauty-medium/30 focus:border-beauty-medium transition-colors"
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
  <div className="flex items-start gap-4 mb-6">
    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-beauty-light mt-1">
      <div className="text-beauty-deep">{icon}</div>
    </div>
    <div>
      <h4 className="font-medium text-gray-800 mb-1">{title}</h4>
      <div className="text-gray-600">{content}</div>
    </div>
  </div>
)

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica para enviar el formulario
    alert("Mensaje enviado correctamente")
    setFormData({ name: "", email: "", phone: "", message: "" })
  }

  return (
    <section className="py-20 bg-gradient-to-b from-beauty-light to-white" id="contacto">
      <div className="container mx-auto px-4">
        {/* Título y descripción */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-beauty-deep mb-4">Contáctanos</h2>
          <p className="text-gray-600 max-w-2xl mx-auto font-bold">
            Estamos aquí para responder tus preguntas y ayudarte a programar tu cita.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Columna izquierda: Información de contacto */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold text-beauty-deep mb-6">Información de Contacto</h3>
            <p className="text-gray-600 mb-8">Encuentra todas las formas de comunicarte con nosotros</p>

            <ContactInfoItem
              icon={<MapPin className="w-5 h-5" />}
              title="Dirección"
              content={<p>{contactUs.address}</p>}
            />

            <ContactInfoItem icon={<Phone className="w-5 h-5" />} title="Teléfono" content={<p>{contactUs.phone}</p>} />

            <ContactInfoItem
              icon={<MessageSquare className="w-5 h-5" />}
              title="WhatsApp"
              content={<p>{contactUs.whatsapp}</p>}
            />

            <ContactInfoItem
              icon={<Clock className="w-5 h-5" />}
              title="Horario"
              content={
                <div>
                  <p>{contactUs.schedule.normal}</p>
                  <p>{contactUs.schedule.sunday}</p>
                </div>
              }
            />

            <button
              className="mt-4 inline-flex items-center justify-center px-6 py-3 bg-white border border-beauty-medium text-beauty-medium rounded-full hover:bg-beauty-medium/10 transition-colors"
              onClick={() => window.open(`https://wa.me/${contactUs.whatsapp.replace(/\D/g, "")}`, "_blank")}
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              Enviar mensaje
            </button>
          </div>

          {/* Columna derecha: Formulario de contacto */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold text-beauty-deep mb-6">Envíanos un Mensaje</h3>
            <p className="text-gray-600 mb-8">Completa el formulario y te responderemos a la brevedad</p>

            <form onSubmit={handleSubmit}>
              <div className="grid sm:grid-cols-2 gap-4">
                <InputField
                  label="Nombre"
                  type="text"
                  placeholder="Tu nombre"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <InputField
                  label="Email"
                  type="email"
                  placeholder="tu@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <InputField
                label="Teléfono"
                type="tel"
                placeholder="+123 456 7890"
                value={formData.phone}
                onChange={handleChange}
              />

              <InputField
                label="Mensaje"
                type="textarea"
                placeholder="¿En qué podemos ayudarte?"
                value={formData.message}
                onChange={handleChange}
                required
              />

              <button
                type="submit"
                className="w-full mt-4 py-3 bg-beauty-deep text-white rounded-lg hover:bg-beauty-dark transition-colors"
              >
                Enviar mensaje
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
