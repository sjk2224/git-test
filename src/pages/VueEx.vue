<template class = "q-pa-md q-gutter-md">
<div class="text-h4">템플릿 문법</div>
  <q-card-selection>Message:{{msg}}</q-card-selection>
  <q-card-selection>Using text interpolation:{{rawHtml}}</q-card-selection>
  <q-separator/>
  <q-card-selection>Using v-html directive:<span v-html="rawHtml"></span></q-card-selection>
  <q-separator/>
  <q-card-section>
    <q-btn
      unelevated
      color="primary"
      type="a"
      target="_blank"
      v-bind:id="linkId"
      v-bind:href="link.to"
      :title="link.title"
      :label="link.label"
    ></q-btn>
  </q-card-section>
  <q-separator/>
  <q-card-section>
    <q-btn :disable="isButtonDisabled" label="버튼 보이기"></q-btn>
  </q-card-section>
  <q-separator/>
  <q-card-section>
    {{ number + 1 }}
  </q-card-section>
  <q-separator/>
  <q-card-section>
    {{ ok ? "YES" : "NO"}}
  </q-card-section>
  <q-separator/>
  <q-card-section>
    {{ message.split("").reverse().join("") }}
  </q-card-section>
  <q-separator/>
  
  <q-card-section v-if="!seen">Now you see me</q-card-section>
  <q-card-section v-else> on no! </q-card-section>
  <q-separator/>

  <q-btn @click="awesome = !awesome" label="toggle"></q-btn>
  <q-card-section v-if="!awesome">Vue is awesome</q-card-section>
  <q-card-section v-else> on no! </q-card-section>
  <q-separator/>
    
  <q-card-section v-if="type == 'A'">A</q-card-section>
  <q-card-section v-else-if="type === 'B'">B</q-card-section>
  <q-card-section v-else-if="type === 'C'">C</q-card-section>
  <q-card-section v-else> Not A/B/C</q-card-section>
  <q-separator/>
    
  <q-card-section>책을 가지고 있다: {{ publishedBooksMessage }}</q-card-section>
  <q-separator/>
  
  <q-card-section>책을 가지고 있다: {{ calculateBookMessage() }}</q-card-section>
  <q-separator/>
  
  <q-card-section>
    {{ toTitleDate }}
    {{ calculateDate() }}
  </q-card-section>
  <q-separator/>
  
  <q-card-section class="text-h6">
  {{ fullName }}
  </q-card-section>
  <q-separator/>
  
  <q-card-selection class="static" :class="{active:isActive,'text-h3' : hasError }">
    change color
  </q-card-selection>
  <q-separator/>
  
  <q-card-selection :class="classObject">
    change color
  </q-card-selection>
  <q-separator/>
  
  <q-card-selection :class="classObj">
    change color
  </q-card-selection>
  <q-separator/>
  
  <q-card-section :class="[activeClass, errorClass]"> change color</q-card-section>
  <q-separator/>
  
  <q-card-section :class="[isActive ? activeClass : '', errorClass]"> change color</q-card-section>
  <q-separator/>
  
  <q-card-section :class="[{active:isActive}, errorClass]"> change color</q-card-section>
  <q-separator/>
  
  <q-card-section :class="[{foo:true, bar:true}]"> 안녕!</q-card-section>
  <q-separator/>
  
  <q-card-section :class="[{foo:true, bar:true}]" :id="$attrs.id"> 안녕!</q-card-section>
  <q-separator/>

  <q-card-section :style="styleObject"> change color</q-card-section>
  <q-separator/>

  <q-card-section :style="[baseStyles, overridingStyles]"> change color</q-card-section>
  <q-separator/>

  <q-card-section v-if="awesome"> Vue is awesome! </q-card-section>
  <q-separator/>

  <q-btn @click="awesome = !awesome" label="toggle"></q-btn>
  <q-card-section v-if="awesome"> Vue is awesome! </q-card-section>
  <q-card-section v-else> on no! </q-card-section>
  <q-separator/>

  <q-card-section v-if="type == 'A'"> A </q-card-section>
  <q-card-section v-else-if="type === 'B'"> B </q-card-section>
  <q-card-section v-else-if="type === 'C'"> C </q-card-section>
  <q-card-section v-else> Not A/B/C </q-card-section>
  <q-separator/>

  <q-card v-if="ok" dark bordered class="bg-grey-9 my-card">
    <q-card-section>
      <div class="text-h6">Our Changing Planet</div>
      <div class="text-subtitle2">by John Doe</div>
    </q-card-section>
    <q-separator dark inset />
    <q-card-section>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua.
    </q-card-section>
  </q-card>
  <q-separator/>

  <q-card
	  v-show="ok"
	  dark
	  bordered
	  class="my-card text-white"
	  style="background: radial-gradient(circle, #35a2ff 0%, #014a88 100%)"
	>
	  <q-card-section>
	    <div class="text-h6">Our Changing Planet</div>
	    <div class="text-subtitle2">by John Doe</div>
	  </q-card-section>
	  <q-separator dark inset />
	  <q-card-section>
	    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
	    tempor incididunt ut labore et dolore magna aliqua.
	  </q-card-section>
	</q-card>
  <q-separator/>
  
  <div class="q-pa-md">
  <q-list v-for="(item,idx) in listItems" :key="idx" bordered separator>
      <q-item clickable v-ripple>
        <q-item-section>{{ idx + 1 }}. {{ item.message }}</q-item-section>
      </q-item>
    </q-list>
  </div>
  <q-separator />

  <div class="q-pa-md">
    <q-list v-for="(item, index) in listItems" :key="index" bordered separator>
      <q-item clickable v-ripple>
        <q-item-section>
            {{ parentMessage }} - {{ index + 1 }} - {{ item.message }}
        </q-item-section>
      </q-item>
    </q-list>
  </div>
  <q-separator />

  <div class="q-pa-md">
    <q-list v-for="({message}, index) in listItems" :key="index" bordered separator>
      <q-item clickable v-ripple>
        <q-item-section>{{ message }} - {{ index + 1 }}</q-item-section>
      </q-item>
    </q-list>
  </div>
  <q-separator />
  <div class="q-pa-md">
  <q-list v-for="(item, index) in tupleListItems" :key="index" bordered separator>
    <q-item clickable v-ripple>
      <q-item-section v-for="(childItem, index) in item.children" :key="index">
        <q-item-section>{{ item.message }} - {{ childItem }}</q-item-section>
      </q-item-section>
    </q-item>
  </q-list>
  </div>
  <q-separator />

  <div class="q-pa-md">
  <q-list v-for="({message}, index) of listItems" :key="index" bordered separator>
    <q-item clickable v-ripple>
      <q-item-section>{{ message }} - {{ index }}</q-item-section>
    </q-item>
  </q-list>
  </div>
  <q-separator />

  <div class="q-pa-md">
  <q-list
    v-for="(value, key, index) in myObject"
    :key="index"
    bordered
    separator
  >
    <q-item clickable v-ripple>
      <q-item-section
        >{{ index + 1 }}. {{ key }} : {{ value }}</q-item-section
      >
    </q-item>
  </q-list>
  </div>
  <q-separator />
  
  <div class="q-pa-md">
  <q-list
    v-for="(value, key) in myObject"
    :key="index"
    bordered
    separator
  >
    <q-item clickable v-ripple>
      <q-item-section
        >{{ index + 1 }}. {{ key }} : {{ value }}</q-item-section
      >
    </q-item>
  </q-list>
  </div>
  <q-separator />

  <div class="q-pa-md">
  <q-list
    v-for="(value, key, index) in myObject"
    :key="index"
    bordered
    separator
  >
    <q-item clickable v-ripple>
      <q-item-section
        >{{ index + 1 }}. {{ key }} : {{ value }}</q-item-section
      >
    </q-item>
  </q-list>
  </div>
  <q-separator />
  
  <div class="q-pa-md row items-start">
  <q-list v-for="n in 10" :key="n" bordered separator>
    <q-item clickable v-ripple>
      <q-item-section>{{ n }}</q-item-section>
    </q-item>
  </q-list>
  </div>
  <q-separator />
  <div v-for="item in items" :key="item.id">
  <!-- 내용 -->
  </div>

  <div class="q-pa-md items-start">
    <my-component
      v-for="(item, index) in listItems"
      :key="index"
      :item="item"
      :index="index"
    ></my-component>
  </div>
  <q-separator />

  <q-card-section>{{ filterItems }}</q-card-section>
  <q-separator />

  <q-list v-for="n in evenNumbers" :key="n" bordered separator>
    <q-item clickable v-ripple>
      <q-item-section>{{ n }}</q-item-section>
    </q-item>
  </q-list>
  <q-separator />

  <q-list v-for="(numbers, index) in sets" :key="index" bordered separator>
    <q-item v-for="n in even(numbers)" :key="n" clickable v-ripple>
      <q-item-section><q-item-label class="text-h6 text-weight-bolder text-center">{{ n }}</q-item-label></q-item-section>
    </q-item>
  </q-list>
  <q-separator />

  <q-card-section>{{ reverseNumbers }}</q-card-section>
  <q-separator />

  <!--이벤트 리스닝 -->
  <div class="q-pa-md row items-start">
    <q-btn @click="count++" label="카운트" color="primary"></q-btn>
    <q-card-section>Count is: {{ count }}</q-card-section>
  </div>
  <q-separator />
  <!-- 메서드 핸들러 -->
  <div class="q-pa-md row items-start">
    <q-btn
      @click="greet"
      label="greet"
      color="secondary"
      class="q-ma-sm"
    ></q-btn>
    <q-btn label="Alert" color="primary" @click="alert" class="q-ma-sm" />
    <q-btn label="Confirm" color="primary" @click="confirm" class="q-ma-sm" />
    <q-btn label="Prompt" color="primary" @click="prompt" class="q-ma-sm" />
  </div>
  <q-separator />
  <!--인라인 핸들러에서 매서드 호출하기-->
  <div class="q-pa-md row items-start">
    <q-btn
      @click="say('안녕')"
      label="안녕이라고 말하기"
      color="secondary"
      class="q-ma-sm"
    ></q-btn>
    <q-btn
      @click="say('잘가')"
      label="잘가라고 말하기"
      color="secondary"
      class="q-ma-sm"
    ></q-btn>
  </div>
  <q-separator />
  <!--인라인 핸들러에서 이벤트 객체 접근하기-->
  <div class="q-pa-md row items-start">
    <q-btn
      @click="warn('아직 양식을 제출할 수 없습니다.',$event)"
      label="아직 양식을 제출할 수 없습니다"
      color="secondary"
      class="q-ma-sm"
    ></q-btn>
    <q-btn
      @click="(event) => warn('아직 양식을 제출할 수 없습니다1.',event)"
      label="아직 양식을 제출할 수 없습니다1."
      color="secondary"
      class="q-ma-sm"
    ></q-btn>
  </div>
  <q-separator />
  
</template>

<script>
import formatDate , {mask} from "dateformat";
import Classchild from "components/ClassChild.vue"
import { event } from "ws";

const parentMessage = 'Parent'
const listItems = ["Foo","Bar"]
listItems.forEach((item, index) => {
  // forEach의 콜백 함수 외부에 있는 `parentMessage`에 대한 접근 가능.
  // 반면 `item`과 `index`는 콜백함수 내부에서만 접근 가능.
  console.log(parentMessage, item.message, index)
})
export default {
  name:'VueEx',
  components:{},
  title:"Vue Basic",
  data(){
    return{
        msg: "hello Vue<br>",
        rawHtml: '<span style="color : red">빨간색이어야 힙니다.</span>',
        linkId: "vue",
        link:{
            to: "http://vuejs.org",
            title: "뷰 공식 사이트",
            label: "Vuejs.org",
        },
        isButtonDisabled: true,
        number: 1000,
        message:"지금까지 템플릿의 단순한 속성만 있었습니다. 그러나 Vue는 실제로 모든 데이터가 내에서 JavaScript 강화의 모든 기능을 지원합니다.",
	    id: "genie",  
        seen: true,
        awesome: true,
        type: "B",

        author:{
            name: 'john Doe',
            books:[
                'Vue 2 - Advanced Guide',
                'Vue 3 - Basic Guide',
                'Vue 4 - The Mystery',
            ],
        },

        str:'',

        firstName: 'John',
        lastName: 'Doe',

        //객체로 바인딩 하기
        isActive: true,
        hasError : false,

        //객체로 바인딩 하기(오브젝트)
        classObject: {
          active: true,
          'text-h3': false
        },

        //객체로 바인딩 하기(계산된 속성)
        error: null,
        
        //배열로 바인딩
        activeClass: 'active',
        errorClass: 'text-danger', 

        //인라인 스타일 바인딩
        activeColor: 'red',
        fontSize: 30,
        
        styleObject: {
          color: 'red',
          fontSize: '13px'
        },

        baseStyles:{
          textDecorationLine:'underline',
          textDecorationThickness: '5px',
          textDecorationColor: 'red',
        },
        overridingStyles:{
          color:'blue',
          fontSize:'35px',
        },
        
        awesome: true,

        type: "B",

        ok: true,

        parentMessage: 'Parent',
        listItems: [{ message: "Foo" }, { message: "Bar" }],  

        tupleListItems: [{ message: "Foo", children:["baby"] }, { message: "Bar",children:['child'] }],

        myObject: {
          title: 'Vue에서 목록을 작성하는 방법',
          author: '홍길동',
          publishedAt: '2016-04-10'
        },

        items: [{ message: "Foo" }, { message: "Bar" }],

        numbers: [1, 2, 3, 4, 5],

        sets: [[ 1, 2, 3, 4, 5 ], [6, 7, 8, 9, 10]],

        //이벤트 핸들링(인라인 핸들러)
        count: 0,

        //메서드 핸들러
        name: "Vue.js",
    }
  },
  computed:{
    publishedBooksMessage() {
        return this.author.books.length > 0 ? 'YES' : "NO"
    },

    toTitleDate(){
        const TimeStamp = Date.now();
        const formattedString = formatDate(TimeStamp,"yyyy-MM-dd HH:MM");
        return formattedString;
    },

    fullName: {
      //getter
      get(){
        return this.firstName + ' ' + this.lastName
      },
      //setter
      set(newValue){
        [this.firstName, this.lastName] = newValue.split(' ')
      },
    },

    //객체로 바인딩 하기(계산된 속성)
    classObj(){
      return {
        active : this.isActive && !this.error,
        'text-h3' : this.error && !this.error.type === 'fatal'
      }
    },

    Classchild,

    filterItems() {
      return (this.items = this.items.filter((item) =>
        item.message.match(/Foo/)
      ));
    },
    
    evenNumbers() {
      return this.numbers.filter(n => n % 2 === 0)
    },

  },
  watch:{

  },
  mounted(){
    this.error = {};
    this.error.type = 'fatal';
  },

  //메서드
  methods:{
    calculateBookMessage(){
        return this.author.books.length > 0 ? "yes" : "no"
    },

    calculateDate() {
        setInterval(()=>{
        const TimeStamp = Date.now();
        const formattedString = formatDate(TimeStamp,"yyyy-MM-dd HH:mm:ss");
        },1000);
        return this.str;
    },

    even(numbers) {
      return numbers.filter(number => number % 2 === 0)
    },

    reverseNumbers() {
      const numbers = this.numbers;
      return [...numbers].reverse();
    },
    //메서드 핸들러
    greet(e){
      this.$q.notify({
        message: 'hello ${this.name}',
        caption: "5 minutes age",
        color: "secondary",
      });
    },
    //인라인 핸들러에서 메서드 호출하기
    say(message){
      alert(message)
    },
    //인라인 핸들러에서 이벤트 객체 접근하기
    warn(message, event){
      if (event) {
        event.preventDefault();
        this.$q
        .dialog({
          title: "Alert",
          message: `${message}`,
        })
        .onOk(() => {
          // console.log('OK')
        })
        .onCancel(() => {
          // console.log('Cancel')
        })
        .onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
        });
      }
    },

    
  }

}
</script>

<style scoped>
  .active{
    color:red;
  }

  .foo{
    background-color: red;
    color: white;
  }
  .bar{
    color: white;
  }
  .my-card {
	  width: 100%;
	  max-width: 250px;
	}
</style>