export const setLocalStorage = (key: string, value: any) => {
      try {
            const jsonValue = JSON.stringify(value);
            localStorage.setItem(key, jsonValue)
      } catch (err) {
            console.error("error", err)
      }
}

export const getLocalStorage = (key: string) => {
      try {
            const value = localStorage.getItem(key)
            if (value) {
                  return JSON.parse(value)
            }
            return null
      } catch (err) {
            console.error("error", err)

      }
} 