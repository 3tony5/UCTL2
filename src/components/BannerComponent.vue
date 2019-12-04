<template>
    <button v-on:click="messageEvents">Lancer le message</button>
</template>

<script>
    export default {
        computed: {
            
        },
        methods: {
            getTeamName(id){
                let i = 0;
                for(i; i<=this.$store.state.teams.length-1; i++){
                    if(id === this.$store.state.teams[i].id){
                        return this.$store.state.teams[i].name;
                    }
                }
                return "null";
            },
            
            messageEvents () {
                let equipe1 = this.getTeamName(this.$store.state.events[0].team1);
                let equipe2 = this.getTeamName(this.$store.state.events[0].team2);
                var a = {date : "16.00", message : "L'équipe " + equipe1 + " a dépassé l'équipe " + equipe2};
                this.$store.commit('addTextMessage', a);
                this.$store.commit('updateMessage', true);
                this.$store.state.nbreEvents = this.$store.state.nbreEvents + 1;
                setTimeout(this.disable,15000);
            },
            disable: function () {
                this.$store.commit('updateMessage', false);
                this.$store.commit('updateTextMessage');
            }
        }
    }
</script>

<style>
</style>