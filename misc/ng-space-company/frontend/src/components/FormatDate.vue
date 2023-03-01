<template>
    {{ date }}
</template>

<script>
export default {
    props: [ 'value' ],
    computed: {
        
        date: function() {
        
            let val = new Date(this.value)
            
            return val.getFullYear() + '-' + (val.getMonth() + 1) + '-' + val.getDate()
        },
    },
}
</script>