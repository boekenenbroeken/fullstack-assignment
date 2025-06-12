import { BrowserRouter } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import { Routes } from './routes/Routes';

import './index.css';

export function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes />
      </Layout>
    </BrowserRouter>
  );
}
