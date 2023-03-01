<template>
    <div v-if="costs" class="col-12">
        <div class="heading-6">
            <div class="row gx-3">
                <div class="col-auto">
                    {{ $t('costs') }}
                </div>
                <div v-if="mod && mod > 1" class="col-auto">
                    <span class="text-lowercase">x</span>{{ mod }}
                </div>
                <div v-if="id && id == 'segment'" class="col text-end">
                    <span class="me-1">{{ $t('max') }}</span>
                    <span class="me-3"><format-number :value="maxBuildable" /></span>
                    <button @click="$root.segmentModal.show();" aria-label="Calculator">
                        <i class="fas fa-fw fa-calculator"></i>
                    </button>
                </div>
                <div v-if="id && calc" class="col text-end">
                    <span class="me-1">{{ $t('max') }}</span>
                    <span class="me-3"><format-number :value="maxBuildable" /></span>
                    <button @click="$root.calcId=id; $root.calcModal.show();" aria-label="Calculator">
                        <i class="fas fa-fw fa-calculator"></i>
                    </button>
                </div>
            </div>
        </div>
        <div v-for="cost in costs" :key="cost.id" class="row g-1">
            <div class="col">
                <button class="small" @click="if (!['segment', 'shield', 'engine', 'aero'].includes(cost.id) && data[cost.id].unlocked == true) { setActivePane(cost.id + 'Pane'); }">
                    <div class="row g-1">
                        <div class="col-auto d-flex align-items-center">
                            <img :src="require(`../assets/interface/${cost.id}.png`)" width="12" height="12" :alt="$t(cost.id) + ' icon'" />
                        </div>
                        <div class="col">
                            <span class="text-normal">{{ $t(cost.id) }}</span>
                        </div>
                    </div>
                </button>
            </div>
            <div class="col-auto" v-if="cost.timer > 0">
                <nanoswarm-shortcut :resource="cost.id" />
            </div>
            <div class="col-auto">
                <button v-if="displayEmcShortcut && data['emc'].unlocked == true && cost.timer > 0 && isEmcResource(data, getEmcId(cost.id))" class="me-3" @click="if (cost.id != 'segment' && data[cost.id].unlocked == true) { convert(getEmcId(cost.id)); }">
                    <img v-if="cost.id !== 'meteorite'" :src="require(`../assets/interface/energy.png`)" width="12" height="12" :alt="$t('energy') + ' icon'" />
                    <img v-if="cost.id === 'meteorite'" :src="require(`../assets/interface/plasma.png`)" width="12" height="12" :alt="$t('plasma') + ' icon'" />
                    <i class="mx-1 fas fa-fw fa-long-arrow-alt-right" aria-hidden="true"></i>
                    <img :src="require(`../assets/interface/${cost.id}.png`)" width="12" height="12" :alt="$t(cost.id) + ' icon'" />
                </button>
            </div>
            <div class="col-auto text-end" style="width:50px;">
                <small v-if="!cost.timer || cost.timer > -2" class="text-uppercase text-light"><format-number :value="cost.count" /></small>
                <small v-if="cost.timer <= -2" class="text-uppercase text-danger"><format-number :value="cost.count" /></small>
            </div>
            <div class="col-auto text-end" style="width:75px">
                <small v-if="(!cost.timer && cost.timer != 0) || cost.timer < 0" class="text-normal">---</small>
                <small v-if="cost.timer == 0" class="text-success"><i class="fas fa-fw fa-check"></i></small>
                <small v-if="cost.timer > 0 && cost.timer <= (3600 * 24 * 2)" class="text-timer" role="timer"><timer :value="cost.timer" /></small>
                <small v-if="cost.timer > (3600 * 24 * 2)" class="text-timer">{{ $t('bigTimer') }}</small>
            </div>
        </div>
    </div>
</template>

<script>
import Timer from './Timer.vue'
import FormatNumber from './FormatNumber.vue'
import NanoswarmShortcut from './NanoswarmShortcut.vue'

import { mapState, mapActions, mapMutations } from 'vuex'

export default {
    components: {
        'timer': Timer,
        'format-number': FormatNumber,
        'nanoswarm-shortcut': NanoswarmShortcut,
    },
    props: [ 'costs', 'mod', 'id', 'calc' ],
    computed: {
        ...mapState([
            'data', 'displayEmcShortcut',
        ]),
        maxBuildable: function() {
            
            let factor = 0
            if (this.data[this.id].costType == 'EXPONENTIAL') factor = 1.1
            else if (this.data[this.id].costType == 'DYSON') factor = 1.02
            else if (this.data[this.id].costType == 'DOUBLE') factor = 2
            
            let result = 1000000
            this.costs.forEach(cost => {
                
                if (result == 0) return
                
                let max = Math.floor(Math.log(((this.data[cost.id].count * (factor - 1)) / cost.count) + 1) / Math.log(factor))
                if (max < result) { result = max }
            })
            
            return result
        },
    },
    methods: {
        ...mapMutations([
            'setActivePane',
        ]),
        ...mapActions([
            'convert',
        ]),
        getEmcId(id) {
            return `emc${id[0].toUpperCase()}${id.slice(1)}`
        },
        isEmcResource(data, emcId) {
            return !!data[emcId]
        },
    },
}
</script>