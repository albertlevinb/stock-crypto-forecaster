# Stock Crypto Forecaster

## Overview

**Stock Crypto Forecaster** is a full-stack web application for forecasting stock and cryptocurrency prices using advanced time series modeling. Built with Flask and React, the app visualizes market data and provides AI-powered insights to support data-driven financial decisions.

## Features

- Fetches historical stock and crypto price data using `yfinance`  
- Interactive stock chart with D3.js showing 365-day performance  
- Forecasts future prices using Facebook Prophet  
- Cleans and formats time series data for modeling  
- Visualizes forecasts with Matplotlib  
- Integrates OpenAI API to provide AI-generated market insights and investment advice  
- Responsive frontend with real-time updates and error handling

## Screenshots

### 🧮 Forecast Visualization
Forecasts future stock or crypto prices using Facebook Prophet and Matplotlib.
![Screenshot 2025-06-05 at 9 44 31 AM](https://github.com/user-attachments/assets/a365311b-6600-4aad-a5fa-863cc04f15d0)

### 📈 Real-Time Stock/Crypto Input
D3.js-powered chart showing 365-day price trends based on user input.
![Screenshot 2025-06-05 at 9 48 23 AM](https://github.com/user-attachments/assets/82eb9678-ce22-46cd-a7e8-9d18234e7fb3)

### 🤖 AI-Generated Financial Insights
Uses OpenAI's API to provide context-aware, AI-generated investment commentary.
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
