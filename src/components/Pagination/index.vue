<template>
  <div class="pagination">
    <button :disabled="pageNo == 1" @click="sendPageNo(pageNo - 1)">
      上一页
    </button>
    <!-- <button v-show="pageNo>Math.ceil(continues/2)">1</button> -->
    <button
      v-show="startNumAndEndNum.start > 1"
      @click="sendPageNo(1)"
      :class="{ active: pageNo == 1 }"
    >
      1
    </button>
    <!-- <button v-show="pageNo>Math.ceil(continues/2)+1">···</button> -->
    <button v-show="startNumAndEndNum.start > 2" style="cursor: default">
      ···
    </button>

    <!-- <span v-for="(page,index) in startNumAndEndNum.end" :key="index">
      <button v-if="page>=startNumAndEndNum.start">{{page}}</button>
    </span> -->
    <!-- <button v-for="(page,index) in startNumAndEndNum.end" :key="index" 
      v-if="page>=startNumAndEndNum.start">{{page}}</button> -->
    <button
      v-for="(page, index) in showContinuees"
      :key="index"
      @click="sendPageNo(page)"
      :class="{ active: pageNo == page }"
    >
      {{ page }}
    </button>

    <!-- <button v-show="pageNo<totalPage - Math.ceil(continues/2)">···</button> -->
    <button
      v-show="startNumAndEndNum.end < totalPage - 1"
      style="cursor: default"
    >
      ···
    </button>
    <!-- <button v-show="pageNo<totalPage - Math.floor(continues/2)">{{totalPage}}</button> -->
    <button
      v-show="startNumAndEndNum.end < totalPage"
      @click="sendPageNo(totalPage)"
      :class="{ active: pageNo == totalPage }"
    >
      {{ totalPage }}
    </button>
    <button :disabled="pageNo == totalPage" @click="sendPageNo(pageNo + 1)">
      下一页
    </button>
    <button style="margin-left: 30px; cursor: default">共{{ total }} 条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  // 当前页码，每页的条数，总条数，连续的页码数(上一页1...5 6 7 8 9 ...99下一页)
  props: ["pageNo", "pageSize", "total", "continues"],
  computed: {
    // 总页数
    totalPage() {
      // 向上取整 例30.4 => 31
      return Math.ceil(this.total / this.pageSize);
    },
    // 连续页码的起始页码和结束页码(设连续的页码数至少是5，7 8 9 10 11)
    startNumAndEndNum() {
      const { pageNo, continues, totalPage } = this;
      let start = 0,
        end = 0;
      // let continuesArray=[]
      // 连续的页码数至少有5页,不够5页的情况,总页数少于连续页码数
      if (continues > totalPage) {
        start = 1;
        end = totalPage;
      } else {
        // 总页数大于连续页码数，不能写死，万一设定的连续页码数是7
        start = pageNo - Math.floor(continues / 2);
        end = pageNo + Math.floor(continues / 2);
        // 页码起始数不能为负和零，当前页码数为1或2的情况
        if (start < 1) {
          start = 1;
          end = continues;
        }
        // 页码结束数不能超过总页数,假设总页数为30，当前页30，28 29 30 31 32 当前页29，27 28 29 30 31
        // 当前页为29或30的情况                               26 27 28 29 30           26 27 28 29 30
        if (end > totalPage) {
          end = totalPage;
          start = totalPage - continues + 1;
        }
      }
      /* for (let index = start; index <= end; index++) {
        continuesArray.push(index)
      } */
      return { start, end };
    },
    // 解决v-for和v-if同时使用性能浪费，渲染出正确的连续页码数
    showContinuees() {
      let page = [];
      for (let i = 1; i <= this.startNumAndEndNum.end; i++) {
        if (i >= this.startNumAndEndNum.start) page.push(i);
      }
      return page;
    },
  },
  methods: {
    // 通过自定义事件发送当前点击的页码到父组件
    sendPageNo(page) {
      this.$emit("getPageNo", page);
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>