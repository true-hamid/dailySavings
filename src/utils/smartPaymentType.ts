
export const getPaymentTypeSuggesstion = (payedTo: string) => {
    // switch (payedTo) {
    // let suggesstion = GROCERIES_STANDARD.find((item: string) => payedTo.includes(` ${item}`))
    if (payedTo.toLowerCase().includes(returnArrayValue(GROCERIES_STANDARD)) ) {
        return 0;
    }
    // else if()
    // case :
    // case :
    //     autoSetPaymentType(0)
}

export const returnArrayValue = (array: any) => {
    return array.map((value: string) => value)
}

export const GROCERIES_STANDARD = ['mart', 'supermarket', 'supmkt'];
export const ENTERTAINMENT_STANDARD = ['Netflix.com', 'GOOGLE', ];