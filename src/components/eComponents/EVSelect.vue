<script setup lang="ts">

const props = defineProps(['id' ,'modelValue' ,'items', 'itemValue' , 'itemText'])
defineEmits(['update:modelValue'])

const items =props.items
const value=props.itemValue
const text = props.itemText
const isDefault = (option)=>{
  const defaultValue = toRaw(props.modelValue)
  const sameValue =(defaultValue[value] === option[value])
  const sameText =(defaultValue[text] === option[text])

return (sameValue&&sameText)
}
</script>

<template>
<select 
:id="props.id"
:v-model="modelValue" 
@change="$emit('update:modelValue', $event.target.value)"
>
  <option v-for="option in items" :selected="isDefault(option)" :value="option[value]" >
    {{ option[text] }}
  </option>
</select>
<input type="text" id="mia" />
</template>

