import {SecureStore} from 'expo';

const TOKEN_KEY = 'id_token'

export const storeToken = async (token) => {
    await SecureStore.setItemAsync(TOKEN_KEY,token);
} 

export const getJWT = async () => {
    return await SecureStore.getItemAsync(TOKEN_KEY)
}

