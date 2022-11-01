<template>
  <div class="floorBanner">
    <div class="swiper-container" ref="carouse">
      <div class="swiper-wrapper">
        <div
          class="swiper-slide"
          v-for="carousel in carouselList"
          :key="carousel.id"
        >
          <img :src="carousel.imgUrl" />
        </div>
      </div>
      <!-- 如果需要分页器 -->
      <div class="swiper-pagination"></div>
      <!-- 如果需要导航按钮 -->
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
    </div>
  </div>
</template>

<script>
import Swiper from "swiper";
export default {
  name: "Carousel",
  props: ["carouselList"],
  watch: {
    carouselList: {
      // 初始化时监听（因为floor数据通过props传过来完整的数据，没有初始值的
      //所以得一上来就监听一次，不然watch没反应(handler也就不会执行））
      immediate: true,
      handler() {
        // 但是banner数据本来就有变化，初始化时监听后carouselList为空会多实例化出一个Swiper，
        // 导致banner轮播图冲突,所以判断carouselList长度
        if (this.carouselList.length === 0) return;
        this.$nextTick(() => {
          new Swiper(this.$refs.carouse, {
            autoplay: {
              delay: 3000, // 自动轮播
              disableOnInteraction: false, //用户操作swiper之后，是否禁止autoplay
            },
            loop: true, // 循环模式选项
            // 如果需要分页器
            pagination: {
              el: ".swiper-pagination",
              clickable: true, // 点击分页器会切换
            },
            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
          });
        });
      },
    },
  },
};
</script>

<style>
</style>