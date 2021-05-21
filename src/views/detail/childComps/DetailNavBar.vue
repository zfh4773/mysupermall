<template>
  <div id="detailnavbar">
    <nav-bar>
      <div slot="left" class="iconleft" @click="backClick">&#xe741;</div>
      <div slot="center" class="title">
        <span
          v-for="(item, index) in title"
          :key="index"
          @click="itemClick(index)"
          :class="{ active: index === currentindex }"
          >{{ item }}</span
        >
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "../../../components/common/navbar/NarBar";
export default {
  data() {
    return {
      title: ["商品", "参数", "评论", "推荐"],
      currentindex: 0,
    };
  },
  components: {
    NavBar,
  },
  methods: {
    itemClick(index) {
      this.currentindex = index;
      console.log(this.currentindex);
    },
    backClick() {
      this.$router.back();
      this.$bus.$emit("routerback");
    },
  },
};
</script>

<style scoped>
.title {
  display: flex;
}
#detailnavbar span {
  flex: 1;
  font-size: 16px;
}
.iconleft {
  font-family: iconfont;
  text-align: center;
}
.active {
  color: var(--color-high-text);
}
</style>