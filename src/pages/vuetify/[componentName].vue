<script setup lang="ts">
import LoadingComponent from "~/components/LoadingComponent.vue"
import ErrorComponent from "~/components/ErrorComponent.vue"

const { t } = useI18n()

const props = defineProps<{
  componentName: string
}>()

const comp = shallowRef()

comp.value = defineAsyncComponent({
  // the loader function
  loader: () => import(`../../components/vuetifyComponentes/${props.componentName}.vue`),

  // A component to use while the async component is loading
  loadingComponent: LoadingComponent,
  // Delay before showing the loading component. Default: 200ms.
  delay: 200,

  // A component to use if the load fails
  errorComponent: ErrorComponent,
  // The error component will be displayed if a timeout is
  // provided and exceeded. Default: Infinity.
  timeout: 3000,
  suspensible: false,
  onError(error, retry, fail, attempts) {
    if (error.message.match(/fetch/) && attempts <= 3) {
      retry();
    } else {
      fail();
    }
  }

})

onBeforeUpdate(() => {
  comp.value = defineAsyncComponent(() => import(`../../components/vuetifyComponentes/${props.componentName}.vue`))
})
</script>

<template>
  <article aria-labelledby="article-title" v-if="props.componentName">
    <h3> {{ t('components.source', { name: `src/components/vuetifyComponentes/${props.componentName}.vue` }) }} </h3>
    <component :is="comp"></component>
  </article>
</template>
<route lang="yaml">
meta:
    layout: vuetifyPlayground
</route>