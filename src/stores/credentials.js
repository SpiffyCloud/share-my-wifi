import { defineStore } from "pinia"
import { ref, computed } from 'vue'
import { Preferences } from '@capacitor/preferences';


export const useCredentialsStore = defineStore(
  'credentials', () => {
    const credentials = ref(null)
    const showForm = ref(null)

    async function loadCredentials(time) {
      const { value } = await Preferences.get({ key: 'credentials' })
      if (value) {
        credentials.value = JSON.parse(value)
      } else {
        credentials.value = { name: '', password: '', saved: false }
        showForm.value = true
      }
      console.log('loaded credentials', time);
    }

    function saveCredentials() {
      credentials.value.saved = true
      Preferences.set({ key: 'credentials', value: JSON.stringify(credentials.value) })
    }

    function deleteCredentials() {
      Preferences.remove({ key: 'credentials' })
    }

    function hideForm() {
      saveCredentials();
      showForm.value = false
    }

    function resetStatus() {
      deleteCredentials()
      credentials.value = { name: '', password: '', saved: false }
      showForm.value = true
    }

    function isValidSSID(input) {
      return /^[^!#;+\]/"\t][^+\]/"\t]{1,31}$/.test(input)
    }

    function isValidPassword(input) {
      return input >= 4
    }

    const noCredentials = computed(() => {
      return !credentials.value.saved
    })

    const invalidCredentials = computed(() => {
      // TODO: error messages
      return !(isValidSSID(credentials.value.name) && isValidPassword(credentials.value.password.length))
    })

    const qr = computed(() => {
      const { name, password } = credentials.value
      return `WIFI:T:WPA;S:${name};P:${password};;`
    })

    const title = computed(() => {
      return !noCredentials ? '' : credentials.value.name
    })

    const instructions = computed(() => {
      if (showForm) {
        return `${noCredentials ? 'Add' : 'Update'} your wifi credentials ${noCredentials ? 'for easy sharing' : ''}`
      } else {
        return 'Share your wifi with others by having them scan this QR code'
      }
    })

    loadCredentials(1)

    return {
      credentials,
      showForm,
      noCredentials,
      invalidCredentials,
      qr,
      title,
      instructions,
      loadCredentials,
      saveCredentials,
      deleteCredentials,
      hideForm,
      resetStatus,
      isValidSSID,
      isValidPassword,
    }
})

