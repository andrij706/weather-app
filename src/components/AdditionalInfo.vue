<script setup>

const currentWheater = defineProps(['currentWheater'])

</script>

<template>
    <div class="additional-info container">
        <div>
            <span>Sunrise</span>
            <span>{{ new Date(currentWheater.currentWheater.sys.sunrise * 1000).toLocaleString('en-uk', {timeStyle: 'short'}) }}</span>
        </div>
        <div>
            <span>Sunset</span>
            <span>{{ new Date(currentWheater.currentWheater.sys.sunset * 1000).toLocaleString('en-uk', {timeStyle: 'short'}) }}</span>
        </div>
        <div>
            <span>Humidity</span>
            <span>{{ currentWheater.currentWheater.main.humidity }} %</span>
        </div>
        <div>
            <span>Cloudness</span>
            <span>{{ currentWheater.currentWheater.clouds.all }} %</span>
        </div>
        <div>
            <span>Wind</span>
            <span>{{ Math.round(currentWheater.currentWheater.wind.speed) }} m/s</span>
        </div>
        <div>
            <span>Pressure</span>
            <span>{{ currentWheater.currentWheater.main.pressure }} hPa</span>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.additional-info {
    padding: 30px 20px;
    display: flex;
    flex-wrap: wrap;
    color: #fff;

    > div{
        display: flex;
        flex-direction: column;
        flex-basis: 50%;
        margin-bottom: 20px;

        span:nth-child(1) {
            font-size: 12px;
            margin-bottom: 8px;
        }
        span:nth-child(2) {
            font-weight: 600;
        }
    }
    div:nth-child(5),
    div:nth-child(6) {
        margin-bottom: 0;
    }
}

</style>