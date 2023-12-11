<script setup>
import { ref, defineEmits, onBeforeMount } from 'vue';
import axios from 'axios';
import db from '../firebase/firebaseInit';
import {collection, query, where, getDocs} from 'firebase/firestore'
import {useRoute} from 'vue-router'

const {APIkey, isDay, isNight} = defineProps(['APIkey', 'isDay', 'isNight'])
const route = useRoute()
const emit = defineEmits()

const forecast = ref(null)
const currentWheater = ref(null)
const loading = ref(true)
const currentTime = ref(null)

onBeforeMount(() => {
    emit('resetDays')
})

const getWeather = async () => {
    try{
        const cityRef = collection(db, 'cities')
        const q =  query(cityRef, where('city', '==', `${route.params.city}`))
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach((res) =>{
            currentWheater.value = res.data().currentWheater
            console.log(currentWheater.value)
            axios.get(
                `https://api.openweathermap.org/data/2.5/forecast?lat=${res.data().currentWheater.coord.lat}&lon=${res.data().currentWheater.coord.lon}&appid=${APIkey}` 
            ).then(resData => {
                forecast.value = resData.data
            }).then(() => {
                loading.value = false
                getCurrentTime()
            })
        })
        console.log(querySnapshot)
    }catch(err) {
        console.log(err)
    }
}

getWeather()

const getCurrentTime = () => {
    const dateObject= new Date()
    currentTime.value = dateObject.getHours()
    const sunrice = new Date(currentWheater.value.sys.sunrise * 1000).getHours()
    const sunset = new Date(currentWheater.value.sys.sunset * 1000).getHours()
    if ( currentTime.value > sunrice && currentTime.value < sunset){
        emit('is-day')
    }else {
        emit('is-night')
    }
}

</script>

<template>
    <div class="main">
        <div v-if="loading" class="loading">
            <span></span>
        </div>
        <div v-else class="weather" :class="{night: isNight, day: isDay}">
            <div class="weather-wrap" >

            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .loading {
        @keyframes spin {
            to {
                transform: rotateZ(360deg);
            }
        }
        display: flex;
        height: 100%;
        width: 100%;
        justify-content: center;
        align-items: center;

        span{
            display: block;
            width: 60px;
            height: 60px;
            margin: 0 auto;
            border: 2px solid transparent;
            border-top-color: #142a5f;
            border-radius: 50%;
            animation: spin ease 1000ms infinite;
        }
    }

    .weather {
        transition: 500ms ease;
        //overflow: scroll;
        width: 100%;
        height: 100%;

        .weather-wrap {
            overflow: hidden;
            max-width: 1024px;
            margin: 0 auto;
        }
    }
</style>