<template>
    <div style="width:100%;display: flex;justify-content: space-between;">
        <div>
            <var-icon name="close-circle-outline" />
            <span style="font-size: 14px;">退出</span>
        </div>
        <div>
            <var-icon name="checkbox-marked-outline" />
            <span style="font-size: 14px;">答题卡</span>
        </div>
    </div>
    <div style="width:100%;margin: 5% 0">
        <var-card>
            <template #extra>
                <div style="font-size: 14px;">{{ questions[questionNum].questionTitle }}</div>
                <!-- wrong-write -->
                <div style="display: flex;justify-content: center;"
                    v-if="questions[questionNum].questionImage.length > 8">
                    <img width="300" :src="questions[questionNum].questionImage">
                </div>
            </template>
        </var-card>
    </div>
    <div style="width: 100%;display:flex;flex-direction: column; align-items:center">
        <div v-for="(item, index) in questions[questionNum].questionOptions" :key="index"
            style="width:70%;height:40px;border:1px solid;border-radius: 10px;text-align: left;margin-top:10px ;"
            v-bind:style="{
                'border-color': (answersheet[questionNum].find(e => e == item.optionId)) ? '#33ccff' : 'black'
            }" @click="marked(item.optionId)">
            <var-cell v-if="questions[questionNum].questionType == 0"
                :icon="(answersheet[questionNum].find(e => e == item.optionId)) ? 'radio-marked' : 'radio-blank'">
                <div>{{item.context}}</div>
            </var-cell>
            <var-cell v-if="questions[questionNum].questionType == 1"
                :icon="(answersheet[questionNum].find(e => e == item.optionId)) ? 'checkbox-marked' : 'checkbox-blank-outline'">
                <div>{{item.context}}</div>
            </var-cell>
        </div>
    </div>
    <div style="position: fixed;width:100%;left:0;bottom: 100px;display: flex;justify-content:space-between">
        <var-button @click="(questionNum > 0) ? questionNum-- : false;">
            <var-icon name="chevron-left" />
        </var-button>
         <var-button type="success" v-show="questionNum == questions.length - 1" @click="submit()">
            <b>提交答案</b>
        </var-button>
        <var-button @click="(questionNum < questions.length - 1) ? questionNum++ : false">
            <var-icon name="chevron-right" />
        </var-button>
    </div>
</template>

<script>
import { ref, reactive } from 'vue';
//questionslist
const questions = reactive([
    {
        questionId: 1,
        questionTitle: '1关于C语言指针，下列说法错误的是______',
        questionImage: 'setu',
        questionType: 0,
        questionOptions: [
            {
                optionId: 1,
                context: '114514'
            },
            {
                optionId: 2,
                context: '114514'
            },
            {
                optionId: 3,
                context: '114514'
            },
            {
                optionId: 4,
                context: 'check'
            },
        ]
    },
    {
        questionId: 1,
        questionTitle: '2关针，下列说法错误的是______',
        questionImage: 'setu',
        questionType: 0,
        questionOptions: [
            {
                optionId: 1,
                context: '114514'
            },
            {
                optionId: 2,
                context: '114514'
            },
            {
                optionId: 3,
                context: '114514'
            },
            {
                optionId: 4,
                context: 'check'
            },
        ]
    },
    {
        questionId: 1,
        questionTitle: '3关于C语言指针，下列说法错误的是______',
        questionImage: 'setu',
        questionType: 1,
        questionOptions: [
            {
                optionId: 1,
                context: '114514'
            },
            {
                optionId: 2,
                context: '114514'
            },
            {
                optionId: 3,
                context: '114514'
            },
            {
                optionId: 4,
                context: 'check'
            },
        ]
    },
    {
        questionId: 1,
        questionTitle: '关于C语言指针，下列说法正确的是______',
        questionImage: 'setu',
        questionType: 1,
        questionOptions: [
            {
                optionId: 1,
                context: '我记得这个科目是C++...'
            },
            {
                optionId: 287,
                context: '朋友是个坚韧不拔的纪录片'
            },
            {
                optionId: 3,
                context: '1145141919810'
            },
            {
                optionId: 4,
                context: '我的评价是不如不写指针'
            },
            {
                optionId: 5,
                context: '钝角'
            }
        ]
    }
]);
//answersheet
const answersheet = reactive([
])
questions.forEach(() => {
    answersheet.push([]);
})
const questionNum = ref(0);

function marked(optionId) {
    //判断单选或多选
    switch (questions[questionNum.value].questionType) {
        case 0:
            answersheet[questionNum.value].pop();
            answersheet[questionNum.value].push(optionId);
            setTimeout(() => {
                if (questionNum.value < questions.length - 1) questionNum.value++
            }, 618)
            break;

        case 1:
            let finder = answersheet[questionNum.value].findIndex(e => e == optionId);
            if (finder == -1) {
                answersheet[questionNum.value].push(optionId)
            } else {
                answersheet[questionNum.value].splice(finder, 1)
            }
            break;
    }
}

function submit(){
    console.log(answersheet);
}

export default {
    //父组件绑定了该事件
    props:['chapterList'],
    emits:['startSheet'],
    setup() {
        return {
            questions,
            answersheet,
            questionNum,
            marked,
            submit
        }
    }
}
</script>