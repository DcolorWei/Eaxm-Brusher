<template>
    <div style="width:90%;margin: 0 auto;">
        <var-collapse v-model="activeChapter" accordion :offset="false">
            <var-collapse-item v-for="(item, index) in chapterList" :title="item.chapterName" :name="index">
                <div style="width: 60%;display: inline-block;">
                    <var-progress :value="item.finishedNum / item.totalNum * 100" />
                </div>
                <div style="width: 20%;display: inline-block;text-align: center;vertical-align: middle;">{{
                        item.finishedNum
                }}/{{ item.totalNum }}</div>
                <div style="width: 20%;display: inline-block;">
                    <var-button type="info" size="small" @click="startSheet()">刷题</var-button>
                </div>
            </var-collapse-item>
        </var-collapse>
    </div>
</template>

<script>
import { ref, watch } from 'vue'

const activeChapter = ref(null);
export default {
    props: ['chapterList'],
    emits: ['startSheet'],
    setup(props, { emit }) {
        watch(props, () => {
            activeChapter.value = null;
        }, { deep: true })
        return {
            activeChapter,
            startSheet: function () {
                activeChapter.value = null;
                emit('startSheet', 1);
            }
        }
    }
}
</script>