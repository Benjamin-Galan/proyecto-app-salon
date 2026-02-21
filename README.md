# Gestión de Salón de Belleza

Este proyecto es una aplicación web diseñada para la gestión integral de un salón de belleza, permitiendo administrar servicios y citas del local.

## 🚀 Tecnologías

El proyecto utiliza un stack moderno basado en Laravel y React:

- **Backend:** [Laravel 12+](https://laravel.com/)
- **Frontend:** [React 19](https://react.dev/) con [Inertia.js](https://inertiajs.com/)
- **Estilos:** [Tailwind CSS 4](https://tailwindcss.com/)
- **Componentes UI:** Radix UI y Material UI Icons
- **Base de Datos:** SQLite (configuración por defecto)

## 📋 Características Principales

- **Gestión de Servicios:** Administra el catálogo de servicios ofrecidos.
- **Categorización:** Clasificación de servicios por categorías.
- **Promociones y Paquetes:** Configuración de ofertas especiales y conjuntos de servicios.
- **Panel de Administración:** Interfaz para la gestión de datos maestros.
- **Gestión de Citas:** Administra las citas del salón.
- **Gestión de Clientes:** Administra los clientes del salón.
- **Gestión de Empleados:** Administra los empleados del salón.

## 🛠️ Instalación y Configuración

Sigue estos pasos para poner en marcha el proyecto localmente:

1. **Clonar el repositorio:**

    ```bash
    git clone https://github.com/Benjamin-Galan/proyecto-app-salon.git
    cd app-salon
    ```

2. **Instalar dependencias de PHP:**

    ```bash
    composer install
    ```

3. **Instalar dependencias de Node.js:**

    ```bash
    npm install
    ```

4. **Configurar el entorno:**

    ```bash
    cp .env.example .env
    php artisan key:generate
    ```

5. **Configurar la base de datos:**
   Crea el archivo de SQLite (si no existe) y ejecuta las migraciones:

    ```bash
    touch database/database.sqlite
    php artisan migrate --seed
    ```

6. **Ejecutar el servidor de desarrollo:**
   Para ejecutar el servidor de Laravel y el compilador de Vite simultáneamente:
    ```bash
    php artisan serve
    # En otra terminal:
    npm run dev
    ```

## 📄 Scripts Disponibles

- `npm run dev`: Inicia el servidor de desarrollo de Vite.
- `npm run build`: Compila los assets para producción.
- `php artisan test`: Ejecuta las pruebas del sistema.
