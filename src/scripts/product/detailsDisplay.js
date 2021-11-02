import { getElement, getStorageItem } from "../assets";
import productSliderTop from "../../templates/productSliderTop.handlebars";
import productSliderBottom from "../../templates/productSliderBottom.handlebars";
import productDetails from "../../templates/productDetails.handlebars";
import { sliderProduct, sliderViewedProd } from "../slider";
import { getRelated } from "./related";
import { setLastViewed } from "./setLastViewed";
import { getLastViewed } from "./getLAstViewed";
import { countListener } from "./countListener";
import { descriptListener } from "./descriptListener";
import { addReview } from "./review/addReview";
import { changeShippingText } from "./shippingSet";
import { postReview } from "./review/postReview";
import { buttonsListenerCart } from "../display/listeners";

export function displayProduct() {
  const stock = getStorageItem("stock");
  const sliderTop = getElement(".pic__slider_top");
  const sliderBottom = getElement(".pic__slider_bottom");
  const detailsInfo = getElement(".details__info");
  let url = window.location.href;
  let urlCut = url.split("=");
  let id = urlCut[1];
  setLastViewed(id);
  getLastViewed();

  buttonsListenerCart(detailsInfo);

  let product = new XMLHttpRequest();
  product.open("GET", `http://localhost:3030/products?id=${id}`);
  product.responseType = "json";
  product.send();
  product.onload = function() {
    let response = product.response;
    let data = response.data[0];
    let item = stock.find((ent) => ent.id === data.id);
    data.stock = item.stock;
    sliderTop.innerHTML = productSliderTop(data);
    sliderBottom.innerHTML = productSliderBottom(data);
    detailsInfo.innerHTML = productDetails(data);
    sliderProduct();
    sliderViewedProd();
    countListener("quantity");
    descriptListener();
    addReview(data.id, data.name);
    changeShippingText();
    postReview();

    for (let i = 4; i >= 0; i--) {
      if (data.categories[i]) {
        return getRelated(data.categories[i].id);
      }
    }
  };
}
