<template>
    <div class="col-12">
        <div class="card card-body">
            <div class="row g-3">
                <div class="col-12 col-md-6">
                    <div class="row g-3">
                    
                        <div class="col-12">
                            <span class="h6 text-light">{{ $t(id) }}</span>
                        </div>
                                                    
                    </div>
                </div>
                <div class="col-12 col-md-6">
                    <div class="row g-3">
                    
                        <div class="col-12">
                            <div class="heading-6">{{ $t('stats') }}</div>
                            <div class="row g-1 gx-3">
                                <div class="col-auto">
                                    <span class="small text-normal">{{ $t('power') }}</span>
                                    <span class="ms-2 text-light"><format-number :value="fleet.power" /></span>
                                </div>
                                <div class="col-auto">
                                    <span class="small text-normal">{{ $t('defense') }}</span>
                                    <span class="ms-2 text-light"><format-number :value="fleet.defense" /></span>
                                </div>
                                <div class="col-auto">
                                    <span class="small text-normal">{{ $t('speed') }}</span>
                                    <span class="ms-2 text-light"><format-number :value="fleet.speed" /></span>
                                </div>
                            </div>
                        </div>
                                                        
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import FormatNumber from './FormatNumber.vue'

import { mapState } from 'vuex'

export default {
    props: [ 'id' ],
    components: {
        'format-number': FormatNumber,
    },
    computed: mapState([
        'fleet',
    ]),
}
</script>