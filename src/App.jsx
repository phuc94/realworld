import './style/main.scss';
import { useSelector } from 'react-redux';

import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import Header from './components/header/header';
import HomePage from './routes/home';
import ArticlePage from './routes/article';
import SigninPage from './routes/signin';
import SignupPage from './routes/signup';
import EditorPage from './routes/editor';
import SettingPage from './routes/setting';

const App = () => {
  const isAuthorized = useSelector(state => state.user.authorized);
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/article" element={<ArticlePage />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/editor" element={<EditorPage />} />
        <Route path="/settings" element={<SettingPage />} />
      </Routes>
    </BrowserRouter>
  )
};
export default App;