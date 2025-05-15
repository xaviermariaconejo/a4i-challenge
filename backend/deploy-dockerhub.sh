#!/usr/bin/env bash
#
# Usage: ./deploy-dockerhub.sh [version]
# Example: ./deploy-dockerhub.sh 1.0.0
# If no version is provided, "latest" will be used.

# Exit on error
set -e

# Set your Docker Hub username and image name
DOCKER_USERNAME="a4iai"
IMAGE_NAME="technical-test-llm-mock-backend"

# Use the first argument as the version; default to "latest"
VERSION=${1:-latest}

echo "Building Docker image: ${DOCKER_USERNAME}/${IMAGE_NAME}:${VERSION}"

# Build the Docker image
docker build -t ${DOCKER_USERNAME}/${IMAGE_NAME}:${VERSION} .

# Log in to Docker Hub (if not already logged in)
# This will prompt for your Docker Hub password
docker login

# Push the image to Docker Hub
docker push ${DOCKER_USERNAME}/${IMAGE_NAME}:${VERSION}

echo "Successfully pushed ${DOCKER_USERNAME}/${IMAGE_NAME}:${VERSION} to Docker Hub"
