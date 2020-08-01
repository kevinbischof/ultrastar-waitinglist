<template>
    <div class="home">
        <carousel
                v-bind:autoplay="true"
                v-bind:perPage="1"
        :centerMode="true">
            <slide>
                <v-img src="../assets/images/concert-336695_1920.jpg" max-height="1000" width="1000"></v-img>
            </slide>
            <slide>
                <v-img src="../assets/images/mic-1132528_1920.jpg" max-height="1000" width="1000"></v-img>
            </slide>
            <slide>
                <v-img src="../assets/images/music-3507317_1920.jpg" max-height="1000" width="1000"></v-img>
            </slide>
            <slide>
                <v-img src="../assets/images/people-2590551_1920.jpg" max-height="1000" width="1000"></v-img>
            </slide>
        </carousel>
    </div>
</template>

<script>
    import {Carousel, Slide} from 'vue-carousel';

    export default {
        name: 'Home',
        components: {
            Carousel,
            Slide
        }
    }
</script>

<style scoped>
  .home {
    position: absolute;
    margin: 0 auto;
  }
</style>
