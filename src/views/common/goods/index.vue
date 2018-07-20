<template>
    <app-layout>
        <h1>hhhhhhhhhhhhhhhhhhhhhhhh</h1>
        <router-link to="/goods/1">商品1</router-link>
        <lc-cell-swipe  :right="[{
                  content: '删除',
                  style: { background: 'red', color: '#fff','line-height':'1rem',padding:'0 .1rem' },
                  handler:()=>deleteItems([item.cart_id])
                }]">
        

        <div @click="test">sfdsfdaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</div>

        </lc-cell-swipe>
    </app-layout>
</template>

<script>
export default {
  data() {
    return {
    
    };
  },
  activated() {
      this.$store.commit('changeLayout');
  },
  methods:{
      test(){
          console.log(1);
      }
  }
 
}
</script>


<style lang="scss">
    @import "@/assets/style/var.scss";
    .lc-cell-wrapper {width:100%;height: 1rem;padding:.1rem .2rem .1rem .48rem;box-sizing:border-box;display:block;position: relative;overflow: hidden;zoom:1;font-size:$h3;}
</style>

