#!/bin/bash

# Build the Docker container for the Demo
docker build -t puppeteer-screenshot .

docker run puppeteer-screenshot
