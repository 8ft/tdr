<template>
  <div id="app" :style="'height:'+wrapperHeight + 'px;'">
    <transition :name="transitionName" :leave-active-class="leaveName">
      <keep-alive :exclude="/^ex-/">
        <router-view :style="hasTabBar?'bottom:.5rem;':'bottom:0;'"></router-view>
      </keep-alive>
    </transition>
    <tabbar v-if="hasTabBar"></tabbar>
  </div>
</template>

<script>
import Tabbar from 'comps/common/tabbar.vue'

export default {
  components:{
    'tabbar':Tabbar
  },
  data() {
    return {
      leaveName: '',
      transitionName: '',
      wrapperHeight: 0,
      hasTabBar:false
    };
  },
  mounted() {
    this.wrapperHeight = window.innerHeight;
  },
  watch: {
    '$route'(to, from) {
      this.hasTabBar=to.meta.hasTabBar;

      let tt = to.meta.transition,
        ft = from.meta.transition,
        pathIndex=this.$cache.history.indexOf(to.path);

      if ( pathIndex!= -1) {//back
        this.transitionName = ft ? ft + '-out' : '';
        this.$cache.history=this.$cache.history.slice(0,pathIndex+1);
      } else {//forward
        this.transitionName = tt ? tt + '-in' : '';
        this.$cache.history.push(to.path);
      }
    }
  }
}
</script>

<style lang="scss">
  @import './assets/style/base.scss';
</style>
