import { getStorageItem } from "../assets";
import { getPercent } from "../checkout/displayCartItems";

export const getTotals = (cart) => {
  const services = getStorageItem("services");
  const coupon = getStorageItem("coupon");
  const percent = getPercent(coupon);

  let cartTotal, serviceTotal, discount, newTotal;

  cartTotal = getTotal();
  services.length > 0 ? (serviceTotal = getServiceTotal()) : (serviceTotal = 0);
  let totals = {
    total: cartTotal,
    serviceTotal: serviceTotal,
  };
  coupon.length > 0 ? (discount = getDiscount(totals)) : (discount = 0);
  totals.discount = discount;
  newTotal = getNewTotal(totals);
  totals.newTotal = newTotal;

  function getTotal() {
    let total = cart.reduce(
      (total, item) => total + item.price * item.amount,
      0
    );
    return total;
  }
  function getServiceTotal() {
    return services.reduce((total, item) => total + item.name, 0);
  }
  function getDiscount(item) {
    return (item.total + item.serviceTotal) * percent;
  }
  function getNewTotal(item) {
    return item.total + item.serviceTotal - getDiscount(item);
  }

  return totals;
};
