<template>
  <div class="channel">
    <van-cell :border="false" title="我的频道">
      <van-button
        round
        size="mini"
        class="edit-btn"
        @click="isEdit = !isEdit"
        >{{ isEdit ? '编辑' : '完成' }}</van-button
      >
    </van-cell>
    <van-grid gutter="0.2rem">
      <van-grid-item
        v-for="(value, index) in myChannel"
        :key="value.id"
        :text="value.name"
        @click="changeActive(index, value)"
        :class="['mychannel-item', { classtj: value.name === '推荐' }]"
      >
        <template #icon>
          <van-icon name="cross" v-show="!isEdit && value.name !== '推荐'" />
        </template>
      </van-grid-item>
    </van-grid>
    <van-cell :border="false" title="推荐频道"> </van-cell>
    <van-grid gutter="0.2rem">
      <van-grid-item
      @click="$emit('add-channel',value)"
        v-for="value in recommendChannels"
        icon="plus"
        :key="value.id"
        :text="value.name"
        class="add"
      />
    </van-grid>
  </div>
</template>

<script>
import { getAllChannels as getAllChannelsAPI } from '@/api'
export default {
  data() {
    return {
      // 编辑状态
      isEdit: true,
      allChannel: []
    }
  },
  props: {
    myChannel: {
      type: Array,
      required: true
    }
  },
  created() {
    this.getAllChannels()
  },
  methods: {
    async getAllChannels() {
      try {
        const { data } = await getAllChannelsAPI()
        this.allChannel = data.data.channels
        console.log(this.allChannel)
      } catch (e) {
        console.log(e)
      }
    },
    changeActive(index, value) {
      if (this.isEdit) {
        // this.$parent.$parent.show = false
        this.$emit('close', index)
      } else {
        if (value.name === '推荐') return
        // 编辑状态
        this.$emit('delChannel', value.id)
      }
    }
  },
  computed: {
    // 所有频道减去我的频道
    recommendChannels() {
      // const res = this.allChannel.filter((items) => {
      //   const a = !!this.myChannel.find((item) => {
      //     return item.id === items.id
      //   })
      //   if (a) {
      //     return false
      //   } else {
      //     return true
      //   }
      // })
      // return res
      // return this.allChannel.filter((item) => {
      //   return !this.myChannel.find((items) => item.id === items.id)
      // })
      return this.allChannel.filter(
        (item) => !this.myChannel.find((items) => items.id === item.id)
      )
    }
  }
}
</script>

<style scoped lang="less">
.channel {
  padding-top: 1.3333rem;
  .edit-btn {
    width: 104px;
    height: 48px;
    color: red;
    &.van-button--mini {
      border-color: red;
    }
  }
  :deep(.van-grid-item__content) {
    background-color: #eee;
  }
  .add {
    :deep(.van-grid-item__content) {
      flex-direction: row;
      .van-grid-item__icon {
        font-size: 40px;
      }
    }
  }
  :deep(.mychannel-item) {
    .van-grid-item__content {
      position: relative;
    }
    .van-grid-item__icon-wrapper {
      position: unset;
    }
    .van-icon-cross {
      position: absolute;
      right: 0;
      top: 0;
      font-size: 30px;
      transform: translate(40%, -50%);
      border: 2px solid #000;
      border-radius: 50%;
      z-index: 300;
    }
  }
  :deep(.van-grid-item__icon + .van-grid-item__text) {
    margin: 0;
  }
  :deep(.classtj) {
    .van-grid-item__text {
      color: red;
    }
  }
}
</style>
