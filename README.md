


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
* **FastAPI structure:** For the FastAPI I chose a lightweight layered architecture (routers, schemas, services). It keeps the code simple and testable, while allowing an easy transition to full Clean Architecture if the project scales.

📦fastapi
 ┣ 📂app
 ┃ ┣ 📂routers
 ┃ ┣ 📂schemas
 ┃ ┣ 📂services
 ┃ ┗ 📜main.py
 ┗ 📂tests

* **FastAPI: Factory and Strategy patterns** To allow the code to integrate new centroid computation strategies when needed, the Strategy Pattern is implemented in the centroid_strategies.py file. To properly orchestrate this, the centroid_factory.py file was added, which handles the registration of new strategies and uses the Factory Pattern to retrieve the requested strategy.

With this approach, adding new calculation strategies only requires creating a new file in the services folder with the implementation, without modifying the existing, working code.

* **NestJS:** validación adicional y caching de respuestas.
* **Next.js:** simplicidad en la construcción del frontend y visualización de mapas.
* **Arquitectura:** separación de servicios para escalabilidad y mantenibilidad.

---



## Prerequisites
Make sure you have installed:

- [Python 3.11+]
- [npm](https://www.npmjs.com/) o [yarn](https://yarnpkg.com/)
- [Docker]







---

## Autor

**Diego Andrés Rodríguez Ramírez**
Full-Stack Developer – Python | React | AWS

```

