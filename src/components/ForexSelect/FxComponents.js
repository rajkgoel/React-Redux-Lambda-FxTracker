import React from 'react';
import C3Chart from 'react-c3js';
import 'c3/c3.css';

class Forex extends React.Component{
    render(){
        const fxCurrency = this.props.fxCurrency; 
        const fxRates = this.props.fxRates; 
        //console.log(fxCurrency);
        //console.log(fxRates);
        
        const timePeriod = ['x'];
        const rates = [fxCurrency];

        fxRates.forEach((p) => { 
            timePeriod.push(p.timePeriod);
            rates.push(p.rate)
        });
        const data = { x: 'x', columns: [ timePeriod, rates ] };

        const axis = {
            y: {
                label: { // ADD
                  text: 'Spot Prices',
                  position: 'outer-middle'
                }
              },
            x: {
                type: 'timeseries',
                localtime: true,
                tick: {
                    format: '%Y-%m-%d'
                }
            }
        };

        return(
            <div key={fxCurrency}>
                <h3 className="w3-text-cyan">{fxCurrency} (Spot Rate - {fxRates[fxRates.length-1].rate})</h3>
                <C3Chart data={data} axis={axis}/>
            </div>
        );
    }
}

class Forexs extends React.Component {
    render() {
        const selectedFxCurrency = this.props.selectedFxCurrency;
        const forexs = this.props.forexs;
        const tracks = forexs
                            .filter((f) => f.fxCurrency===selectedFxCurrency.fxCurrency 
                                            || selectedFxCurrency.fxCurrency === 'ALL'
                                            || selectedFxCurrency.fxCurrency === undefined)
                            .map((fx) =>
                                <div key={fx.fxCurrency}>
                                    <Forex 
                                        fxCurrency={fx.fxCurrency} 
                                        fxRates={fx.fxRates} />
                                        
                                </div>
                        );
        return(
            <div>{tracks}</div>    
        );
    }
}

class ForexSelect extends React.Component {

    handleFxCurrencyChange = (e) => {
        this.props.filterData( {fxCurrency: e.target.value }); 
    }

    handleRefreshClick = (e) => {
        this.props.fetchData('http://localhost:52698/api/fx')
    }

    handleStopRefresh = (e) => {
        /* console.log(e);
        clearInterval(this.timerID); */
    }

    setPageHeader() {
        this.props.setPageHeader('Forexes');
    }

    componentDidMount() {
        this.props.fetchData('http://localhost:52698/api/fx')
        /* this.timerID = setInterval(
                            () => this.props.fetchData('http://localhost:52698/api/fx'), 5000
                        ); */
    }

    componentWillUnmount(){
        
        //clearInterval(this.timerID); 
    }

    render(){
        
        if (this.props.isErrored) {
            return <p>Sorry! There was an error loading the rates. :-(</p>;
        }

        if (this.props.isLoading || this.props.forexs === undefined || 
            this.props.forexs.length === 0) {
            return <p>Loading Rates…please wait for a moment.....</p>; 
        }

        if (this.props.selectedFxCurrency === undefined) {
            return <p>No currency is selected…please wait for a moment.....</p>; 
        }
        this.setPageHeader();
        const forexs = this.props.forexs.rates;
        const fxCurrencies = forexs.map((curr) => 
                                    <option 
                                        value={curr.fxCurrency} 
                                        key={curr.fxCurrency}>{curr.fxCurrency}
                                    </option>
                                );
        //console.log('rendering after isLoading completed..', fxCurrencies);
        return(
            <div>
            <div className="w3-row">
                <div className="w3-col">
                    <select value={this.props.selectedFxCurrency.fxCurrency} 
                            onChange={this.handleFxCurrencyChange}
                            className="w3-select w3-border w3-round w3-light-grey">
                        <option value="ALL" key="ALL">ALL</option>
                        {fxCurrencies}
                    </select>
                </div>
            </div>
            <div className="w3-row">
                <div className="w3-col s5 w3-margin-left w3-margin-right w3-margin-top">
                    <button className="w3-button w3-blue w3-round w3-block" 
                        type="submit" onClick={this.handleRefreshClick}>Refresh</button>
                </div>
                <div className="w3-col s1 w3-margin">
                    
                </div>
                <div className="w3-col s5 w3-margin-left w3-margin-top">
                    <button className="w3-button w3-blue w3-round w3-block"
                        type="submit" onClick={this.handleStopRefresh}>Stop Auto Refresh</button>
                </div>
            </div>
            <div className="w3-row">
                <Forexs selectedFxCurrency={this.props.selectedFxCurrency} forexs={forexs}/>
            </div>
            </div>
        );
    }
}

export default ForexSelect;