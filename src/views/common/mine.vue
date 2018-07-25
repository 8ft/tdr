<template>
    <app-layout>
        <div class="user-card">
            <img src="@/assets/img/profile.jpg">
            <h1>八疯兔</h1>
        </div>
        
        <div class="order-shortcuts">
            <div>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-pay"></use>
                </svg>
                <h1>待付款</h1>
            </div>
            <div>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-send"></use>
                </svg>
                <h1>待发货</h1>
            </div>
            <div>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-deliver"></use>
                </svg>
                <h1>待收货</h1>
            </div>
            <div>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-form"></use>
                </svg>
                <h1>我的订单</h1>
            </div>
        </div>
       
        <div class="fns clearfix">
            <div class="fn">
                <div class="exp-progress-bar" ref="exp">
                    <svg width="100%" height="100%">
                        <circle cx="0" cy="0" r=".43rem" stroke-width=".07rem" stroke="#d2f0f9" fill="none" :transform="matrix" :stroke-dasharray="dasharray(1)"></circle>
                        <circle cx="0" cy="0" r=".43rem" stroke-width=".07rem" stroke="deepskyblue" fill="none" :transform="matrix" :stroke-dasharray="dasharray(expPercent)"></circle>
                    </svg>
                    <div class="lv">28</div>
                    <div class="title">我的等级</div>
                </div>
            </div>
            <div class="fn">
                <h1>888</h1>
                <h2>我的余额</h2>
            </div>
            <div class="fn">
                <svg class="icon red" aria-hidden="true">
                    <use xlink:href="#icon-redpacket"></use>
                </svg>
                <h2>我的红包</h2>
            </div>
            <div class="fn">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-customerservice"></use>
                </svg>
                <h2>联系客服</h2>
            </div>
        </div>

    </app-layout>
</template>

<script>
export default {
    data() {
        return {
            expPercent:0,
            perimeter:Math.PI * 2 * 43,
            deg:135,
            cos:0,
            sin:0,
            matrix:''
        };
    },
    computed:{
     
    },
    activated(){
        let cos=this.cos,
            sin=this.sin,
            deg=this.deg,
            circleCenter=this.$refs.exp.offsetHeight/2;

        this.cos=Math.cos(deg*Math.PI/180);
        this.sin=Math.sin(deg*Math.PI/180);
        this.matrix='matrix('+this.cos+','+this.sin+','+-this.sin+','+this.cos+','+circleCenter+','+circleCenter+')';

        setTimeout(()=>{
            this.expPercent=.9;
        },1000)
    },
    methods:{
        dasharray:function(p){
            let perimeter=this.perimeter,
                percent=p*0.75;
            return perimeter * percent + ' ' + perimeter * (1- percent)
        }
    }

}
</script>

<style lang="scss" scoped>
  @import '@/assets/style/base.scss';
  .container{background-color: #24292e;background-image: url(../../assets/img/star-bg.svg),linear-gradient(#191c20, #24292e 15%);background-repeat:no-repeat;background-position: center 0, 0 0, 0 0;background-size:contain; }
  
  .user-card{text-align:center;padding:.4rem 0 .3rem;color:#fff;
     img{width:.6rem;height:.6rem;border-radius:50%;margin-bottom:.06rem;border:4px solid #fff;}
  }

  .order-shortcuts {@include box;border-top:1px solid hsla(0,0%,93%,.1);border-bottom:1px solid hsla(0,0%,93%,.1);padding:.1rem;color:$lightGray;align-items:center;box-sizing:border-box;
      div{@include flex;text-align:center;
        svg{width:.3rem;height:.3rem;}
        h1{line-height: .1rem;font-size:$h4;margin-top:.06rem;}
      }
  }
  .fns{padding:.3rem .2rem;color:#fff;
      .fn{width:50%;text-align:center;float:left;box-sizing:border-box;margin-bottom:.3rem;
        .exp-progress-bar{width:1rem;height:1rem;display:inline-block;position: relative;box-sizing: border-box;padding-bottom:.1rem;
            svg{transform: rotate(-0.05deg);}
            circle {transition: stroke-dasharray 3s linear;}
            .title{position: absolute;bottom:0;left:0;text-align: center;width:100%;}
            .lv{font-size:.4rem;position:absolute;top:50%;left:50%;margin-left:-.2rem;margin-top:-.25rem;color:$mainColor;}
        }
        h1{font-size:.52rem;line-height:.7rem;padding-top:.1rem;color:$mainColor;}
        h2{line-height: .2rem;}
        .icon{width:.8rem;height:.8rem;color:$mainColor;}
      }
  }
</style>