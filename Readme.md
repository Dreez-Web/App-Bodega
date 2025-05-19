# Sistema Digital de Gestión de Entrega y Recepción de Herramientas y EPP

## Descripción

Este sistema informático automatiza el proceso de entrega y recepción de herramientas y Elementos de Protección Personal (EPP) en el área logística de una empresa prestadora de servicios mineros. El sistema reemplaza el actual proceso manual basado en registros en papel, el cual genera pérdida de información, errores de trazabilidad, ineficiencias y un uso ineficiente del espacio físico.

## Funcionalidades Clave

- Registro automático de entregas y recepciones.
- Validación de trabajadores mediante RUT.
- Firma digital del trabajador.
- Generación de reportes (por trabajador, fecha, tipo de recurso).
- Alertas de recursos no devueltos.
- Interfaz sencilla, intuitiva y responsive.
- Accesos diferenciados por roles.
- Administración de usuarios y recursos.

## Estructura del Proyecto

El proyecto sigue una arquitectura de tres capas:

- **Frontend:** Desarrollado con React, proporciona la interfaz de usuario para la interacción con el sistema. Se comunica con el backend a través de APIs RESTful.
- **Backend:** Desarrollado con Node.js y Express, contiene la lógica de negocio de la aplicación (gestión de usuarios, herramientas, solicitudes, etc.).
- **Base de Datos:** Utiliza MySQL para el almacenamiento persistente de los datos (trabajadores, herramientas, entregas).

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
- **Otras:** Git (control de versiones)

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

## Autor

Andres Martin Alpuis

## Licencia

Abierta para todo uso
