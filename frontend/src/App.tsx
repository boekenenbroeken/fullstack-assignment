import './index.css';

import { BrowserRouter } from 'react-router-dom';

import { Layout } from './components/Layout/Layout';
import { Routes } from './routes/Routes';

export function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes />
      </Layout>
    </BrowserRouter>
  );
}
