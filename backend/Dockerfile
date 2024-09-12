FROM python:3.12-slim

LABEL org.opencontainers.image.source=https://github.com/ssciwr/mondey-frontend-prototype
LABEL org.opencontainers.image.description="mondey backend production image"
LABEL org.opencontainers.image.licenses=MIT

WORKDIR /app

COPY ./requirements.txt .

RUN pip install --no-cache-dir --upgrade -r requirements.txt

COPY ./app .

CMD ["fastapi", "run", "app/main.py", "--proxy-headers", "--port", "80"]
