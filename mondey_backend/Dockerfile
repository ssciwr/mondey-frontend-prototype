FROM python:3.12-slim

LABEL org.opencontainers.image.source=https://github.com/ssciwr/mondey-frontend-prototype
LABEL org.opencontainers.image.description="MONDEY backend production image"
LABEL org.opencontainers.image.licenses=MIT

WORKDIR /app

COPY . .

RUN pip install .

CMD ["mondey-backend", "--host", "0.0.0.0", "--port", "80", "--log-level", "info"]
