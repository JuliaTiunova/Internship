// import display from "./displayProd";
// import * as $ from "jquery";

// const setUpCategories = (store, categoriesDOM, slider) => {
//   const listItem = document.querySelectorAll(".list__item_small");

//   categoriesDOM.addEventListener("click", (e) => {
//     const element = e.target;
//     function addActive() {
//       listItem.forEach((item) =>
//         item.classList.contains("item_small_active")
//           ? item.classList.remove("item_small_active")
//           : item
//       );
//       element.classList.add("item_small_active");
//     }

//     let newStore = [];
//     if (element.innerHTML.toLowerCase() === "all") {
//       newStore = store.filter((product) => product);
//       addActive();
//     } else if (element.textContent.toLowerCase() === "meats") {
//       newStore = store.filter((product) => product.company === "liddy");
//       addActive();
//     } else if (element.textContent.toLowerCase() === "vegetables") {
//       newStore = store.filter((product) => product.price === 999);
//       addActive();
//     } else if (element.textContent.toLowerCase() === "grain") {
//       newStore = store.filter((product) => product);
//       addActive();
//     } else if (element.textContent.toLowerCase() === "fruits") {
//       newStore = store.filter((product) => product.company === "liddy");
//       addActive();
//     } else if (element.textContent.toLowerCase() === "other") {
//       newStore = store.filter((product) => product.price === 999);
//       addActive();
//     }

//     slider.className = slider.classList[0];
//     if (slider.className === "feature__products" && newStore.length <= 4) {
//       for (let i = newStore.length; newStore.length <= 4; i++) {
//         newStore.push(...newStore);
//       }
//     }
//     display(newStore, slider, true);

//     if (slider.className === "arrival__slider") {
//       import("slick-carousel").then(() => {
//         $(".arrival__slider").slick({
//           slidesToShow: 5,
//           slidesToScroll: 2,
//           cssEase: "linear",
//           autoplay: true,
//           autoplaySpeed: 4000,
//           arrows: true,
//           responsive: [
//             {
//               breakpoint: 1920,
//               settings: {
//                 slidesToShow: 4,
//                 slidesToScroll: 1,
//               },
//             },
//             {
//               breakpoint: 1400,
//               settings: {
//                 slidesToShow: 3,
//                 slidesToScroll: 1,
//               },
//             },
//             {
//               breakpoint: 768,
//               settings: {
//                 slidesToShow: 1,
//                 slidesToScroll: 1,
//                 arrows: false,
//               },
//             },
//           ],
//         });
//       });
//     }

//     if (slider.className === "feature__products") {
//       $(".feature__products").slick({
//         slidesToShow: 4,
//         slidesToScroll: 1,
//         cssEase: "linear",
//         autoplay: true,
//         autoplaySpeed: 4000,
//         arrows: true,
//         responsive: [
//           {
//             breakpoint: 1400,
//             settings: {
//               slidesToShow: 3,
//               slidesToScroll: 1,
//             },
//           },
//           {
//             breakpoint: 768,
//             settings: {
//               slidesToShow: 2,
//               slidesToScroll: 1,
//             },
//           },
//           {
//             breakpoint: 578,
//             settings: {
//               slidesToShow: 1,
//             },
//           },
//         ],
//       });
//     }
//   });
// };

// export default setUpCategories;
