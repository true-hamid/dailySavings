import AsyncStorage from '@react-native-async-storage/async-storage';


export const saveToStorageValue = async (key: any, value: any) => {
    try {
        return await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
    }
};

export const getFromStorage = async (key: any) => {
    return await AsyncStorage.getItem(key).then(result => {
        if (result) {
            try {
                result = JSON.parse(result);
            } catch (e) {
            }
        }
        return result;
    });
};

export const removeFromStorage = async (key: any) => {
    return await AsyncStorage.removeItem(key);
};

export const getAllKeys = async () => {
    let keys = []
    try {
      keys = await AsyncStorage.getAllKeys()
      console.warn(keys);
    } catch(e) {
      // read key error
    }
  }