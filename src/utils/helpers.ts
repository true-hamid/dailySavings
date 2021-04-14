import { getFromStorage, saveToStorageValue } from "../packages/AsyncStorage";
import { Storage, Arrays } from "../constants";

export const formatToMoney = (amount: any) => {
    let decimalCount = 2;
    try {
        decimalCount = Math.abs(2);
        decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

        const negativeSign = amount < 0 ? "-" : "";

        let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
        let j = (i.length > 3) ? i.length % 3 : 0;

        return negativeSign + (j ? i.substr(0, j) + ',' : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + ',') + (decimalCount ? '.' + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
    } catch (e) {
        console.log(e)
    }
}

export const getRawDate = () => (new Date())
// export const getRawDate = () => (new Date('2021-01-01T00:00:00-00:00'))
// export const getRawDate = () => (new Date('2021-02-02T00:00:00-00:00'))

export const getTransactionDateAndTime = (date: string) => (
    `${Arrays.WEEK_DAYS[new Date(date).getDay()]}, ${new Date(date).getDate()}, ${new Date(date).getHours()}:${new Date(date).getMinutes()}:${new Date(date).getSeconds()}`
);

export const savePaymentToStorage = async (amount: any, payedTo: any, callBack: any) => {
    const data = {
        amount,
        payedTo,
        timeStamp: getRawDate()
    };
    const monthPayments = await getFromStorage(Storage.CURRENT_MONTH_PAYMENT);
    if(monthPayments){
        saveToStorageValue(Storage.CURRENT_MONTH_PAYMENT, [...monthPayments, data]);
    }else {
        saveToStorageValue(Storage.CURRENT_MONTH_PAYMENT, [data]);
    }
    callBack();
}

