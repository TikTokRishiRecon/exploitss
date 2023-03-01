<template>
    <div v-if="unlocked" class="col" :class="{ 'pinned-simplebar-item': pinned }">
        <div class="row g-1 align-items-center">
            <div v-if="pinnable" class="col-auto mb-1">
                <button @click="pinned = !pinned" class="btn btn-small" :class="{ 'text-muted': !pinned }"><i class="fa fa-fw fa-thumbtack"></i></button>
            </div>
            <div class="col">
                <button class="sidenav-group" :class="{ 'collapsed':isCollapsed(id) }" data-bs-toggle="collapse" :data-bs-target="'#collapse' + id" :aria-expanded="!isCollapsed(id)" :aria-controls="'collapse' + id" @click="toggleCollapsed(id)">
                    {{ $t(id) }}
                </button>
            </div>
        </div>
        <div :id="'collapse' + id" class="collapse row gy-0 row-cols-1" :class="{ 'show':!isCollapsed(id) }">
            <slot></slot>
        </div>
    </div>
</template>

<style>
    .sidenav-group {
        color: #8c949a; font-size: .75rem; text-transform: uppercase;
        width: 100%; padding: 0 0 .25rem;
        background: transparent; border: 0;
        cursor: pointer;
        display: flex; justify-content: space-between;
    }

    .sidenav-group:hover {
        color: #f5f5f5;
    }

    .sidenav-group::after {
        font-weight: 900; font-family: "Font Awesome 5 Free";
        width: 1.25em;
        content: "\f104";
        transition: transform .25s ease-out;
    }

    .sidenav-group:not(.collapsed)::after {
        transform: rotate(-90deg);
    }

    .pinned-simplebar-item {
        position: sticky;
        top: 0;
        background-color: #232a35;
        padding-bottom: .25rem;
        padding-top: .75rem;
        margin-top: 0;
        border-bottom: 1px solid rgba(255,255,255,0.1);
        z-index: 100;
    }
</style>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
    props: [ 'id', 'unlocked', 'pinnable'],
    data: () => {
        return { 'pinned': false }
    },
    computed: {
        ...mapGetters([
            'isCollapsed'
        ]),
    },
    methods: {
        ...mapMutations([
            'toggleCollapsed',
        ]),
    },
}
</script>