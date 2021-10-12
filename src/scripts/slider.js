import * as $ from "jquery";

export function sliderArrival() {
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
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        },
      },
    ],
  });
}

export function sliderFeature() {
  $(".feature__products").slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    cssEase: "linear",
    autoplay: true,
    autoplaySpeed: 4000,
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
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 578,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  });
}

export function sliderHeader() {
  $(".header__slider").slick({
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

    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  });
}

export default import("slick-carousel").then(() => {
  // $(".header__slider").slick({
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  //   infinite: true,
  //   autoplay: true,
  //   autoplaySpeed: 3000,
  //   arrows: false,
  //   asNavFor: ".categories",
  //   cssEase: "linear",
  // });
  // $(".categories").slick({
  //   slidesToShow: 5,
  //   asNavFor: ".slider",
  //   focusOnSelect: true,
  //   arrows: false,

  //   responsive: [
  //     {
  //       breakpoint: 1200,
  //       settings: {
  //         slidesToShow: 2,
  //         slidesToScroll: 1,
  //       },
  //     },
  //   ],
  // });

  $(".testimoniails__slider").slick({
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    adaptiveHeight: true,
    arrows: true,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        },
      },
    ],
  });
});
