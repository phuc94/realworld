import { render } from 'react-dom';
import './index.css';
import { store } from './redux/store';
import { Provider } from 'react-redux';

import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import App from './App';
import HomePage from './routes/home';
import ArticlePage from './routes/article';

const rootElement = document.getElementById("root");
render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/article" element={<ArticlePage />} />
      </Routes>
    </BrowserRouter>
  </Provider>,
  rootElement
);