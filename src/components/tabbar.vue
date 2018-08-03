<template>
  <div class="tabbar" ref="tabBar">

    <router-link to="/goods">
      <svg class="icon" aria-hidden="true">
          <use :xlink:href="'#icon-mall'+(curPath==='/store'?'_fill':'')"></use>
      </svg>
      <h1>商品</h1>
    </router-link>

    <router-link to="/cart">
      <svg class="icon" aria-hidden="true">
          <use :xlink:href="'#icon-mall'+(curPath==='/cart'?'_fill':'')"></use>
      </svg>
      <h1>购物车</h1>
    </router-link>

    <router-link to="/mine">
      <svg class="icon" aria-hidden="true">
          <use :xlink:href="'#icon-personal'+(curPath==='/mine'?'_fill':'')"></use>
      </svg>
      <h1>我的</h1>
    </router-link>

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
    }
  }
</script>

<style lang="scss" scoped>
  @import "../assets/style/var.scss";
  .tabbar {position:fixed;bottom:0;left:0;right:0;z-index: $topFloor;@include box;border-top:$border;height: .5rem; background:#fff;box-sizing:border-box;padding-top:.06rem;
    a{@include flex;text-align:center;
      h1{line-height: .1rem;font-size:$h4;margin-top:.03rem;}
    }
    .router-link-active{color:$mainColor;}
  }
</style>
