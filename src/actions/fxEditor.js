import axios from 'axios';

import { FX_RATES_URL, ADDING_RATES, ADDING_RATES_ERRORED, 
        ADDING_RATES_SUCCESS, APPEND_RATE_TO_EXISTING_RATES,
        SELECT_CURRENCY } from "../constants/Const";


export function ratesAddRate(currency1, currency2, rate, dateTime) {
    return (dispatch) => {
        dispatch(addingRates(true));

        /*
        let settings = {
            "async": true,
            "crossDomain": true,
            "url": FX_RATES_URL,
            "method": "PUT",
            "headers": {
              "content-type": "application/json",
              "x-amz-date": "20180124T033027Z",
              "authorization": "AWS4-HMAC-SHA256 Credential=AKIAIB6XVGKZPTAFYHOA/20180124/us-east-1/execute-api/aws4_request, SignedHeaders=content-length;content-type;host;x-amz-date, Signature=183e6a79306523924b19dbb6a15fb523b6a8679943c661fc76b73d28f8a126f0",
            },
          }*/

          console.log("Action Adding Rates - ", currency1, currency2, rate, dateTime);
        axios.put(FX_RATES_URL, 
                    { currency1: currency1, currency2: currency2, rate: rate, timeStamp: dateTime })
            .then((response) => {
                dispatch(addingRates(false));
                if(response.statusText !== "OK") {
                    throw Error(response.statusText);
                }
            })
            .then(() => dispatch(addingRatesSuccess(true)))
            .then(() => dispatch(appendRateToExistingRates(currency1, currency2, rate, dateTime)))
            .catch(() => 
                {
                    dispatch(addingRates(false));
                    dispatch(addingRatesSuccess(false));
                    dispatch(addingRatesErrored(true));
                });
    }
}

export function addingRates(bool) {
    return { type: ADDING_RATES, addingRates: bool };
}

export function addingRatesSuccess(bool) {
    return { type: ADDING_RATES_SUCCESS, addingRatesSuccess: bool };
}

export function appendRateToExistingRates(currency1, currency2, rate, dateTime){
    const fxCurrecy = currency1 + '-' + currency2;
    return { type: APPEND_RATE_TO_EXISTING_RATES, fxCurrency: fxCurrecy, rate: rate, dateTime: dateTime };
}

export function addingRatesErrored(bool) {
    return { type: ADDING_RATES_ERRORED, addingRatesErrored: bool };
}

export function selectCurrency(str) {
    console.log('fxEditor.action', str);
    return { type: SELECT_CURRENCY, selectedCurrency: str };
}
