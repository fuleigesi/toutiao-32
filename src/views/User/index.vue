<template>
  <div>
    <div class="navbar">
      <van-nav-bar title="标题" left-arrow @click-left="$router.back()" />
    </div>
    <!-- accept限制文件选择的后缀名 hidden 让input框隐藏 -->
    <van-cell title="单元格" @click="$refs.file.click()" is-link>
      <van-image round width="0.8rem" height="0.8rem" :src="userInfo.photo" />
      <input type="file" accept="jpq" @change="changeFile" hidden ref="file" />
    </van-cell>
    <van-popup
      closeable
      class="headportrait"
      position="bottom"
      :style="{ height: '100%', width: '100%' }"
      v-model="show"
    >
      <update-avator
        @upload-avator=";(userInfo.photo = $event), (show = false)"
        v-if="show"
        :pohot="pohot"
      ></update-avator>
    </van-popup>
  </div>
</template>

<script>
import { resolveToBase64 } from '@/utils/FileReader'
import UpdateAvator from './components/UpdateAvator.vue'
import { getUserInfo } from '@/api'
export default {
  name: 'User',
  data() {
    return {
      userInfo: {},
      show: false,
      pohot: ''
    }
  },
  components: {
    UpdateAvator
  },
  created() {
    this.newgetUserInfo()
  },
  methods: {
    async newgetUserInfo() {
      try {
        const { data } = await getUserInfo()
        console.log(data)
        this.userInfo = data.data
      } catch (e) {
        console.log(e)
      }
    },
    async changeFile(e) {
      // 用户选择图片后如何显示图片?
      // 1. 获取file对象  --> e.target.files
      // 2. 把file对象转成img的src可识别的格式
      //    - objectUrl  --> URL.createObjectUrl(file对象)
      // - 缺点: 内存泄露  因为跟document绑定在一起
      // - 优点: 写法简单
      //    - Base64   --> FileReader(读文件对象)
      // - fr.readAsDataURL(file)
      // - fr.onload = (e)=>{  e.target.result  }
      console.log(e.target.files[0])
      const file = e.target.files[0]

      const url = await resolveToBase64(file)
      console.log(url)
      this.pohot = url
      e.target.value = ''
      this.show = true
      // const url = window.URL.createObjectURL(file)
      // console.log(url)
      // this.pohot = url
      // e.target.value = ''
      // this.show = true
      // const fr = new FileReader()
      // fr.readAsDataURL(file)
      // fr.onload = (e) => {
      //   console.log(e.srcElement.result)
      //   this.pohot = e.target.result
      //   console.log(e.target.result)
      //   e.target.value = ''
      //   this.show = true
      // }
    }
  }
}
</script>

<style lang="less" scoped>
:deep(.navbar) {
  .van-nav-bar__content {
    background: #3296fa;
  }
  .van-icon {
    color: #fff;
  }
  .van-ellipsis {
    color: #fff;
  }
}
:deep(.headportrait) {
  background: #000;
}
</style>
