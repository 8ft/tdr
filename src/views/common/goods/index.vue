<template>
  <app-layout id="goods">

    <mt-navbar slot="header" v-model="curType">
        <mt-tab-item v-for="item in goodsTypes" :key="item" :id="item">{{item}}</mt-tab-item>
    </mt-navbar>

    <ul>
        <li v-for="(item,index) in main" :key="index" :class="{selected:cur===index}" @click="cur=index">
            <h1>{{item}}</h1>
        </li>
    </ul>

    <div slot="aside" v-for="(item,index) in main" :key="index" v-if="cur===index" class="page-content cls-con">
      <a href="https://baike.baidu.com/item/%E9%93%81%E8%A7%82%E9%9F%B3/5315?fr=aladdin">
        <img class="ad" src="@/assets/img/timg.jpg">
      </a>

      <ul class="goods">
           <router-link tag="li" to="/goods/1">
                <img src="@/assets/img/goods1.jpg">
                <h1>天香一号</h1>
                <h2>上品茶青，大师手造</h2>
                <div>￥5288<del>￥6666</del></div>
            </router-link>

            <router-link tag="li" to="">
                <img src="@/assets/img/goods2.jpg">
                <h1>天然野茶</h1>
                <h2>自然放养，清新稀少</h2>
                <div>￥600<del>￥680</del></div>
            </router-link>
      </ul>

    </div>
  
  </app-layout>
</template>

<script>
export default {
  data() {
    return {
      goodsTypes:['茶叶','茶具','其他'],
      curType:'茶叶',
      main:['铁观音','金俊眉','大红袍','白茶','普洱','花茶','正山小种'],
      sub:[],
      cur:0
    };
  },
  mounted() {

  },
  methods:{

  }
}
</script>

<style lang="scss">
@import "@/assets/style/var.scss";
    #goods{
        .mint-navbar{padding:0 26%;border-bottom:$border;}
        main{width:26%;text-align:center;float:left;
            li{line-height:.54rem;font-size:.13rem;}
            li.selected{color:$mainColor;background: #fff;border-left:4px solid $mainColor;}
        }
        .cls-con{width:74%;background: #fff;padding:.18rem .16rem;box-sizing:border-box;float:left;
            .ad{width:100%;height:1.09rem;display:block;background: $gray;margin-bottom:.1rem;border-radius:.08rem;}
            .goods{
                li{padding:.15rem 0 .15rem .7rem;position:relative;min-height: .5rem;
                    img{width:.6rem;height:.6rem;position: absolute;left:0;top:.15rem;}
                    h1{color:$black;font-size:$h1;line-height:$h1;}
                    h2{color:$gray;line-height:$h2;margin-top:.08rem;}
                    div{color:lightseagreen;font-size:$h1;margin-top:.08rem;
                        del{color:$lightGray;font-size:$h3;margin-left:.06rem;}
                    }
                    
                }
            }
        }
    }
</style>