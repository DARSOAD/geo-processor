


# 🌍 Geo-Processor – Technical Test

## 📘 Description
This project implements a microservices ecosystem that processes geographic coordinates to calculate the centroid and the bounds of a set of points.  

Includes:
- **Python (FastAPI):** Main processing service.
- **NestJS:** API that validates, forwards requests, and caches results.
- **Next.js:** Frontend for entering coordinates and visualizing results on a map.

### How to run
In the project root, run
```bash
docker build -t geo-processor .
```


## Technical Decisions

* **MonoRepo** This project is being developed by a single developer, so a MonoRepo is sufficient and helps reduce local friction with Docker, README, and other files.

* ## Project structure

📦geo-processor
 ┣ 📂apps
 ┃ ┣ 📂fastapi
 ┃ ┣ 📂nestjs
 ┃ ┗ 📂nextjs
 ┣ 📜 docker-compose.yml
 ┗ 📜 README.md




* ## **FastAPI:** #######


* **FastAPI structure:** For the FastAPI I chose a lightweight layered architecture (routers, schemas, services). It keeps the code simple and testable, while allowing an easy transition to full Clean Architecture if the project scales.

📦fastapi
 ┣ 📂app
 ┃ ┣ 📂routers
 ┃ ┣ 📂schemas
 ┃ ┣ 📂services
 ┃ ┣ 📂tests
 ┃ ┣ 📜errors.py
 ┃ ┗ 📜main.py
 ┗ 📜Dockerfile

* **FastAPI: Factory and Strategy patterns** 
  To allow the code to integrate new centroid computation strategies when needed, the Strategy Pattern is implemented in the centroid_strategies.py file. To properly orchestrate this, the centroid_factory.py file was added, which handles the registration of new strategies and uses the Factory Pattern to retrieve the requested strategy.

  With this approach, adding new calculation strategies only requires creating a new file in the services folder with the implementation, without modifying the existing, working code.

  * **FastAPI:  Run tests**
  "...\geo-processor\apps\fastapi"
```bash
  . .venv/Scripts/Activate.ps1   # Windows (PowerShell) | source .venv/bin/activate   # Linux/Mac
  pip install -r requirements-dev.txt
  pytest -v
```

* ## **NestJS:** #######

* **NestJS structure:** For the NestJS, I chose a Tiny Gateway since it fits the requirements of the test exactly. Nothing else needs to be added—it’s a lightweight proxy, and I followed the YAGNI principle.

📦src
 ┣ 📂python-proxy
 ┃ ┣ 📂dto
 ┃ ┃ ┗ 📜process.request.dto.ts
 ┃ ┣ 📜python-proxy.controller.ts
 ┃ ┣ 📜python-proxy.module.ts
 ┃ ┣ 📜http.client.ts
 ┃ ┗ 📜python-proxy.service.ts
 ┣ 📜app.controller.spec.ts
 ┣ 📜app.controller.ts
 ┣ 📜app.module.ts
 ┣ 📜app.service.ts
 ┗ 📜main.ts

  I implemented an in-memory caching mechanism with clear HIT, MISS, and REFRESH behaviors, ensuring efficient request handling. To maintain data integrity, every input contract is validated before being forwarded to the Python service. End-to-end tests were built using Supertest to verify the full cache lifecycle (MISS, HIT, and REFRESH) and to confirm that invalid payloads correctly return a 400 Bad Request. Finally, I ensured that all responses consistently include the centroid, bounds, and cache metadata for reliable client consumption.

  * **Nest:  Run tests**
  To run the test, execute the following command in the given directory:

  apps\nestjs> 
```bash
  npm run test:e2e
```

* **Next.js:** 
  I chose a Modular-by-Feature (Ducks) architecture since I needed a quick and simple startup for the application. In the future, this could be migrated to an FSD approach. This choice reinforces the SRP, and because the project is not very large, there’s little risk of breaking the OCP or DIP principles from SOLID.

 📂nextjs
 ┣ 📂src
 ┃ ┣ 📂app
 ┃ ┃   ┗📜page.tsx
 ┃ ┣ 📂lib
 ┃ ┣ 📂features
 ┃ ┣ 📂shared
 ┃ ┗ 📂config

  We created the necessary configuration for a simple HTTP Client that handles errors, applies backoff retries, and integrates with NestJS. This implementation is exposed in the lib folder, and it relies on proper configuration of the .env file for setting the URL and other communication parameters. With this approach, if in the future the endpoint changes or values such as connection retries need adjustment, these updates can be made directly in the configuration without modifying the Next.js application code itself.

  An GEO feature was created to handle the process call, leveraging the previously implemented HTTP Client.

  For an app of this size, I chose to use the Chakra UI library to build everything as quickly as possible, following a UI per feature approach (without a global shared yet). Once the app starts to scale and we see the same patterns repeated 2–3 times (e.g., <ErrorAlert>), the plan is to then extract them into src/shared/ui.

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

