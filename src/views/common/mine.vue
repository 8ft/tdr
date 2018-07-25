<template>
    <app-layout>
        <div class="user-card">
            <svg width="72" height="72" viewbox="0 0 72 72">
                <circle cx="36" cy="36" r="33" stroke-width="6" stroke="rgba(255,255,255,.7)" fill="none" ref="circle"></circle>
                <circle cx="36" cy="36" r="33" stroke-width="6" stroke="#029fe094" fill="none" transform="matrix(0,1,-1,0,72,0)" :stroke-dasharray="dasharray"></circle>
            </svg>
            <img src="@/assets/img/profile.jpg">
            <h1>八疯兔</h1>
        </div>
        
        <div class="order-shortcuts">
            <div>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-payoff"></use>
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
                    <use xlink:href="#icon-ongoing"></use>
                </svg>
                <h1>待收货</h1>
            </div>
            <div>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-bill"></use>
                </svg>
                <h1>我的订单</h1>
            </div>
        </div>

        <div class="fns clearfix">
            <div class="fn">
                <div>2%</div>
                <h1>我的折扣</h1>
            </div>
            <div class="fn">
                <div>999</div>
                <h1>我的余额</h1>
            </div>
        </div>

    </app-layout>
</template>

<script>
export default {
    data() {
        return {
            exp:0,
            lvExp:100,
            perimeter:Math.PI * 2 * 33
        };
    },
    computed:{
        dasharray:function(){
            let perimeter=this.perimeter,
                percent=this.exp/this.lvExp;
            return perimeter * percent + ' ' + perimeter * (1- percent)
        }
    },
    activated(){
        setTimeout(()=>{
            this.exp=90;
        },1000)
    },
    methods:{
     
    }

}
</script>

<style lang="scss" scoped>
  @import '@/assets/style/base.scss';
  .user-card{background:#181b1f;text-align:center;padding:.5rem 0 .4rem;color:#fff;
      svg{transform: rotate(-0.05deg);}
      circle {transition: stroke-dasharray 3s linear;}
      img{width:.6rem;height:.6rem;border-radius:50%;margin-bottom:.1rem;position: absolute;top:.56rem;left:50%;margin-left:-.3rem;}
  }
  .order-shortcuts {@include box;border-top:1px solid hsla(0,0%,93%,.1);padding:.1rem;background:#181b1f;color:$lightGray;align-items:center;box-sizing:border-box;
      div{@include flex;text-align:center;
        svg{width:.3rem;height:.3rem;}
        h1{line-height: .1rem;font-size:$h4;margin-top:.06rem;}
      }
  }
  .fns{padding:.4rem .2rem;
      .fn{width:50%;text-align:center;float:left;box-sizing:border-box;
        div{font-size:3em;}
      }
  }
</style>