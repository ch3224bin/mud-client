<template>
  <v-card>
    <v-card-text>
      <div>
        <v-text-field type="text" v-model="username" placeholder="Username"></v-text-field>
      </div>
      <div>
        <v-text-field type="password" v-model="password" placeholder="Password"></v-text-field>
      </div>
    </v-card-text>
    <v-card-actions>
      <div>
        <v-btn @click="googleLogin()">Google Login</v-btn>
        <v-btn @click="googleLogout()">Google Logout</v-btn>
      </div>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  methods: {
    googleLogin () {
      window.location.href = 'http://localhost:8080/oauth2/authorize/google'
    },
    googleLogout () {
      this.$store.dispatch('logout')
    }
  },
  data () {
    return {
      username: '',
      password: ''
    }
  }
}
</script>
