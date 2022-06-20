import { acceptHMRUpdate, defineStore } from 'pinia'

export const useFavoritesPiniaStore = defineStore('favorites', 
{
    state: () => {
        return {
        // se almacenan en forma de mapa para asi evitar duplicados
          favs: new Map(),
        // almacena el ultimo seleccionado  
          activeFav: '',
        }
      },
    actions:{
        // crear un nuevo favorito
        setNewFav(user :any) {
            this.favs.set(user.favName, user)
        },
        // eliminar un favorito si existe
        removeFav(user :any) {
          if(this.esUnFavorito(user.favName)) 
            this.favs.delete(user.favName)
        },
        //  activar un favorito , meter su key en la propiedad activefav
        setActiveFavorite(user: string) {
            this.activeFav = user
        },
        // recuperar los datos de un favorto si existe
        getFavorite(userLogin: string) {
            if (this.esUnFavorito(userLogin))
              return this.favs.get(userLogin)
        },
        createFromStorages(storagedFavs: string) {
            const data = JSON.parse(storagedFavs)
            data.map((favorito: any) => this.setNewFav(favorito[1]))
        },
        getStorageData() {
            return JSON.stringify(Array.from(this.favs))
        },
        esUnFavorito (favkey: string) {
            return (this.favs.has(favkey))
        }
    },
    getters: {
        getSize: (state) => {
            return state.favs.size
        },
        areFavs: (state) => {
            return (state.favs.size > 0)
        },
        isFav: (state) =>{
            return (username : string)  =>  state.favs.has(username)
        },
    }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useFavoritesPiniaStore, import.meta.hot))
