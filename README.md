# Stock Crypto Forecaster

## Overview

**Stock Crypto Forecaster** is a full-stack web application that predicts future stock and cryptocurrency prices using Facebook Prophet — a powerful time series forecasting library developed by Meta. The app fetches historical market data, displays interactive performance charts, and generates future forecasts to support data-driven financial decisions. It now includes ChatGPT integration for personalized, AI-powered financial advice and insights.

## Features

- Fetches historical stock and crypto price data using `yfinance`
- Interactive stock chart with D3.js showing 365-day performance
- Forecasts future prices using Facebook Prophet
- Cleans and formats time series data for modeling
- Visualizes forecasts with Matplotlib
- ChatGPT integration provides AI-generated market insights and investment advice
- Responsive frontend with real-time updates and error handling

## Technology Stack

### Backend
- **Flask** – RESTful API for data, forecasting, and ChatGPT integration
- **Facebook Prophet** – time series prediction model
- **Yfinance** – historical data retrieval (stocks and crypto)
- **OpenAI API** – ChatGPT-powered financial analysis and commentary
- **Pandas** – data cleaning and transformation
- **Matplotlib** – forecast chart rendering

### Frontend
- **React** – interactive user interface
- **Material UI** – modern, accessible UI components
- **D3.js** – dynamic charting for historical stock/crypto prices

### Deployment
- **NGINX** – serves the React frontend and proxies API requests to the Flask backend for a seamless production deployment
