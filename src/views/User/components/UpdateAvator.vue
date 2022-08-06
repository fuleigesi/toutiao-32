<template>
  <div>
    标签结构
    <div class="img">
      <!-- src 可识别的  -->
      <img :src="pohot" alt="" ref="image" />
    </div>
    <footer>
      <span @click="btnquxiao">取消</span>
      <span @click="uploadAvators">确定</span>
    </footer>
  </div>
</template>

<script>
import { uploadAvator } from '@/api'
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'
export default {
  props: {
    pohot: {
      type: String,
      required: true
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.myCropper = new Cropper(this.$refs.image, {
        viewMode: 1,
        dragMode: 'none',
        initialAspectRatio: 1,
        aspectRatio: 1,
        preview: '.before',
        background: false,
        autoCropArea: 0.6,
        zoomOnWheel: false
      })
    },
    uploadAvators() {
      this.myCropper.getCroppedCanvas().toBlob(async (blob) => {
        this.$toast.loading({
          message: '图片正在上传中..',
          forbidClick: true
        })
        try {
          const { data } = await uploadAvator(blob)
          console.log(data.data.photo)
          this.$emit('upload-avator', data.data.photo)
          this.$toast.success('上传成功')
        } catch (e) {
          console.log(e)
          this.$toast.fail('上传失败')
        }
      })
    },
    btnquxiao() {
      this.$parent.$parent.show = false
    }
  }
}
</script>

<style scoped lang="less">
* {
  padding: 0;
  margin: 0;
}
.img {
  width: 100%;
  height: 60vh;
  position: absolute;
  top: 50%;
  left: 0;
  transform: translate(0, -50%);
  img {
    width: 100%;
  }
}
footer {
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  width: 100%;
  color: #fff;
}
</style>
