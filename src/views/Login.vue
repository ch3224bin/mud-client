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
        <v-btn color="lime" @click="login">Sign in</v-btn>
      </div>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  methods: {
    login () {
      const params = new URLSearchParams()
      params.append('username', this.username)
      params.append('password', this.password)

      this.$store
        .dispatch('LOGIN', params)
        .then(function () { this.redirect() })
        .catch(({ message }) => (this.msg = message))
    },
    redirect () {
      const { search } = window.location
      const tokens = search.replace(/^\?/, '').split('&')
      const { returnPath } = tokens.reduce((qs, tkn) => {
        const pair = tkn.split('=')
        qs[pair[0]] = decodeURIComponent(pair[1])
        return qs
      }, {})

      this.$router.push(returnPath)
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
