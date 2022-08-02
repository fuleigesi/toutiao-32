<template>
  <div>
    <van-pull-refresh
      v-model="refreshLoading"
      @refresh="loadNextPageArticle"
      success-text="刷新成功"
    >
      <van-list
        :finished="isfinished"
        finished-text="没有更多文章了~"
        v-model="loading"
        @load="loadNextPageArticle"
        offset="0"
        :immediate-check="false"
        :error.sync="iserror"
        error-text="记载错误点击刷新"
      >
        <article-item
          :articleInfo="item"
          v-for="item in list"
          :key="item.art_id"
        ></article-item>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticleAPI } from '@/api'
// 引入组件
import ArticleItem from '@/components/ArticleItem.vue'
export default {
  components: {
    ArticleItem
  },
  data() {
    return {
      list: [],
      loading: false,
      pre_timestamp: '',
      isfinished: false,
      iserror: false,
      refreshLoading: false
    }
  },
  props: {
    id: {
      type: [String, Number],
      required: true
    }
  },
  created() {
    this.getFirstPageArticle()
  },
  methods: {
    async getFirstPageArticle() {
      try {
        const { data } = await getArticleAPI(this.id, +new Date())
        // console.log(data)
        this.pre_timestamp = data.data.pre_timestamp
        // console.log(data);
        this.list = data.data.results
        // console.log(this.list)
      } catch (e) {
        this.$toast.fail('请刷新重新获取文章')
        // console.log(e)
      }
    },
    // 加载下一篇文章
    async loadNextPageArticle() {
      try {
        if (Math.random() > 0.5) {
          console.log(a)
        }
        const { data } = await getArticleAPI(this.id, this.pre_timestamp)
        // console.log(res)
        if (this.refreshLoading) {
          this.list.unshift(...data.data.results)
        } else {
          this.list.push(...data.data.results)
        }

        this.pre_timestamp = data.data.pre_timestamp
        if (this.pre_timestamp === null) {
          this.isfinished = true
        }

        // this.iserror = false
      } catch (e) {
        this.iserror = true
        // this.$toast.fail('请刷新重新获取文章')
        console.log(e)
      } finally {
        this.loading = false
        this.refreshLoading = false
      }
    }
  }
}
</script>

<style></style>
