<script setup>
import { ref } from 'vue';
import db from '../firebase/firebaseInit';
import {collection, where, query, getDocs, deleteDoc, doc} from 'firebase/firestore'

const {city, edit} = defineProps(['city', 'edit'])

const kelvinToCelsius = () =>{
    return Math.round(city.currentWheater.main.temp-273,5)
}

const id = ref(null)

const removeCity = async () => {
    try {
        const cityRef = collection(db, 'cities')
        const q = query(cityRef, where('city', '==', `${city.city}`))
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach((cityDoc) => {
            id.value = cityDoc.id
        })
        await deleteDoc(doc(db, 'cities', id.value))
    }catch(err) {
        console.log(err)
    }
   
}

</script>

<template>
    <div class="city">
        <i v-if="edit" @click="removeCity" class="far fa-trash-alt edit" ref="edit"></i>
        <span>{{ city.city }}</span>
        <div class="weather">
            <span>{{ kelvinToCelsius() }} &deg;</span>
            <img :src="(`/conditions/${city.currentWheater.weather[0].icon}.svg`)"/>
        </div>
        <div class="video">
            <video autoplay loop muted :src="(`/videos/${city.currentWheater.weather[0].icon}.mp4`)"></video>
            <div class="bg-overlay">
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.city{
    display: flex;
    position: relative;
    flex-direction: column;
    padding: 20px;
    flex-basis: 50%;
    min-height: 250px;
    color: #fff;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);

    .edit{
        border-radius: 0 15px 0 0;
        border: 10px solid rgb(77, 77, 77);
        background-color: rgb(77, 77, 77);
        z-index: 1;
        font-size: 20px;
        position: absolute;
        bottom: 0;
        left: 0;
    }

    span {
        z-index: 1;
        text-transform: capitalize;
        display: block;
        font-size: 25px;
        font-weight: 600;
    }

    .weather {
        display: flex;
        z-index: 1;
        justify-content: flex-end;
        align-items: flex-end;
        flex: 1;

        span {
            font-size: 35px;
            margin-right: 8px;
        }

        img {
            height: 20px;
            width: auto;
        }
    }

    .video {
        overflow: hidden;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;

        video {
            height: 100%;
            @media (min-width: 900px) {
                height: auto;
                width: 100%;
            }
        }
        .bg-overlay {
            position: absolute;
            height: 100%;
            width: 100%;
            top: 0;
            background-color: rgba(0, 0, 0, 0.2);
        }
    }
}
</style>