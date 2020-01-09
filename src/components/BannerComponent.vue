<template>
    <div>
        <div v-show="dispMessage" class="flash-info">
            <div :style="animation"><b>{{message.date}}</b> : {{message.message}}</div>          
        </div>
        <button v-on:click="messageEvents">Lancer le message</button>  
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
                let time = 7 + this.$store.state.message.message.length * 0.1;
                // this.dis(this.$store.state.message.message.length);
                return {
                    'animation': "defilement-rtl " + time + "s 1 linear"
                }
            }
            
        },
        methods: {
            getTeamName(id){
                let i = 0;
                for(i; i<=this.$store.state.teams.length; i++){
                    if(id === this.$store.state.teams[i].id){
                        return this.$store.state.teams[i].name;
                    }
                }
                return "idNotFound";
            },
            messageEvents () {
                this.EventsToListMessage();
                this.$store.commit('updateMessage', true);
                let time = 7000; //8000 + lgt*100
                setTimeout(this.disable, time);
            },
            EventsToListMessage: function () {
                for(this.$store.state.nbreEvents; this.$store.state.nbreEvents < this.$store.state.events.length;this.$store.state.nbreEvents++){
                    let equipe1 = this.getTeamName(this.$store.state.events[this.$store.state.nbreEvents].team1);
                    let equipe2 = this.getTeamName(this.$store.state.events[this.$store.state.nbreEvents].team2);
                    var a = {date : "16.00", message : "L'équipe " + equipe1 + " a dépassé l'équipe " + equipe2};
                    //Ajouter la fonction de randomisation des phrases à la place
                    this.$store.commit('addTextMessage', a);
                }
            },
            disable: function () {
                this.$store.commit('updateMessage', false);
                if (this.$store.state.listMessage.length > 0){
                    this.$store.commit('updateTextMessage');
                }
            }
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