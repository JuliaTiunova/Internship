import "./styles/styles.scss";
import "./scripts/slider";

import cart from "./scripts/cart";
import burger from "./scripts/burger";
import countdown from "./scripts/countdown";

cart();
const burgerButton = document.getElementById("index-burger");
burger(burgerButton);
countdown();
