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
import UserPage from './routes/user';

const App = () => {
  const user = useSelector(state => state.user.info);
  console.log(user?.username);
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
        <Route path={`@${user?.username}`} element={<UserPage />} />
      </Routes>
    </BrowserRouter>
  )
};
export default App;