<template>
  <div class="goods">
    <goods-list-items
      v-for="(item, index) in goods"
      :key="index"
      :goods-item="item"
      class="goods-list-items"
    />
  </div>
</template>

<script>
import GoodsListItems from "./GoodsListItems";
export default {
  props: {
    goods: {
      type: Array,
      defult() {
        return [];
      },
    },
  },
  components: {
    GoodsListItems,
  },
};
</script>

<style>
.goods {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}
</style>