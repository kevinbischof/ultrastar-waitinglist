<!--<template>-->
<!--    <div>-->
<!--        <form class="login" @submit.prevent="login">-->
<!--            <h1>Sign in</h1>-->
<!--            <label>Email</label>-->
<!--            <input required v-model="email" type="email" placeholder="Name"/>-->
<!--            <label>Password</label>-->
<!--            <input required v-model="password" type="password" placeholder="Password"/>-->
<!--            <hr/>-->
<!--            <button type="submit">Login</button>-->
<!--        </form>-->
<!--    </div>-->
<!--</template>-->

<template>
<!--    <v-app id="inspire">-->
<!--        <v-main>-->
            <v-container
                    class="fill-height"
                    fluid
            >
                <v-row
                        align="center"
                        justify="center"
                >
                    <v-col
                            cols="12"
                            sm="8"
                            md="4"
                    >
                        <v-card class="elevation-12">
                            <v-toolbar
                                    color="primary"
                                    dark
                                    flat
                            >
                                <v-toolbar-title>Login</v-toolbar-title>
                                <v-spacer></v-spacer>
                            </v-toolbar>
                            <v-card-text>
                                <v-form>
                                    <v-text-field
                                            label="E-Mail"
                                            name="login"
                                            prepend-icon="mdi-account"
                                            type="text"
                                            v-model="email"
                                    ></v-text-field>

                                    <v-text-field
                                            id="password"
                                            label="Password"
                                            name="password"
                                            prepend-icon="mdi-lock"
                                            type="password"
                                            v-model="password"
                                    ></v-text-field>
                                </v-form>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="primary" v-on:click="login">Login</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
<!--        </v-main>-->
<!--    </v-app>-->
</template>

<script>
    import axios from 'axios';

    export default {
        name: "Login",
        data() {
            return {
                email: "",
                password: ""
            }
        },
        props: {
            source: String,
        },
        methods: {
            login: function () {
                axios.post(`${process.env.VUE_APP_API_URL}/users/login`, {
                        email: this.email,
                        password: this.password
                })
                    .then((res) => {
                        localStorage.setItem('token', res.data.token)
                        localStorage.setItem('isLogedIn', true)
                        localStorage.setItem('email', res.data.email)
                        console.log('logged in');
                        window.location.href = '/'
                    })
                    .catch(err => console.log(err))
            }
        },
        created() {
        }
    }
</script>

<style scoped>

</style>
