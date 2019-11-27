<template>
    <l-map id="raceMap" :zoom="zoom" :center="center">
        <l-tile-layer :url="tileUrl" :attribution="attribution" />
        <l-polyline :lat-lngs="segment.data" v-for="segment in segments" :key="segment.id" />
        <l-polyline :lat-lngs="transition.data" :color="transitionsColor" v-for="transition in transitions" :key="transition.id" />

        <l-moving-marker v-for="team in teams" :key="team.name" :lat-lng="team.pos" :duration="1000" />
        <div v-show="dispMessage" class="flash-info">
            <div>{{message}}</div>
        </div>
    </l-map>
</template>
<script type="text/babel">
    import L from 'leaflet'
    import { LMap, LPolyline, LTileLayer } from 'vue2-leaflet'
    import LMovingMarker from 'vue2-leaflet-movingmarker'
    import { S1, S2, S3, S4, S5, TS12, TS23, TS34, TS45 } from '../segments.js'

    const feedingZoneIcon = L.icon({
        iconUrl: 'marker-bottle.png'
    })

    export default {
        components: {
            LMap,
            LMovingMarker,
            LTileLayer,
            LPolyline
        },
        computed: {
            teams () {
                return this.$store.state.teams
            },
            dispMessage () {
                return this.$store.state.displayMessage
            },
            message () {
                return this.$store.state.message
            }
        },
        data () {
            return {
                attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
                center: [48.1266, -1.6694],
                tileUrl: 'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png ',
                zoom: 13,

                segments: [ S1, S2, S3, S4, S5 ],
                transitions: [ TS12, TS23, TS34, TS45 ],
                transitionsColor: "black",

                pois: [
                    {
                        id: 'water1',
                        icon: feedingZoneIcon,
                        pos: [48.13855, -1.65967]
                    }
                ]
            }
        }
    }
</script>

<style>
    #raceMap {
        height: 400px
    }

    .flash-info {
        position: absolute;
        bottom: 0;
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
        animation: defilement-rtl 15s infinite linear;
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