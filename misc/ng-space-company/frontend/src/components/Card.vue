<template>
    <div role="article">
        <div class="card card-body">
            <div class="row g-2">
                <div v-if="id" class="col-12">
                    <span class="h6 text-light">{{ $t(id) }}</span>
                </div>
                <div v-for="desc in descs" :key="desc" class="col-12 small">
                    <span class="text-normal">{{ $t(desc) }}</span>
                </div>
                <slot />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: [ 'id', 'descs', 'checked' ],
}
</script>