<template>
  <div v-if="Object.keys(goods).lenght !== 0" class="base-info">
    <!-- 标题 -->
    <div class="title">
      {{ goods.desc }}
    </div>
    <!-- 价格 -->
    <div class="price">
      <span>￥{{ goods.realprice }}</span>
      <span>{{ goods.oldPrice }}</span>
      <span>{{ goods.discount }}</span>
    </div>
    <!-- 说明 -->
    <div class="message">
      <!-- <span>{{ goods.columns[0] }}</span>
      <span>{{ goods.columns[1] }}</span>
      <span>{{ goods.columns[2] }}</span> -->
      <span v-for="(item, index) in goods.columns" :key="index">{{
        item
      }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    goods: {
      type: Object,
      defult() {
        return {};
      },
    },
  },
};
</script>

<style scoped>
.title {
  padding: 0 5px;
  text-indent: 1em;
  margin-top: 10px;
  font-size: 14px;
}
.price {
  position: relative;
  margin: 10px 5px;
}
.price span:first-child {
  font-size: 18px;
  margin-right: 5px;
  color: #ff5777;
}
.price span:nth-child(2) {
  font-size: 10px;
  text-decoration: line-through;
  margin-right: 5px;
}
.price span:nth-child(3) {
  position: absolute;
  top: -3px;
  border-radius: 5px;
  background-color: #ff5777;
  display: inline-block;
  color: #fff;
  font-size: 10px;
  padding: 0 3px;
}
.message {
  padding: 5px 5px;
  margin-top: 10px;
  justify-content: space-between;
  display: flex;
  text-align: center;
  border-bottom: 1px solid rgb(238, 236, 236);
}
.message span {
  font-size: 12px;
  color: #a69999;
}
</style>