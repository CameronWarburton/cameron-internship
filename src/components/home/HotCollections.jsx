import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "../UI/Slider";

const HotCollections = () => {
  const [hotCollections, setHotCollections] = useState([]);

  async function getHotCollections() {
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
    );
    setHotCollections(data);
  }

  useEffect(() => {
    getHotCollections();
  }, []);


  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          <Slider hotCollections={hotCollections} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
