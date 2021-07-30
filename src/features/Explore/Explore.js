import ComponentContainer from "../../components/component_container/component_container";
import "./Explore.css";
import { useState } from "react";
import ExploreCard from "./ExploreCard";

export default function Explore() {
  const [currentPage, changeCurrentTab] = useState("Following");

  function tabHandler(e) {
    if (e.target.id === "Followers" || "Following") {
      changeCurrentTab(e.target.id);
    }
  }
  return (
    <div class="explore">
      <ComponentContainer>
        <div class="flex-menu">
          <div
            class="user-button"
            style={{
              borderBottom: currentPage === "Following" ? "2px solid" : ""
            }}
            id="Following"
            onClick={tabHandler}
          >
            Following
          </div>
          <div
            class="user-button"
            style={{
              borderBottom: currentPage === "Followers" ? "2px solid" : ""
            }}
            id="Followers"
            onClick={tabHandler}
          >
            Followers
          </div>
        </div>
      </ComponentContainer>
      <ExploreCard card_type={currentPage} />
    </div>
  );
}
