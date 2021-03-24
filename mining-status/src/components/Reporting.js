import React from "react";
import Chart from "chart.js";
import { csv } from "d3";
import data from "../csv/resumenMineros.csv";
import { Dropdown, Container, Row, Col } from "react-bootstrap";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

class Reporting extends React.Component {
  constructor() {
    super();
    this.state = {
      minerName: "Seleccione un Minero",
      date: null,
      dateString: "",
    };
    this.grafica = React.createRef();
    this.chart = null;
  }

  getData = (miner, event, date = null) => {
    csv(data, (data) => {
      this.presentData(data, miner, date);
    });
  };

  presentData = (data, miner, date = null) => {
    let hora = [];
    let hashrate = [];

    if (data === null || data === undefined) return;

    console.log(data);

    data = data.filter((element) => element.miner === miner);
    if (date) {
      data = data.filter(
        (element) => element.miner === miner && element.dia === date
      );
    }

    data.forEach((element) => {
      hora.push(element.hora);
      hashrate.push(element.hashrate);
    });
    this.setState({
      ...this.state,
      minerName: miner,
    });
    this.minerName = miner;

    this.chart.data.labels = hora;
    this.chart.data.datasets[0].data = hashrate.map((e) => parseFloat(e));
    this.chart.data.datasets[0].label = miner;

    this.chart.update();
  };

  updateDate = (date) => {
    let fecha = new Date(date);
    let stringFecha =
      this.getDay(fecha.getDate()) +
      "/" +
      this.getMonth(fecha.getMonth() + 1) +
      "/" +
      fecha.getFullYear();
    if (stringFecha === "31/12/1969") stringFecha = "";
    this.setState({
      ...this.state,
      date: date,
      dateString: stringFecha,
    });
    this.getData(this.state.minerName, null, stringFecha);
  };

  getDay = (day) => {
    if (day < 10) {
      return "0" + day;
    }
    return day + "";
  };

  getMonth = (month) => {
    if (month < 10) {
      return "0" + month;
    }
    return month + "";
  };

  componentDidMount() {
    const ctx = this.grafica.current.getContext("2d");
    this.chart = new Chart(ctx, {
      // The type of chart we want to create
      type: "line",

      // The data for our dataset
      data: {
        datasets: [
          {
            backgroundColor: "rgba(0,0,0,0)",
            borderColor: "rgb(12, 183, 246)",
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                suggestedMin: 50,
                suggestedMax: 100,
              },
            },
          ],
        },
      },
    });
  }

  render() {
    return (
      <div>
        <Container>
          <Row className="mb-5">
            <Col className="mb-3">
              <Dropdown>
                <Dropdown.Toggle variant="primary" id="dropdown-basic">
                  {this.state.minerName}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item
                    onSelect={this.getData}
                    eventKey="Agucho Miner"
                  >
                    Agucho Miner
                  </Dropdown.Item>
                  <Dropdown.Item
                    onSelect={this.getData}
                    eventKey="Ayrton Miner"
                  >
                    Ayrton Miner
                  </Dropdown.Item>
                  <Dropdown.Item
                    onSelect={this.getData}
                    eventKey="Bebecito Miner"
                  >
                    Bebecito Miner
                  </Dropdown.Item>
                  <Dropdown.Item
                    onSelect={this.getData}
                    eventKey="Coquito Miner"
                  >
                    Coquito Miner
                  </Dropdown.Item>
                  <Dropdown.Item onSelect={this.getData} eventKey="Fox Miner">
                    Fox Miner
                  </Dropdown.Item>
                  <Dropdown.Item
                    onSelect={this.getData}
                    eventKey="Janisse Miner"
                  >
                    Janisse Miner
                  </Dropdown.Item>
                  <Dropdown.Item
                    onSelect={this.getData}
                    eventKey="Moonship Miner"
                  >
                    Moonship Miner
                  </Dropdown.Item>
                  <Dropdown.Item
                    onSelect={this.getData}
                    eventKey="Phelps Miner"
                  >
                    Phelps Miner
                  </Dropdown.Item>
                  <Dropdown.Item
                    onSelect={this.getData}
                    eventKey="Virgin Miner"
                  >
                    Virgin Miner
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
            <Col className="mb-3">
              <DatePicker
                dateFormat="dd/MM/yyyy"
                selected={this.state.date}
                onChange={this.updateDate}
                isClearable
                placeholderText="Seleccione una fecha"
              />
            </Col>
          </Row>
        </Container>
        <Container>
          <canvas ref={this.grafica} width="800px" height="400px"></canvas>
        </Container>
      </div>
    );
  }
}

export default Reporting;
