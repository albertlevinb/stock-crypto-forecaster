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

const StockForecast = () => {
  const [ticker, setTicker] = useState("TSLA");
  const [days, setDays] = useState(90);
  const [imageBase64, setImageBase64] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleForecast = (event) => {
    setLoading(true);
    axios.post('/api/forecast-stock', JSON.stringify({ ticker, days }), { headers: { 'Content-Type': 'application/json' } })
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

  const handleSubmit = (event) => {
    // To prevent a browser reload/refresh
    event.preventDefault();
    console.log('Submitted ticker:', ticker);
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
              Wecome to Stock/Crypto Forecaster
            </Typography>
            <IconButton
              href="https://github.com/albertlevinb/Stock-Forecast.git"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              sx={{ mt: -0.5 }} // negative margin top to move it up slightly
            >
              <Tooltip id="button-report" title="GitHub repository">
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
            Powered by the Facebook's Prophet prediction model
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
              onChange={(e) => { setTicker(e.target.value); setError(null); }}
              sx={{ mr: 2 }}
            />
            <TextField
              label="Days"
              variant="outlined"
              type="days"
              required
              value={days}
              onChange={(e) => setDays(e.target.value)}
              sx={{ mr: 2 }}
            />
            <Button type="submit" variant="contained" color="primary" onClick={handleForecast}>
              Submit
            </Button>
          </Box>
        </Container>
      </Box>

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
        {error && <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          The {ticker} ticker is not valid or network error
        </Typography>}
      </Box>
    </div>
  );
}

export default StockForecast;
