import $ from '../../utils/dom';
import { bindModuleMethods } from '../../utils/utils';

const Coverflow = {
  setTranslate() {
    const swiper = this;
    const { width: swiperWidth, height: swiperHeight, slides, slidesSizesGrid } = swiper;
    const params = swiper.params.coverflowEffect;
    const isHorizontal = swiper.isHorizontal();
    const transform = swiper.translate;
    const center = isHorizontal ? -transform + swiperWidth / 2 : -transform + swiperHeight / 2;
    const rotate = isHorizontal ? params.rotate : -params.rotate;
    const translate = params.depth;
    // Each slide offset from center
    for (let i = 0, length = slides.length; i < length; i += 1) {
      const $slideEl = slides.eq(i);
      const slideSize = slidesSizesGrid[i];
      const slideOffset = $slideEl[0].swiperSlideOffset;
      const offsetMultiplier =
        ((center - slideOffset - slideSize / 2) / slideSize) * params.modifier;

      // let rotateY = isHorizontal ? rotate * offsetMultiplier : 0;
      // let rotateX = isHorizontal ? 0 : rotate * offsetMultiplier;
      let rotateY = 0;
      let rotateX = 0;
      let rotateZ = -rotate * offsetMultiplier;
      let translateZ = -translate * Math.abs(offsetMultiplier);

      let stretch = params.stretch;
      // Allow percentage to make a relative stretch for responsive sliders
      if (typeof stretch === 'string' && stretch.indexOf('%') !== -1) {
        stretch = (parseFloat(params.stretch) / 100) * slideSize;
      }

      // BEGIN: CUSTOM ARC EFFECT
      // let translateY = isHorizontal ? 0 : stretch * offsetMultiplier;
      // let translateX = isHorizontal ? stretch * offsetMultiplier : 0;
      let translateY = 0;
      let translateX = -slideOffset;
      // END: CUSTOM ARC EFFECT

      let scale = 1 - (1 - params.scale) * Math.abs(offsetMultiplier);

      // Fix for ultra small values
      if (Math.abs(translateX) < 0.001) translateX = 0;
      if (Math.abs(translateY) < 0.001) translateY = 0;
      if (Math.abs(translateZ) < 0.001) translateZ = 0;
      if (Math.abs(rotateY) < 0.001) rotateY = 0;
      if (Math.abs(rotateX) < 0.001) rotateX = 0;
      if (Math.abs(rotateZ) < 0.001) rotateZ = 0;
      if (Math.abs(scale) < 0.001) scale = 0;

      const slideTransform = `translate3d(${translateX}px,${translateY}px,${translateZ}px)  rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg) scale(${scale})`;

      $slideEl.transform(slideTransform);
      $slideEl[0].style.zIndex = -Math.abs(Math.round(offsetMultiplier)) + 1;
      if (params.slideShadows) {
        // Set shadows
        let $shadowBeforeEl = isHorizontal
          ? $slideEl.find('.swiper-slide-shadow-left')
          : $slideEl.find('.swiper-slide-shadow-top');
        let $shadowAfterEl = isHorizontal
          ? $slideEl.find('.swiper-slide-shadow-right')
          : $slideEl.find('.swiper-slide-shadow-bottom');
        if ($shadowBeforeEl.length === 0) {
          $shadowBeforeEl = $(
            `<div class="swiper-slide-shadow-${isHorizontal ? 'left' : 'top'}"></div>`,
          );
          $slideEl.append($shadowBeforeEl);
        }
        if ($shadowAfterEl.length === 0) {
          $shadowAfterEl = $(
            `<div class="swiper-slide-shadow-${isHorizontal ? 'right' : 'bottom'}"></div>`,
          );
          $slideEl.append($shadowAfterEl);
        }
        if ($shadowBeforeEl.length)
          $shadowBeforeEl[0].style.opacity = offsetMultiplier > 0 ? offsetMultiplier : 0;
        if ($shadowAfterEl.length)
          $shadowAfterEl[0].style.opacity = -offsetMultiplier > 0 ? -offsetMultiplier : 0;
      }
    }
  },
  setTransition(duration) {
    const swiper = this;

    // Restore animating=false to allow for slideNext and slidePrev
    // See also: https://github.com/nolimits4web/swiper/issues/1267
    setTimeout(function () {
      swiper.animating = false;
    }, duration);

    swiper.slides
      .transition(duration)
      .find(
        '.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left',
      )
      .transition(duration);
  },
};

export default {
  name: 'effect-coverflow',
  params: {
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      scale: 1,
      modifier: 1,
      slideShadows: true,
    },
  },
  create() {
    const swiper = this;
    bindModuleMethods(swiper, {
      coverflowEffect: {
        ...Coverflow,
      },
    });
  },
  on: {
    beforeInit(swiper) {
      if (swiper.params.effect !== 'coverflow') return;

      swiper.classNames.push(`${swiper.params.containerModifierClass}coverflow`);
      swiper.classNames.push(`${swiper.params.containerModifierClass}3d`);

      swiper.params.watchSlidesProgress = true;
      swiper.params.virtualTranslate = true;
      swiper.originalParams.watchSlidesProgress = true;
      swiper.originalParams.virtualTranslate = true;
    },
    setTranslate(swiper) {
      if (swiper.params.effect !== 'coverflow') return;
      swiper.coverflowEffect.setTranslate();
    },
    setTransition(swiper, duration) {
      if (swiper.params.effect !== 'coverflow') return;
      swiper.coverflowEffect.setTransition(duration);
    },
  },
};
