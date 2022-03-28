import React from "react";
import './App.css';
import axios from 'axios';
import { MDBDataTable } from 'mdbreact';
import { Table, Spinner } from 'reactstrap';
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import './dataTable/dataTable.css';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      weatherModel: [],
    }
  }

  componentDidMount() {
    this.weather();
  }

  weather() {
    axios.get('http://api.openweathermap.org/data/2.5/forecast?lat=18.520430&lon=73.856743&appid=47a8ce0df4153fcb8b53a8be9ac90ffa&cnt=5').then((response) => {
      if (response.status === 200) {
        this.setState({ weatherModel: response.data })
        let postData = {
          apiURL: 'http://api.openweathermap.org/data/2.5/forecast?lat=18.520430&lon=73.856743&appid=47a8ce0df4153fcb8b53a8be9ac90ffa&cnt=5',
          data: response.data
        }
        axios.post('http://localhost:3001/weather/weather', postData).then((response) => {
          if (response.data.result) {
          }
        })
      } else {

      }
    })
  }

  render() {
    const bodyArr = [];
    var cityName;
    if (this.state.weatherModel.length == 0) {
    } else {
      cityName = this.state.weatherModel.city.name + ', ' + this.state.weatherModel.city.country
      console.log('data', this.state.weatherModel);
      this.state.weatherModel.list.map((weatherObject, i) => {

        var obj = {
          "date": weatherObject.dt_txt,
          "humidity": weatherObject.main.humidity,
          "temperature": weatherObject.main.temp,
          "visibility": weatherObject.visibility,
          "weather": weatherObject.weather[0].description,
          "windSpeed": weatherObject.wind.speed,
        }
        bodyArr.push(obj);
      })
    }

    const dataArr = {
      columns: [
        {
          label: 'Date',
          field: 'date',
          sort: 'asc',
          width: 100
        },
        {
          label: 'Humidity',
          field: 'humidity',
          width: 100
        },
        {
          label: 'Temperature',
          field: 'temperature',
          sort: 'asc',
          width: 100
        },
        {
          label: 'Visibility',
          field: 'visibility',
          sort: 'asc',
          width: 100
        },
        {
          label: 'Weather',
          field: 'weather',
          sort: 'asc',
          width: 100
        },
        {
          label: 'Wind Speed',
          field: 'windSpeed',
          sort: 'asc',
          width: 100
        },
      ],
      rows: bodyArr
    }


    return (
      <React.Fragment>
        {!this.state.loading &&
          <Table responsive hover>
            {dataArr.length !== 0 ?
              <>
                <p>{cityName}</p>
                <MDBDataTable noBottomColumns hover data={dataArr} entries={5} entriesOptions={[5, 20, 25]} searching={false} />
              </>
              : <b className="content-font-style"> No Data </b>
            }
          </Table>
        }
        {this.state.loading &&
          <div className="text-align-center">
            <Spinner style={{ width: '3rem', height: '3rem', position: 'absolute' }} />
          </div>
        }
      </React.Fragment>
    );
  }
}


export default App;
