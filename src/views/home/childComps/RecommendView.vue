<template>
  <div class="recommends">
    <div
      v-for="(item, index) in recommends"
      :key="index"
      class="recommends-item"
    >
      <a :href="item.link">
        <img :src="item.image" alt="" />
        <div>{{ item.title }}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "RecommendView",
  props: {
    recommends: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style>
.recommends {
  text-align: center;
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  padding: 10px 0 10px;
  border-bottom: 8px solid #eee;
}
.recommends-item {
  flex: 1;
}
.recommends-item img {
  width: 80%;
  margin-bottom: 8px;
}
</style>