


# 🌍 Geo-Processor – Technical Test

## 📘 Description
This project implements a microservices ecosystem that processes geographic coordinates to calculate the centroid and the bounds of a set of points.  

Includes:
- **Python (FastAPI):** Main processing service.
- **NestJS:** API that validates, forwards requests, and caches results.
- **Next.js:** Frontend for entering coordinates and visualizing results on a map.


## Technical Decisions

* **MonoRepo** This project is being developed by a single developer, so a MonoRepo is sufficient and helps reduce local friction with Docker, README, and other files.
* ## Project structure

geo-processor/
  apps/
    fastapi/      # Python 
    nestjs/       # Gateway + caché
    nextjs/       # Frontend
  infra/
    docker-compose.yml
  .github/workflows/
    ci-fastapi.yml
    ci-nestjs.yml
    ci-nextjs.yml
  README.md


* **FastAPI:** validación con Pydantic y cálculo usando funciones nativas (`min`, `max`, `sum`).
* **NestJS:** validación adicional y caching de respuestas.
* **Next.js:** simplicidad en la construcción del frontend y visualización de mapas.
* **Arquitectura:** separación de servicios para escalabilidad y mantenibilidad.

---

## 🗂️ Estructura del Proyecto
Explico si opté por **monorepo** o repos separados y la razón:



root/
├── geo-processor-python/   # Servicio FastAPI
├── geo-processor-nestjs/   # API Gateway NestJS
└── geo-processor-nextjs/   # Frontend Next.js





## ⚙️ Requisitos Previos
Asegúrate de tener instalado:
- [Python 3.11+](https://www.python.org/downloads/)
- [Node.js 18+](https://nodejs.org/)
- [npm](https://www.npmjs.com/) o [yarn](https://yarnpkg.com/)
- [Docker](https://www.docker.com/) *(opcional para despliegue)*







---

## Autor

**Diego Andrés Rodríguez Ramírez**
Full-Stack Developer – Python | React | AWS

```

