<template>
    <button v-if="displayNanoswarmShortcut" :class="buttonStyles" @click.stop="switchNano(resource)">
        <img 
            :src="require(data['nanoswarm'].resource !== resource ? '../assets/interface/nanoswarm.png':'../assets/interface/nanoswarm_green.png')" 
            :width="imgSize"
            :height="imgSize" 
            alt="nanoswarm icon" 
        />
    </button>          
</template>

<script>

import { mapState, mapActions } from 'vuex'

export default {
    props: {
        resource: {
            type: String,
            required: true
        },
        buttonStyles: {
            type: String,
            default: 'me-3'
        },
        imgSize: {
            type: String,
            default: '12'
        }
    },    
    computed: {    
        ...mapState([
            'data', 'displayNanoswarmShortcut'
        ]),
    },
    methods: {
        ...mapActions([
            'switchNano'
        ]),
    },
}
</script>