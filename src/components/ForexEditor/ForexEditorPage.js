import React from 'react';
import { Link } from 'react-router-dom'
/*
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
*/

class ForexEditor extends React.Component {
    constructor(props) {
        super(props);
        this.handleAddRateClick = this.handleAddRateClick.bind(this);
    }

    componentDidMount() {
        //console.log('Inside ForexEditor.componentDidMount');
        this.props.fetchRates();
        //console.log("Populated ForexSelect:" + this.props.forexs); //this.props.forexs);
    }

    handleAddRateClick = (event) => {
        event.preventDefault();
        console.log("Inside handleAddRateClick", event)
        let currencies = String(event.target.fxCurrency.value).split("-");
        this.props.addRate(currencies[0], currencies[1], event.target.rate.value, event.target.dateTime.value);
    }

    handleFxCurrencyChange = (event, index, value) => {
        console.log(value);
        this.props.selectCurrency(value); 
    }

    state = {
        value: 1,
      };
      handleChange = (event, index, value) => this.setState({value});
    
    setPageHeader() {
        this.props.setPageHeader('Forex Editor');
    }

    render() {
        this.setPageHeader();
        if (this.props.isErrored) {
            //console.log('Inside FxComponents.render.hasErrored');
            return <p>Sorry! There was an error loading the items</p>;
        }

        if (this.props.isLoading || this.props.forexs === undefined || 
            this.props.forexs.length === 0) {
            //console.log('Inside FxComponents.isLoading');
            return <p>Loading Rates…please wait for a moment.....</p>; 
        }

        console.log('Inside ForexEditor.render', this.props.forexs);
        const forexs = this.props.forexs.rates;
      
        const fxCurrencies = forexs.map((curr) => 
                                <option value={curr.fxCurrency} key={curr.fxCurrency}>
                                    {curr.fxCurrency}
                                </option>);
        //console.log('Inside ForexEditor.render()', this.props);
        if (this.props.addingRatesErrored)
        {
            //console.log('Inside ForexEditor.addingRatesErrored');
            return <p>Sorry! There was an error adding the rates, please try later</p>;
        }

        if (this.props.addingRates) {
            //console.log('Inside ForexEditor.addingRates');
            return <p>Adding Rates to DB, please wait.....</p>; 
        }

        if (this.props.addingRatesSuccess) {
            console.log('Inside ForexEditor.addingRatesSuccess');
            return( 
            <div>Rates were added successfully.....
                <p><Link to={`/forexs`}>Return to Forex view</Link></p>
                <p><Link to={'./editor'}>Return to Editor</Link></p>
            </div>); 
        }
        
        return(
            <div class="w3-card-4">
                <form name="form" class="w3-container" onSubmit={this.handleAddRateClick}>
                    <p>
                    <label class="w3-text-teal">Currency-pair</label>
                    <select name="fxCurrency" value={this.props.selectedCurrency} 
                            onChange={this.handleFxCurrencyChange} 
                            class="w3-select w3-border w3-round w3-light-grey">
                        {fxCurrencies}
                    </select>
                    </p> 
                    
                    <p>
                    <label class="w3-text-teal">Rate</label>
                    <input required class="w3-input w3-border w3-round w3-light-grey" 
                        name="rate" id="rate" type="text" />
                    </p>
                    <p>
                    <label class="w3-text-teal">Date</label>
                    <input class="w3-input w3-border w3-round w3-light-grey" 
                        container="inline" mode="landscape" type="date"
                        required name="dateTime" />
                    </p>

                    <p>
                    <button onSubmit={this.handleAddRateClick} 
                            class="w3-button w3-green w3-round w3-block">
                        Add Rate
                    </button>
                    </p>
                </form>
            </div>
        );
    }
}

export default ForexEditor;