# Makefile

# Default shell
SHELL := /bin/bash

# Path to your .env file
ENV_FILE := .env
ENV_EXAMPLE_FILE := .env.example

clean:
# rm -rf python/.cims
	docker-compose down -v

env:
	@cp -n $(ENV_EXAMPLE_FILE) $(ENV_FILE) 

setup: env
	@echo "Setting up environment..."
	@set -a; source $(ENV_FILE); set +a
	@echo "Environment variables loaded."

close: 
	docker-compose down

backend: setup close
	@echo "Running the project..."
	docker-compose up --build -d

web: env
	cd web && npm run dev

.PHONY: clean env setup close web
