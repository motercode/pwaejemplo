<script setup lang="ts">
const favorites = useFavoritesPiniaStore()

//formulario
const valid = ref(true)
const firstname = ref('')
//podemos enlazar directamente los favoritos con una variable reactiva 
const favli = ref()

const thestoreddata = localStorage.getItem('favorites')
if (thestoreddata) {
  const datos = JSON.parse(thestoreddata)
  datos.map(([, favorito]: any) => {
    favorites.setNewFav(favorito)
  })


}

onMounted(() => {
  favli.value = favorites.favs

})

watch(favorites.favs, () => {
  localStorage.setItem('favorites', favorites.getStorageData())
})

// // para busca el REST la url como referencia y el refetch permiten que se ejecute el fecth en cada cambio del valor
const url = ref()
const { data,
  isFetching,
  statusCode,
} = useFetch(url, { refetch: true })

// la funcion que dispara el cambio de valor de la url
// const URLAPI = 'https://api.github.com/users/'
const URLAPI = 'http://localhost:8080/ghuserDirecto?user='
const getUser = () => {
  url.value = URLAPI + firstname.value
}

// // ponemos un watch sobre data que es lo que devuelve el fetch y cuando llega el cambo lo reflejamos reactivamente
const username = ref()
const usernotfound = ref()
watch(data, () => {
  try {
    let userData = JSON.parse(data.value)
    if (userData.login) {
      username.value = userData
      usernotfound.value = false
    } else {
      throw new Error
    }
  } catch (errord: any) {
    if (statusCode.value != 200) usernotfound.value = true
  }
})

//podemos hacer un hook para todas las acciones si nuestro objeto es distinto por ejemplo
favorites.$onAction(() => {
  if (!username.value.favName) username.value.favName = username.value.login
})

//funcionalidades de pinia 
const addNewFav = () => {
  favorites.setNewFav(username.value)
}
const removeFav = (fav = username.value) => {
  favorites.removeFav(fav)
}
</script>
<template>
  <v-form v-model="valid" @submit.prevent="getUser">
    <v-container>
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field keydown="getUser()" v-on:keyup.enter="getUser()" v-model="firstname" :counter="10"
            label="github username" required></v-text-field>
        </v-col>
      </v-row>
    </v-container>
    <v-btn :disabled="!valid" color="success" class="mr-4" @click="getUser()">
      get user data from github
    </v-btn>
    <template v-if="usernotfound">
      <V-Alert type="warning">user not found</V-Alert>
    </template>
    <template v-else>
      <p v-if="isFetching"> buscando </p>
      <p v-if="username"> {{ username.login }}</p>
    </template>
  </v-form>
  <div v-if="username">
  <v-img
  :src="`${username.avatar_url}`"
  max-height="150"
  max-width="250"
  lazy-src="https://www.insuit.net/wp-content/uploads/2020/02/logo-inSuit.svg"
></v-img>
    <a btn v-if="!favorites.isFav(username.login)" @click="addNewFav()"> ADD </a>
    <a btn v-else @click="removeFav()"> REMOVE </a>
  </div>
  <template v-if="favorites.areFavs">
    <ul v-if="favorites.areFavs">
      are favs
      <li v-for="[, fav] in favli">
        <p> {{ fav.login }}</p> 
        <a btn @click="removeFav(fav)"> REMOVE </a>
      </li>
    </ul>
  </template>
</template>