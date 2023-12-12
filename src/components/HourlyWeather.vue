<script setup>
import HourlyTemp from './HourlyTemp.vue';
import {computed} from 'vue'

const {forecast} = defineProps(['forecast'])

const filteredList = computed(() => {
    return forecast.list.slice(0, 8)
})

</script>

<template>
    <div class="hourly-weather">
        <div class="container">
            <div v-for="(time, index) in filteredList" :key="index" class="hourly-temp">
                <HourlyTemp :time="time"/>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .hourly-weather {
        padding: 30px 0;
        border-bottom: 1px solid rgba(255, 255, 255, 0.7);

        .container {
            display: flex;
            justify-content: center;
            max-width: 100vw;
            padding: 0;
            margin: 0 20px;
            overflow: scroll;

            &::-webkit-scrollbar {
            display: none;
        }
        }
    }
</style>