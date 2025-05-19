# Sistema Digital de Gestión de Entrega y Recepción de Herramientas y EPP

## Descripción

Este sistema informático automatiza el proceso de entrega y recepción de herramientas y Elementos de Protección Personal (EPP) en el área logística de una empresa prestadora de servicios mineros. [cite: 255, 256, 257, 258, 259, 260, 333, 334, 335, 336] El sistema reemplaza el actual proceso manual basado en registros en papel, el cual genera pérdida de información, errores de trazabilidad, ineficiencias y un uso ineficiente del espacio físico. [cite: 269, 270, 271, 272]

## Funcionalidades Clave

- Registro automático de entregas y recepciones. [cite: 339]
- Validación de trabajadores mediante RUT. [cite: 339]
- Firma digital del trabajador. [cite: 339]
- Generación de reportes (por trabajador, fecha, tipo de recurso). [cite: 340, 344]
- Alertas de recursos no devueltos. [cite: 344]
- Interfaz sencilla, intuitiva y responsive. [cite: 340]
- Accesos diferenciados por roles. [cite: 340]
- Administración de usuarios y recursos. [cite: 349]

## Estructura del Proyecto

El proyecto sigue una arquitectura de tres capas:

- **Frontend:** Desarrollado con React, proporciona la interfaz de usuario para la interacción con el sistema. [cite: 92, 93, 94] Se comunica con el backend a través de APIs RESTful. [cite: 94]
- **Backend:** Desarrollado con Node.js y Express, contiene la lógica de negocio de la aplicación (gestión de usuarios, herramientas, solicitudes, etc.). [cite: 95, 96, 97]
- **Base de Datos:** Utiliza MySQL para el almacenamiento persistente de los datos (trabajadores, herramientas, entregas). [cite: 98, 99, 100, 101, 102]

La estructura principal del proyecto es la siguiente:

backend/ # Código del backend (Node.js/Express)
│ ├── controllers/ # Controladores de la API
│ ├── routes/ # Definición de las rutas de la API
│ ├── models/ # Modelos de datos (opcional si usas un ORM)
│ ├── ...
│ └── server.js # Archivo principal del servidor
├── frontend/ # Código del frontend (React)
│ ├── components/ # Componentes de la interfaz de usuario
│ ├── pages/ # Páginas de la aplicación
│ ├── ...
│ └── App.js # Componente principal de la aplicación
├── database/ # Scripts de la base de datos (esquema)
│ └── schema.sql # Script para crear las tablas de la base de datos
├── .env # Archivo de configuración (variables de entorno)
├── README.md # Este archivo
└── package.json # Archivo de configuración de Node.js (backend)

## Tecnologías Utilizadas

- **Frontend:** React
- **Backend:** Node.js, Express
- **Base de Datos:** MySQL
- **Otras:** Git (control de versiones) [cite: 154, 155]

## Requisitos Previos

Asegúrate de tener instalado lo siguiente:

- Node.js y npm (o yarn)
- MySQL

## Instalación

1.  Clona el repositorio:

    ```bash
    git clone [URL_DEL_REPOSITORIO]
    ```

2.  **Backend:** Navega al directorio del backend e instala las dependencias:

    ```bash
    cd backend
    npm install
    ```

3.  **Frontend:** Navega al directorio del frontend e instala las dependencias:

    ```bash
    cd frontend
    npm install
    ```
