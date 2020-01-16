<template>
    <div>
        <div v-show="dispMessage" class="flash-info">
            <div :style="animation"><b>{{message.date}}</b> : {{message.message}}</div>          
        </div>
        <!-- button v-on:click="messageEvents">Lancer le message</button> -->
        <br>  
    </div>
</template>

<script>
    export default {
        computed: {
            dispMessage () {
                return this.$store.state.displayMessage
            },
            message () {
                return this.$store.state.message
            },
            animation () {
                let time = 7 ; // + this.$store.state.message.message.length * 0.1;
                return {
                    'animation': "defilement-rtl " + time + "s 1 linear"
                }
            }
            
        },
        methods: {
            getRandomInt(max){
                 return Math.floor(Math.random() * Math.floor(max));
            },
            randomMessage(events){
                switch (events.events){
                    case "OVERTAKE" : {
                        let rand = this.getRandomInt(this.$store.state.overtake.length);
                        let mes = this.$store.state.overtake[rand];
                        mes = mes.replace("~t1", this.getTeamName(events.team1));
                        mes = mes.replace("~t2", this.getTeamName(events.team2));
                        mes = mes.replace("~p", events.position);
                        mes = mes.replace("~s", events.section);
                        return mes;
                    }
                    case "STAGEFINISHED" :{
                        let rand = this.getRandomInt(this.$store.state.stageFinished.length);
                        let mes = this.$store.state.stageFinished[rand];
                        mes = mes.replace("~t", this.getTeamName(events.team));
                        mes = mes.replace("~h", events.hours);
                        mes = mes.replace("~s", events.section);
                        return mes;
                    }
                    case "ARRIVAL" :{
                        let rand = this.getRandomInt(this.$store.state.arrival.length);
                        let mes = this.$store.state.arrival[rand];
                        mes = mes.replace("~t", this.getTeamName(events.team));
                        mes = mes.replace("~h", events.hours);
                        mes = mes.replace("~p", events.position);
                        return mes;
                    }
                    
                    default:
                        break;

                }
            },
            getTeamName(id){
                let i = 0;
                for(i; i <= this.$store.state.teams.length; i++){
                    if(id === this.$store.state.teams[i].id){
                        return this.$store.state.teams[i].name;
                    }
                }
                return "idNotFound";
            },
            messageEvents: function () {
                this.EventsToListMessage();
                this.$store.commit('updateMessage', true);
                let time = 7000; //8000 + lgt*100
                setTimeout(this.disable, time);
            },
            EventsToListMessage: function () {
                for(this.$store.state.nberEvents; this.$store.state.nberEvents < this.$store.state.events.length;this.$store.state.nberEvents++){
                    var hour = new Date();
                    var mes = {date :  hour.getHours() + ":"+(hour.getMinutes() < 10 ? "0" : "") + hour.getMinutes(), message : this.randomMessage((this.$store.state.events[this.$store.state.nberEvents]))};
                    this.$store.commit('addTextMessage', mes);
                }
            },
            disable: function () {
                this.$store.commit('updateMessage', false);
                if (this.$store.state.listMessage.length > 0){
                    this.$store.commit('updateTextMessage');
                }
                setTimeout(this.messageEvents, 3000);
            }
        },
        created: function () {
                this.messageEvents();
        }
    }
</script>
<style>
   .flash-info {
        position: absolute;
        width: 100%;
        border: 7px solid rgb(255, 0, 0);
        background-color: rgba(255, 6, 6, 0.61);
        overflow: hidden;                     /* masque tout ce qui dépasse */
        z-index: 100000;
    }

    /* le bloc défilant */
    .flash-info > :first-child {
        display: inline-block;                /* modèle de boîte en ligne */
        padding-right: 2em;                   /* un peu d'espace pour la transition */
        padding-left: 100%;                   /* placement à droite du conteneur */
        white-space: nowrap;                  /* pas de passage à la ligne */
        font-size: 1.4em;
        font-weight: bold;
    }

    @keyframes defilement-rtl {
        0% {
            transform: translate3d(0,0,0);      /* position initiale à droite */
        }
        100% {
            transform: translate3d(-100%,0,0);  /* position finale à gauche */
        }
    }
</style>