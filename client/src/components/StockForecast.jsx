import React, { useState } from 'react';
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  IconButton,
  Tooltip,
  CircularProgress,
} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import axios from 'axios';
import StockChart from './StockChart/StockChart';

const StockForecast = () => {
  const [ticker, setTicker] = useState("AAPL");
  const [imageBase64, setImageBase64] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [chartData, setChartData] = useState(null);
  const [aiResponse, setAiResponse] = useState(null);

  const days = 90;

  const handleForecast = (event) => {
    setLoading(true);
    setChartData(null);
    setAiResponse(null);
    axios.post('/forecast-stock', JSON.stringify({ ticker, days }), { headers: { 'Content-Type': 'application/json' } })
      .then(res => {
        setLoading(false);
        setImageBase64(res.data.image_base64);
        setError(null);
      })
      .catch(error => {
        setImageBase64(null);
        setError(error);
        setLoading(false);
      });
  };

  const handleChart = (event) => {
    setLoading(true);
    setImageBase64(null);
    setAiResponse(null);
    axios.post('/stock-data', JSON.stringify({ ticker }), { headers: { 'Content-Type': 'application/json' } })
      .then(res => {
        setLoading(false);
        let data = [];
        for (const date in res.data) {
          data.push({
            date: new Date(date),
            high: res.data[date]['High'],
            low: res.data[date]['Low'],
            open: res.data[date]['Open'],
            close: res.data[date]['Close'],
            volume: res.data[date]['Volume']
          });
        }
        setChartData(data);
      })
      .catch(error => {
        setChartData([]); // Clear chart data on error
        setImageBase64(null);
        setError(error);
        setLoading(false);
      });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const getAdvice = async () => {
    setLoading(true);
    setImageBase64(null);
    setChartData(null);
    try {
      const res = await axios.post("/openapi", {
        ticker,
      });
      setLoading(false);
      setAiResponse(res.data.response);

    } catch (err) {
      console.error(err);
      setLoading(false);
      setAiResponse("Failed to get advice.");
    }
  };

  return (
    <div>
      <Box
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[200]
              : theme.palette.grey[800],
          p: 1,
          mt: 1,
        }}
      >
        <Container maxWidth="lg">
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1, display: 'flex', justifyContent: 'center', gap: 2 }} // gap to give it more space
          >
            <Typography variant="h6" align="center">
              Stock & Crypto Forecaster
            </Typography>
            <IconButton
              href="https://github.com/albertlevinb/Stock-Forecast"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              sx={{ mt: -0.5 }} // negative margin top to move it up slightly
            >
              <Tooltip id="button-report" title="GitHub">
                <GitHubIcon />
              </Tooltip>
            </IconButton>
          </Box>
          <Typography
            variant="subtitle1"
            align="center"
            color="text.secondary"
            component="p"
          >
            Powered by Prophet – Meta’s Open-Source Time Series Forecasting Model
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1, display: 'flex', justifyContent: 'center' }}
          >
            <TextField
              label="Ticker"
              variant="outlined"
              type="ticker"
              required
              value={ticker}
              onChange={(e) => { setTicker(e.target.value); setError(null); setChartData(null); setAiResponse(null); }}
              sx={{ mr: 2 }}
            />
            <Button type="submit" variant="contained" color="primary" onClick={handleForecast} style={{ marginRight: '10px' }}>
              Forecast
            </Button>
            <Button type="submit" variant="contained" color="primary" onClick={handleChart} style={{ marginRight: '10px' }} >
              Chart
            </Button>
            <Button type="submit" variant="contained" color="primary" onClick={getAdvice}>
              AI Advice
            </Button>
          </Box>
        </Container>
      </Box >

      <Box
        sx={{
          height: '100vh',
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[200]
              : theme.palette.grey[800],
          p: 5,
          mt: 0,
          justifyContent: 'center'
        }}
      >
        {imageBase64 && <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          {ticker} forecast for {days} days
        </Typography>}
        {loading && <div style={{ display: 'flex', justifyContent: 'center' }}><CircularProgress /></div>}
        {imageBase64 && (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <img src={`data:image/png;base64,${imageBase64}`} alt="Forecast Plot" />
          </div>
        )}
        {chartData && chartData.length > 0 && <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          {ticker} chart for 365 days: Hover over the chart area to view details.
        </Typography>}
        {chartData && chartData.length > 0 && <StockChart data={chartData} />}
        {error && <Typography
          variant="subtitle1"
          align="center"
          color="error"
          component="p"
          fontWeight="bold"
        >
          The ticker symbol {ticker} is invalid or a network error occurred
        </Typography>}
        {aiResponse && <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            mt: 4,
          }}
        ><Box
          sx={{
            width: '50%',
            mt: 2,
            p: 2,
            border: '2px solid #ccc',
            borderRadius: 2,
            bgcolor: '#eeeeee',
          }}
        >
            <Typography variant="body1">{aiResponse}</Typography>
          </Box></Box>}
      </Box>
    </div >
  );
}

export default StockForecast;