<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul
          class="cart-list"
          v-for="cartInfo in cartInfoList"
          :key="cartInfo.id"
        >
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="cartInfo.isChecked == 1"
              @change="updateChecked(cartInfo,$event)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="cartInfo.imgUrl" />
            <div class="item-msg">{{ cartInfo.skuName }}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ cartInfo.skuPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <a
              href="javascript:void(0)"
              class="mins"
              @click="handle('minus', -1, cartInfo)"
              >-</a
            >
            <input
              autocomplete="off"
              type="text"
              @change="handle('change', $event.target.value * 1, cartInfo)"
              :value="cartInfo.skuNum"
              minnum="1"
              class="itxt"
            />
            <a
              href="javascript:void(0)"
              @click="handle('add', 1, cartInfo)"
              class="plus"
              >+</a
            >
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ cartInfo.skuPrice * cartInfo.skuNum }}</span>
          </li>
          <li class="cart-list-con7">
            <a class="sindelet" @click="deleteCartById(cartInfo)">删除</a>
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool" v-show="cartInfoList.length !==0">
      <div class="select-all" >
        <input class="chooseAll" type="checkbox" :checked="isAllCheck&&cartInfoList.length !==0" @change="updateAllCartChecked" />
        <span>全选</span>
      </div>
      <div class="option">
        <a href="javascript:void(0)" @click="deleteAllCheckedCart">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择 <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" href="###" target="_blank">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import throttle from "lodash/throttle";
import { mapGetters } from "vuex";
export default {
  name: "ShopCart",
  mounted() {
    this.getCartData();
  },
  computed: {
    ...mapGetters("shopCart", ["cartList"]),
    // 购物车数据
    cartInfoList() {
      return this.cartList.cartInfoList || [];
    },
    // 购物车总价
    totalPrice() {
      let sum = 0;
      this.cartInfoList.forEach((ele) => {
        sum += ele.skuPrice * ele.skuNum;
      });

      return sum;
    },
    // 判断全选按钮是否勾选
    isAllCheck() {
      return this.cartInfoList.every((ele) => ele.isChecked == 1);
    },
  },
  methods: {
    // 获取个人购物车数据
    getCartData() {
      this.$store.dispatch("shopCart/getCartList");
    },
    // 修改某个产品的个数，节流
    handle: throttle(async function (type, disNum, cartInfo) {
      // type区分点击的是+,-还是输入框
      // disNum:变化量-1和1，input最终的个数（不是变化量）
      // cartInfo 产品信息
      // 发请求修改数量，带上产品id和变化量
      switch (type) {
        // 加
        case "add":
          disNum = 1;
          break;
        case "minus":
          // 产品个数大于1才可以传递给服务器-1,否则无变化量
          disNum = cartInfo.skuNum > 1 ? -1 : 0;
          break;
        case "change":
          // 输入的是非法的
          if (isNaN(disNum) || disNum < 1) {
            disNum = 0;
          } else {
            disNum = parseInt(disNum) - cartInfo.skuNum;
          }
          break;
      }
      try {
        // 派发修改购物车数量的请求
        await this.$store.dispatch("detail/addOrUpdateShopCart", {
          skuId: cartInfo.skuId,
          skuNum: disNum,
        });
        // 没有变化就不请求购物车数据重新渲染
        if (disNum == 0) return;
        this.getCartData();
      } catch (error) {
        alert(error.message);
      }
    }, 1000),
    // 删除购物车某一个产品
    async deleteCartById(cartInfo) {
      try {
        // 删除成功再次发请求获取新的数据进行渲染
        await this.$store.dispatch("shopCart/DeleteCartById", cartInfo.skuId);
        this.getCartData();
      } catch (error) {
        alert(error.message);
      }
    },
    // 修改购物车某一个产品的选中状态
    async updateChecked(cartInfo,event){
      try {
        // 修改成功再次发请求获取新的数据进行渲染
        await this.$store.dispatch("shopCart/UpdateCheckedById",{
          skuId:cartInfo.skuId,
          isChecked:event.target.checked?'1':'0'
        });
        this.getCartData();
      } catch (error) {
        alert(error.message)
      }
      
    },
    // 删除全部选中的产品
    async deleteAllCheckedCart(){
      // 第一种方法
      /* this.cartInfoList.filter(ele=>{
        if(ele.isChecked == 1){
          this.deleteCartById(ele)
        }
      }) */
      
      // 第二种方法Promise.all
      try {
        await this.$store.dispatch('shopCart/deleteAllCheckedCart')
        this.getCartData();
      } catch (error) {
        alert(error.message)
      }
      
    },
    // 修改全部产品的选中状态
    async updateAllCartChecked(event){
      // 全选为1，否则为0
      let isChecked = event.target.checked?'1':'0'
      try {
        await this.$store.dispatch('shopCart/updateAllCartIsChecked',isChecked)
        this.getCartData();
      } catch (error) {
        alert(error.message);
        
      }
      




      /* // 全选中状态变为全不选
      if(this.isAllCheck){
        try {
          for (const el of this.cartInfoList) {
            await this.$store.dispatch("shopCart/UpdateCheckedById",{
              skuId:el.skuId,
              isChecked:'0'
             })
          }
          this.getCartData();
        } catch (error) {
          alert(error.message)
        } 
      }else{
        // 有不选中状态变为全选
        try {
          for (const el of this.cartInfoList) {
            if(el.isChecked !==1){
              await this.$store.dispatch("shopCart/UpdateCheckedById",{
                skuId:el.skuId,
                isChecked:'1'
              })
            } 
          }
          this.getCartData();
        } catch (error) {
          alert(error.message)
        } 
      } */

    }

  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>