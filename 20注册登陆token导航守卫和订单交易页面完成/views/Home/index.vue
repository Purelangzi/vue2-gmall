<template>
  <div>
    <TypeNav />
    <ListContainer />
    <Recommend />
    <Rank />
    <Like />
    <Floor v-for="floor in floorList" :key="floor.id" :floor="floor"/>
    <Brand/>
  </div>
</template>


<script>
import ListContainer from "@/views/Home/ListContainer";
import Recommend from "@/views/Home/Recommend";
import Rank from "@/views/Home/Rank";
import Like from "@/views/Home/Like";
import Floor from "@/views/Home/Floor";
import Brand from "@/views/Home/Brand";

import { mapState } from "vuex";
export default {
  name: "Home",
  components: { ListContainer, Recommend, Rank, Like, Floor, Brand},
  mounted() {
    this.$store.dispatch("home/getFloorList");
    this.getUserInfo()
  },
  methods: {
    // 派发action获取用户信息
    async getUserInfo(){
      try {
        await this.$store.dispatch("user/getUserInfo");
      }catch(error){
        console.log(error.message);
      }
    }
  },
  computed: {
    ...mapState({
      floorList: (state) => state.home.floorList,
    }),
  },
};
</script>

<style>
</style>