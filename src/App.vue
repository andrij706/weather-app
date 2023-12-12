<script setup>
import {ref, watchEffect} from 'vue'
import axios from 'axios';
import db from './firebase/firebaseInit.js'
import { collection, onSnapshot, query, updateDoc, doc } from 'firebase/firestore'
import { RouterView, useRoute } from 'vue-router'
import Navigation from './components/Navigation.vue'
import Modal from './components/Modal.vue';

const APIkey = ref('24b4d192d17e2f7a8780dbf71a17dde0')
const cities = ref([])
const modalOpen = ref(null)
const edit = ref(null)
const addCityActive = ref(null)
const route = useRoute()
const isDay = ref(null)
const isNight=ref(null)
const isLoading = ref(true)

const dayTime = () => {
  isDay.value = !isDay.value
}

const nightTime = () => {
  isNight.value = !isNight.value
}

const resetDays = () => {
  isDay.value = false
  isNight.value = false
}

const toggleModal = () => {
  modalOpen.value = !modalOpen.value
}

const toggleEdit = () => {
  edit.value = !edit.value
}

const checkRoute = () => {
  if(route.name === 'AddCity'){
    addCityActive.value = true
  } else {
    addCityActive.value = false
  }
}

watchEffect(() => {
  checkRoute()
})


const getCityWeather = async () => {
  const q = await query(collection(db, 'cities'))
  const querySnapshot = await onSnapshot(q, (snapshot) => {
    if(snapshot.docs.length === 0){
      isLoading.value = 0
    }
    snapshot.docChanges().forEach(async (change) =>{
      if (change.type === 'added' && !change.doc.Nd){
        try{
          const responce = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${change.doc.data().city}&appid=${APIkey.value}`)
          const data = responce.data
          await updateDoc(doc(db, 'cities', change.doc.id), {
            currentWheater: data
          }).then(() => {
            cities.value.push(change.doc.data())
            isLoading.value = false
          })
        }catch(err){
          console.log(err)
        }
      }else if(change.type === 'added' && change.doc.Nd){
        cities.value.push(change.doc.data())
      }else if(change.type === 'removed'){
        cities.value = (cities.value.filter((city) => city.city !== change.doc.data().city))
      }
    })
  })
}

getCityWeather()  

</script>

<template>
  <div class="loading">

  </div>
  <div class="main">
    <div v-if="isLoading" class="loading">
      <span></span>
    </div>
    <div v-else class="app">
      <Modal 
        v-if="modalOpen" 
        v-on:close-modal="toggleModal" 
        :APIkey="APIkey"
        :cities="cities"
      />
      <Navigation 
        @add-city="toggleModal" 
        @edit-city="toggleEdit" 
        :addCityActive="addCityActive" 
        :isDay="isDay" 
        :isNight="isNight"
      />
      <RouterView 
        :cities="cities" 
        :edit="edit" 
        :APIkey="APIkey" 
        @is-day="dayTime" 
        @is-night="nightTime" 
        @resetDays="resetDays"
        @add-city="toggleModal"
        :isDay="isDay" 
        :isNight="isNight"
      />
    </div>
  </div>
</template>

<style lang="scss">

*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Quicksand", sans-serif;
}

.day {
    transition: 500ms ease all;
    background-color: rgb(59, 150, 249);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.night {
    transition: 500ms ease all;
    background-color: rgb(20, 42, 95);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}


.main{
  height: 100vh;
  max-width: 1024px;
  margin: 0 auto;

  .container{
    padding: 0 20px;
  }
}

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
</style>
