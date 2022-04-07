import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "../../redux/slices/userSlice";


const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthorized = useSelector(state => state.user.authorized);

  if (!isAuthorized && localStorage.getItem('jwt-token')) {
    dispatch(getCurrentUser());
  }

  const userInfo = useSelector(state => state.user.info);
  return (
    <header className="header">
      <a onClick={() => navigate("/")} className="header__logo">conduit</a>
      {isAuthorized ?
        (
          <ul className="header__links">
            <li>
              <NavLink className={({ isActive }) => 'list-group-item' + (isActive ? ' active' : '')} to="/">Home</NavLink>
            </li>
            <li>
              <NavLink className={({ isActive }) => 'list-group-item' + (isActive ? ' active' : '')} to="/editor">
                <i className="ion-compose"></i>
                &nbsp;New Article
              </NavLink>
            </li>
            <li>
              <NavLink className={({ isActive }) => 'list-group-item' + (isActive ? ' active' : '')} to="/settings">
                <i className="ion-gear-a"></i>
                &nbsp;Settings
              </NavLink>
            </li>
            <li>
              <NavLink className={({ isActive }) => 'list-group-item' + (isActive ? ' active' : '')} to={`@${userInfo.username}`}>
                <img src={userInfo.image} alt="user-img" />
                {userInfo.username}
              </NavLink>
            </li>
          </ul>
        )
        :
        (
          <ul className="header__links">
            <li>
              <NavLink className={({ isActive }) => 'list-group-item' + (isActive ? ' active' : '')} to="/">Home</NavLink>
            </li>
            <li>
              <NavLink className={({ isActive }) => 'list-group-item' + (isActive ? ' active' : '')} to="/signin">Sign in</NavLink>
            </li>
            <li>
              <NavLink className={({ isActive }) => 'list-group-item' + (isActive ? ' active' : '')} to="/signup">Sign up</NavLink>
            </li>
          </ul>
        )
      }
    </header>
  )
}
export default Header;