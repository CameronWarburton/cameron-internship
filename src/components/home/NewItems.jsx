import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Slider from "react-slick";

const NewItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getData() {
    const response = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems`
    );
    const results = response.data;
    setItems(results);
  }
  useEffect(() => {
    getData();
  }, []);

  setTimeout(() => {
    setLoading(false);
  }, 3000);

  function CountdownTimer({ expiryDate }) {
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(expiryDate));

    useEffect(() => {
      if (!expiryDate) return;

      const interval = setInterval(() => {
        const updatedTime = calculateTimeLeft(expiryDate);
        setTimeLeft(updatedTime);

        if (updatedTime.total <= 0) {
          clearInterval(interval);
        }
      }, 1000);

      return () => clearInterval(interval);
    }, [expiryDate]);

    function calculateTimeLeft(expiry) {
      const now = Date.now();
      const difference = expiry - now;

      if (difference <= 0) {
        return { hours: 0, minutes: 0, seconds: 0, total: 0 };
      }

      return {
        hours: Math.floor(difference / (1000 * 60 * 60)),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        total: difference,
      };
    }

    if (timeLeft.total < +0) return null;

    return (
      <div className="de_countdown">
        {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
      </div>
    );
  }

  function Arrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          background: "gray",
          borderRadius: "50px",
        }}
        onClick={onClick}
      />
    );
  }

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <Arrow />,
    prevArrow: <Arrow />,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <Slider {...settings}>
            {loading
              ? new Array(4).fill(0).map((_, index) => (
                  <div className="px-1" key={index}>
                      <div className="author_list_pp">
                        <div
                          className="skeleton-box"
                          style={{
                            width: "50px",
                            height: "50px",
                            borderRadius: "50%",
                          }}
                        ></div>
                        <i className="fa fa-check"></i>
                      </div>
                      <div
                        className="skeleton-box"
                        style={{
                          width: "80px",
                          height: "25px",
                          margin: "10px 0",
                          right: "-200px",
                        }}
                      ></div>
                    <div className="nft_wrap">
                      <div
                        className="skeleton-box"
                        style={{
                          width: "100%",
                          height: "200px",
                          borderRadius: "10px",
                        }}
                      ></div>
                    </div>
                    <div className="nft__item_info">
                      <div
                        className="skeleton-box"
                        style={{
                          width: "100px",
                          height: "20px",
                          marginBottom: "5px",
                        }}
                      ></div>
                      <br />
                      <div
                        className="skeleton-box"
                        style={{ width: "60px", height: "20px" }}
                      ></div>
                    </div>
                  </div>
                ))
              : items.map((item, index) => (
                  <div key={index} className="px-1">
                    <div className="nft__item">
                      <div className="author_list_pp">
                        <Link
                          to={`/item-details/${item.authorId}`}
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title="Creator: Monica Lucas"
                        >
                          <img
                            className="lazy"
                            src={`${item.authorImage}`}
                            alt=""
                          />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      {item.expiryDate && <CountdownTimer expiryDate={item.expiryDate} />}

                      <div className="nft__item_wrap">
                        <div className="nft__item_extra">
                          <div className="nft__item_buttons">
                            <button>Buy Now</button>
                            <div className="nft__item_share">
                              <h4>Share</h4>
                              <a href="" target="_blank" rel="noreferrer">
                                <i className="fa fa-facebook fa-lg"></i>
                              </a>
                              <a href="" target="_blank" rel="noreferrer">
                                <i className="fa fa-twitter fa-lg"></i>
                              </a>
                              <a href="">
                                <i className="fa fa-envelope fa-lg"></i>
                              </a>
                            </div>
                          </div>
                        </div>

                        <Link to={`/item-details/${item.nftId}`}>
                          <img
                            src={`${item.nftImage}`}
                            className="lazy nft__item_preview"
                            alt=""
                          />
                        </Link>
                      </div>
                      <div className="nft__item_info">
                        <Link to="/item-details">
                          <h4>{`${item.title}`}</h4>
                        </Link>
                        <div className="nft__item_price">
                          {`${item.price}`} ETH
                        </div>
                        <div className="nft__item_like">
                          <i className="fa fa-heart"></i>
                          <span>{`${item.likes}`}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
