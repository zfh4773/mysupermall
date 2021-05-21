<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  props: {
    probeType: {
      type: Number,
      default: 0,
    },
    pullUpLoad: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      scroll: null,
      startY: 0,
    };
  },
  mounted() {
    //1创建BsCROLL对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad,
      startY: this.startY,
    });
    //2监听滚动的位置
    this.scroll.on("scroll", (position) => {
      this.$emit("scroll", position);
      this.startY = this.scroll.startY;
    });
    //3.监听上拉事件
    this.scroll.on("pullingUp", () => {
      //上拉加载更多
      this.$emit("pullingUp");
    });
    this.$bus.$on("routerback", () => {
      this.scroll.refresh();
    });
  },
  methods: {
    scrollTo(x, y, time = 500) {
      this.scroll.scrollTo(x, y, time);
    },
    finishPullUp() {
      this.scroll.finishPullUp();
    },
    refresh() {
      this.$refs.Scroll && this.$refs.Scroll.scroll.refresh();
    },
  },
};
</script>

<style>
</style>