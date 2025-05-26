# Stock Forecast with Facebook Prophet

## Overview

Stock Forecast is a full-stack web application that predicts future stock prices using Facebook Prophet, a powerful time series forecasting library developed by Meta. The project fetches historical stock data, visualizes past performance with an interactive stock chart, and provides forecasted trends to support data-driven financial decisions.

## Features

- Fetches historical stock price data using `yfinance`
- Interactive stock chart with D3.js for 365-day performance visualization
- Formats and cleans data for Prophet
- Generates future forecasts using Facebook Prophet
- Displays forecast charts generated via Matplotlib
- Responsive front end with real-time updates and error handling

## Technology Stack

### Backend
- **Flask** – for RESTful API endpoints
- **Facebook Prophet** – time series forecasting
- **Yfinance** – historical stock data retrieval
- **Pandas** – data manipulation
- **Matplotlib** – chart generation for forecast output

### Frontend
- **React** – UI development
- **Material UI** – modern, responsive components
- **D3.js** – dynamic and interactive stock price charts

## Deployment with NGINX

- This app is production-ready with NGINX, which serves the React frontend and proxies API requests to the Flask backend.
