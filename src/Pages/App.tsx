import React, {useState} from 'react';
import logo from '../logo.svg';
import './App.css';
import NetworkingService from "../Networking/NetworkingService";

class ReactMain extends React.Component {

  state={
    NameSurname:"",
    IdentityNu:"",
    CityId:0,
    IncomeRangeId:0,
    formVisible:true,
    userScore:0,
    cities:[],
    incomeRanges:[],
  }
  constructor(props:any) {
    super(props);

  }
  componentDidMount() {
    NetworkingService.GetCities().then((data)=>{
      this.setState({
        cities:data,
      })
    });
    NetworkingService.GetIncomeRanges().then((data)=>{
      this.setState({
        incomeRanges:data
      })
    });
  }

  handleChange = (event:any) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  async saveUser() {
    const user = await NetworkingService.SaveUser(this.state);
    const calculatedUserScore = await NetworkingService.GetUserScore(user.Id);
    this.setState(
        {
          formVisible:false,
          userScore:calculatedUserScore
        }
    )
  }

  render() {
    return(
        <div className="App">
          <header className="App-header">
            <div hidden={this.state.formVisible}>
              <p>
                Lütfen aşağıdaki bilgileri giriniz
              </p>
              <table>
                <tr>
                  <td>TC Kimlik Numarası</td>
                  <td>
                    <input type={"text"} maxLength={11} required={true} minLength={11} name={"IdentityNu"} onChange={(val)=>{
                      this.handleChange(val);
                    }}/>
                  </td>
                </tr>
                <tr>
                  <td>Ad Soyad</td>
                  <td>
                    <input type={"text"} name={"NameSurname"} required={true} onChange={(val)=>{
                      this.handleChange(val);
                    }}/>
                  </td>
                </tr>
                <tr>
                  <td>Şehir</td>
                  <td>
                    <select name={"CityId"} required={true}  onChange={(val)=>{
                      this.handleChange(val);
                    }}>
                      {this.state.cities.map((value:any, index) => {
                        return  <option value={value.Id}>{value.Name}</option>
                      })}
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>Gelir Aralığı</td>
                  <td>
                    <select name={"IncomeRangeId"} required={true} onChange={(val)=>{
                      this.handleChange(val);
                    }}>
                      {this.state.incomeRanges.map((value:any, index) => {
                        return  <option value={value.Id}>{value.IncomeRange}</option>
                      })}
                    </select>
                  </td>
                </tr>
              </table>
              <div>
                <input type={"button"} className={"saveBtn"} onClick={()=>{this.saveUser().then(r => {})}} value={"Kaydet"} />
              </div>
            </div>
            <div hidden={!this.state.formVisible}>
              <p>
                Toplam Skorunuz:
              </p>
              <div className={"score"}>
                {this.state.userScore}
              </div>
            </div>
          </header>

        </div>
    );
  }

}


export default ReactMain;
