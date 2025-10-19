import React from "react";
import Featured from "../../Components/Featured/Featured";
import States from "../../Components/Stats/Stats";
import Stories from "../../Components/CommunityStory/Stories";
import Banner from "../../Components/hero/Banner";
import LatestCharityRequests from "../../Components/LatestCharityRequests/LatestCharityRequests";
import Faq from "../../Components/Faq/Faq";
import HowDonationsHelp from "../../Components/HowDonationsHelp/HowDonationsHelp";

const Home = () => {
  return (
    <div className="mx-5 sm:mx-10 lg:mx-12 space-y-28">
      <div>
        {" "}
        <Banner></Banner>{" "}
      </div>
      <div>
        <Featured></Featured>
      </div>
      <div>
        {" "}
        <LatestCharityRequests></LatestCharityRequests>
      </div>
      <div>
        {" "}
        <States></States>
      </div>
      <div>
        {" "}
        <Stories></Stories>
      </div>
      <div>
        {" "}
        <Faq></Faq>
      </div>  <div>
        {" "}
        <HowDonationsHelp></HowDonationsHelp>
      </div>
    </div>
  );
};

export default Home;
