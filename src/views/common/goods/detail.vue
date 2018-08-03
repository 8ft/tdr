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

            <div class="price">
            <div>
                ￥{{parseFloat(pageData.price)}}
            </div>
            </div>
        </div>

        <div v-if="pageData.status!=='kucunbuzu'&&pageData.status!=='xiajia'&&hasStore" class="arrow-link" @click="openSku('')">
            <h1>{{skusName.length>0?'已选： '+skusName.join(' ')+' '+amount+'件':'请选择数量规格'}}</h1>
        </div>
    </div>

    <div slot="footer" class="btns">
        <router-link class="left" tag="button" :to="'/onlineHelp?actUrl='+encodeURIComponent('https://static.meiqia.com/dist/standalone.html?_=t&eid=38740&groupid=846de8917f52c53f0207d5c7e1c7c5e4')"><img src=""><span>客服</span></router-link>
        <button class="left" v-if="!pageData.isfastbuy" @click="goCart"><img src=""><span>购物车</span><i>{{pageData.cartcount>=100?'99+':pageData.cartcount}}</i></button>
        <button class="left"><div :class="{on:pageData.itemCollect}"></div><span>收藏</span></button>

        <div class="right">
          <template v-if="!['kucunbuzu','xiajia'].includes(pageData.status)">
            <button class="yellow" @click="openSku('cart')" v-if="!pageData.isfastbuy">加入购物车</button>
            <button class="orange" @click="openSku('order')">立即购买</button>
          </template>
          <button class="dis" v-if="pageData.status==='kucunbuzu'">库存不足</button>
          <button class="dis" v-if="pageData.status==='xiajia'">已下架</button>
        </div>
    </div>

    <mt-popup slot="aside" v-model="showProfitsDetail" position="bottom" style="width:100%;">
      <div class="profitsDetail">
        <h1>权益服务</h1>

        <ul class="page-content">
          <li v-for="item in profitsDetail">
            <h2>{{item.title}}</h2>
            <p>{{item.content}}</p>
          </li>
        </ul>
      </div>
    </mt-popup>


    <mt-popup slot="aside" v-model="showSku" position="bottom" style="width:100%;" v-if="!['kucunbuzu','xiajia'].includes(pageData.status)">
      <div v-if="pageData.images" class="sku">
          <img class="goodsImg" :src="pageData.images[0]">
          <!-- <span class="price">￥{{parseFloat(skuIds[skus.join('_')].price)}}</span> -->
          <p class="tip">请选择商品规格</p>
          <div class="page-content">
              <template v-if="pageData.spec">   
                <div v-for="(item,index) in pageData.spec.specName">
                  <h1>{{item.name}}</h1>
                  <span :class="skus[index]===child.spec_value_id?'on':''" v-for="child in item.child" @click="selectSku(index,child.spec_value_id,child.spec_value)">{{setSkuName(index,child.spec_value_id,child.spec_value)}}</span>
                </div>
              </template>

              <div>
                <h1>数量</h1>
                <div class="amount">
                  <button @click="amount>1?amount=amount-1:''">-</button>
                  <input type="tel" v-model="amount">
                  <button @click="amount=amount+1">+</button>
                </div>
              </div>
          </div>

          <div class="next">
            <template v-if="!['kucunbuzu','xiajia'].includes(pageData.status)&&hasStore">
              <button class="yellow" @click="addToCart" v-if="!pageData.isfastbuy&&!next">加入购物车</button>
              <button class="orange" @click="order" v-if="!pageData.isfastbuy&&!next">立即购买</button>

              <button class="ok" @click="confirm" v-if="pageData.isfastbuy||next">确 认</button>
            </template>

            <button class="dis" v-if="pageData.status==='kucunbuzu'||!hasStore">库存不足</button>
            <button class="dis" v-if="pageData.status==='xiajia'">已下架</button>
          </div>
          
      </div>
    </mt-popup>


  </app-layout>
</template>

<script>
export default {
  data() {
    return {
      //通用
        gid:'',
        amount:1,
        pageData: {
            images:['http://192.168.3.21:8080/img/goods1.75cbf35b.jpg','http://192.168.3.21:8080/img/goods2.637a0589.jpg'],
            title:'天香一号',
            sub_title:'上品茶青，大师手造',
            price:6666
        },
        next:'',

        cart:[],

        showProfitsDetail:false,
        profitsDetail:[],

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
        },

        //车品
        showSku:false,
        skus:[],//选中的sku id
        defaultSkusName:[],
        skusName:[],//选中的sku名称
        skuIds:{},//sku 组合id
        hasStore:true,
    };
  },
  computed: {
    swiper() {
      return this.$refs.goodsImg.swiper
    }
  },
  watch:{
    amount(val){
      if(val===''||val<=0){this.amount=1;}
    }
  },
  activated() {
    if(!this.gid){
      let id=this.$route.params.id;
      this.gid=id;
    //   this.getPageData();
    }
  },
  beforeRouteLeave(to,from,next){
    // if(!/(order|signUp)$/.test(to.path)){
    //   this.resetPage(next);
    // }else{
      next();
    // }
  },
  methods: {
    confirm(){
      switch (this.next) {
        case 'cart':
            this.addToCart();
        break;
        case 'order':
          this.order();
        break;
        default:
          this.showSku=false;
          break;
      }
    },
    order(){
        this.showSku=false;
        let path='/mall/order?sid='+this.skuIds[this.skus.join('_')].id+'&num='+this.amount;
        if(this.pageData.zitilist){
          path+='&zid='+this.pageData.zitilist[0].id;
        }
        this.$router.push(path);
    },
    resetPage(callback){
      this.gid='';
      this.amount=1;
      this.pageData={};
      this.next='';

      this.showSku=false;
      this.skus=[];
      this.defaultSkusName=[];
      this.skusName=[];
      this.skuIds={};

      callback();
    },
    openSku(next){
      this.$login(()=>{
          this.next=next;
          this.showSku=true;
      });
    },
    selectSku(index,id,name){
        this.skus.splice(index,1,id);
        this.skusName.splice(index,1,name);
        this.hasStore=this.skuIds[this.skus.join('_')].hasStore;
    },
    goCart(){
      this.$router.push('/mall/cart');
    },
    addToCart(){
      this.$login(async ()=>{
          let user=this.$cache.user,
            data={
              content:{
                sku_id:this.skuIds[this.skus.join('_')].id,
                quantity:this.amount,
                mbeid:user.memberId,
                mobile:user.phone
              }
          }
          let res= await this.$post('/mall26/cart-add.html', data);
          if (res.errcode === 0) {
            this.pageData.cartcount+=this.amount;
            this.showSku=false;
            this.$toast('已加入购物车');
          }
      });
    },
    async getCart () {
      let user=this.$cache.user,
        data = {
          content:{
            mbeid:user.memberId||'',
            mobile:user.phone||''
          }
        };

      let res = await this.$post('/mall26/cart-list.html', data);
      if (res.errcode === 0) {
        this.cart = res.content.cartData.items;
      }
    },
    setSkuName(index,id,name){
      if(!this.skusName[index]&&this.skus[index]==id){
        this.skusName[index]=name;
      }
      return name;
    },
    async getPageData () {
      let user=this.$cache.user,
        data = {
          content:{
            item_id:this.gid,
            mbeid:user.memberId||'',
            mobile:user.phone||''
          }
        };

      let res = await this.$post('/mall26/itemdetail.html', data);

      if (res.errcode === 0) {

        let con=res.content;
       
        let shareData={
            share_title:con.title,
            share_desc:con.sub_title,
            share_img:con.images[0],
            share_url:location.origin+'/wxwap?#'+this.$route.fullPath
        }
        this.$utils.shareConfig(shareData);

        let spec=con.spec;
        if(spec){
            
            let ids=spec.specSku,
              defaultSkus=[],
              skuIds={},
              ii;

            for(let i=0;i<ids.length;i++){
              ii=ids[i];

              if(ii.store>0){
                skuIds[ii.spec_id]={
                    id:ii.sku_id,
                    price:ii.price,
                    hasStore:true
                  };

                if(defaultSkus.length===0){
                  defaultSkus=ii.spec_ids;
                }
              }else{
                skuIds[ii.spec_id]={
                    id:ii.sku_id,
                    price:ii.price,
                    hasStore:false
                };
              }
            }

            let skus=spec.specName,
              defaultSkusName=[],
              ci,
              cij;

            for(let i=0;i<skus.length;i++){
              ci=skus[i].child;
              for(let j=0;j<ci.length;j++){
                cij=ci[j];
                if(defaultSkus.includes(cij.spec_value_id)){
                  defaultSkusName.push(cij.spec_value);
                }
              }
            }

            this.skus=defaultSkus;
            this.defaultSkusName=defaultSkusName;
            this.skusName=defaultSkusName;
            this.skuIds=skuIds;
        }
        this.pageData=con;
      }
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
        h1{font-size: .15rem;color:$black;margin-bottom:.1rem;}
        h2{font-size:$h3;color:$mainColor;}
        .price{@include box;margin-top:.15rem;
          div:nth-of-type(1){color:$mainColor;@include flex;
            span{font-size:$h3;border:1px solid $mainColor;border-radius:3px;padding:0 .05rem;}
            del{color:$lightBlack;font-size:$h3;}
          }
          div:nth-of-type(2){@include flex(2);text-align:right;span{color:$mainColor;}}
        }
      }

      .arrow-link{background: #fff;height:.44rem;line-height: .44rem;padding:0 .2rem;border-bottom:$border;overflow: hidden;zoom: 1;
        h1{color:$black;display: inline-block;}
        div{float:right;color:$gray;margin-right:.1rem;max-width:2.3rem;@include txtOverflow;}
      }
     
    }

    .steps{margin:.1rem 0;background:#fff;
      h1{color:$black;border-bottom:$border;line-height: .44rem;padding:0 .2rem;}
      img{width:100%;padding:.2rem;box-sizing: border-box;}
    }

    .sku{background: #fff;padding-top:.9rem;position: relative;
      .goodsImg{width:1rem;height:1rem;position:absolute;top:-.2rem;left:.2rem;}
      .price{position: absolute;left:1.4rem;top:.25rem;color:$mainColor;font-size: .15rem;}
      .tip{position: absolute;left:1.4rem;top:.55rem;color:$gray;font-size:$h3;}
      .page-content{height:3rem;padding:0 .2rem;box-sizing:border-box;padding-bottom:.2rem;
        h1{font-size:$h2;margin:.15rem 0;}
        span{display:inline-block;font-size:$h3;line-height:.3rem;margin:0 .1rem .1rem 0;border:1px solid hsla(0,0%,93%,.6);padding:0 .08rem;border-radius:4px;}
        span.on{border-color:$mainColor;color:$mainColor;}

        .amount{
          button{display: inline-block;width:.3rem;height:.25rem;border:$border;}
          input{display: inline-block;width:.3rem;height:.25rem;text-align: center;color:$black;border:$border;}
        }

      }

      .next{@include box;height:.5rem;
          button{@include flex;color:#fff;height: 100%;
            &.yellow{background:#f29600;}
            &.orange{background:#ea6000;}
            &.ok{background: $mainColor;}
            &.dis{background:#c9c9c9;width:2.25rem;line-height: .45rem;color:#fff;text-align:center;}
          }
      }
      
    }

    .fourS,.carSku,.profitsDetail{background:#fff;padding-bottom:.2rem;
      h1{line-height: .5rem;text-align: center;border-bottom:$border;font-size:.16rem;color:$black;}
      .page-content{height:3rem;padding:0 .2rem;}
    }


    .carSku{
      .page-content{
        li{padding:.15rem 0;border-bottom:$border;}
        li.on{background: url('') no-repeat right center;background-size:17px 12px;}
        p{font-size:$h3;color:$gray;line-height: .2rem;margin-top:.05rem;}
        span{color:$mainColor;}
      }
    }

    .fourS{background:#f2f2f2;
      h1{background:#fff;}
      .page-content{padding:0;
        h3{font-size:$h3;line-height: .24rem;padding:0 .2rem;}
        p{@include txtOverflow;width:70%;font-size:$h3;color:$gray;line-height: .2rem;margin-top:.05rem;}
      }
    }
    
    .detail{background: #fff;
      h1{text-align: center;line-height: .5rem;}
      img{width:100%;display: block;}}

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
