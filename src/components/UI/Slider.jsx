import React from "react";
import { Link } from "react-router-dom";
import OwlCarousel from "react-owl-carousel";
import Skeleton from "./Skeleton";

const Slider = ({ hotCollections, loading }) => {
  return (
    <OwlCarousel className="owl-theme"
     loop 
     margin={10} 
     nav
     items={4}
     responsive={{
        0: { items: 1 },
        600: { items: 2 },
        1000: { items: 4 }
     }}>
       {loading
        ? Array(4).fill(0).map((_, index) => (
            <div key={index} className="skeleton__card">
              <Skeleton width="100%" height="150px" borderRadius="10px" />
              <div className="skeleton__avatar-wrapper">
                <Skeleton width="50px" height="50px" borderRadius="50%" />
                <i className="fa fa-check skeleton__icon"></i>
              </div>
              <Skeleton width="80%" height="20px" borderRadius="5px" />
              <Skeleton width="60%" height="15px" borderRadius="5px" />
            </div>
          ))
        : hotCollections.map((collection) => (
        <div key={collection.id}>
          <div className="nft_coll">
            <div className="nft_wrap">
              <Link to="/item-details">
                <img
                  src={collection.nftImage}
                  className="lazy img-fluid"
                  alt=""
                />
              </Link>
            </div>
            <div className="nft_coll_pp">
              <Link to="/author">
                <img
                  className="lazy pp-coll"
                  src={collection.authorImage}
                  alt=""
                />
              </Link>
              <i className="fa fa-check"></i>
            </div>
            <div className="nft_coll_info">
              <Link to="/explore">
                <h4>{collection.title}</h4>
              </Link>
              <span>ERC-{collection.code}</span>
            </div>
          </div>
        </div>
      ))}
    </OwlCarousel>
  );
};

export default Slider;
