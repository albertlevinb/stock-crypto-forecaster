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
<img width="1920" height="927" alt="Screenshot 2025-07-18 at 2 35 26 PM" src="https://github.com/user-attachments/assets/ace98f64-7d90-43c9-9e37-d3950c704238" />

### 📈 Real-Time Stock/Crypto Input
D3.js-powered chart showing 365-day price trends based on user input.
<img width="1920" height="926" alt="Screenshot 2025-07-18 at 2 38 19 PM" src="https://github.com/user-attachments/assets/7881b094-9f7a-4ffb-aea8-6340ac648ca7" />

### 🤖 AI-Generated Financial Insights
Uses OpenAI's API to provide context-aware, AI-generated investment commentary.
<img width="1920" height="927" alt="Screenshot 2025-07-18 at 2 39 01 PM" src="https://github.com/user-attachments/assets/35e1e9f5-34c5-4a83-9303-379ee81286f7" />

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
