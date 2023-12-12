<script setup>

const {time} = defineProps(['time'])

</script>

<template>
    <div class="hour">
        <span> {{ new Date(time.dt * 1000).toLocaleString('en-uk', {hour: 'numeric'}) }}, h</span>
        <span>
            <img :src="(`/conditions/${time.weather[0].icon}.svg`)"/>
        </span>
        <span>{{ Math.round(time.main.temp - 273,5) }}&deg;</span>
    </div>
</template>

<style lang="scss" scoped>
    .hour{
        color: #fff;
        display: flex;
        flex-direction: column;
        text-align: center;
        min-width: 45px;
        margin-right: 30px;
    }

    img {
        width: auto;
        height: 22px;
        display: block;
    }

    span {
        display: block;
        align-self: center;
    }

    span:nth-child(1){
        font-weight: 300;
        margin-bottom: 12px;
    }

    span:nth-child(2){
        margin-bottom: 12px;
    }

    span:nth-child(3){
        font-weight: 500;
    }
</style>