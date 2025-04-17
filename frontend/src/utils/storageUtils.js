const saveToStorage = (key, value) => {
    try {
        localStorage.setItem(key, value)
    } catch (error) {
        console.error('Error saving to storage', error)
    }
}

const removeFromStorage = key => {
    try {
        localStorage.removeItem(key)
    } catch (error) {
        console.error('Error removing from storage', error)
    }
}

const getFromStorage = (key, defaultValue) => {
    try {
        const value = localStorage.getItem(key)
        return value ? value : defaultValue
    } catch (error) {
        console.error('Error getting from storage', error)
        return defaultValue
    }
}

// For tokens
export const saveTokensToStorage = (accessToken) => saveToStorage('accessToken', accessToken)
export const clearTokensFromStorage = () => removeFromStorage('accessToken')
export const getTokensFromStorage = () => getFromStorage('accessToken', null)