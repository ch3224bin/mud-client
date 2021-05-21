<template>
  <div class="">
  </div>
</template>

<script>
import Stomp from 'webstomp-client'
import SockJS from 'sockjs-client'

export default {
  name: 'Home',
  methods: {
    connect () {
      const serverUrl = 'http://localhost:8080/mud-server?X-AUTH-TOKEN=' + localStorage.getItem('accessToken')
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
    }
  },
  mounted () {
    this.connect()
  },
  data () {
    return {
      stompClient: null
    }
  }
}
</script>
