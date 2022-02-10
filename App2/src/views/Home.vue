
  <!-- <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div> -->


<template>
  <div class="home">
    <h1>app2 home page</h1>
    <button @click="handleClick">click</button>
  </div>
</template>


<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'Home',
  components: {
    HelloWorld,
  },
  mounted() {
    // window.a = 'App2';
  },
  methods: {
    handleClick() {
      console.log('a=11======>', window.a, window.b);
    },
  },
};
</script>
