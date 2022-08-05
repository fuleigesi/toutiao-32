<template>
  <div>
    <van-cell v-for="(item, index) in li" :key="index" icon="search">
      <template #title>
        <span v-html="item"></span>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { debounce } from 'lodash'
import { getSearch } from '@/api'
export default {
  data() {
    return {
      list: [],
      li: []
    }
  },
  props: {
    kerWords: {
      type: String,
      required: true
    }
  },
  methods: {
    newgetSearch: debounce(async function () {
      try {
        // clearTimeout(this.id)
        // this.id = setTimeout(async () => {
        const { data } = await getSearch(this.kerWords)
        // console.log(res)
        this.list = data.data.options
        // this.list = this.list.filter((item) => Boolean(item))
        this.list = this.list.filter(Boolean)
        const a = new RegExp(this.kerWords, 'ig')
        this.li = this.list.map((item) => {
          return item.replace(a, function (match) {
            return `<span style="color:red">${match}</span>`
          })
        })
        console.log(this.li)
        // }, 300)
      } catch (e) {
        this.$toast.fail('获取失败')
        console.log(e)
      }
    }, 300)
  },
  watch: {
    kerWords: {
      immediate: true,
      handler() {
        this.newgetSearch()
      }
    }
  }
}
</script>

<style></style>
