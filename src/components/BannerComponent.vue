<template>
    <div>
        <div v-show="displayMessage" class="flash-info">
            <div :style="animation"><b>{{message.date}}</b> : {{message.message}}</div>          
        </div>
        <!-- button v-on:click="messageEvents">Lancer le message</button> -->
        <br>  
    </div>
</template>

<script>
    export default {
        data: function(){
            return{
                nberEvents: 0,
                displayMessage: false,
                listMessage: [],
                message: {date : "15:59", message : "Début de la course"},
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
                loopTime: ["Le meilleur temps pour la boucle est réalisé par ~t en ~h",
                    "L'équipe ~t a réalisé le meilleure temps pour la boucle en ~t"],
            }
        },
        computed: {
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
                        let rand = this.getRandomInt(this.overtake.length);
                        let mes = this.overtake[rand];
                        mes = mes.replace("~t1", this.getTeamName(events.team1));
                        mes = mes.replace("~t2", this.getTeamName(events.team2));
                        mes = mes.replace("~p", events.position);
                        mes = mes.replace("~s", events.section); 
                        return mes;
                    }
                    case "STAGEFINISHED" :{
                        let rand = this.getRandomInt(this.stageFinished.length);
                        let mes = this.stageFinished[rand];
                        mes = mes.replace("~t", this.getTeamName(events.team));
                        mes = mes.replace("~h", events.hours);
                        mes = mes.replace("~s", events.section); 
                        return mes;
                    }
                    case "ARRIVAL" :{
                        let rand = this.getRandomInt(this.arrival.length);
                        let mes = this.arrival[rand];
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
                this.updateMessage(true);
                let time = 7000; //8000 + lgt*100
                setTimeout(this.disable, time);
            },
            EventsToListMessage: function () {
                for(this.nberEvents; this.nberEvents < this.$store.state.events.length; this.nberEvents++){
                    var hour = new Date();
                    var mess = {date :  hour.getHours() + ":"+(hour.getMinutes() < 10 ? "0" : "") + hour.getMinutes(), message : this.randomMessage(this.$store.state.events[this.nberEvents])};
                    this.listMessage.push(mess);
                }
            },
            disable: function () {
                this.updateMessage(false);
                if (this.listMessage.length > 0){
                    this.message = this.listMessage.shift();
                }
                setTimeout(this.messageEvents, 3000);
            },
            updateMessage(boolAffich) {
                this.displayMessage = boolAffich;
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