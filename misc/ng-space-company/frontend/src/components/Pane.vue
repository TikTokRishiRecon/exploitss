<template>
    <div class="tab-pane" :class="{ 'active':$root.activePane == id }">
        <div class="row row-cols-1 gy-3">
            <div class="col">
                <div class="row gx-2 gy-1 align-items-center">
                    <div class="col-auto d-flex align-items-center">
                        <img :src="require(`../assets/interface/${icon}`)" width="19" height="19" :alt="icon + ' icon'" />
                    </div>
                    <div class="col">
                        <h5 class="text-light mb-0" role="heading">{{ $t(id) }}</h5>
                    </div>
                    <div v-if="displayPinnedItems == true && pinnable" class="col-auto">
                        <button class="btn" @click="togglePinned({id:id, icon:icon, resId:pinnable, buildingStorageId:shortcutBuildingStorageId })">
                            <i class="fas fa-fw fa-thumbtack" :class="{ 'text-normal':!isPinned(id) }"></i>
                        </button>
                    </div>
                    <div v-for="desc in descs" :key="desc" class="col-12 small"><span class="text-normal">{{ $t(desc) }}</span></div>
                </div>
            </div>
            <div class="col">
                <div class="row g-2">
                    <slot></slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex'

export default {
    props: [ 'id', 'icon', 'descs', 'pinnable', 'shortcutBuildingStorageId' ],
    computed: {
        ...mapState([
            'displayPinnedItems',
        ]),
        ...mapGetters([
            'isPinned',
        ]),
    },
    methods: {
        ...mapMutations([
            'togglePinned',
        ]),
    },
}
</script>