<template>
    <div></div>
</template>

<script>
    import axios from "axios";

    export default {
        name: "Singer",
        components: {
        },
        methods: {
            detail: function () {

            }
        },
        data() {
            return {
                singerList: [],
            }
        },
        created() {
            const token = localStorage.getItem('token');

            if (token) {
                axios.get(`${process.env.VUE_APP_API_URL}/singer/`, {
                    headers: {
                        Authorization: 'Baerer ' + localStorage.getItem('token')
                    }
                })
                    .then((res) => {
                        if (res.data) {
                            this.singerList = res.data
                            console.log(this.singerList.length + ' singer loaded')
                            console.log(this.singerList)
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
