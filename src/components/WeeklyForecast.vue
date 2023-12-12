<script setup>
import { computed } from 'vue'
import DailyForecast from './DailyForecast.vue';

const { forecast } = defineProps(['forecast'])

const weatherList = computed(() => {
  const tempList = forecast.list.slice()
  const [date, time] = forecast.list[0].dt_txt.split(' ')
  const [year, month, day] = date.split('-')

  return tempList
    .filter(item => item.dt_txt.endsWith('12:00:00') && item.dt_txt !== `${year}-${month}-${day} 12:00:00`)
    .map(item => {
      const [date, time] = item.dt_txt.split(' ')
      return {
        ...item,
        date,
        time
      }
    })
})


</script>

<template>
    <div class="weekly-forecast">
        <div class="container">
            <div class="daily" v-for="(day, index) in weatherList" :key="index">
                <DailyForecast :day="day"/>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .weekly-forecast {
        padding: 30px 0;
        border-bottom: 1px solid rgba(255, 255, 255, 0.7);

        .daily {
            margin-bottom: 24px;
        }

        .daily:last-child {
            margin-bottom: 0;
        }
    }
</style>