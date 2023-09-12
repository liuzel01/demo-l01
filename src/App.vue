<template>
  <div class="container">
    <el-row>

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

    </el-row>

    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="date" label="Date" width="180" />
      <el-table-column prop="name" label="Date" width="180" />
      <el-table-column prop="address" label="Date" />
    </el-table>

  </div>
  <addVue :isShow="isShow" :info="info" @closeAdd="closeAdd" @save="save"></addVue>

  <!-- <router-view></router-view> -->
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import addVue from '@/login-solana-module/views/modal.vue'
import User from '@/login-solana-module/class/User'
import { ElMessage } from 'element-plus';

// const total = ref(100)
const info = ref<User>(new User())
const isShow = ref(false)
const SearchVal = ref("")
const enterSearch = () => {

}
const openAdd = () => {
  isShow.value = true
}

const closeAdd = () => {
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

const tableData = [
  {
    date: '2222-05-03',
    name: 'tom',
    address: 'No.189xa'
  }, {
    date: '2222-05-03',
    name: 'tom',
    address: 'No.189xa'
  }, {
    date: '2222-05-03',
    name: 'tom',
    address: 'No.189xa'
  },
]

</script>