<template>
    <div class="col-12" role="article">
        <div class="card card-body">
            <div class="row g-3">
                <div class="col-12 col-md-6">
                    <div class="row g-3">
                    
                        <div class="col-12">
                            <div class="row g-1">
                                <div class="col">
                                    <span class="h6 text-light">{{ $t('overview') }}</span>
                                </div>
                                <div class="col-auto">
                                    <span class="text-uppercase" :class="{ 'text-light':(data[id].count > 0 && (!data[id].storage || data[id].count < data[id].storage)), 'text-normal':data[id].count <= 0, 'text-excess':data[id].storage && data[id].count >= data[id].storage && data[id].count < getStorageCap(id), 'text-success':data[id].storage && data[id].count >= getStorageCap(id) }"><format-number :value="data[id].count" /></span>
                                    <small v-if="data[id].storage" class="text-uppercase text-normal ms-1">/<format-number :value="getStorageCap(id)" /></small>
                                </div>
                                <div v-if="data[id].storage" class="col-12">
                                    <div class="row g-1">
                                        <div class="col small">
                                            <span v-if="data[id].prod >= 0">{{ $t('remainingTimeFullStorage') }}</span>
                                            <span v-if="data[id].prod < 0" class="text-danger">{{ $t('remainingTimeEmptyStorage') }}</span>
                                        </div>
                                        <div v-if="data[id].prod >= 0" class="col-auto text-end" style="width:75px">
                                            <small v-if="data[id].storageTimer < 0" class="text-normal">---</small>
                                            <small v-if="data[id].storageTimer == 0" class="text-success"><i class="fas fa-fw fa-check"></i></small>
                                            <small v-if="data[id].storageTimer > 0 && data[id].storageTimer <= (3600 * 24 * 2)" class="text-timer"><timer :value="data[id].storageTimer" /></small>
                                            <small v-if="data[id].storageTimer > (3600 * 24 * 2)" class="text-timer">{{ $t('bigTimer') }}</small>
                                        </div>
                                        <div v-if="data[id].prod < 0" class="col-auto text-end" style="width:75px">
                                            <small v-if="data[id].storageTimer <= 0" class="text-normal">---</small>
                                            <small v-if="data[id].storageTimer > 0 && data[id].storageTimer <= (3600 * 24 * 2)" class="text-timer"><timer :value="data[id].storageTimer" /></small>
                                            <small v-if="data[id].storageTimer > (3600 * 24 * 2)" class="text-timer">{{ $t('bigTimer') }}</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div v-if="data[id].toggle" class="col-12 text-end">
                            <button class="btn" @click="toggle(id)">
                                {{ $t('toggle' + data[id].toggle) }}
                            </button>
                        </div>
                        
                    </div>
                </div>
                <div class="col-12 col-md-6">
                    <div class="row g-3">
                        
                        <div class="col-12">
                            <div class="heading-6">{{ $t('total') }}</div>
                            <div class="row g-0">
                                <div class="col-12">
                                    <div class="row g-1">
                                        <div class="col">
                                            <small>{{ $t('totalProduction') }}</small>
                                        </div>
                                        <div class="col-auto">
                                            <small class="text-uppercase text-success">+<format-number :value="data[id].production" /></small>
                                            <small class="text-normal ms-1">/s</small>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12">
                                    <div class="row g-1">
                                        <div class="col">
                                            <small>{{ $t('totalConsumption') }}</small>
                                        </div>
                                        <div class="col-auto">
                                            <small class="text-uppercase text-warning">-<format-number :value="data[id].consumption" /></small>
                                            <small class="text-normal ms-1">/s</small>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12">
                                    <div class="row g-1">
                                        <div class="col">
                                            <small>{{ $t('totalBalance') }}</small>
                                        </div>
                                        <div class="col-auto">
                                            <small class="text-uppercase" :class="{ 'text-danger':data[id].prod < 0, 'text-normal':data[id].prod == 0, 'text-success':data[id].prod > 0 }">
                                                <span v-if="data[id].prod > 0">+</span><format-number :value="data[id].prod" />
                                            </small>
                                            <small class="text-normal ms-1">/s</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    
                        <costs v-if="data[id].gain" :costs="data[id].costs" :mod="data[id].gain" />
                        
                        <div v-if="data[id].gain" class="col-12">
                            <div class="row g-1">
                                <div class="ms-auto col-auto">
                                    <button class="btn" @click="gain(id)">
                                        {{ $t('gain') }} {{ data[id].gain }}
                                    </button>
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
import Costs from './Costs.vue'
import Timer from './Timer.vue'
import FormatNumber from './FormatNumber.vue'

import { mapState, mapActions, mapGetters } from 'vuex'

export default {
    props: [ 'id' ],
    components: {
        'costs': Costs,
        'timer': Timer,
        'format-number': FormatNumber,
    },
    computed: {
        ...mapState([
            'data',
        ]),
        ...mapGetters([
            'getStorageCap',
        ]),
    },
    methods: {
        ...mapActions([
            'toggle', 'gain',
        ]),
    },
}
</script>