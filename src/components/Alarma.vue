<script setup lang="ts">

const tiempo = ref()
const modo = ref()
const repeticiones = ref()

let numeroRepeticiones = parseInt(repeticiones.value)
let numeroTiempo = 1000 * parseInt(tiempo.value)

const vibraobject  = useVibrate({ pattern: [300, 100, 300] })
const modoVibraSupported = ref()
modoVibraSupported.value = vibraobject.isSupported

const setFlash = ref(false)
const toggleFlash = useToggle(setFlash)
let flashingObject: number | NodeJS.Timeout | undefined  = undefined
let timeoutFlash:  number | NodeJS.Timeout | undefined = undefined

const isvibrating = ref(false)
const isFlashing = ref(false)
const isFinished = ref(false)

let laAlarma = setInterval(() => { }, 1)
clearInterval(laAlarma)
let elTimeout = setTimeout(() => { }, 1)
clearTimeout(elTimeout)

const start = async() => {
    await stopAlarm()
    await removeEndOfAlarm()

    numeroRepeticiones = parseInt(repeticiones.value)
    numeroTiempo = 1000 * parseInt(tiempo.value)
    
    switch (modo.value) {
        case 'vibracion':
            vibrame()
            isvibrating.value = true
            laAlarma = setInterval(vibrame, numeroTiempo);
            elTimeout = setTimeout(stopAlarm, (numeroRepeticiones * numeroTiempo))
            break;
        case 'luces':
            isFlashing.value = true
            flasheame()
            laAlarma = setInterval(flasheame, numeroTiempo);
            setTimeout(stopAlarm, (numeroRepeticiones * numeroTiempo))
            break;
        case 'sonido':
           // pasar las alarmas a este api https://developer.mozilla.org/en-US/docs/Web/API/Notification    
            break;
    }
}
const stopAlarm =  () => {
    setEndOfAlarm()
    clearTimeout(elTimeout)
    clearInterval(laAlarma)

    clearInterval(flashingObject)
    clearTimeout(timeoutFlash)
    
    vibraobject.stop()
}
const vibrame = () => {
    vibraobject.vibrate()
}


const flasheame = async() => {
console.log("flasheame")
  flashingObject =await  setInterval(toggleFlash, 100);
  timeoutFlash = await setTimeout(()=>{clearInterval(flashingObject)}, 1000)
  setFlash.value=false
}

const repeat = () => {
    removeEndOfAlarm()
    start()
}
const reset = () => {
    removeEndOfAlarm()
    tiempo.value = 0
    modo.value = 'vibracion'
    repeticiones.value = 0
}

const setEndOfAlarm = () => {
    isvibrating.value = false
    isFlashing.value = false

    isFinished.value = true
}
const removeEndOfAlarm = () => {
    isFinished.value = false
}


</script>
<template>

    <form h-full text-center flex :class="{ bgRed: (isFinished || setFlash)}" name="selecciones" id="selecciones" method="post">
        <div ma >
            <div flex w-full row>
                <label col-sm for="tiempo"> tiempo entre alarmas en segundos </label>
                <input col-sm border type="text" name="tiempo" v-model="tiempo" />
            </div>
            <div flex>
                <label for="modo"> modo de la alarma (vibracion, sonido, luces) </label>
                <select border v-model="modo">
                    <option>vibracion</option>
                    <option>sonido</option>
                    <option>luces</option>
                </select>
            </div>
            <div flex row>
                <label col-sm for="repeticiones"> cantidad de repeticiones </label>
                <input col-sm border type="text" name="repeticiones" v-model="repeticiones" />
            </div>
        </div>


    </form>
    modo vibracion soportado ? {{ modoVibraSupported }} ?
    <div v-if="isvibrating">usando modo vibrando</div>
    <div v-if="isFlashing">usando modo luces</div>
    <div id="repeticiones"> {{ repeticiones }} repeticiones</div>
    <div id="tiempo"> {{ tiempo }} segundos entre alarmas</div>
    <div id="modo"> modo {{ modo }}</div>

    <button btn id='inibutton' @click="start()">start</button>
    <button btn id='stopbutton' @click="stopAlarm()">stop</button>
    <button btn id='backbutton' @click="repeat()">repeat</button>
    <button btn id='backbutton' @click="reset()">reset</button>
</template>
<style>
.bgRed {
    background-color: red;
}
</style>