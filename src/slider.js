import * as $ from "jquery";
import slick from "slick-carousel";

export default $(".header__slider").slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  infinite: true,
  autoplay: true,
  autoplaySpeed: 3000,
  arrows: false,
  asNavFor: ".categories",
  cssEase: "linear",
});
$(".categories").slick({
  slidesToShow: 5,
  asNavFor: ".slider",
  focusOnSelect: true,
  arrows: false,
});

$(".arrival__slider").slick({
  slidesToShow: 5,
  slidesToScroll: 2,
  cssEase: "linear",
  autoplay: true,
  autoplaySpeed: 4000,
  arrows: true,
  responsive: [
    {
      breakpoint: 1920,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 1400,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
  ],
});

$(".testimoniails__slider").slick({
  slidesToShow: 2,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 5000,
  arrows: true,
  centerPadding: "30px",
  cssEase: "linear",
});
