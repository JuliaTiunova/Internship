import * as $ from "jquery";
import "jquery-mask-plugin";

$(".phone").mask("+00 (000) 000 00 00");

$(".postal-code").mask("ZZZZZ", {
  translation: {
    Z: {
      pattern: /[0-9]/,
    },
  },
});

$(".card-number").mask("ZZZZ ZZZZ ZZZZ ZZZZ", {
  translation: {
    Z: {
      pattern: /[0-9]/,
    },
  },
});

$(".card-exp").mask("ZZ / ZZZZ", {
  placeholder: "__/____",
  translation: {
    Z: {
      pattern: /[0-9]/,
    },
  },
});

$(".card-password").mask("ZZZ", {
  translation: {
    Z: {
      pattern: /[0-9]/,
    },
  },
});
