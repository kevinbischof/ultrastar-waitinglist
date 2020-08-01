<template>
    <div class="songs">
        <h1>Songs</h1>
        <v-text-field
                label="Enter artist or title..."
                name="term"
                prepend-icon="mdi-magnify"
                type="text"
                v-model="term"
                @change="searchTerm"
        ></v-text-field>
        <v-card
                max-width="450"
                class="mx-auto"
        >
            <v-expansion-panels>
                <v-expansion-panel
                        v-for="song in songList"
                        :key="song.id"
                >
                    <v-expansion-panel-header>
                        <v-list-item
                                :key="song.title"

                        >


                            <p>Cover</p>
                            <v-list-item-avatar>
                                <v-img :src="song.avatar"></v-img>
                            </v-list-item-avatar>
                            <v-list-item-content>
                                <v-list-item-title v-html="song.title"></v-list-item-title>
                                <v-list-item-subtitle v-html="song.artist"></v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <SongDetail v-bind:song="song"/>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>
        </v-card>
    </div>
</template>

<script>
    import axios from 'axios'
    import SongDetail from "./SongDetail";

    export default {
        name: "Songs",
        // model: null,
        components: {
            SongDetail
        },
        methods: {
            searchTerm: function () {
                const token = localStorage.getItem('token');

                if (token) {
                    axios.get(`${process.env.VUE_APP_API_URL}/songs?term=${this.term}`, {
                        headers: {
                            Authorization: 'Baerer ' + localStorage.getItem('token')
                        }
                    })
                        .then((res) => {
                            if (res.data) {
                                this.songList = res.data
                                console.log(this.songList.length + ' songs loaded')
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
        },
        data() {
            return {
                songList: [],
                term: '',
                search: '',
                headers: [
                    {text: 'Artist', value: 'artist'},
                    {text: 'Title', value: 'title'},
                    // { text: 'Language', value: 'language' },
                    // { text: 'Edition', value: 'edition' },
                    // { text: 'Genre', value: 'genre' },
                    // { text: 'Year', value: 'year' },
                    // { text: 'Length', value: 'length' },
                ],
            }
        },
        created() {

        }
    }
</script>

<style scoped>

</style>
