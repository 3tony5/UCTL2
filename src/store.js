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
        message: {date : "15:59", message : "Début de la course"},
        events: [],
        nbreEvents: 0
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
        updateEvents(state, events){
            state.events = events
        },
        updateMessage(state, boolAffich) {
            state.displayMessage = boolAffich
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