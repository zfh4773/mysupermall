<template>
  <div class="detail">
    <detail-nav-bar class="navbar" @titleClick="titleClick" />
    <scroll class="content" ref="Scroll">
      <detail-swiper :topImages="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @imgLoad="imageLoad" />
      <detail-param-info
        :paramInfo="paramInfo"
        ref="DetailParamInfo"
        class="param"
      />
    </scroll>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";

import Scroll from "../../components/common/scroll/Scroll";

import { getDetail, Goods, Shop, GoodsParam } from "../../network/detail";

export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      themeTopYs: [],
    };
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    Scroll,
  },
  methods: {
    imageLoad() {
      this.$refs.Scroll.scroll.refresh();
    },
    titleClick(index) {
      this.$refs.Scroll.scrollTo(0, -this.themeTopYs[index], 1000);
    },
  },
  mounted() {
    this.themeTopYs.push(0);
    this.themeTopYs.push(this.$refs.DetailParamInfo.$el.offsetTop);
    this.themeTopYs.push(2);
    this.themeTopYs.push(3);
  },
  created() {
    //保存传入的iid
    this.iid = this.$route.params.iid;
    //根据iid请求数据
    getDetail(this.iid).then((res) => {
      const data = res.result;
      // 获取顶部图片的轮播数据
      console.log(res);
      this.topImages = res.result.itemInfo.topImages;
      //获取说明内容
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.servise
      );
      //获取商家信息
      this.shop = new Shop(data.shopInfo);
      //商品的详细数据
      this.detailInfo = data.detailInfo;
      //获取商品参数信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );
    });
  },
};
</script>

<style scoped>
.navbar {
  z-index: 9999;
  position: relative;
  top: 0;
  left: 0;
  background-color: #fff;
}
.detail {
  position: relative;
  z-index: 999;
  background-color: #fff;
  height: 100vh;
}
.content {
  height: calc(100% - 44px);
}
.param {
  background-color: #fff;
}
</style>