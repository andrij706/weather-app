<script setup>
import {ref} from 'vue'
import axios from 'axios';
import db from './firebase/firebaseInit.js'
import { collection, onSnapshot, query, updateDoc, doc } from 'firebase/firestore'
import { RouterView } from 'vue-router'

const APIkey = ref('24b4d192d17e2f7a8780dbf71a17dde0')
const city = ref('Lviv')
const cities = ref([])

const getCityWeather = async () => {

  const q = await query(collection(db, 'cities'))
  const querySnapshot = await onSnapshot(q, (snapshot) => {
    snapshot.docChanges().forEach(async (change) =>{
      if (change.type === 'added'){
        console.log(change.doc.data())
        try{
          const responce = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${change.doc.data().city}&appid=${APIkey.value}`)
          const data = responce.data
          await updateDoc(doc(db, 'cities', change.doc.id), {
            currentWheater: data
          })
          console.log(data)
        }catch(err){
          console.log(err)
        }
      }
    })
  })
}

getCityWeather()  


const getCurrentWeather = async () =>{
  await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${APIkey.value}`).then(res =>{console.log(res.data)})
}

getCurrentWeather()
</script>

<template>
  <h1>App</h1>
  <RouterView />
</template>

<style lang="scss" scoped>

*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Quicksand", sans-serif;
  background: black;
  color: aliceblue;
}
</style>
