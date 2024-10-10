import RecommendationList from "../components/RecommendationList";
import { useSelector } from "react-redux";

const Recommendations = () => {
  const userId = user?._id;
  const { user } = useSelector((store) => store.auth);
  console.log("user in recommendation is: ", user);
  return (
    <div>
      <h1 className="font-bold text-lg my-5">Recommended Jobs for You</h1>

      <RecommendationList userId={userId} />
    </div>
  );
};

export default Recommendations;
