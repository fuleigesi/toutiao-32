<template>
  <van-cell
    v-if="articleInfo.cover.type === 0"
    :title="articleInfo.title"
    value="内容"
    :label="label"
  />

  <van-cell
    v-else-if="articleInfo.cover.type === 1"
    :title="articleInfo.title"
    value="内容"
    :label="label"
  >
    <template #default>
      <van-image
        v-for="(item, index) in articleInfo.cover.images"
        :key="index"
        width="100"
        height="100"
        :src="item"
      />
    </template>
  </van-cell>

  <van-cell v-else :title="articleInfo.title" value="内容" :label="label">
    <template #default>
      <van-image
        v-for="(item, index) in articleInfo.cover.images"
        :key="index"
        width="100"
        height="100"
        :src="item"
      />
    </template>
  </van-cell>
</template>

<script>
export default {
  data() {
    return {}
  },
  props: {
    articleInfo: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    label() {
      const art = this.articleInfo
      return `${art.aut_name} ${art.comm_count}评论 ${art.pubdate}`
    }
  }
}
</script>

<style></style>
