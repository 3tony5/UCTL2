import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        raceStartTime: 0,
        // 0 : not started, 1 : live, 2 : finished
        raceStatus: 0,
        elapsedTimeFromRaceStart: 0,
        teams: [],
        displayMessage: false,
        listMessage: [],
        message: 'Début de la course'
    },
    mutations: {
        updateElapsedTime(state) {
            let now = Math.trunc(new Date().getTime() / 1000)
            state.elapsedTimeFromRaceStart = now - state.raceStartTime
        },
        updateRaceStatus(state, race) {
            state.raceStartTime = race.startTime
            state.raceStatus = race.status
        },
        updateTeams(state, updatedTeams) {
            state.teams = updatedTeams
        },
        updateMessage(state, message) {
            state.displayMessage = message
        },
        addTextMessage(state, msg) {
            state.listMessage.push(msg)
        },
        updateTextMessage(state) {
            state.message = state.listMessage.shift()
        }
    },
    actions: {
        updateElapsedTime(context) {
            if (context.state.raceStatus == 1) {
                context.commit('updateElapsedTime')
            }
        }
    }
})

export default store