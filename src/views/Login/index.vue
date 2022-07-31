<template>
  <div>
    <van-nav-bar title="标题" />
    <van-form @submit="onSubmit" class="form" ref="form">
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="mobileRules"
      >
        <!-- <template #left-icon> -->
        <template #label>
          <span class="toutiao toutiao-shouji1"> </span>
        </template>
      </van-field>
      <van-field
        v-model="code"
        name="code"
        placeholder="请输入验证码"
        :rules="codeRules"
      >
        <!-- <template #left-icon> -->
        <template #label>
          <span class="toutiao toutiao-yanzhengma"> </span>
        </template>
        <template #button>
          <van-button
            round
            v-if="isShow"
            @click="sendCode"
            size="mini"
            class="v-btn"
            type="primary"
            native-type="button"
            >发送验证码</van-button
          >
          <van-count-down
            v-else
            @finish="isShow = true"
            :time="2 * 1000"
            format="ss秒"
          />
        </template>
      </van-field>
      <div style="margin: 0.42rem">
        <van-button block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, getCodeApi } from '../../api'
import { codeRules, mobileRules } from './rules'
export default {
  data() {
    return {
      mobile: '',
      code: '',
      codeRules,
      mobileRules,
      isShow: true
    }
  },
  methods: {
    loading() {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true
      })
    },
    async onSubmit() {
      this.loading()
      try {
        // 结构赋值
        //  - 数组 const [a,b] = ['你好','hello'] 拥有命名权
        //  - 对象 const { name,age } = {name:'张三',age:18} 没有命名权
        //  - 对象的连续解构赋值 : 一层层的来const { friend:{ name } } = {name:'张三',friend:{ name:'李四' }}
        //  - 对象结构赋值当中的命名 const { friend:{ name:person } } = {name:'张三',friend:{ name:'李四' }}
        const {
          data: { data: token }
        } = await login(this.mobile, this.code)
        console.log(token)
        this.$router.push('layout')
        this.$toast.success('成功文案')
        this.$store.commit('SET_TOKEN', token)
      } catch (error) {
        console.log(error)
        const status = error.response.status
        let message = '请重新登录'
        if (status === 400) {
          message = error.response.data.status
        }
        this.$toast.fail(message)
      }
    },
    sendCode() {
      this.$refs.form.validate('mobile').then(async () => {
        this.loading()
        try {
          await getCodeApi(this.mobile)
          this.$toast.success('获取验证码成功')
          this.isShow = false
        } catch (error) {
          const status = error.response.status
          let message = '手机格式错误'
          if (status === 429) {
            message = error.response.data.message
          }
          this.$toast.fail(message)
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.van-nav-bar {
  background: rgb(72, 144, 250);
  :deep(.van-nav-bar__title) {
    color: #fff;
  }
}
:deep(.toutiao) {
  font-size: 40px;
}
:deep(.form) {
  .van-cell__title {
    flex: 1;
  }
  .van-cell__value {
    flex: 20;
  }
}
:deep(.v-btn) {
  &.van-button--mini {
    background: #eeeeee;

    border: 1px solid #eeeeee;
  }
  &.van-button--primary {
    color: #a9929b;
  }
}
</style>
