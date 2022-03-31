import { useEffect, useState } from "react";
import produce from "immer";
import { useSelector, useDispatch } from "react-redux";
import { updateUserAPI } from "../../service/user";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/slices/userSlice";
import { update } from "../../redux/slices/userSlice";

const formInitialState = {
  user: {
    image: '',
    username: '',
    bio: '',
    email: '',
    password: ''
  }
};

const SettingForm = () => {
  const userInfo = useSelector(state => state.user.info);
  const isAuthorized = useSelector(state => state.user.authorized);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setFormState(produce(draft => {
      draft.user.image = userInfo?.image;
      draft.user.username = userInfo?.username;
      draft.user.bio = userInfo?.bio;
      draft.user.email = userInfo?.email;
    }))
  }, [userInfo])
  useEffect(() => {
    if (isAuthorized == false) {
      window.location.href = '/';
      // navigate('/', { replace: true });
    }
  }, [isAuthorized])
  const [formState, setFormState] = useState(formInitialState);

  const onInputChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    const newFormState = produce(formState, draft => {
      draft.user[name] = value;
    });
    setFormState(newFormState);
  };

  const onFormSubmit = e => {
    e.preventDefault();
    updateUserAPI(formState).then(res => {
      if (res.status == 200) {
        dispatch(update(res.data));
        navigate('/');
      }
    })
  };

  const handleLogOut = () => {
    dispatch(logout());
  };

  return (
    <div className="setting-form form">
      <form action="" onSubmit={e => onFormSubmit(e)}>
        <fieldset>
          <input
            type="text"
            className="form--smaller"
            placeholder="URL of profile picture"
            name="image"
            value={formState.user.image}
            onChange={e => onInputChange(e)}
          />
        </fieldset>
        <fieldset>
          <input
            type="text"
            placeholder="Username"
            name="username"
            value={formState.user.username}
            onChange={e => onInputChange(e)}
          />
        </fieldset>
        <fieldset>
          <textarea
            type="text"
            rows="8"
            placeholder="Short bio about you"
            name="bio"
            value={formState.user.bio}
            onChange={e => onInputChange(e)}
          />
        </fieldset>
        <fieldset>
          <input
            type="text"
            placeholder="Email"
            name="email"
            value={formState.user.email}
            onChange={e => onInputChange(e)}
          />
        </fieldset>
        <fieldset>
          <input
            type="password"
            placeholder="New Password"
            name="password"
            value={formState.user.password}
            onChange={e => onInputChange(e)}
          />
        </fieldset>
        <button className="btn">Update Settings</button>
      </form>
      <hr />
      <button onClick={() => handleLogOut()} className="btn btn--logout">
        Or click here to logout.
      </button>
    </div>
  )
};
export default SettingForm;