import Banner from "../../Components/Banner";
import CallToActionVolunteering from "../../Components/CallToActionVolunteering";
import CommunityHighlights from "../../Components/CommunityHighLights";
import FeaturedFoods from "../../Components/FeaturedFoods";
import GamificationBadge from "../../Components/GamificationBadge";
import HowItWorks from "../../Components/HowItWorks";
import ImpactStats from "../../Components/ImpactStats";
// import Partners from "../../Components/Partners";
import RecentlyAddedFoods from "../../Components/RecentlyAddedFoods";
import Testimonials from "../../Components/Testimonials";

const Home = () => {
  return (
    <div>
      <div className="my-30 h-[400px]">
        {" "}
        <Banner></Banner>
      </div>
      <div className="lg:mt-56">
        <FeaturedFoods></FeaturedFoods>
      </div>
      <div className="my-20">  <RecentlyAddedFoods></RecentlyAddedFoods></div>
    
      <div className="my-20"><GamificationBadge></GamificationBadge></div>
      <div className="my-20">
        <Testimonials></Testimonials>
      </div>
      <div className="my-20"> <CommunityHighlights></CommunityHighlights></div>
      <div className="my-20"><CallToActionVolunteering></CallToActionVolunteering></div>
      {/* <div className="my-20"><Partners></Partners></div> */}
      <div className="my-20"><ImpactStats></ImpactStats></div>
      {/* <div className="my-20"><HowItWorks></HowItWorks></div> */}
      
      
     
      
    </div>
  );
};

export default Home;
