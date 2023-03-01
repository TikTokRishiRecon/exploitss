<template>
    <span>{{ seconds }}</span>
</template>

<script>
export default {

    props: [ 'value' ],

    computed: {
    
        seconds: function() {
        
            let h = Math.floor(this.value / 3600)
            if (h < 10) { h = '0' + h }
            
            let m = Math.floor(Math.floor(this.value / 60) % 60)
            if (m < 10) { m = '0' + m }
            
            let s = Math.floor(this.value % 60)
            if (s < 10) { s = '0' + s }
            
            return h + ':' + m + ':' + s
        },
    },
}
</script>