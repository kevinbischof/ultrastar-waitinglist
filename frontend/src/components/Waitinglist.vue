<template>
    <div class="songs">
        <h1>Waitinglist</h1>
        <v-card
                max-width="450"
                class="mx-auto"
        >
            <v-expansion-panels>
                <v-expansion-panel
                        v-for="singer in waitingList"
                        :key="singer.id"
                >
                    <v-expansion-panel-header>
                        <v-list-item
                                :key="singer.singer_id"

                        >
                            <v-list-item-content>
                                <v-list-item-title v-html="song.title"></v-list-item-title>
                                <v-list-item-subtitle v-html="song.artist"></v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <v-btn color="primary" v-on:click="remove">Löschen</v-btn>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>
        </v-card>
    </div>
</template>
<div>
    <h1>Waitinglist</h1>
</div>
<script>
    import axios from 'axios'

    export default {
        name: "Waitinglist",
        // model: null,
        components: {
        },
        methods: {
            remove: function () {
                axios.post(`${process.env.VUE_APP_API_URL}/singer`, {
                    name: this.name,
                    song_id: this.song.song_id
                }, {
                    headers: {
                        Authorization: 'Baerer ' + localStorage.getItem('token')
                    }
                })
                    .then((res) => {
                        console.log(res)
                        // window.location.reload()
                    })
                    .catch(err => console.log(err))
            }
        },
        data() {
            return {
                waitingList: [],
            }
        },
        created() {
            const token = localStorage.getItem('token');

            if (token) {
                axios.get(`${process.env.VUE_APP_API_URL}/waitinglist`, {
                    headers: {
                        Authorization: 'Baerer ' + localStorage.getItem('token')
                    }
                })
                    .then((res) => {
                        if (res.data) {
                            this.waitingList = res.data
                            console.log(this.waitingList.length + ' waiting singers loaded')
                        }
                    })
                    .catch(err => {
                        console.log('error message: ', err)
                        if (err.response.status == 401) {
                            localStorage.clear();
                            console.log('Bitte einloggen.')
                        }

                    })
            } else {
                console.log('You need to be logged in.')
            }
        }
    }
</script>

<style scoped>

</style>
