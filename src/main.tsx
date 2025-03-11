
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Ensure the DOM is loaded before rendering
const renderApp = () => {
  const rootElement = document.getElementById("root");
  if (rootElement) {
    createRoot(rootElement).render(<App />);
  }
};

// Check if the DOM is already loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderApp);
} else {
  renderApp();
}
