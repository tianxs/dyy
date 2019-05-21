<template>
  <div class="product-list">
    <mt-navbar fixed v-model="selected">
      <mt-tab-item id="1">私募证券产品</mt-tab-item>
      <mt-tab-item id="2">权益类产品</mt-tab-item>
      <mt-tab-item id="3">类固收类产品</mt-tab-item>
    </mt-navbar>

    <!-- tab-container -->
    <mt-tab-container fixed v-model="selected">
      <mt-tab-container-item id="1">
        <div class="product" v-for="product in products" :key="product.id" @click="goProductDetail(product.productType, product.id)">
          <div class="product-img">
            <img :src="product.pictureUrl" :alt="product.name">
          </div>
          <div class="product-content">
            <div class="product-title">{{product.name}}</div>
            <div class="product-code">{{product.code}}</div>
            <div class="product-quota">可售额度(万元):{{product.raiseAmountMax - product.signAmount}}</div>
            <div class="product-type">{{product.statusName}}</div>
          </div>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <div class="product" v-for="product in products" :key="product.id" @click="goProductDetail(product.productType, product.id)">
          <div class="product-img">
            <img :src="product.pictureUrl" :alt="product.name">
          </div>
          <div class="product-content">
            <div class="product-title">{{product.name}}</div>
            <div class="product-code">{{product.code}}</div>
            <div class="product-quota">可售额度(万元):{{product.raiseAmountMax - product.signAmount}}</div>
            <div class="product-type">{{product.statusName}}</div>
          </div>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="3">
        <div class="product" v-for="product in products" :key="product.id" @click="goProductDetail(product.productType, product.id)">
          <div class="product-img">
            <img :src="product.pictureUrl" :alt="product.name">
          </div>
          <div class="product-content">
            <div class="product-title">{{product.name}}</div>
            <div class="product-code">{{product.code}}</div>
            <div class="product-quota">可售额度(万元):{{product.raiseAmountMax - product.signAmount}}</div>
            <div class="product-type">{{product.statusName}}</div>
          </div>
        </div>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script>
import { getProductInfoList } from '../../api/api';
export default {
  name: 'productIndex',
  data () {
    return {
      selected: '1',
      type: '',
      active: '',
      filters: {
        name: '私募证券'
      },
      products: []
    }
  },
  watch: {
    'selected': function (val, oldVal) {
      console.log(val)
      switch (val) {
        case '1':
          this.getProducts('', '私募证券');
          break;
        case '2':
          this.getProducts('', '权益类');
          break;
        case '3':
          this.getProducts('', '类固收');
          break;
        default:
          return false;
      }
    }
  },
  methods: {
    getProducts (type, name) {
      let para = {
        type: type,
        name: name
      };
      getProductInfoList(para).then((res) => {
        console.log(res)
        this.products = res.data.data;
      });
    }
  },
  created () {
    this.getProducts('', '私募证券');
  }
}
</script>

<style scoped lang="scss">
  .product-list{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 0;
    background-color: #fff;

    .product-header{
      height: 40px;
      line-height: 40px;
      border-bottom: 1px solid #EBEBEB;
      margin-bottom: 11px;
      .product-tab{
        margin-top: 10px;
      }
      .swiper-slide{
        width:100px;
        height: 30px;
        text-align: center;
        font-size:16px;
        font-weight:400;
        color:#383C49;
        line-height:20px;
      }
      .tab-active{
        color:rgba(0,122,255,1);
        .line{
          background: #007AFF;
        }
      }
    }
    .product-list-header{
      height: 30px;
      margin: 8px 20px;
    }
    .back-icon-div-div{
      width: 38px;
      height: 30px !important;
      text-align: left;
      font-size: 0;
      display: table-cell;
      vertical-align: middle;
    }
    .back-icon{
      display: inline-block;
      width: 11.5px;
      height: 18px;
      vertical-align: middle;
    }
    .serch-bg{
      background-color: rgba(249,249,249,1);
      width: 100%;
      border-radius: 5px;
      text-align: left;
      padding: 0 0 0 10px;
      height: 30px;
      line-height: 30px;
      font-size: 0;
      .serch-icon{
        width: 14px;
        height: 14.5px;
        display: inline-block;
        margin-top: 3px;
      }
      .serch-placeholder{
        display: inline;
        font-size:14px;
        font-weight:400;
        color:rgba(197,197,197,1);
        padding: 0 0 0 10px;
      }
    }
    .vux-header-title-area, .vux-header .vux-header-title{
      margin: 0 0 0 38px!important;
    }
    .product-box{
      width: 100%;
      height: 100%;
      flex:1;
      overflow-x: hidden;
      overflow-y: auto;
      /*.swiper-slide{*/
      /*!*min-height: 800px;*!*/
      /*}*/
    }
    .line{
      position: absolute;
      width: 33px;
      height: 3px;
      background: #fff;
      left: 50%;
      margin-left: -16px;
      bottom: 0;
    }
    .product{
      margin: 0 20px;
      padding: 10px 0;
      overflow: hidden;
      display: flex;
      border-bottom: 1px solid #EBEBEB;
      &:last-child{
        border: 0!important;
      }
      .product-img{
        float: left;
        width: 100px;
        height: 100px;
        border-radius: 4px;
        img{
          width: 100%;
          height: 100%;
          border-radius: 4px;
        }
      }
      .product-content{
        float: left;
        margin-left: 15px;
        -webkit-box-flex: 1;
        -webkit-flex: 1;
        flex: 1;
        min-width: 0;
        width: 200px;
        .product-title{
          font-size:16px;
          font-weight:400;
          color:rgba(56,60,73,1);
          line-height:20px;
          height: 41px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
        .product-code{
          font-size:12px;
          font-weight:400;
          color:rgba(128,134,149,1);
          line-height:15px;
          height: 15px;
          margin-top: 5px;
          width: auto;
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
          word-wrap: normal;
        }
        .product-type{
          font-size:12px;
          font-weight:400;
          color:rgba(242,87,85,1);
          line-height:15px;
          height: 15px;
          width: auto;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          word-wrap: normal;
        }
        .product-quota{
          font-size:14px;
          font-weight:400;
          color:rgba(128,134,149,1);
          line-height:15px;
          height: 15px;
          margin: 5px 0 4px 0;
          width: auto;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          word-wrap: normal;
        }
      }
    }
  }
  .product-swiper{
    height: 100%;
  }
  .listContain{
    overflow: auto;
  }
</style>
