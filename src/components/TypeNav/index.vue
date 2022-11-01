<template>
  <div class="type-nav">
    <div class="container">
      <!-- 事件委派 -->
      <div @mouseenter="enterShow" @mouseleave="leaveShow">
        <h2 class="all">全部商品分类</h2>
        <!-- 三级联动 -->
        <transition name="sort">
          <div class="sort" v-show="show">
            <div class="all-sort-list2" @click="goSearch">
              <!-- 动态添加类名cur -->
              <div
                class="item"
                v-for="item1 in categoryList"
                :key="item1.categoryId"
                :class="{ cur: currentIndex == item1.categoryId }"
              >
                <h3 @mouseenter="changeIndex(item1.categoryId)">
                  <a
                    :data-categoryName="item1.categoryName"
                    :data-category1Id="item1.categoryId"
                    style="cursor: pointer"
                    >{{ item1.categoryName }}</a
                  >
                </h3>
                <!-- 二级、三级分类 -->
                <div
                  class="item-list clearfix"
                  :style="{
                    display:
                      currentIndex == item1.categoryId ? 'block' : 'none',
                  }"
                >
                  <div
                    class="subitem"
                    v-for="item2 in item1.categoryChild"
                    :key="item2.categoryId"
                  >
                    <dl class="fore">
                      <dt>
                        <a
                          :data-categoryName="item2.categoryName"
                          :data-category2Id="item2.categoryId"
                          style="cursor: pointer"
                          >{{ item2.categoryName }}</a
                        >
                      </dt>
                      <dd>
                        <em
                          v-for="item3 in item2.categoryChild"
                          :key="item3.categoryId"
                        >
                          <a
                            :data-categoryName="item3.categoryName"
                            :data-category3Id="item3.categoryId"
                            style="cursor: pointer"
                            >{{ item3.categoryName }}</a
                          >
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>

      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
// 按需引入插件中的节流
import throttle from "lodash/throttle";
export default {
  name: "TypeNav",
  data() {
    return {
      currentIndex: -1,
      show: true,
    };
  },
  mounted() {
    
    if (this.$route.name == "search") this.show = false;
  },
  computed: {
    /* categoryList() {
      return this.$store.state.home.categoryList;
    }, */
    ...mapState('home',['categoryList'])
    /* ...mapState({
      categoryList: (state) => state.home.categoryList,
    }), */
  },
  methods: {
    // 鼠标进入节流,用throttle只能用es5写法，throttle的回调不能写箭头函数，会出现this指向问题
    changeIndex: throttle(function (index) {
      this.currentIndex = index;
    }, 50),
    // 进行路由跳转 编程式导航+事件委托
    goSearch({ target }) {
      // 获取到a节点的自定义属性
      let { categoryname, category1id, category2id, category3id } =
        target.dataset;
      // 点击的是a标签，则区分哪一级的分类
      if (categoryname) {
        // 整理路由跳转的参数
        let location = { name: "search" };
        let query = { categoryName: categoryname };
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else if (category3id) {
          query.category3Id = category3id;
        }
        // 参数合并
        location.query = query;
        location.params = this.$route.params
        this.$router.push(location);
      }
    },
    // 搜索页面下 鼠标进入展示商品分类列表
    enterShow() {
      if (this.$route.name == "search") this.show = true;
    },
    // 搜索页面下 鼠标离开隐藏商品分类列表
    leaveShow() {
      this.currentIndex = -1;
      if (this.$route.name == "search") this.show = false;
    },
  },
};
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 480px;
      position: absolute;
      background: #fafafa;
      z-index: 999;
      

      .all-sort-list2 {
        height: 480px;
        overflow: hidden;
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            
            margin: 0;

            a {
              display: block;
              padding: 0 20px;
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }
          // 用js控制二三级隐藏和显示
          /* &:hover {
            .item-list {
              display: block;
            }
          } */
          // 鼠标移入时背景色
          &.cur {
            background-color: skyblue;
          }
        }
        // 更简便的方法
        /* .item:hover{
          background-color: skyblue;
        } */
      }
    }
    .sort-enter {
      height: 0px;
    }
    .sort-enter-active {
      transition: all .5s linear;
    }
    .sort-enter-to {
      height: 461px;
    }
  }
}
</style>