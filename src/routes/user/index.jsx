import User from "../../components/user/user";
import { useParams } from "react-router-dom";

const UserPage = () => {
  const param = useParams();
  return (
    <User username={param.slug} />
  )
};
export default UserPage;