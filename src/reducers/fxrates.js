const initialState = {
    ratesHasErrored: false,
    ratesIsLoading: false,
    filterRates: 'ALL',
    rates: []
  }

export function forexApp(state=initialState, action) {
    return {
        ratesHasErrored: ratesHasErrored(state.ratesHasErrored, action),
        ratesIsLoading: ratesIsLoading(state.ratesIsLoading, action),
        filterRates: filterRates(state.filterRates, action),
        rates: rates(state.rates, action)
    }
}

function ratesHasErrored(state=false, action) {
    //console.log('Inside reducer->ratesHasErrored', state, action);
    switch (action.type) {
        case 'RATES_HAS_ERRORED':
            return action.hasErrored;
        default:
            return state;
    }
}

function ratesIsLoading(state=false, action) {
    //console.log('Inside reducer->ratesIsLoading', state, action);
    switch (action.type) {
        case 'RATES_IS_LOADING':
            return action.isLoading;
        default:
            return state;
    }
}

function rates(state=[], action) {
    switch (action.type) {
        case 'RATES_FETCH_DATA_SUCCESS':
            return Object.assign({}, state, {
                rates: action.rates
            })

        case 'APPEND_RATE_TO_EXISTING_RATES':
            let newRates = state.rates;
            
            let fx = newRates.find(f => f.fxCurrency === action.fxCurrency);
            if (fx !== null && fx !== undefined) {
                fx.fxRates.push({ rate: action.rate, timePeriod: new Date(action.dateTime) })
            }
            return Object.assign({}, state, {
                rates: newRates
            }) 
        default:
            return state;
    }
}

function filterRates(state='ALL', action) {
    switch (action.type) {
        case 'FILTER_RATES':
            return action.filterOnCurrency;
        default:
            return state;
    }
}