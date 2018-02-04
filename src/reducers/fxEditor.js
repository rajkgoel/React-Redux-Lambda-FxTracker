import { SELECT_CURRENCY } from "../constants/Const";

const initialState = {
    addingRatesErrored: false,
    addingRatesSuccess: false,
    addingRates: false,
    selectedCurrency: ''
  }

export function editorApp(state=initialState, action){
    return {
        addingRatesErrored: addingRatesErrored(state.addingRatesErrored, action),
        addingRatesSuccess: addingRatesSuccess(state.addingRatesSuccess, action),
        addingRates: addingRates(state.addingRates, action),
        selectedCurrency : selectCurrency(state.selectedCurrency, action)
    }
}

function selectCurrency(state='', action){
    switch (action.type) {
        case SELECT_CURRENCY:
            console.log("fxEditor.reducer", action.selectedCurrency);
            return action.selectedCurrency;
        default:
            return state;
    }
}

function addingRatesErrored(state=false, action) {
    //console.log('Inside reducer->addingRatesErrored', state, action);
    switch (action.type) {
        case 'ADDING_RATES_ERRORED':
            return action.addingRatesErrored;
        default:
            return state;
    }
}

function addingRatesSuccess(state=false, action) {
    //console.log('Inside reducer->addingRatesSuccess', state, action);
    switch (action.type) {
        case 'ADDING_RATES_SUCCESS':
            return action.addingRatesSuccess;
        default:
            return state;
    }
}

function addingRates(state=false, action) {
    console.log('Inside reducer->addingRates', state, action);
    switch (action.type) {
        case 'ADDING_RATES':
            return action.addingRates;
        default:
            return state;
    }
}
