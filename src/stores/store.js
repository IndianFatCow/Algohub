import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core'; // 可选：持久化存储

export const useAuthStore = defineStore('auth', {
    state: () => ({
        username: '',
        password: ''
    }),
    actions: {
        setCredentials({ username, password }) {
            this.username = username;
            this.password = password;
            // console.log("store.js:",this.username,this.password)
        },
        clearCredentials() {
            this.username = ''
            this.password = ''
            // console.log("clear.js:",this.username,this.password)
        },
        getAuthHeader() {
            if (this.username && this.password) {
                return 'Basic ' + btoa(`${this.username}:${this.password}`)
            }
            return ''
        }
    },
    persist: true // 启用持久化存储
})
