import * as SecureStore from 'expo-secure-store';


export default function useCookieManager(){
    async function saveCookie(name: string, value: string) {
        await SecureStore.setItemAsync(name, value);
    }

    async function getCookie(name:string) {
        const cookie = await SecureStore.getItemAsync(name);
        console.log("Cookie armazenado:", cookie);
        return cookie;
    }

    async function deleteCookie(name:string) {
        const cookie = await SecureStore.deleteItemAsync(name);
        console.log("Cookie deletado:", cookie);
        return true;
    }

    return {saveCookie, getCookie, deleteCookie}
}

