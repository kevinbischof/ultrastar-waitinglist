<template>
    <v-form>
        <v-text-field
                label="Singer(s)"
                name="name"
                prepend-icon="mdi-account"
                type="text"
                v-model="name"
        ></v-text-field>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" v-on:click="send">Send</v-btn>
        </v-card-actions>
    </v-form>
</template>

<script>
    import axios from "axios";

    export default {
        name: "SongDetail",
        data() {
            return {
                name: "",
            }
        },
        props: ["song"],
        methods: {
            send: function () {
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
    }
</script>

<style scoped>

</style>
