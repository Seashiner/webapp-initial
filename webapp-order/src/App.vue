<template>
  <div id="app">
    <v-head></v-head>

    <div class='navs'>
      <div class='item'>
        <router-link to='/goods'>商品</router-link>
      </div>
      <div class='item'>
        <router-link to='/ratings'>评价</router-link>
      </div>
      <div class='item'>
        <router-link to='/seller'>商家</router-link>
      </div>
    </div>

    <router-view></router-view>
  </div>
</template>

<script>
  import {GETSELLER,GETGOODS,GETRATINGS} from "@/store/mutation_typies.js"
  import {mapActions} from 'vuex'
  import head from "components/head/head.vue";
  export default {
    name: 'App',
    methods: {
      ...mapActions([GETSELLER,GETGOODS,GETRATINGS])
    },
    components:{
        "v-head":head
    },
    mounted() {
      this[GETSELLER]()
      this[GETGOODS]()
      this[GETRATINGS]()
      // this.$store.dispatch(GETSELLER)
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "./common/stylus/mixin.styl"
  #app 
    width:100%;
    height:100%;
    overflow hidden;
    // background :pink;
    display:flex;
    flex-direction : column
    .navs
      one-px(rgba(7,17,27,.1))
      display:flex;
      justify-content : space-around ;
      height:40px;
      // background-color :pink;
      .item
        flex:1;
        &>a
          display:block;
          height:40px;
          line-height 40px;
          text-align :center;
          &.router-link-active
            color rgba(240,20,20,1)
</style>
