import React from 'react';
import { Link } from 'react-router-dom'
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

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

    render() {
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
                                <MenuItem 
                                    value={curr.fxCurrency} 
                                    key={curr.fxCurrency}
                                    primaryText={curr.fxCurrency}/>
                                );
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
            <div>
                <p>Forex Editor</p>
                <form name="form" onSubmit={this.handleAddRateClick}>
                
                    <SelectField name="fxCurrency" value={this.props.selectedCurrency} 
                            floatingLabelText = "Select Fx Currency"
                            onChange={this.handleFxCurrencyChange}>
                        {fxCurrencies}
                    </SelectField>
                    
                    <br/>
                    <TextField hintText="Rate is required" className="form-control" 
                        required name="rate" />
                    <br />
                    
                    <DatePicker hintText="Forex Date" 
                        className="form-control"
                        container="inline" mode="landscape" 
                        required name="dateTime" />
                    
                    <RaisedButton onSubmit={this.handleAddRateClick} primary={true}>
                        Add Rate
                    </RaisedButton>
                </form>
                <p><Link to={`/forexs`}>Return to Forex view</Link></p>
            </div>
        );
    }
}

export default ForexEditor;