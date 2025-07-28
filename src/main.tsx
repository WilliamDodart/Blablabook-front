import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router';
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter /* basename="/blabla-book-front" */ /* Chemin d'accès à GitHubPages selon une branche */ >
    <App />
  </BrowserRouter>,
)
