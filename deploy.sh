#!/bin/bash

echo "Please setup the environment variables in the .env file"
docker compose -p sacc -f docker-compose.prod.yml up --build -d