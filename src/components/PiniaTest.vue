<script setup lang="ts">
const favorites = useFavoritesPiniaStore()
</script>
<template>
    <div v-if="favorites.getSize >= 0"> Pinia standard sintax works </div>
    <div v-else> PINIA STANDARD SINTAX ITS NOT WORKING </div>
</template>