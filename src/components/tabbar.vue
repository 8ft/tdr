<template>
  <div class="tabbar" ref="tabBar">

    <div @click="replacePath('store')" :class="{'active':curPath==='/store'}">
      <svg class="icon" aria-hidden="true">
          <use :xlink:href="'#icon-store'+(curPath==='/store'?'_fill':'')"></use>
      </svg>
      <h1>商店</h1>
    </div>

    <div @click="replacePath('cart')" :class="{'active':curPath==='/cart'}">
      <svg class="icon" aria-hidden="true">
          <use :xlink:href="'#icon-mall'+(curPath==='/cart'?'_fill':'')"></use>
      </svg>
      <h1>购物车</h1>
    </div>

    <div @click="replacePath('mine')" :class="{'active':curPath==='/mine'}">
      <svg class="icon" aria-hidden="true">
          <use :xlink:href="'#icon-personal'+(curPath==='/mine'?'_fill':'')"></use>
      </svg>
      <h1>我的</h1>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'tabbar',
    data(){
      return{
        curPath:''
      }
    },
    mounted(){
      this.curPath=this.$route.path;
    },
    watch: {
      '$route'(to, from) {
        this.curPath=to.path;
      }
    },
    methods:{
        replacePath(path){
            this.$router.replace(path);
        }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../assets/style/var.scss";
  .tabbar {position:absolute;bottom:0;left:0;right:0;z-index: $topFloor;@include box;border-top:$border;height: .5rem; background: #fff;box-sizing:border-box;padding-top:.06rem;
    div{@include flex;text-align:center;
      h1{line-height: .1rem;font-size:$h4;margin-top:.03rem;}
      &.active{color:$mainColor;}
    }
  }
</style>
