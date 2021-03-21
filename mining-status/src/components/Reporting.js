import React from "react";
import Chart from "chart.js";
import { csv } from "d3";
import data from "../csv/mineros.csv";
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
      (fecha.getMonth() + 1) +
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
                  <Dropdown.Item onSelect={this.getData} eventKey="coquito">
                    Coquito Miner
                  </Dropdown.Item>
                  <Dropdown.Item onSelect={this.getData} eventKey="phelps">
                    Phelps Miner
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
        <canvas ref={this.grafica} width="800px" height="400px"></canvas>
      </div>
    );
  }
}

export default Reporting;
