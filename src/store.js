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
        overtake: ["L'équipe ~t1 dépasse l'équipe ~t2 et se retrouve en position ~p",
                    "L'équipe ~t2 est dépassé par l'équipe ~t1", 
                    "~t1 accélère et dépasse ~t2",
                    "~t1 passe devant ~t2",
                    "~t1 devance ~t2 et se retrouve en position ~p",
                    "~t1 distance ~t2 sur la section ~s",
                    "~t1 double ~t2 et prend la place ~p",
                    "~t1 franchit la section ~s au profit de ~t2",
                    "~t1 prend la place ~p au dépend de ~t2"
                ],
        stageFinished: ["~t finit la section ~s",
                        "~t sort de la section ~s",
                        "~t bat le record d’étape en ~h"],
        arrival: ["~t finit la course en position ~p en ~h",
                    "~t vient de franchir la ligne d'arrivée en ~h en position ~p",
                    "~t finit la course en ~h"],
        message: {date : "15:59", message : "Début de la course"},
        events: [],
        nberEvents: 0
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