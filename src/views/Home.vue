<template>
  <v-card>
    <v-virtual-scroll height="300">
      <component v-for="(item, index) in history" :is="item" v-bind:key="index"></component>
    </v-virtual-scroll>
    <v-card-actions>
      <v-text-field v-model="command" dense outlined></v-text-field>
      <v-btn @click="send()">전송</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import Stomp from 'webstomp-client'
import SockJS from 'sockjs-client'

export default {
  name: 'Home',
  methods: {
    connect () {
      const serverUrl = 'http://localhost:8080/mud-server'
      const socket = new SockJS(serverUrl)
      this.stompClient = Stomp.over(socket)
      const _stompClient = this.stompClient
      _stompClient.connect({}, function (frame) {
        _stompClient.subscribe('/user/history', function (response) {
          console.log(response.body)
        })
        _stompClient.subscribe('/user/history/status', function (response) {
          console.log(JSON.parse(response.body))
        })
      })
    },
    send () {
      this.stompClient.send('/app/command', {}, this.command)
      this.command = ''
    }
  },
  created () {
    this.connect()
  },
  data () {
    return {
      stompClient: null,
      command: '',
      history: []
    }
  }
}
</script>
