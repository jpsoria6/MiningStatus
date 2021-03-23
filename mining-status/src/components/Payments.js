import React from "react";
import { Dropdown, Container, Row, Col } from "react-bootstrap";
import dataWallet from "../csv/resumenBilletera.csv";
import data from "../csv/resumenMineros.csv";
import { csv } from "d3";

class Payments extends React.Component {
  constructor() {
    super();
    this.state = {
      minerName: "Seleccione un Minero",
      date: null,
      currentMonth: "Seleccione un Mes",
      valueEth: 0,
    };
    this.initializeEthValue();
  }

  initializeEthValue = () => {
    csv(dataWallet, (data) => {
      console.log(data);
      this.setState({
        ...this.state,
        valueEth: data.valor,
      });
    });
    csv(data, (data) => {
      this.getTotal(data);
    });
  };

  getTotal = (data) => {
    data = data.filter(
      (element) =>
        element.miner !== "Bebecito Miner" && element.miner !== "Moonship Miner"
    );
    console.log(data);
  };

  getData = (miner) => {
    csv(data, (data) => {
      this.presentData(data, miner);
    });
  };

  presentData = (data, miner) => {
    this.setState({
        ...this.state,
        minerName : miner
    });

    avg
  };

  render() {
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
            <Dropdown>
              <Dropdown.Toggle variant="primary" id="dropdown-basic">
                {this.state.currentMonth}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onSelect={this.getData} eventKey="01">
                  Enero
                </Dropdown.Item>
                <Dropdown.Item onSelect={this.getData} eventKey="02">
                  Febrero
                </Dropdown.Item>
                <Dropdown.Item onSelect={this.getData} eventKey="03">
                  Marzo
                </Dropdown.Item>
                <Dropdown.Item onSelect={this.getData} eventKey="04">
                  Abril
                </Dropdown.Item>
                <Dropdown.Item onSelect={this.getData} eventKey="05">
                  Mayo
                </Dropdown.Item>
                <Dropdown.Item onSelect={this.getData} eventKey="06">
                  Junio
                </Dropdown.Item>
                <Dropdown.Item onSelect={this.getData} eventKey="07">
                  Julio
                </Dropdown.Item>
                <Dropdown.Item onSelect={this.getData} eventKey="08">
                  Agosto
                </Dropdown.Item>
                <Dropdown.Item onSelect={this.getData} eventKey="09">
                  Septiembre
                </Dropdown.Item>
                <Dropdown.Item onSelect={this.getData} eventKey="10">
                  Octubre
                </Dropdown.Item>
                <Dropdown.Item onSelect={this.getData} eventKey="11">
                  Noviembre
                </Dropdown.Item>
                <Dropdown.Item onSelect={this.getData} eventKey="12">
                  Diciembre
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
        <Row>
          <Col></Col>
          <Col></Col>
        </Row>
      </Container>
    );
  }
}

export default Payments;
