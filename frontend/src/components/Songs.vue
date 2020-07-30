<template>
    <div class="songs">
        <h1>Songs</h1>

        <!--        <v-card>-->
        <!--            <v-container fluid>-->
        <!--                <v-row-->
        <!--                        align="center"-->
        <!--                >-->
        <!--                    <v-col cols="12">-->
        <!--                        <v-autocomplete-->
        <!--                                v-model="values"-->
        <!--                                :items="items"-->
        <!--                                outlined-->
        <!--                                dense-->
        <!--                                chips-->
        <!--                                small-chips-->
        <!--                                label="Outlined"-->
        <!--                                multiple-->
        <!--                        ></v-autocomplete>-->
        <!--                    </v-col>-->
        <!--                    <v-col cols="12">-->
        <!--                        <v-autocomplete-->
        <!--                                v-model="values"-->
        <!--                                :items="items"-->
        <!--                                dense-->
        <!--                                chips-->
        <!--                                small-chips-->
        <!--                                label="Solo"-->
        <!--                                multiple-->
        <!--                                solo-->
        <!--                        ></v-autocomplete>-->
        <!--                    </v-col>-->
        <!--                    <v-col cols="12">-->
        <!--                        <v-autocomplete-->
        <!--                                v-model="value"-->
        <!--                                :items="items"-->
        <!--                                dense-->
        <!--                                filled-->
        <!--                                label="Filled"-->
        <!--                        ></v-autocomplete>-->
        <!--                    </v-col>-->
        <!--                </v-row>-->
        <!--            </v-container>-->
        <!--        </v-card>-->

        <!--        <div v-bind:key="song.id" v-for="song in songList">-->
        <!--            {{song.artist}} - {{song.title}}-->
        <!--        </div>-->

        <!--        <v-autocomplete-->
        <!--                :hint="'Type to search songs'"-->
        <!--                :items="songList"-->
        <!--                item-text="title"-->
        <!--                item-value="song_id"-->
        <!--                :label="'Songname'"-->
        <!--                persistent-hint-->
        <!--                prepend-icon=""-->
        <!--        >-->
        <!--            <template>-->

        <!--            </template>-->
        <!--        </v-autocomplete>-->
        <!--        <v-card>-->
        <!--            <v-card-title>-->
        <!--                Nutrition-->
        <!--                <v-spacer></v-spacer>-->
        <!--                <v-text-field-->
        <!--                        v-model="search"-->
        <!--                        append-icon="mdi-magnify"-->
        <!--                        label="Search"-->
        <!--                        single-line-->
        <!--                        hide-details-->
        <!--                ></v-text-field>-->
        <!--            </v-card-title>-->
        <!--            <v-data-table-->
        <!--                    :headers="headers"-->
        <!--                    :items="songList"-->
        <!--                    :search="search"-->
        <!--            ></v-data-table>-->
        <!--        </v-card>-->

        <!--                <div v-bind:key="song.id" v-for="song in songList">-->
        <!--                    <SongDetail v-bind:song="song" />-->
        <!--                </div>-->
        <v-card
                max-width="450"
                class="mx-auto"
        >
            <!--        <v-toolbar-->
            <!--                color="cyan"-->
            <!--                dark-->
            <!--        >-->
            <!--            <v-app-bar-nav-icon></v-app-bar-nav-icon>-->

            <!--            <v-toolbar-title>Inbox</v-toolbar-title>-->

            <!--            <v-spacer></v-spacer>-->

            <!--            <v-btn icon>-->
            <!--                <v-icon>mdi-magnify</v-icon>-->
            <!--            </v-btn>-->
            <!--        </v-toolbar>-->

            <!--            <v-list three-line>-->
            <!--                <div v-bind:key="song.id" v-for="song in songList">-->
            <!--                    <SongDetail v-bind:song="song" />-->
            <!--                </div>-->
            <!--            </v-list>-->
            <v-expansion-panels>
                <v-expansion-panel
                        v-for="song in songList"
                        :key="song.id"
                >
                    <v-expansion-panel-header>
                        <v-list-item
                                :key="song.title"
                                @click="blank"
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
            detail: function () {

            }
        },
        data() {
            return {
                songList: [],
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
            const token = localStorage.getItem('token');

            if (token) {
                axios.get(`${process.env.VUE_APP_API_URL}/songs/`, {
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
    }
</script>

<style scoped>

</style>
