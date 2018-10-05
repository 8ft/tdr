<template>
  <app-layout id="goodsDetail">

    <swiper v-if="pageData.images" :options="bannerSwiperOption" ref="goodsImg">
        <swiper-slide v-for="(item,index) in pageData.images">
            <img :data-src="item" class="swiper-lazy">
            <div class="swiper-lazy-preloader"></div>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
    </swiper>

    <div class="goods-info">
        <div class="base">
            <h1>{{pageData.title}}</h1>
            <h2>{{pageData.sub_title}}</h2>
            <div>￥{{parseFloat(pageData.price)}}<del>￥{{parseFloat(pageData.price)}}</del></div>
        </div>
    </div>

    <div slot="footer" class="btns">
        <router-link class="left" tag="button" to=""><img src=""><span>客服</span></router-link>
        <button class="left"><img src=""><span>购物车</span><i>1</i></button>

        <div class="right">
            <button class="yellow">加入购物车</button>
            <button class="orange">立即购买</button>
        </div>
    </div>


  </app-layout>
</template>

<script>
export default {
  data() {
    return {
        pageData: {
            images:['/img/goods1.jpg','/img/goods2.jpg'],
            title:'天香一号',
            sub_title:'上品茶青，大师手造',
            price:6666
        },

        bannerSwiperOption: {
            autoplay:{
                delay:5000,
                disableOnInteraction: false,
            },
            speed: 500,
            loop: true,
            lazy: {
                loadPrevNext: true,
                loadOnTransitionStart:true
            },
            pagination: {
                el:'.swiper-pagination'
            }
        }
    };
  },
  computed: {
    swiper() {
      return this.$refs.goodsImg.swiper
    }
  }
}
</script>

<style lang="scss">
  @import "@/assets/style/var.scss";
  #goodsDetail {
    .swiper-slide {img{width:100%;display: block;}}
    .goods-info{margin-bottom:.1rem;
      .base{padding:.2rem .2rem .1rem;background: #fff;
        h1{color:$black;font-size:$h1;line-height:$h1;}
        h2{color:$gray;line-height:$h2;margin-top:.08rem;}
        div{color:lightseagreen;font-size:$h1;margin-top:.08rem;
            del{color:$lightGray;font-size:$h3;margin-left:.06rem;}
        }
      }
      .arrow-link{background: #fff;height:.44rem;line-height: .44rem;padding:0 .2rem;border-bottom:$border;overflow: hidden;zoom: 1;
        h1{color:$black;display: inline-block;}
        div{float:right;color:$gray;margin-right:.1rem;max-width:2.3rem;@include txtOverflow;}
      }
    }
        
    .btns{height:.45rem;background:#fff;
      button{box-sizing: border-box;height:.45rem;}
        
      .left{width:.5rem;border-top:$border;float:left;position: relative;
        div,img{width:.2rem;height:.2rem;display: block;margin:0 auto;}
        div{background: url('') no-repeat center;background-size:100%;}
        div.on{background-image: url('');}
        span{font-size:$h4;color:$gray;}
        i{position: absolute;top:0rem;right:0;padding:0 .05rem;border-radius: 99px;background: red;color:#fff;line-height:.16rem;font-size:$h4;}
        &:nth-of-type(n+1){border-right:$border;}
      }

      .right{@include box;
          button{@include flex;color:#fff;
            &.yellow{background:#f29600;}
            &.orange{background:#ea6000;}
            &.dis{background:#c9c9c9;line-height: .45rem;color:#fff;text-align:center;}
          }
      }
    }
  }
</style>
