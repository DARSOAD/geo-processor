# min Python 3.13
FROM python:3.13-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

# Workdirectory
WORKDIR /app

# Installl dependencies, first Docker cache
COPY requirements.txt ./
RUN pip install --no-cache-dir -U pip && \
    pip install --no-cache-dir -r requirements.txt

COPY app ./app

# Port IMPORTANT
EXPOSE 8000

# Comando por defecto: levantar el server
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
