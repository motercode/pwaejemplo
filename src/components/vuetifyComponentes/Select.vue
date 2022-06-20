<script setup lang="ts">
 const vuetifyaselect = ref({ state: 'Florida', abbr: 'FL', name: 'floridaname' })
 const aselect = ref( { state: 'Georgia', abbr: 'GA', name: 'georgianame' })
  
 

 const items = [
   { state: 'Florida', abbr: 'FL', name: 'floridaname' },
   { state: 'Georgia', abbr: 'GA', name: 'georgianame' },
   { state: 'Nebraska', abbr: 'NE', name: 'nebraskaname' },
   { state: 'California', abbr: 'CA', name: 'caliname' },
   { state: 'New York', abbr: 'NY', name: 'nyname' },
 ]
 


const cambio =  (newValue) => {
  const result = (items.find((element)=> element.abbr==newValue)) 
    aselect.value = result
  }

</script>
<template>
  <v-select
    id="selectcomponentuniqueid"
    v-model="vuetifyaselect" 
    :items="items"
    item-title="state" 
    item-value="abbr" 
    :hint="`${vuetifyaselect.state}, ${vuetifyaselect.abbr}`" 
    title="name" 
    label="select component unique id" 
    persistent-hint 
    return-object
    single-line 
    aria-label="select component unique id"
  >
  </v-select>
  <div>vuetify value {{vuetifyaselect}}</div>
  
  
  <e-v-select 
    id="Eselectcomponentuniqueid"
    v-model = "aselect"
    :items="items"
    item-title="state" 
    item-value="abbr"
    :modelValue="aselect"
    @update:modelValue="cambio"
    keyname="name"
  >
  </e-v-select>
  <div>outside aselect value {{aselect}}</div>

</template>