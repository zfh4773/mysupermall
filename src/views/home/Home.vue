<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
      ref="tabControl1"
      v-show="isTabFixed"
      class="tabClone"
    />
    <!-- 滚动组件 scroll -->
    <scroll
      class="content"
      ref="Scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pullUpLoad="true"
      @pullingUp="loadMore"
    >
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad" />
      <recommend-view :recommends="recommends" />
      <feature-view></feature-view>
      <tab-control
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl2"
      />
      <!-- 给组件GoodsList组件props传输 -->
      <goods-list :goods="show" />
    </scroll>
    <back-top
      @click.native="backClick"
      ref="backtop"
      v-show="backTopisshow"
    ></back-top>
  </div>
</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import featureView from "./childComps/featureView";

import NavBar from "../../components/common/navbar/NarBar";
import TabControl from "../../components/content/tabControl/TabControl";
import GoodsList from "../../components/content/goods/GoodsList";
import Scroll from "../../components/common/scroll/Scroll";
import backTop from "../../components/content/backTop/backTop";

import { getHomeMultidata, getHomeGoods } from "../../network/home";
import { debounce } from "../../common/utils";

export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    featureView,
    TabControl,
    GoodsList,
    Scroll,
    backTop,
  },
  created() {
    // 1.请求多个数据
    this.getHomeMultidata();
    //2.请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
    //监听item中图片加载完成
    const refresh = debounce(this.$refs.Scroll.refresh, 100);
    this.$bus.$on("itemImgLoad", () => {
      refresh();
    });
  },
  methods: {
    //事件监听相关方法
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    backClick() {
      //调用scroll组件的滚动方法
      this.$refs.Scroll.scrollTo(0, 0);
    },
    contentScroll(position) {
      // 判断返回顶部按钮是否显示
      position.y < -2000
        ? (this.backTopisshow = true)
        : (this.backTopisshow = false);
      //决定tabcontrol是否吸顶（position: fixed)
      this.isTabFixed = -position.y > this.tabOffsetTop;
    },
    //上拉加载更多
    loadMore() {
      console.log(1);
      this.getHomeGoods(this.currentType);
      this.$refs.Scroll.scroll.refresh();
      this.$refs.Scroll.finishPullUp();
    },
    //网络情求相关方法
    // 1.请求多个数据
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        // console.log(res);
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    //2.请求商品数据
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
      });
    },
    swiperImageLoad() {
      //获取tabControl 的offsettop
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
      this.$refs.Scroll.refresh();
    },
  },
  computed: {
    //给goodslistitem发送数据
    show() {
      return this.goods[this.currentType].list;
    },
  },
  //-----离开home页面再回去让内容保持不动的功能start----//
  //进入home页面时
  activated() {
    this.$refs.Scroll.refresh();
    this.$refs.Scroll.scrollTo(0, this.svaeY);
  },
  //离开home页面时
  deactivated() {
    this.svaeY = this.$refs.Scroll.scroll.y;
  },
  //-----离开home页面再回去让内容保持不动的功能end----//
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      // tabControl到达位置定位距离
      tabOffsetTop: 0,
      // 回到顶部箭头是否显示
      backTopisshow: false,
      //tabControl是否定位
      isTabFixed: false,
      // 离开home页面时保存的值
      svaeY: 0,
    };
  },
};
</script>

<style scoped>
#home {
  position: relative;
  height: 100vh;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  /* position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9; */
}
.content {
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
  height: calc(100vh);
  overflow: hidden;
}
.tabClone {
  position: relative;
  left: 0;
  top: 0;
  z-index: 9;
}
</style>
