<template>
  <swiper class="swiperbox">
    <swiper-item v-for="(item, index) in topImages" :key="index">
      <img :src="item" alt="" />
    </swiper-item>
  </swiper>
</template>

<script>
//引入轮播图功能,这个文件夹里面有个index文件，所以默认导出index文件
import { Swiper, SwiperItem } from "../../../components/common/swiper";
export default {
  props: {
    topImages: {
      type: Array,
      defult() {
        return [];
      },
    },
  },
  components: {
    Swiper,
    SwiperItem,
  },
};
</script>

<style scoped>
.swiperbox {
  height: 300px;
  overflow: hidden;
}
</style>