import * as $ from "jquery";
import slick from "slick-carousel";

export default $(".header__slider").slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  speed: 1000,
  arrows: false,
  asNavFor: ".categories",
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
  autoplay: true,
  speed: 1000,
  arrows: true,
  responsive: [
    {
      breakpoint: 1400,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 1920,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
  ],
});
