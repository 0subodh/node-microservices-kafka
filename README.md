# Microservices with Kafka Messaging

This project demonstrates a microservices architecture using Node.js, Kafka, and Postgres.

## Prerequisites

- Docker and Docker Compose
- Node.js and npm

## Setup

1.  **Clone the repository:**

    ```bash
    git clone git@github.com:0subodh/node-microservices-kafka.git
    cd node-microservices-kafka
    ```

2.  **Start Docker Compose:**

    ```bash
    docker compose up -d
    ```

3.  **Install dependencies:**

    ```bash
    cd api-gateway && npm install && cd ..
    cd service-a && npm install && cd ..
    cd service-b && npm install && cd ..
    cd cron-job && npm install && cd ..
    ```

4.  **Create .env file(sample available):**

    - create a .env file on the root directory of the project.
    - add the following lines:

    ```
    KAFKA_BROKERS=kafka:9092
    POSTGRES_HOST=postgres
    POSTGRES_PORT=5432
    POSTGRES_USER=postgres
    POSTGRES_PASSWORD=password
    POSTGRES_DB=microservices
    ```

5.  **Run the services:**

    ```bash
    cd api-gateway && npm run start && cd ..
    cd service-a && npm run start && cd ..
    cd service-b && npm run start && cd ..
    cd cron-job && npm run start && cd ..
    ```

## Usage

- Send POST requests to `http://localhost:3000/process` with a JSON payload containing `userId` and `message`.
- Check the microservice logs for message processing.
- Query the Postgres database to verify data persistence.
- Observe the cron job logs and summary table updates.

## Other features are beign developed
