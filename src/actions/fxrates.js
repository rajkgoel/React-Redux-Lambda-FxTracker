import axios from 'axios';

import { FX_RATES_URL, RATES_HAS_ERRORED, RATES_IS_LOADING, 
            RATES_FETCH_DATA_SUCCESS, FILTER_RATES } from "../constants/Const";

export function ratesHasErrored(bool) {
    return { type: RATES_HAS_ERRORED, hasErrored: true };
}

export function ratesIsLoading(bool) {
    return { type: RATES_IS_LOADING, isLoading: bool };
}

export function ratesFetchDataSuccess(rates) {
    return { type: RATES_FETCH_DATA_SUCCESS, rates };
}

export function filterRates(fxCurrency) {
    return { type: FILTER_RATES, filterOnCurrency: fxCurrency }
}

export function ratesFetchData() {
    return (dispatch) => {
        dispatch(ratesIsLoading(true));
        console.log(FX_RATES_URL);
        /*
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": FX_RATES_URL,
            "method": "GET",
            "headers": {
              "content-type": "application/json",
              "x-amz-date": "20180121T214914Z",
              "authorization": "AWS4-HMAC-SHA256 Credential=AKIAIB6XVGKZPTAFYHOA/20180121/us-east-1/execute-api/aws4_request, SignedHeaders=content-type;host;x-amz-date, Signature=205bd85d06b58268e6b72e0501522554f062158ffd3e3df106b78df991a767cc"
            }
          }*/

        axios.get(FX_RATES_URL)
            .then((response) => {
                if (response.statusText !== "OK") {
                    throw Error(response.statusText);
                }
                dispatch(ratesIsLoading(false));
                var fxRates = LoadFxRates(response);
                return fxRates;
            })
            .then((fxrates) => dispatch(ratesFetchDataSuccess(fxrates)))
            .catch((error) => {
                console.log(error);
                dispatch(ratesIsLoading(false));
                dispatch(ratesHasErrored(true));
            });
    };
}

class FxRates{
    fxCurrency = '';
    fxRates = [];
}

/*class FxRate {
    rate;
    timePeriod;
}*/

function LoadFxRates(dataRows) {
    //console.log(dataRows);
    var fxrates = [];
    for (var index = 0; index < dataRows.data.length; index++) {
        var data = dataRows.data[index];
        let curr = data.Currency1 + "-" + data.Currency2;
        let fx = fxrates.find(f => f.fxCurrency === curr);
        if (fx !== null && fx !== undefined) {
            fx.fxRates.push( { rate: data.Rate, timePeriod: new Date(data.TimeStamp) });
        }
        else {
            let rate = new FxRates();
            rate.fxCurrency = curr;
            rate.fxRates.push({ rate: data.Rate, timePeriod: new Date(data.TimeStamp) });
            fxrates.push(rate);
        }
    }
    return fxrates;
}