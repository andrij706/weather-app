<script setup>
const {day} = defineProps(['day'])
</script>

<template>
    <div class="daily-forecast">
        <div>
            <span>{{ new Date(day.dt * 1000).toLocaleString('en-us', {weekday: 'long'}) }}</span>
        </div>
        <div class="condition">
            <img :src="(`/conditions/${day.weather[0].icon}.svg`)"/>
        </div>
        <div class="weather">
            <span class="high">{{ Math.round(day.main.temp_max - 273,5) }}</span>
            <span class="low">{{ Math.round(day.main.temp_min - 273,5) }}</span>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.daily-forecast {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color:  #fff;

    div {
        flex: 1;
    }

    .condition {
        display: flex;
        align-items: center;
        justify-content: center;

        img {
            width: 20px;
            //height: auto;
        }
    }

    .weather {
        display: flex;
        justify-content: flex-end;

        span {
            min-width: 20px;
        }

        .high {
            font-weight: 500;
            margin-right: 12px;
        }
    }
}
</style>