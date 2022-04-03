import { useState, useEffect } from "react";
import produce from "immer";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const formInitialState = {
  user: {
    username: '',
    email: '',
    password: '',
  }
};

const SigninForm = ({ isSignin, formSubmit }) => {
  // const navigate = useNavigate();
  const [formState, setFormState] = useState(formInitialState);
  const isAuthorized = useSelector(state => state.user.authorized);

  useEffect(() => {
    if (isAuthorized == true) {
      window.location.href = '/';
      // navigate('/', { replace: true });
    }
  }, [isAuthorized])

  const onInputChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    const newFormState = produce(formState, draft => {
      draft.user[name] = value;
    });
    setFormState(newFormState);
  }

  const onFormSubmit = async e => {
    e.preventDefault();
    formSubmit(formState);
  }

  return (
    <div className="form signin-form">
      <h1 className="signin-form__title">
        {isSignin ? 'Sign in' : 'Sign up'}
      </h1>
      <p className="signin-form__text">
        {isSignin ?
          (
            <Link to="/signup">Need an account?</Link>
          ) :
          (
            <Link to="/signin">Have an account?</Link>
          )
        }
      </p>
      <form action="" onSubmit={e => onFormSubmit(e)}>
        {!isSignin &&
          <fieldset>
            <input
              type="text"
              placeholder="Username"
              name="username"
              value={formState.user.username}
              onChange={e => onInputChange(e)}
            />
          </fieldset>
        }
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
            placeholder="Password"
            name="password"
            value={formState.user.password}
            onChange={e => onInputChange(e)}
          />
        </fieldset>
        <button
          className="btn btn-signin"
          type="submit"
        >
          {isSignin ? 'Sign in' : 'Sign up'}
        </button>
      </form>
    </div>
  )
}
export default SigninForm;