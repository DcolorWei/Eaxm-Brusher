<template>
  <div class="header">
    <var-app-bar :title="subject" title-position="center">
      <template #right>
        <var-button round text color="transparent" text-color="#ffffff" @click="subjectMeauShow = true">
          <var-icon name="menu" :size="24" />
        </var-button>
      </template>
    </var-app-bar>
  </div>
  <div class="container">
    <Suspense>
      <router-view :chapterList="chapterList" @startSheet="startSheet"></router-view>
    </Suspense>
  </div>
  <div class="tabbar">
    <var-bottom-navigation v-model:active="active">
      <var-bottom-navigation-item label="Pratice" icon="fire" />
      <var-bottom-navigation-item label="User" icon="account-circle" />
    </var-bottom-navigation>
  </div>

  <var-popup position="top" v-model:show="subjectMeauShow">
    <div style="min-height: 100px;padding: 30px 30px;">
      <div style="margin:0 auto;text-align:center">切换科目</div>
      <div style="margin:20px auto;">
        <var-space justify="center">
          <var-button v-for="item in subjectList" :key="item.subjectId" v-ripple @click="changeSubject(item)">
            {{ item.subjectName }}
          </var-button>
        </var-space>
      </div>
    </div>
  </var-popup>

</template>

<script setup>
import { ref, reactive, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
axios.defaults.withCredentials = true

const active = ref(0)

const subject = ref('');
const subjectSelect = ref('');

const subjectMeauShow = ref(false);
const subjectList = reactive([]);

const route = useRoute();
const router = useRouter();

//get all subjects
function getAllSubject() {
  axios({
    url: 'https://www.wonend.cn:8888/api/subject/getAllSubject',
    method: 'GET'
  }).then((res) => {
    while (subjectList[0] !== undefined) {
      subjectList.pop();
    }
    res.data.forEach(e => subjectList.push(e));
  }).finally(() => {
    subject.value = subjectSelect.value = subjectList[0].subjectName;
    getAllChapters(subjectList[0].subjectId)
  });
}
getAllSubject();

const chapterList = reactive([])

//get all chapters
function getAllChapters(subjectId) {
  axios({
    url: 'https://www.wonend.cn:8888/api/subject/getAllChaptersById',
    method: 'GET',
    params: {
      id: subjectId
    }
  }).then((res) => {
    console.log(res);
    while (chapterList[0] !== undefined) {
      chapterList.pop();
    }
    res.data.forEach(e => chapterList.push(e));
  }).finally(() => {
    router.push('/practice');
    active.value = 0;
  })
}

function changeSubject(subjectItem) {
  subjectMeauShow.value = false;
  subject.value = subjectSelect.value = subjectItem.subjectName;
  getAllChapters(subjectItem.subjectId);
}


watch(active, (value) => {
  //因为路由多一个首页路径，所以+1
  router.push(router.options.routes[value + 1].path)
  switch (value) {
    case 0: subject.value = subjectSelect.value; break;
    case 1: subject.value = "个人"; break;
  }
});

watch(route, (value) => {
  console.log(value.path)
  switch (value.path) {
    case 'answersheet':
      subject.value = '练习'
      break;
  }
}, { deep: true })

function startSheet(e) {
  router.push({ path: '/answersheet', query: { id: e } })
}
</script>

<style>
#app {
  margin: 0;
  padding: 0;
  max-width: 600px;
}

.header {
  height: 100px;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  max-width: 600px;
  z-index: 1;
}

.container {
  margin-top: 60px;
  width: 100%;
  min-height: 600px;
  max-width: 600px;
  z-index: 0;
}

.tabbar {
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  border-top: 1px solid gray;
  overflow: hidden;
  max-width: 600px;
  z-index: 1;

}
</style>
