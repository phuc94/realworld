import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { test, fetchArticle } from "./redux/slices/userSlice";
import './style/main.scss';

const App = () => {
  const storeState = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <div>
      <h1 className="test">Bookkepper!</h1>
      <Link to="/home">Home</Link>
      <Link to="/signup">signup</Link>
      <button onClick={() => dispatch(fetchArticle())}>BTN</button>
      <button onClick={() => console.log(storeState)}>LOG</button>
    </div>
  );
}

export default App;
