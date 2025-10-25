import React from "react";
import Featured from "../../Components/Featured/Featured";
import States from "../../Components/Stats/Stats";
import Stories from "../../Components/CommunityStory/Stories";
import Banner from "../../Components/hero/Banner";
import LatestCharityRequests from "../../Components/LatestCharityRequests/LatestCharityRequests";
import Faq from "../../Components/Faq/Faq";
import HowDonationsHelp from "../../Components/HowDonationsHelp/HowDonationsHelp";
import ConnectedPartners from "../../Components/ConnectedPartners/ConnectedPartners";
import AwardsSection from "../../Components/AwardsSection/AwardsSection";

const Home = () => {
  return (
    <div className="mx-3 sm:mx-8 lg:mx-10 lg:space-y-20 sm:space-y-16 space-y-10">
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
      </div>{" "}
      <div>
        {" "}
        <HowDonationsHelp></HowDonationsHelp>
      </div>
        <div>
        {" "}
        <AwardsSection></AwardsSection>
      </div>
      <div>
        {" "}
        <ConnectedPartners></ConnectedPartners>
      </div>
    </div>
  );
};

export default Home;
