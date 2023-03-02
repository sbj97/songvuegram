<template>
  <div class="header">
    <ul class="header-button-left">
      <li>Cancel</li>
    </ul>
    <ul class="header-button-right">
      <li v-if="step == 1" @click="step++">Next</li>
      <li v-if="step == 2" @click="publish">작성완료</li>
    </ul>
    <img src="./assets/logo.png" class="logo" />
  </div>

  <h4>안녕 {{$store.state.age}}</h4>
  <!--수정 부탁하려면 $store.commit() mutations 부탁-->  
  <button @click="증가(10)">버튼</button>
  <!--actions 부탁-->
  <p>{{$store.state.more}}</p>
  <button @click="$store.dispatch('getData')">더보기버튼</button>
  <p>{{내이름}} {{age}} {{likes}}</p>
  <button @click="카운터++">버튼</button>


  <container-box 
    :boardPan="boardPan" 
    :step="step"
    :이미지="이미지">
    @write="작성한글 = $event"
  ></container-box> 

  <div class="footer">
    <ul class="footer-button-plus">
      <input @change="upload" type="file" id="file" class="inputfile" />
      <label for="file" class="input-plus">+</label>
    </ul>
  </div>
  <h4>{{ $store.state.name }}</h4> <!--store.js에 있는 name 가져오는법 -->
  <button @click="$store.state.name = 박"></button>
</template>

<script>
import ContainerBox from './components/ContainerBox.vue';
import postdata from './assets/postdata.js'
import axios from 'axios'
import { mapMutations, mapState } from 'vuex';

export default {

    name: "App",
    data(){
    return{
      boardPan: postdata,
      더보기: 0,
      step : 0,
      이미지 : "",
      작성한글: "",
      선택판필터: "",
      카운터 : 0,
    }
  },
  mounted(){
    this.emiiter.on('박스클릭함',(a)=>{
      console.log(a)
    });
  },

  components: {
    ContainerBox,
  },

  created() {
    console.log(this.boardPan)
  },

  computed :{
    name(){
      return this.$store.state.name
    },
    ...mapState(['name' , 'age' ,'likes']),
    ...mapState({ 내이름 : 'name'}),
  },
  
  methods :{
    ...mapMutations(['setMore','좋아요','증가']),
    now(){
      return new Date()
    },
    publish(){

      var myBoardPan = {
        name: "Kim Hyun",
        userImage: "https://placeimg.com/100/100/arch",
        postImage: this.이미지,
        likes: 36,
        date: "May 15",
        liked: false,
        content: this.작성한글,
        filter: this.선택한필터,
      };

      // 왼쪽으로 밀어넣음.unshift
      this.boardPan.unshift(myBoardPan)
      //다시 메인페이지로 돌아옴
      this.step = 0;
    },
    more(){
      axios.get(`https://codingapple1.github.io/vue/more${this.더보기}.json`)
      .then(result =>{
        console.log(result)
        this.boardPan.push(result.data)
        this.더보기++;
      })
    },
    upload(e){
      let 파일 =e.target.files
      console.log(파일)
      //업로드한 이미지의 URL을 생성해주려면
      let url = URL.createObjectURL(파일[0])
      console.log(url)
      this.이미지 = url;
      this.step++;
    },
  },
};
</script>

<style>
body {
  margin: 0;
}
ul {
  padding: 5px;
  list-style-type: none;
}
.logo {
  width: 22px;
  margin: auto;
  display: block;
  position: absolute;
  left: 0;
  right: 0;
  top: 13px;
}
.header {
  width: 100%;
  height: 40px;
  background-color: white;
  padding-bottom: 8px;
  position: sticky;
  top: 0;
}
.header-button-left {
  color: skyblue;
  float: left;
  width: 50px;
  padding-left: 20px;
  cursor: pointer;
  margin-top: 10px;
}
.header-button-right {
  color: skyblue;
  float: right;
  width: 50px;
  cursor: pointer;
  margin-top: 10px;
}
.footer {
  width: 100%;
  position: sticky;
  bottom: 0;
  padding-bottom: 10px;
  background-color: white;
}
.footer-button-plus {
  width: 80px;
  margin: auto;
  text-align: center;
  cursor: pointer;
  font-size: 24px;
  padding-top: 12px;
}
.sample-box {
  width: 100%;
  height: 600px;
  background-color: bisque;
}
.inputfile {
  display: none;
}
.input-plus {
  cursor: pointer;
}
#app {
  box-sizing: border-box;
  font-family: "consolas";
  margin-top: 60px;
  width: 100%;
  max-width: 460px;
  margin: auto;
  position: relative;
  border-right: 1px solid #eee;
  border-left: 1px solid #eee;
}
</style>
