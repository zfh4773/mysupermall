<template>
  <div id="detail">
    <detail-nav-bar></detail-nav-bar>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";

import { getDetail } from "../../network/detail";

export default {
  data() {
    return {
      iid: null,
    };
  },
  components: {
    DetailNavBar,
  },
  created() {
    //保存传入的iid
    this.iid = this.$route.params.iid;
    console.log(this.iid);
    //根据iid请求数据
    getDetail(this.iid).then((res) => {
      console.log(res);
    });
  },
};
</script>

<style scoped>
</style>