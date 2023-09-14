<template>
  <div class="container">
    <p>
      <el-button type="primary" @click="getAccount">
        钱包登录
      </el-button>
    </p>
    <!-- <addVue :isShow="isShow" @cancelAdd="cancelAdd"></addVue> -->

  </div>
  <addVue :isShow="isShow" @cancelAdd="cancelAdd" @save="save"></addVue>

  <!-- <router-view></router-view> -->
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import addVue from '@/login-solana-module/views/modal.vue'
// import { PublicKey } from '@solana/web3.js'
// import { Connection } from '@solana/web3.js'

const getAccount = async () => {
  const { solana } = window
  if (solana) {
    const response = await solana.connect()
    console.log('address:', response.publicKey.toString())
  }
}

// const getAccount = () => {
//   isShow.value = true
// }
const isShow = ref(false)

const cancelAdd = () => {
  isShow.value = false
  // info.value = new User()
}

const save = (message: string) => {
  isShow.value = false
  ElMessage.success(message)
}

</script>