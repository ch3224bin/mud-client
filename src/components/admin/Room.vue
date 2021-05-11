<template>
  <v-container>
    <v-row>
      <v-col>
        <v-simple-table>
          <template v-slot:default>
            <thead>
            <tr>
              <th class="text-left">
                ID
              </th>
              <th class="text-left">
                Summary
              </th>
            </tr>
            </thead>
            <tbody>
            <tr
              v-for="item in list"
              :key="item.id"
              @click="selectedRoom = item"
            >
              <td>{{ item.id }}</td>
              <td>{{ item.summary }}</td>
            </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
      <v-col>
        <v-card v-if="selectedRoom">
          <v-card-text>
            <v-text-field disabled label="ID" :value="selectedRoom.id"></v-text-field>
            <v-text-field label="Summary" :value="selectedRoom.summary"></v-text-field>
            <v-textarea label="Description" :value="selectedRoom.description"></v-textarea>
            <h3>출구</h3>
            <div v-for="wayout in selectedRoom.wayouts" :key="wayout.id">
              {{ wayout.direction }}, {{ wayout.nextRoomId }}
            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn>저장</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  mounted () {
    this.getList()
  },
  methods: {
    getList () {
      const _this = this
      this.axios.get('/rooms').then(function ({ data }) {
        console.log(data._embedded.rooms)
        _this.list = data._embedded.rooms
      })
    }
  },
  data () {
    return {
      list: [],
      selectedRoom: undefined
    }
  }
}
</script>
