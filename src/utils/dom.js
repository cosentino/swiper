import {
  //   $,
  //   addClass,
  //   removeClass,
  //   hasClass,
  //   toggleClass,
  //   attr,
  //   removeAttr,
  transform,
  transition,
  //   on,
  //   off,
  //   trigger,
  transitionEnd,
  //   outerWidth,
  //   outerHeight,
  //   styles,
  //   offset,
  //   css,
  //   each,
  //   html,
  //   text,
  //   is,
  //   index,
  //   eq,
  //   append,
  //   prepend,
  //   next,
  //   nextAll,
  //   prev,
  //   prevAll,
  //   parent,
  //   parents,
  //   closest,
  //   find,
  //   children,
  //   filter,
  //   remove,
} from 'dom7';

// CUSTOM!
// Replace Dom7 with jQuery (needed to be manually installed before swiper)
// to fix the conflict between Dom7.find method with the Array find polyfill for IE11.

// eslint-disable-next-line
const $ = window.$;

const Methods = {
  //   addClass,
  //   removeClass,
  //   hasClass,
  //   toggleClass,
  //   attr,
  //   removeAttr,
  transform,
  transition,
  //   on,
  //   off,
  //   trigger,
  transitionEnd,
  //   outerWidth,
  //   outerHeight,
  //   styles,
  //   offset,
  //   css,
  //   each,
  //   html,
  //   text,
  //   is,
  //   index,
  //   eq,
  //   append,
  //   prepend,
  //   next,
  //   nextAll,
  //   prev,
  //   prevAll,
  //   parent,
  //   parents,
  //   closest,
  //   find,
  //   children,
  //   filter,
  //   remove,
};

Object.keys(Methods).forEach((methodName) => {
  $.fn[methodName] = Methods[methodName];
});

export default $;
