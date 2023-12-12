<script setup>
import {ref, defineEmits, defineProps} from 'vue'
import axios from 'axios';
import db from '../firebase/firebaseInit';
import {collection, setDoc, doc} from 'firebase/firestore'

const {APIkey, cities} = defineProps(['APIkey', 'cities'])
const emit = defineEmits()
const modal = ref(null)
const city = ref('')

const closeModal = (e) => {
    if (e.target === modal.value){
        emit('close-modal')
    }
}

const addNewCity = async () => {
    if (city.value ===''){
        alert('Field cannot be empty!')
    } else if(cities.some(res => res.city === city.value.toLowerCase())) {
        alert(`${city.value} already exists`)
    } else {
        try{
            const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${APIkey}`)
            const data = await res.data
            
            const citiesCollection = collection(db, 'cities')
            const newDocRef = doc(citiesCollection)
            setDoc(newDocRef, {
                city: city.value.toLowerCase(),
                currentWheater: data
            }).then(
                () => emit('close-modal')
            )
        } catch(err) {
            alert(`${city.value} does not exist, please try again!`)
        }
    }
}

</script>

<template>
    <div @click="closeModal" class="modal" ref="modal">
        <div class="modal-wrap" ref="modalWrap">
            <label for="city-name">Enter Location:</label>
            <input type="text" name="city-name" placeholder="Search By City Name" v-model="city"/>
            <button @click="addNewCity" type="button">Add</button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.modal {
    z-index: 101;
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    label {
        color: #fff;
    }

    .modal-wrap {
        max-width: 500px;
        border-radius: 8px;
        width: 80%;
        padding: 20px;
        background-color: #31363d;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);

        input {
            color: #fff;
            border: none;
            background-color: transparent;
            border-bottom: 1px solid #fff;
            padding: 6px 4px;
            margin: 10px 0 20px;
            width: 100%;

            &:focus {
                outline: none;
            }
        }

        button {
            background-color: #222325;
            color: #fff;
            padding: 6px 20px;
            border-radius: 8px;
            border: none;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }
    }
}
</style>