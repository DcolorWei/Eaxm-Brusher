<template>
    <div style="padding:10px 7%;">
        <var-card>
            <template #extra>
                <div style="display: flex;">
                    <var-image width="75px" height="75px" fit="cover" radius="50%"
                        src="https://varlet-varletjs.vercel.app/cat.jpg" />
                    <div style="padding-left:7%;display: flex;flex-direction: column;justify-content: center;">
                        <div style="font-size:18px">韦定彩</div>
                        <div style="font-size:16px;color: #3d3d3d;">4008208820</div>
                    </div>
                </div>
            </template>
        </var-card>
    </div>
    <div style="padding:10px 7%;">
        <var-card title="我的书桌">
            <template #extra>
                <div style="display:flex;flex-wrap:wrap">
                    <div style="margin:2px" v-for="item in subjectList" :key="item.subjectId">
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
                        <div style="font-size:22px;margin: 12px 0;">127</div>
                    </div>
                    <div style="display: flex;flex-direction: column;justify-content: center;align-items: center;">
                        <div style="font-size:23px;">正确率</div>
                        <div style="font-size:22px;margin: 12px 0;">68.9%</div>
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
</template>

<script>
export default {
    props: ['subjectList', 'chapterList'],
    emits: ['startSheet'],
    setup(props) {
        props.subjectList.push({ subjectName: 'Ruby??????' })
        props.subjectList.push({ subjectName: '所以我的航海学和气象学被丢去哪了' })
    }
}
</script>