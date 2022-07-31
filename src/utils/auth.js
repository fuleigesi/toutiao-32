import storage from './storage'
const TOKEN = 'HEIMA-TOUTIAO-TOKEN'
export const getItem = () => storage.get(TOKEN)
export const setItem = (value) => storage.set(TOKEN, value)
export const removeItem = () => storage.remove(TOKEN)
