<script setup>

const {isDay, isNight, currentWheater} = defineProps(['isDay', 'isNight', 'currentWheater'])
</script>

<template>
    <div class="current-weather">
        <div class="container">
            <div class="weather-info">
                <span class="city">{{ currentWheater.name }}</span>
                <span class="current-temperature">{{ Math.round(currentWheater.main.temp - 273,5) }}&deg;</span>
                <div class="high-low-temperatures">
                    <div class="high">
                        <i class="fas fa-chevron-up"></i>
                        <span>{{ Math.round(currentWheater.main.temp_max - 273,5) }}&deg;</span>
                    </div>
                    <div class="low">
                        <i class="fas fa-chevron-down"></i>
                        <span>{{ Math.round(currentWheater.main.temp_min - 273,5) }}&deg;</span>
                    </div>
                </div>
                <span class="condition">{{ currentWheater.weather[0].description }}</span>
                <span class="feels-like">Feels like {{ Math.round(currentWheater.main.feels_like - 273,5) }}&deg;</span>
            </div>
            <div class="weather-icon">
                <img v-if="isDay" src="/sun.png" alt="">
                <img v-if="isNight" src="/moon.png" alt="">
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.current-weather {
    margin-top: 90px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.7);

    .container{
        margin: 30px 0;
        min-height: 366px;
        position: relative;
        display: flex;
        color: #fff;
    }

    span {
        display: block;
    }

    .weather-info {
        padding-top: 30px;
        flex: 1;

        .city{
            font-size: 24px;
            font-weight: 500;
        }
        .current-temperature {
            margin-top: 40px;
            font-size: 80px;
            font-weight: 600;
        }
    }
    .high-low-temperatures{
        display: flex;
        gap: 16px;

        .high, .low{
            display: flex;

            span {
                margin-left: 8px;
            }
        }
    }
    .condition{
        text-transform: capitalize;
        font-size: 24px;
        font-weight: 500;
        margin: 60px 0 8px 0;
    }

    .feels-like{
        font-size: 14px;
        font-weight: 400;
    }

    .weather-icon {
        height: 100%;
        position: absolute;
        right: -180px;
        display: flex;
        align-items: center;

        img {
            width: 366px;
            height: 366px;
        }
    }
}
</style>