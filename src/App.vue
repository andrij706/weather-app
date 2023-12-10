<script setup>
import {ref} from 'vue'
import axios from 'axios';
import db from './firebase/firebaseInit.js'
import { collection, onSnapshot, query, updateDoc, doc } from 'firebase/firestore'
import { RouterView } from 'vue-router'
import Navigation from './components/Navigation.vue'
import Modal from './components/Modal.vue';

const APIkey = ref('24b4d192d17e2f7a8780dbf71a17dde0')
const cities = ref([])
const modalOpen = ref(null)
const edit = ref(null)


const toggleModal = () => {
  modalOpen.value = !modalOpen.value
}

const toggleEdit = () => {
  edit.value = !edit.value
}

const getCityWeather = async () => {

  const q = await query(collection(db, 'cities'))
  const querySnapshot = await onSnapshot(q, (snapshot) => {
    snapshot.docChanges().forEach(async (change) =>{
      console.log(change.type)
      console.log(change)
      if (change.type === 'added' && !change.doc.Nd){
        try{
          const responce = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${change.doc.data().city}&appid=${APIkey.value}`)
          const data = responce.data
          await updateDoc(doc(db, 'cities', change.doc.id), {
            currentWheater: data
          }).then(() => {
            cities.value.push(change.doc.data())
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
  <div class="main">
    <Modal v-if="modalOpen" v-on:close-modal="toggleModal" :APIkey="APIkey"/>
    <Navigation @add-city="toggleModal" @edit-city="toggleEdit"/>
    <RouterView :cities="cities" :edit="edit"/>
  </div>
</template>

<style lang="scss">

*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Quicksand", sans-serif;
}

.main{
  height: 100vh;
  max-width: 1024px;
  margin: 0 auto;

  .container{
    padding: 0 20px;
  }
}
</style>
