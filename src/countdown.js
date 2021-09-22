export default function countdown() {
  const countdownDate = new Date("Dec 31, 2021 23:59:59").getTime();

  let x = setInterval(function () {
    const now = new Date().getTime();

    let diff = countdownDate - now;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    const daysText = document.querySelector(".days");
    const hoursText = document.querySelector(".hours");
    const minutesText = document.querySelector(".minutes");
    const secondsText = document.querySelector(".seconds");

    daysText.textContent = days;
    hoursText.textContent = hours;
    minutesText.textContent = minutes;
    secondsText.textContent = seconds;

    const datesDocs = [daysText, hoursText, minutesText, secondsText];

    if (diff < 0) {
      clearInterval(x);
      datesDocs.forEach((el) => (el.textContent = "00"));
    }
  }, 1000);
}
