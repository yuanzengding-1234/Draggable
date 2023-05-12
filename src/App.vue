<script setup lang="ts">
const startPoint = $ref<{
  x: number
  y: number
}>({
  x: 0,
  y: 0
})
const premitixe = {
  x: 0,
  y: 0
}
type aaa = {
  x: number
  y: number
}
// 选中的item
let item = $ref<number>(0)
let isDown = $ref<boolean>(false)
const boxList = $ref<aaa[]>([])
// 鼠标移动
function onMouseMove(e: any) {
  if (!isDown) return
  const { clientX, clientY } = e
  const moveDistanceX: number = premitixe.x + clientX - startPoint.x
  const moveDistanceY: number = premitixe.y + clientY - startPoint.y
  boxList[item].x = moveDistanceX
  boxList[item].y = moveDistanceY
}
// 鼠标按下
function onMouseDown(e: any, itemIndex: number) {
  isDown = true
  const { clientX, clientY } = e
  startPoint.x = clientX
  startPoint.y = clientY
  item = itemIndex
  premitixe.x = boxList[item].x
  premitixe.y = boxList[item].y
}
// 鼠标抬起
function onMouseUp(e: any) {
  isDown = false
  item = 0
}
function btnClick() {
  boxList.push({
    x: 0,
    y: 0
  })
}
</script>

<template>
  <button @click="btnClick">+1</button>
  <div class="body" @mouseup="onMouseUp" @mousemove="onMouseMove">
    <div
      class="aaa"
      v-for="(item, index) in boxList"
      :style="`--x:${item.x}px;--y:${item.y}px;`"
      :key="index"
      @mousedown="onMouseDown($event, index)"
    ></div>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
}
.body {
  min-width: 100vw;
  min-height: 100vh;
}
.aaa {
  width: 100px;
  height: 100px;
  background-color: pink;
  transform: translate(var(--x), var(--y));
}
button {
  position: fixed;
  right: 0;
  top: 0;
  padding: 0 30px;
}
</style>
