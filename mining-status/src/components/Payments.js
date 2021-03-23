import React from "react";
import { Dropdown, Container, Row, Col} from "react-bootstrap";
import dataWallet from "../csv/resumenBilletera.csv";
import data from "../csv/resumenMineros.csv";
import { csv } from "d3";

class Payments extends React.Component {
  constructor() {
    super();
    this.state = {
      miners: [],
      minerName: "Seleccione un Minero",
      date: null,
      currentMonth: "Seleccione un Mes",
      valueEth: 0,
      totalGranjaEth : 0,
      totalGranjaUsd : 0,
      totalGranjaMhs : 0,
      avgMinerMhs : 0,
      porcentajeMiner : 0,
      usdMiner : 0,
      ethMiner : 0
    };
  }

  componentDidMount(){
    this.initializeEthValue();
  }

  initializeEthValue = () => {
    csv(dataWallet, (data) => {
      console.log(data);
      this.setState({
        ...this.state,
        valueEth: data[0].valor,
        totalGranjaEth: data[0].eth,
        totalGranjaUsd : data[0].usd
      });
    });
    csv(data, (data) => {
      this.getMiners(data);
      this.getTotal(data);
      this.getPorcentaje();
    });
  };

 
  getMiners = (data) =>{
    let miners = []
    data = data.filter((element) => element.miner !== "Bebecito Miner" && element.miner !== "Moonship Miner")
    data.forEach(x => {
      if(!miners.includes(x.miner)){
        miners.push(x.miner)
      }
    })
    this.setState({
      ...this.state,
      miners : miners
    })
    console.log(this.state.miners)
  }

  getTotal = (data) => {
    data = data.filter(
      (element) =>
        element.miner !== "Bebecito Miner" && element.miner !== "Moonship Miner"
    );
    console.log(data)
    let mhsMiners = []
    let totalMhs = 0
    this.state.miners.forEach(
      x => {
       mhsMiners.push(this.getAverageMiner(data,x))
      }
    )
    mhsMiners.forEach(element => {
      totalMhs += element
    }); 
    
    this.setState({
      ...this.state,
      totalGranjaMhs : totalMhs.toFixed(2)
    })
  };

  getData = (miner) => {
    csv(data, (data) => {
      this.getAverageMiner(data, miner);
      this.getPorcentaje()
    });
  };

  getAverageMiner(data,miner){
    let totalMhs = 0
    let count = 0
     data = data.filter(element => element.miner === miner)
    data.forEach(element => {
      if(element.hashrate !== "" && element.hashrate !== "0.0"){
        totalMhs += parseFloat(element.hashrate)
        count++
      }
    });
    let avg = totalMhs/count
    if(isNaN(avg)) avg=0
    this.setState({
      ...this.state,
      minerName : miner,
      avgMinerMhs : avg
    })
    return avg
  }

  getPorcentaje = () => {
    let porMhsMiner = this.state.avgMinerMhs * 100 / this.state.totalGranjaMhs
    let usdMiner = porMhsMiner * this.state.totalGranjaUsd / 100
    let eth = parseFloat(this.state.valueEth)
    let ethMiner = usdMiner / eth
    this.setState({
      ...this.state,
      porcentajeMiner : porMhsMiner.toFixed(2),
      usdMiner :  usdMiner.toFixed(2),
      ethMiner : ethMiner.toFixed(5)
    })
  }

 
  render() {
    const stylesBox = {
      border : '2px solid #E5E5E5',
      margin : '40px',
      borderRadius : '0.5em',
      padding : '10px',
      height : '90%'
    };
    return (
      <Container>
        <Row>
          <Col>
            <Dropdown>
              <Dropdown.Toggle variant="primary" id="dropdown-basic">
                {this.state.minerName}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onSelect={this.getData} eventKey="Agucho Miner">
                  Agucho Miner
                </Dropdown.Item>
                <Dropdown.Item onSelect={this.getData} eventKey="Ayrton Miner">
                  Ayrton Miner
                </Dropdown.Item>
                <Dropdown.Item onSelect={this.getData} eventKey="Coquito Miner">
                  Coquito Miner
                </Dropdown.Item>
                <Dropdown.Item onSelect={this.getData} eventKey="Fox Miner">
                  Fox Miner
                </Dropdown.Item>
                <Dropdown.Item onSelect={this.getData} eventKey="Janisse Miner">
                  Janisse Miner
                </Dropdown.Item>
                <Dropdown.Item onSelect={this.getData} eventKey="Phelps Miner">
                  Phelps Miner
                </Dropdown.Item>
                <Dropdown.Item onSelect={this.getData} eventKey="Virgin Miner">
                  Virgin Miner
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
          <Col>
            <div variant="primary">
              Ultimos 30 dias
            </div>
          </Col>
        </Row>
        <Row>
          <Col lg={8}>
            <div style={stylesBox}>
              <h1>{this.state.minerName}</h1>
              <h2>Promedio de MH/S: {this.state.avgMinerMhs.toFixed(2)} ({this.state.porcentajeMiner}%)</h2>
              <h2>USD {this.state.usdMiner} ({this.state.ethMiner} ETH)</h2>
              
            </div>
          </Col>
          <Col lg={4}>
            <div style={stylesBox}>
            <h3>Cotizacion actual del ETH</h3>
            <h1>${this.state.valueEth}</h1>
            <hr/>
            <h3>Total de la Granja</h3>
            <h2>{this.state.totalGranjaMhs} MH/S</h2>
            <h2>{this.state.totalGranjaEth} ETH</h2>
            <h2>{this.state.totalGranjaUsd} USD</h2>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }

}

export default Payments;
