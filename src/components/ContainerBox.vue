<template>
  <div>
  <!-- 저번시간에 만든거 -->
    <div v-if="step == 0 ">
      <PostBox :boardPan="boardPan[i]" v-for="(a, i) in boardPan" :key="i" />
    </div>
    <!-- 필터선택페이지 -->
    <div v-if="step == 1">
      <div :class="선택한필터" class="upload-image" :style="`background-image:url(${이미지})`"></div>
      <div class="filters">
        <FilterBox :필터="필터" :이미지="이미지" v-for="필터 in 필터들" :key="필터"> 
        </FilterBox>
      </div>
    </div>
    <!-- 글작성페이지 -->
    <div v-if="step == 2">
      <div :class="선택한필터" class="upload-image" :style="`background-image:url(${이미지})`"></div>
      <div class="write">
        <textarea @input="$emit('write', $event.target.value)" class="write-box">write!</textarea> 
      </div>
    </div>
  </div>
</template>

<script>
import PostBox from './PostBox.vue' 
import FilterBox from './FilterBox.vue'
export default {
  components: {
    PostBox,
    FilterBox,
  },
  props: {
    boardPan : {
      type: Array,
       default() {
        return [];
      }
    },
    step : Number,
    이미지 : String,
  },
  data(){
    return{
      displayBoardPan : this.boardPan,
      필터들 : [ "aden", "_1977", "brannan", "brooklyn", "clarendon", "earlybird", "gingham", "hudson", 
              "inkwell", "kelvin", "lark", "lofi", "maven", "mayfair", "moon", "nashville", "perpetua", 
              "reyes", "rise", "slumber", "stinson", "toaster", "valencia", "walden", "willow", "xpro2"],
      선택한필터 : '',
    }
  },
  created(){
    console.log(this.boardPan)
    console.log(this.displayBoardPan)
  },
  mounted(){
    this.emitter.on('박스클릭함', ()=>{
      this.선택한필터 = a;
    })
  },
}
</script>

<style>
.upload-image{
width: 100%;
height: 450px;
background: cornflowerblue;
background-size : cover;
}
.filters{
overflow-x:scroll;
white-space: nowrap;
}
.filter-1 {
width: 100px;
height: 100px;
background-color: cornflowerblue;
margin: 10px 10px 10px auto;
padding: 8px;
display: inline-block;
color : white;
background-size: cover;
}
.filters::-webkit-scrollbar {
height: 5px;
}
.filters::-webkit-scrollbar-track {
background: #f1f1f1; 
}
.filters::-webkit-scrollbar-thumb {
background: #888; 
border-radius: 5px;
}
.filters::-webkit-scrollbar-thumb:hover {
background: #555; 
}
.write-box {
border: none;
width: 90%;
height: 100px;
padding: 15px;
margin: auto;
display: block;
outline: none;
}
</style>