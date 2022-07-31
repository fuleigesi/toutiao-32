<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
import axios from './utils/request'
export default {
  created() {
    console.dir(axios)
    console.log(this)
  },
  methods: {
    increment() {
      console.log(this)
    }
  }
}
</script>

<style></style>
