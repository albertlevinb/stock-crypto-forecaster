import StockForecast from './components/StockForecast';
import { IconButton } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';

function App() {
  return (
    <div>
      <StockForecast />
      <IconButton
        href="https://github.com/mui"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub"
      >
        <GitHubIcon />
      </IconButton>
    </div>
  );
}

export default App;
