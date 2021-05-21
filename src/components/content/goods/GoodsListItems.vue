<template>
  <div class="goods-item" @click="itemClick">
    <img :src="goodsItem.show.img" alt="" @load="imagesLoad" />
    <div>
      <p>{{ goodsItem.title }}</p>
      <span class="price">{{ goodsItem.price }}</span>
      <i>&#xe544;</i>
      <span class="collect">{{ goodsItem.cfav }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    goodsItem: {
      type: Object,
      defult() {
        return {};
      },
    },
  },
  methods: {
    imagesLoad() {
      this.$bus.$emit("itemImgLoad");
    },
    itemClick() {
      this.$router.push("/detail/" + this.goodsItem.iid);
    },
  },
};
</script>

<style>
.goods-item {
  padding-left: 10px;
  padding-right: 10px;
  width: 50%;
}
.goods-item div {
  text-align: center;
}
.goods-item img {
  width: 100%;
  border-radius: 5px;
}
.goods-item p {
  white-space: nowrap;
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
}
.price {
  font-size: 12px;
  color: #d5492b;
}
.collect {
  font-size: 12px;
}
i {
  font-family: iconfont;
  margin: 3px;
  color: #d5492b;
}
</style>