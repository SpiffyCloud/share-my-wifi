import { defineStore } from "pinia"
import { ref, computed } from 'vue'
import { Preferences } from '@capacitor/preferences';

export const useCredentialsStore = defineStore(
  'credentials', () => {
    const state = ref('add')  // add, edit, share
    const credentialsList = ref([])
    const currentCredentials = ref(null)

    async function loadCredentialsList() {
      const { value } = await Preferences.get({
        key: 'credentials-list'
      })
      credentialsList.value = JSON.parse(value)
      if (credentialsList.value.length !== 0) {
        currentCredentials.value = credentialsList.value[0]
        state.value = 'share'
      } else {
        // state remains add
        // show form
        setEmptyCurrentCredentials()
      }
    }

    function setEmptyCurrentCredentials() {
      currentCredentials.value = {
        title: '',
        password: '',
        isSaved: false
      }
    }

    function uploadCredentialsList() {
      Preferences.set({
        key: 'credentials-list',
        value: JSON.stringify(credentialsList.value)
      })
    }

    function saveCurrentCredentials() {
      currentCredentials.value.isSaved = true
      credentialsList.value.push(currentCredentials.value)
      uploadCredentialsList()
    }

    function updateCurrentCredentials(index) {
      credentialsList.value[index] = currentCredentials.value
      uploadCredentialsList()
    }

    function deleteCurrentCredentials() {
      console.log(credentialsList.value);
      credentialsList.value = credentialsList.value.filter(credentials => {
        return credentials !== currentCredentials.value
      })
      uploadCredentialsList()
      setEmptyCurrentCredentials()
    }

    const qr = computed(() => {
      const { title, password } = currentCredentials.value
      return `WIFI:T:WPA;S:${title};P:${password};;`
    })

    loadCredentialsList()

    return {
      state,
      credentialsList,
      currentCredentials,
      qr,
      saveCurrentCredentials,
      updateCurrentCredentials,
      deleteCurrentCredentials,
      setEmptyCurrentCredentials
    }
  }
)