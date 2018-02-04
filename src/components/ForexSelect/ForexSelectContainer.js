import { connect } from 'react-redux';
import ForexSelect from "./FxComponents";
import { ratesFetchData, filterRates } from '../../actions/fxrates';

const mapStateToProps = (state) => {
    console.log('Inside FxComponents.mapStateToProps', state);
    return {
        forexs: state.forexApp.rates,
        isErrored: state.forexApp.ratesHasErrored,
        isLoading: state.forexApp.ratesIsLoading,
        selectedFxCurrency: state.forexApp.filterRates
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url) => dispatch(ratesFetchData(url)),
        filterData: (fxCurrency) => dispatch(filterRates(fxCurrency))
    };
};

const ForexSelectContainer = connect(
    mapStateToProps, mapDispatchToProps)(ForexSelect);

export default ForexSelectContainer;

