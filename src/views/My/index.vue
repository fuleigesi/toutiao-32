<template>
  <div>
    <div v-if="isLogin">登录的</div>
    <div v-else>未登录的</div>
    <div>主体</div>
    <div v-if="isLogin" @click="logout">退出</div>
  </div>
</template>

<script>
export default {
  computed: {
    isLogin() {
      return !!this.$store.state.tokenObj.token
    }
  },
  methods: {
    logout() {
      this.$store.commit('SET_TOKEN', {})
    }
  }
}
</script>

<style></style>
