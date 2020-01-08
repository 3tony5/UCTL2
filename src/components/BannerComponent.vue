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
                let equipe1 = this.getTeamName(this.$store.state.events[this.$store.state.nbreEvents].team1);
                let equipe2 = this.getTeamName(this.$store.state.events[this.$store.state.nbreEvents].team2);
                var a = {date : "16.00", message : "L'équipe " + equipe1 + " a dépassé l'équipe " + equipe2};
                this.$store.commit('addTextMessage', a);
                this.$store.commit('updateMessage', true);
                this.$store.state.nbreEvents = this.$store.state.nbreEvents + 1;
                this.initMessage();
            },
            initMessage: function() {
                this.$store.commit('addTextMessage', {date: '16:05', message: 'L\'équipe 2 sort de la 1ère section'});
                this.$store.commit('addTextMessage', {date: '16:15', message: 'Abanddon du coureur 7'});
                this.$store.commit('addTextMessage', {date: '17:01', message: 'Félicitations à l\'équipe numéro 37 qui vient de finir la course en 1ère place au bout de 1h 32min !!'});
            }
        }
    }
</script>

<style>
</style>