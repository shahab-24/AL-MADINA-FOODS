import Banner from "../../Components/Banner";
import FeaturedFoods from "../../Components/FeaturedFoods";
import GamificationBadge from "../../Components/GamificationBadge";
import RecentlyAddedFoods from "../../Components/RecentlyAddedFoods";

const Home = () => {
  return (
    <div>
      <div className="my-20 h-[400px]">
        {" "}
        <Banner></Banner>
      </div>
      <div className="my-20">
        <FeaturedFoods></FeaturedFoods>
      </div>
      <RecentlyAddedFoods></RecentlyAddedFoods>
      <GamificationBadge></GamificationBadge>
    </div>
  );
};

export default Home;
