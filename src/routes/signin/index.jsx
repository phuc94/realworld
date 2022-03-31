import SigninForm from "../../components/signin/signin";
import { useDispatch } from "react-redux";
import { signin } from "../../redux/slices/userSlice";

const SigninPage = () => {
  const dispath = useDispatch();
  const formSubmit = (formData) => {
    dispath(signin(formData));
  }
  return (
    <SigninForm isSignin={true} formSubmit={formSubmit} />
  )
}
export default SigninPage;