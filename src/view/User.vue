<template>
    <div style="padding:10px 7%;">
        <var-card>
            <template #extra>
                <div style="display: flex;">
                    <var-image width="75px" height="75px" fit="cover" radius="50%" :src="userShowInfo.icon" />
                    <div style="padding-left:7%;display: flex;flex-direction: column;justify-content: center;">
                        <div style="font-size:18px">{{ userShowInfo.userName }}</div>
                        <div style="font-size:16px;color: #3d3d3d;">{{ userShowInfo.userNum }}</div>
                    </div>
                </div>
            </template>
        </var-card>
    </div>
    <div style="padding:10px 7%;">
        <var-card title="我的书桌">
            <template #extra>
                <div style="display:flex;flex-wrap:wrap">
                    <div style="margin:2px" v-for="item in userShowInfo.Subjects" :key="item.subjectId">
                        <var-chip color="#009688" plain :round="false" type="primary">{{ item.subjectName }}</var-chip>
                    </div>
                    <div style="margin:2px">
                        <var-chip color="#009688" plain :round="false">
                            <var-icon name="plus" />
                        </var-chip>
                    </div>
                </div>
            </template>
        </var-card>
    </div>
    <div style="padding:10px 7%;">
        <var-card title="我的书桌上的头发">
            <template #extra>
                <div style="display:flex;justify-content: space-around;flex-wrap:wrap;margin-top:12px">
                    <div style="display: flex;flex-direction: column;justify-content: center;align-items: center;">
                        <div style="font-size:23px;">刷题量</div>
                        <div style="font-size:22px;margin: 12px 0;">{{ userShowInfo.totalNum }}</div>
                    </div>
                    <div style="display: flex;flex-direction: column;justify-content: center;align-items: center;">
                        <div style="font-size:23px;">正确率</div>
                        <div style="font-size:22px;margin: 12px 0;">
                            {{ userShowInfo.totalNum == 0 ? 0 : String(userShowInfo.correctNum / userShowInfo.totalNum *
                                    100).slice(0, 4)
                            }}%</div>
                    </div>
                </div>
            </template>
        </var-card>
    </div>
    <div style="padding:10px 7%;margin-bottom:80px ;">
        <var-card title="今日份幸运图">
            <template #extra>
                <img style="display: block; margin: 0 auto;width:85%" src="@/assets/sun.svg">
                <div style="font-size:26px;text-align: center;font-weight: 600;">SUN</div>
            </template>
        </var-card>
    </div>

    <var-dialog v-model:show="noLogin" :confirm-button="false" :cancel-button="false">
        <template #title>
            <var-icon name="information" color="#2979ff" />
            <span style="font-size: 15px;margin-left: 10px;">登录</span>
        </template>
        <var-cell>
            <var-input placeholder="账号" v-model="loginInfo.account" />
        </var-cell>
        <var-cell>
            <var-input placeholder="密码" v-model="loginInfo.password" type="password" />
        </var-cell>
        <var-cell>
            <var-button block type="info" @click="login">登录</var-button>
        </var-cell>
    </var-dialog>

</template>

<script>
import { ref, reactive, watch } from 'vue'
import axios from 'axios';
import { Snackbar } from '@varlet/ui'

const userShowInfo = reactive(
    {
        "userName": "",
        "userNum": null,
        "icon": "",
        "Subjects": [],
        "totalNum": 0,
        "correctNum": 0,
    }
);
const noLogin = ref(false);

const loginInfo = reactive({
    account: '',
    password: ''
})

export default {
    props: ['chapterList'],
    emits: ['startSheet'],
    setup() {
        watch(noLogin, () => {
            axios({
                url: "https://www.wonend.cn:8888/api/user/my",
                method: 'GET'
            }).then(
                (res) => {
                    console.log(res.data)
                    for (let item of Object.keys(res.data)) {
                        userShowInfo[item] = res.data[item];
                    }
                    noLogin.value = false;
                }
            ).catch(() => {
                Snackbar.error("当前未登录！");
                noLogin.value = true;
            })
        }, { immediate: true })

        function login() {
            axios({
                url: "https://www.wonend.cn:8888/api/user/login",
                method: "POST",
                data: {
                    studentNum: loginInfo.account,
                    password: loginInfo.password
                }
            }).then(
                () => {
                    Snackbar.success("登录成功！");
                    noLogin.value = false;
                }

            ).catch(
                () => {
                    Snackbar.error("账号或密码错误！");
                })
        }

        return {
            userShowInfo,
            Snackbar,
            noLogin,
            loginInfo,
            test: (e) => {
                console.log(e)
            },
            login
        }
    }
}
</script>