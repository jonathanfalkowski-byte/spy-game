import { createRoot } from 'react-dom/client';
import { App } from './ui/App';
import './ui/styles.css';
import { validateContent } from './content/validate';
validateContent();
createRoot(document.getElementById('root')!).render(<App />);
