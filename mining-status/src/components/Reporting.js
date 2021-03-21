import React  from 'react';
import Chart from 'chart.js';
import {csv} from 'd3';
import data from '../csv/mineros.csv';

class Reporting extends React.Component {
    constructor(){
        super();
        this.state = {

        }
        this.grafica = React.createRef();
        this.chart = null
    }


    getData = () => {
       csv(data, (data) => {
        this.presentData(data)
       })
    }

    presentData = (data) => {
        let hora = []
        let hashrate = []

        if(data === null || data === undefined) return

        data.forEach(element => {
            hora.push(element.hora)
            hashrate.push(element.hashrate)    
        });


        this.chart.data.labels = hora
        this.chart.data.datasets[0].data = hashrate.map(e => parseFloat(e))

    }
    

    componentDidMount(){
        const ctx = this.grafica.current.getContext('2d')
        this.chart = new Chart(ctx, {
            // The type of chart we want to create
            type: 'line',
        
            // The data for our dataset
            data: {
                datasets: [{
                    label: 'PhelpsMiner HASHRATE',
                    backgroundColor: 'rgb(12, 183, 246)',
                    data: [0, 20, 40, 50]
                }],
                labels: ['January', 'February', 'March', 'April']
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            suggestedMin: 50,
                            suggestedMax: 100
                        }
                    }]
                }
            }
        });
    }

    render() { 
        return (  
            <div>
                <canvas 
                ref= {this.grafica}
                ></canvas>
                <button type="button" onClick={this.getData()}> Get Data</button>
            </div>
        );
    }
}
 
export default Reporting;