//import React from 'react';
import ForexEditor from "./ForexEditorPage";
import { connect } from 'react-redux';
import { ratesFetchData } from '../../actions/fxrates';
import { ratesAddRate, selectCurrency } from '../../actions/fxEditor';

const mapStateToProps = (state) => {
    //console.log('Inside ForexEditor.mapStateToProps', state.rates);
    return {
        forexs: state.forexApp.rates,
        isErrored: state.forexApp.ratesHasErrored,
        isLoading: state.forexApp.ratesIsLoading,
        //selectedFxCurrency: state.forexApp.filterRates,

        addingRatesErrored: state.editorApp.addingRatesErrored,
        addingRatesSuccess: state.editorApp.addingRatesSuccess,
        addingRates: state.editorApp.addingRates,
        selectedCurrency: state.editorApp.selectedCurrency
    };
};

const mapDispatchToProps = (dispatch) => {
    //console.log('Inside ForexEditor.mapDispatchToProps');
    return {
        fetchRates: () => dispatch(ratesFetchData()),
        addRate: (currency1, currency2, rate, dateTime) => 
                dispatch(ratesAddRate(currency1, currency2, rate, dateTime)),
        selectCurrency: (selectedCurrency) => 
                dispatch(selectCurrency(selectedCurrency))
    };
};

const ForexEditorContainer = connect(mapStateToProps, mapDispatchToProps)(ForexEditor);

export default ForexEditorContainer;