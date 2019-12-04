<template>
    <button v-on:click="message">Lancer le message</button>
</template>

<script>
    export default {
        computed: {

        },
        methods: {
            message: function () {
                this.$store.commit('updateMessage', true);
                this.initMessage();
                setTimeout(this.disable,15000);
            },
            disable: function () {
                this.$store.commit('updateMessage', false);
                this.$store.commit('updateTextMessage');
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