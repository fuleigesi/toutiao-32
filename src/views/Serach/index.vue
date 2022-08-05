<template>
  <div>
    <form action="/">
      <van-search
        v-model="kerWords"
        background="#3296fa"
        :show-action="true"
        placeholder="请输入搜索关键词"
        class="search"
        @search="onSearch"
        @focus="onSearchFocus"
      />
    </form>

    <component :is="componentName" :kerWords="kerWords"></component>
  </div>
</template>

<script>
import SearchHistory from './components/SearchHistory.vue'
import SearchResults from './components/SearchResults.vue'
import SearchSuggestions from './components/SearchSuggestions.vue'
export default {
  data() {
    return {
      kerWords: '',
      isShowSearchResults: false
    }
  },
  components: {
    SearchHistory,
    SearchResults,
    SearchSuggestions
  },
  methods: {
    onSearch() {
      console.log(1)
      this.isShowSearchResults = true
    },
    onSearchFocus() {
      // input 获取焦点的时候显示搜索建议
      this.isShowSearchResults = false
    }
  },
  computed: {
    componentName() {
      if (this.kerWords.trim() === '') {
        return SearchHistory
      } else if (this.isShowSearchResults) {
        return SearchResults
      } else {
        return SearchSuggestions
      }
    }
  }
}
</script>

<style lang="less" scoped>
:deep(.search) {
  [role='button'] {
    color: #fff;
  }
}
</style>
