<template>
  <div class="container">
    <!-- <el-row>
      <el-col :span="12">
        <el-input v-model="SearchVal" placeholder="pleas input" class="input-with-select" ketup.enter="enterSearch">
          <template #append>
            <el-button @click="enterSearch" />
          </template>

        </el-input>
      </el-col>

      <el-col :span="12">
        <el-button type="primary" @click="openAdd">add</el-button>
        <el-button type="danger" @click="onDel">delete</el-button>
      </el-col>
    </el-row> -->

    <p>
      <el-button type="primary" @click="connWallet">
        钱包登录
      </el-button>
    </p>
    <addVue :isShow="isShow" @cancelAdd="cancelAdd"></addVue>

  </div>
  <addVue :isShow="isShow" :info="info" @cancelAdd="cancelAdd" @save="save"></addVue>

  <!-- <router-view></router-view> -->
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import addVue from '@/login-solana-module/views/modal.vue'
  import User from '@/login-solana-module/class/User'
  import { ElMessage } from 'element-plus';

  const connWallet = () => {
    isShow.value = true
  }

  // const total = ref(100)
  const info = ref < User > (new User())
  const isShow = ref(false)
  const SearchVal = ref("")
  const enterSearch = () => {

  }
  const openAdd = () => {
    isShow.value = true
  }

  const cancelAdd = () => {
    isShow.value = false
    info.value = new User()
  }

  const save = (message: string) => {
    isShow.value = false
    info.value = new User()
    ElMessage.success(message)
  }


  const onDel = () => {

  }

</script>