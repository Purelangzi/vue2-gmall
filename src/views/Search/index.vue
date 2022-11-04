<template>
  <div>
    <!-- 商品分类三级列表 -->
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--面包屑-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 分类的面包屑 -->
            <li class="with-x" v-show="searchParams.categoryName">
              {{ searchParams.categoryName
              }}<i @click="removeCategoryName">x</i>
            </li>
            <!-- 关键字的面包屑 -->
            <li class="with-x" v-show="searchParams.keyword">
              {{ searchParams.keyword }}<i @click="removeKeyWord">x</i>
            </li>
            <!-- 品牌的面包屑 -->
            <li class="with-x" v-show="searchParams.trademark">
              {{ searchParams.trademark.split(":")[1]
              }}<i @click="removeTradeMark">x</i>
            </li>
            <!-- 售卖属性的面包屑 -->
            <li
              class="with-x"
              v-for="(attrValue, index) in searchParams.props"
              :key="index"
            >
              {{ attrValue.split(":")[2] }}:{{ attrValue.split(":")[1] }}
              <i @click="removeAttr(attrValue)">x</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector
          @trademarkInfo="trademarkInfo"
          @attrInfo="attrInfo"
          :attrsList="attrsList"
          :trademarkList="trademarkList"
        />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{ active: isOne }" @click="changeOrder(1)">
                  <a href="#"
                    >综合<span
                      v-show="isOne"
                      :class="['iconfont', isAsc]"
                    ></span
                  ></a>
                </li>
                <li :class="{ active: isTwo }" @click="changeOrder(2)">
                  <a href="#"
                    >价格<span
                      v-show="isTwo"
                      :class="['iconfont', isAsc]"
                    ></span
                  ></a>
                </li>
              </ul>
            </div>
          </div>
          <!-- 销售的产品列表 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="good in goodsList" :key="good.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <a href="#" target="_blank"
                      ><img :src="good.defaultImg"
                    /></a>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ good.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="#">{{ good.title }}</a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页器 -->
          <Pagination :pageNo="1" :pageSize="3" :total="91" :continues="5" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchSelector from "@/views/Search/SearchSelector";
import { mapGetters } from "vuex";
export default {
  name: "Search",
  data() {
    return {
      searchParams: {
        // 各级分类id和分类名字
        category1Id: undefined,
        category2Id: undefined,
        category3Id: undefined,
        categoryName: undefined,
        // 搜索关键字
        keyword: undefined,
        // 排序（默认为综合降序desc，1综合，2价格,升序asc）
        order: "1:desc",
        // 页码
        pageNo: 1,
        // 每页数量
        pageSize: 3,
        // 平台售卖属性操作带的参数
        props: [],
        // 品牌
        trademark: "",
      },
    };
  },
  components: {
    SearchSelector,
  },
  beforeMount() {
    // 在发送请求前整理请求参数
    Object.assign(this.searchParams, this.$route.query, this.$route.params);
  },
  mounted() {
    this.getSearchList();
  },
  computed: {
    ...mapGetters("search", ["attrsList", "goodsList", "trademarkList"]),
    // 综合1
    isOne() {
      return this.searchParams.order.includes("1");
    },
    // 价格2
    isTwo() {
      return this.searchParams.order.includes("2");
    },
    // 是否升序动态显示图标
    isAsc() {
      return this.searchParams.order.includes("desc")
        ? "icon-direction-down"
        : "icon-direction-up";
    },
  },
  methods: {
    getSearchList() {
      this.$store.dispatch("search/getSearchList", this.searchParams);
    },
    // 删除面包屑的三级分类
    removeCategoryName() {
      // 给服务器带的参数清空
      this.searchParams.categoryName = undefined;
      // 路由跳转，如果有路由中还有关键字params就要携带上，比如点击分类>搜索关键字>删除分类>跳转到关键字
      this.$router.push({ name: "search", params: this.$route.params });
    },
    // 删除面包屑的关键字
    removeKeyWord() {
      this.searchParams.keyword = undefined;
      this.$router.push({ name: "search", query: this.$route.query });
      // 通知兄弟组件Header删除关键字
      this.$bus.$emit("clear");
    },
    // 删除面包屑的三级分类
    removeTradeMark() {
      this.searchParams.trademark = "";
      this.getSearchList();
    },
    // 删除面包屑的售卖属性
    removeAttr(attrValue) {
      let index = this.searchParams.props.indexOf(attrValue);
      // 删除对应的下标
      this.searchParams.props.splice(index, 1);
      this.getSearchList();
    },
    //绑定自定义事件接收子组件传递过来的品牌数据
    trademarkInfo(trademark) {
      // 点相同的品牌不发请求
      if (trademark.tmName == this.searchParams.trademark.split(":")[1]) return;
      //传递品牌参数的格式 trademark: "6:VIVO"
      this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`;
      this.getSearchList();
    },
    //绑定自定义事件接收子组件传递过来的售卖属性数据
    attrInfo(attrs, attrValue) {
      //传递售卖属性参数的格式 ["106:安卓手机:手机系统", "23:8G:运行内存"]
      const props = `${attrs.attrId}:${attrValue}:${attrs.attrName}`;
      // 重复点击相同的售卖属性，不发请求
      if (this.searchParams.props.includes(props)) return;
      this.searchParams.props.push(props);
      this.getSearchList();
    },
    // 排序操作
    changeOrder(flag) {
      // 当前排序状态
      let originFlag = this.searchParams.order.split(':')[0]
      let originSort = this.searchParams.order.split(':')[1]
      let newOrder = ''
      // 传flag为1的情况点击的是综合（综合默认为降序）(点击的与当前排序状态相同，如点价格但当前排序状态是价格，就变序了)
      if(flag == originFlag){
        newOrder = `${originFlag}:${originSort=='desc'?'asc':'desc'}`
      // 传flag为1的情况点击的是价格（价格默认为降序）(点击的与当前排序状态不同，如点综合但当前排序状态是价格，就默认为降序)
      }else{
        newOrder = `${flag}:desc`
      }
      this.searchParams.order = newOrder
      this.getSearchList();
    },
  },
  // 监听组件实例上的属性的属性值变化
  watch: {
    // 监听路由变化
    $route: {
      handler() {
        // 发送请求之前清空上一次分类id,默认为undefined的话axios请求不会携带undefined参数
        this.searchParams.category1Id = undefined;
        this.searchParams.category2Id = undefined;
        this.searchParams.category3Id = undefined;
        // 再次在发送请求前整理请求参数
        Object.assign(this.searchParams, this.$route.query, this.$route.params);
        // 再次在发送请求
        this.getSearchList();
      },
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>