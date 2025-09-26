import React from "react";
import Featured from "../../Components/Featured/Featured";
import States from "../../Components/Stats/Stats";
import Stories from "../../Components/CommunityStory/Stories";
import Banner from "../../Components/hero/Banner";
import LatestCharityRequests from "../../Components/LatestCharityRequests/LatestCharityRequests";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <Featured></Featured>
      <LatestCharityRequests></LatestCharityRequests>
      <States></States>
      <Stories></Stories>
    </div>
  );
};

export default Home;
