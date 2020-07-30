<template>
    <nav>
        <v-toolbar>
            <v-toolbar-title class="text-uppercase grey--text">
                <a href="/"><span class="font-weight-light">ultrastar-</span>
                <span>waitinglist</span></a>
            </v-toolbar-title>
            <v-btn text color="grey" v-if="isLogedIn">
                <router-link to="/songs" class="nav-link">Songs</router-link>
<!--                <a href="/#/songs"><span>Songs</span></a>-->
                <!--                <v-icon>exit_to_app</v-icon>-->
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn v-if="!isLogedIn" text color="grey">
                <a href="/#/login"><span>Sign In</span></a>
<!--                <v-icon>exit_to_app</v-icon>-->
            </v-btn>
            <v-btn v-if="isLogedIn" v-on:click="logout" text color="grey">
                <span>Sign Out</span>
                <!--                <v-icon>exit_to_app</v-icon>-->
            </v-btn>
        </v-toolbar>
    </nav>

</template>

<script>
    export default {
        name: "Navbar",
        data() {
            return {
                isLogedIn: false
            }
        },
        created() {
            if (localStorage.isLogedIn) {
                this.isLogedIn = true
                console.log('Is logged in')
            } else {
                console.log('Is not logged in')
            }
        },
        methods: {
          logout: function () {
            localStorage.clear()
              window.location.href = '/'
          }
        }
    }
</script>

<style scoped>
nav-link {
    text-decoration: none;
    color: gray;
}
</style>
