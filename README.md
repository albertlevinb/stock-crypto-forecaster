# Stock Crypto Forecaster

## Overview

**Stock Crypto Forecaster** is a full-stack web application that predicts future stock and cryptocurrency prices using Facebook Prophet — a powerful time series forecasting library developed by Meta. The app fetches historical market data, displays interactive performance charts, and generates future forecasts to support data-driven financial decisions. It now includes OpenAI API integration for personalized, AI-powered financial advice and insights.

## Features

- Fetches historical stock and crypto price data using `yfinance`  
- Interactive stock chart with D3.js showing 365-day performance  
- Forecasts future prices using Facebook Prophet  
- Cleans and formats time series data for modeling  
- Visualizes forecasts with Matplotlib  
- Integrates OpenAI API to provide AI-generated market insights and investment advice  
- Responsive frontend with real-time updates and error handling

## Screenshots

### 1. Forecast Visualization
Generates future stock or crypto price forecasts using Facebook Prophet, rendered with Matplotlib.
![Screenshot 2025-06-05 at 9 44 31 AM](https://github.com/user-attachments/assets/a365311b-6600-4aad-a5fa-863cc04f15d0)

### 2. Real-Time Stock/Crypto Input
Displays a dynamic, D3.js-powered chart of historical price data based on user-entered stock or crypto tickers.
![Screenshot 2025-06-05 at 9 48 23 AM](https://github.com/user-attachments/assets/82eb9678-ce22-46cd-a7e8-9d18234e7fb3)

### 3. AI-Generated Financial Insights
Integrates the OpenAI API to provide general, AI-powered market insights and investment commentary based on user-entered stock or crypto tickers.
![Screenshot 2025-06-05 at 9 48 59 AM](https://github.com/user-attachments/assets/ecb06539-51f4-44d4-8328-e1e6ac328395)

## Technology Stack

### Backend
- **Flask** – RESTful API for data, forecasting, and ChatGPT integration  
- **Facebook Prophet** – time series prediction model  
- **Yfinance** – historical data retrieval (stocks and crypto)  
- **OpenAI API** – AI-powered financial analysis and commentary  
- **Pandas** – data cleaning and transformation  
- **Axios** – JavaScript library for making RESTful API calls  
- **Matplotlib** – forecast chart rendering  

### Frontend
- **React** – interactive user interface  
- **Material UI** – modern, accessible UI components  
- **D3.js** – dynamic charting for historical stock/crypto prices  

### Deployment
- **NGINX** – Serves the React frontend and proxies API requests to the Flask backend for seamless production deployment  
- **AWS EC2 Instance** – Hosts the full application stack, including the Flask API, React frontend, and NGINX reverse proxy  
