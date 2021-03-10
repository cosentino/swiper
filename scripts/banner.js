const pkg = require('../package.json');

const date = {
  day: new Date().getDate(),
  month: 'January February March April May June July August September October November December'.split(
    ' ',
  )[new Date().getMonth()],
  year: new Date().getFullYear(),
};

module.exports = (name = null) =>
  `${`
/**
 * Swiper ${name ? `${name} ` : ''}${pkg.version}
 * ${pkg.description}
 * ${pkg.homepage}
 *
 * Copyright 2014-${date.year} ${pkg.author}
 *
 * Released under the ${pkg.license} License
 *
 * Released on: ${date.month} ${date.day}, ${date.year}
 *
 * -----------
 * FORKED AND CUSTOMIZED BY MARCELLO COSENTINO for FRG "Storie di Seta"
 * see https://github.com/cosentino/swiper
 * -----------
 */
`.trim()}\n`;
