<script setup lang="ts">
import { generateLinkPath } from './calculateBesselCurve'
import { watch } from 'vue'
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
  c: (string | number)[]
}
// 选中的item
let item = $ref<number>(-1)
const boxList = $ref<aaa[]>([])
// 鼠标移动
function onMouseMove(e: any) {
  const { clientX, clientY } = e
  if (item > -1) {
    const moveDistanceX: number = premitixe.x + clientX - startPoint.x
    const moveDistanceY: number = premitixe.y + clientY - startPoint.y
    boxList[item].x = moveDistanceX
    boxList[item].y = moveDistanceY
  }
  if (wzz.length > 0 && wzzop) {
    if (wzz == 'end') {
      wzzop.x2 = clientX
      wzzop.y2 = clientY
    } else {
      wzzop.x1 = clientX
      wzzop.y1 = clientY
    }
  }
}
// 鼠标按下
function onMouseDown(e: any, itemIndex: number) {
  const { clientX, clientY } = e
  startPoint.x = clientX
  startPoint.y = clientY
  item = itemIndex
  premitixe.x = boxList[item].x
  premitixe.y = boxList[item].y
}
// 鼠标抬起
function onMouseUp(e: any) {
  if (item > -1) {
    boxList[item].x = boxList[item].x - (boxList[item].x % 20)
    boxList[item].y = boxList[item].y - (boxList[item].y % 20)
    item = -1
  }
  if (wzz.length > 0) {
    wzzop = null
    wzz = ''
  }
}
function btnClick() {
  boxList.push({
    x: 0,
    y: 0,
    c: []
  })
}
const arr = Array.from({ length: 250 }, (v, k) => k)
let wzz = ''
let wzzop = $ref<{
  x1: number
  x2: number
  y1: number
  y2: number
  index: number
} | null>(null)
const rectmousedown = (e, index, wz) => {
  console.log(index)
  wzz = wz
  wzzop = {
    x1: 0,
    x2: 0,
    y1: 0,
    y2: 0,
    index: index
  }
  if (wz == 'end') {
    wzzop.x1 = boxList[index].x
    wzzop.y1 = boxList[index].y
  } else {
    wzzop.x2 = boxList[index].x
    wzzop.y2 = boxList[index].y
  }
}
const rectmouseup = (e, index) => {
  if (wzzop?.index > -1 && wzzop.index != index) {
    if (wzz == 'end') {
      boxList[wzzop.index].c.push(index)
    } else {
      boxList[index].c.push(wzzop.index)
    }
  }
}

// 全局监听鼠标按钮下
const onMouseDown1 = (e) => {
  const { clientX, clientY } = e
  if (wzz.length > 0 && wzzop) {
    if (wzz == 'start') {
      wzzop.x2 = clientX
      wzzop.y2 = clientY
    } else {
      wzzop.x1 = clientX
      wzzop.y1 = clientY
    }
  }
}
</script>

<template>
  {{ boxList }}
  <button @click="btnClick">+1</button>
  <svg
    width="5000"
    height="5000"
    @mouseup="onMouseUp"
    @mousedown="onMouseDown1"
    @mousemove="onMouseMove"
  >
    <rect class="chart" width="5000" height="5000"></rect>
    <!--背景线-->
    <g>
      <template v-for="item in arr" :key="item">
        <line
          class="red-ui-workspace-chart-grid-h"
          x1="0"
          x2="5000"
          :y1="item * 20"
          :y2="item * 20"
        ></line>
        <line
          class="red-ui-workspace-chart-grid-h"
          y1="0"
          y2="5000"
          :x1="item * 20"
          :x2="item * 20"
        ></line>
      </template>
    </g>
    <!--链接线-->
    <g>
      <template v-for="(item, index) in boxList" :key="index">
        <template v-for="(_item, _index) in item.c" :key="_index">
          <g v-if="item.c.length > 0">
            <path
              class="red-ui-flow-link-background red-ui-flow-link-path"
              :d="
                generateLinkPath(
                  item.x + 80,
                  item.y + 20,
                  boxList[_item].x,
                  boxList[_item].y + 20,
                  1
                )
              "
            ></path>
            <path
              class="red-ui-flow-link-outline red-ui-flow-link-path"
              :d="
                generateLinkPath(
                  item.x + 80,
                  item.y + 20,
                  boxList[_item].x,
                  boxList[_item].y + 20,
                  1
                )
              "
            ></path>
            <path
              class="red-ui-flow-link-line red-ui-flow-link-path red-ui-flow-subflow-link"
              :d="
                generateLinkPath(
                  item.x + 80,
                  item.y + 20,
                  boxList[_item].x,
                  boxList[_item].y + 20,
                  1
                )
              "
            ></path>
          </g>
        </template>
      </template>
    </g>
    <g v-if="wzzop">
      <path
        class="red-ui-flow-link-background red-ui-flow-link-path"
        :d="
          wzz == 'end'
            ? generateLinkPath(wzzop.x1 - 5, wzzop.y1 - 28, wzzop.x2 - 6, wzzop.y2 - 30, 1)
            : generateLinkPath(wzzop.x2, wzzop.y2 - 28, wzzop.x1 - 10, wzzop.y1 - 30, -1)
        "
      ></path>
      <path
        class="red-ui-flow-link-outline red-ui-flow-link-path"
        :d="
          wzz == 'end'
            ? generateLinkPath(wzzop.x1 - 5, wzzop.y1 - 28, wzzop.x2 - 6, wzzop.y2 - 30, 1)
            : generateLinkPath(wzzop.x2, wzzop.y2 - 28, wzzop.x1 - 10, wzzop.y1 - 30, -1)
        "
      ></path>
      <path
        class="red-ui-flow-link-line red-ui-flow-link-path red-ui-flow-subflow-link"
        :d="
          wzz == 'end'
            ? generateLinkPath(wzzop.x1 - 5, wzzop.y1 - 28, wzzop.x2 - 6, wzzop.y2 - 30, 1)
            : generateLinkPath(wzzop.x2, wzzop.y2 - 28, wzzop.x1 - 10, wzzop.y1 - 30, -1)
        "
      ></path>
    </g>

    <!--拖动的块-->
    <g>
      <g
        v-for="(item, index) in boxList"
        :key="index"
        :transform="`translate(${item.x}, ${item.y})`"
      >
        <rect x="0" y="0" width="80" height="40" fill="#ff0"></rect>
        <text class="red-ui-flow-node-label-text" x="20" y="25">{{ index }}</text>
        <rect
          x="0"
          y="0"
          width="80"
          height="40"
          fill="rgba(0,0,0,0)"
          class="move"
          @mousedown="onMouseDown($event, index)"
          @mouseup="rectmouseup($event, index)"
        ></rect>
        <!--入口-->
        <rect
          x="0"
          y="15"
          width="10"
          height="10"
          fill="#f00"
          @mousedown="rectmousedown($event, index, 'start')"
        ></rect>
        <!--          @mouseup="rectmouseup($event, index, 'start')"-->
        <!--出口-->
        <rect
          x="70"
          y="15"
          width="10"
          height="10"
          fill="#00f"
          @mousedown="rectmousedown($event, index, 'end')"
        ></rect>
        <!--          @mouseup="rectmouseup($event, index, 'end')"-->
      </g>
    </g>
  </svg>
</template>

<style>
.chart {
  fill: #fff;
}
.red-ui-workspace-chart-grid-h {
  fill: none;
  shape-rendering: crispEdges;
  stroke: #eee;
  stroke-width: 1px;
}
button {
  position: fixed;
  right: 0;
  top: 0;
  padding: 0 30px;
}
.red-ui-flow-node-label-text {
  position: relative;
  z-index: -1;
}
.red-ui-flow-link-background {
  stroke: #fff;
  opacity: 0;
  stroke-width: 20;
  cursor: crosshair;
  fill: none;
}
.red-ui-flow-link-outline {
  stroke: #fff;
  stroke-opacity: 0.4;
  stroke-width: 5;
  cursor: crosshair;
  fill: none;
  pointer-events: none;
}

.red-ui-flow-link-line {
  stroke: #999;
  stroke-width: 3;
  fill: none;
  pointer-events: none;
}
.red-ui-flow-node-label-text {
  user-select: none;
}
.move {
  cursor: move;
}
</style>
