<template>
  <div>
    <!-- <el-button @click="count++">count is {{ dbCount }}</el-button> -->
    <teleport to="#aaa">
      <!-- 能够把里面的标签传送到指定标签的最后位置 -->
      <!-- class="app" 在 index.html 文件中定义了。 -->
      <p>这是一个 p 标签</p>
    </teleport>




    <div id="aaa"></div>
    <l01Table :arr="state.arr">
      <template #btns="scope">
        <button @click="hdClick(scope.indexRow)"> edit</button>
        <!-- 点击按钮，获取这一行的数据 -->
      </template>
    </l01Table>

  </div>
  <!-- <l01Child v-model:count="num"></l01Child> -->
</template>


<script setup lang="ts">
import l01Table from "@/l01/l01-child.vue";
import { reactive } from "vue";
import { ElButton } from "element-plus";

const hdClick = (index: number) => {
  console.log(state.arr[index]);
}

let state = reactive({
  arr: [{
    name: "小明",
    age: 10
  },
  {
    name: "小红",
    age: 100
  }
  ]
})


</script>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
