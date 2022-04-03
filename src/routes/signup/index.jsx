import SigninForm from "../../components/signin/signin"
import { useDispatch } from "react-redux";
import { signup } from "../../redux/slices/userSlice";

const SignupPage = () => {
  const dispath = useDispatch();
  const formSubmit = (formData) => {
    dispath(signup(formData));
  }
  return (
    <SigninForm isSignin={false} formSubmit={formSubmit} />
  )
};
export default SignupPage;