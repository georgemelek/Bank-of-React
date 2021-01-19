import React from "react";
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import SignIn from './components/SignIn';
import Debits from './components/Debits';
import Credit from './components/Credit';
import axios from 'axios';
import {v4 as uuid} from 'uuid';

class App extends React.Component {
  constructor(){
    super();

    this.state = {
      accountBalance: 0,
      currentUser: {
        userName: 'bob_loblaw',
        memberSince: '08/23/99',
        loggedIn: false
      },
      debits: [],
      credit: [],
      debitTotal: 0,
      creditTotal: 0 
    }
  }

  componentDidMount(){
    this.getDebits();
    this.getCredit();
  }
  //fetches credit data from api and adds it to our data
  getCredit = () => {
    axios.get(`https://moj-api.herokuapp.com/credits`)
    .then(res => {
      const data = res.data.slice(0, 3);
      this.setState({credit: data});
      let tempCred = 0;
      for(let i of data){
        tempCred+=i.amount;
      }
      tempCred = Math.round((tempCred + Number.EPSILON) * 100) / 100
      this.setState({creditTotal: tempCred})
    })
  }

  //fetches debit data from api and adds it to our information
  getDebits = () => {
      axios.get(`https://moj-api.herokuapp.com/debits`)
      .then(res => {
        const data = res.data.slice(0, 3);
        this.setState({debits: data});
        let tempDeb = 0;
        for(let i of data){
          tempDeb+=i.amount;
        }
        tempDeb = Math.round(tempDeb * 100) / 100
        this.setState({debitTotal: tempDeb})
      })
  }

  //Add Debit Item
  addDebit = (debit) =>{
    debit.id = uuid();
    let date = new Date();
    debit.date = date.toISOString();
    
    const newDebits = [debit, ...this.state.debits];
    let debitTotal = 0;
    for(let i =0; i< newDebits.length; i++){
      debitTotal+=newDebits[i].amount;
    }
    debitTotal = Math.round((debitTotal + Number.EPSILON) * 100) / 100
    this.setState({debits: newDebits, debitTotal: debitTotal})
  }

  //Add Credit item
  addCredit = (credit) =>{
    credit.id = uuid();
    let date = new Date();
    credit.date = date.toISOString();
    
    const newCredit = [credit, ...this.state.credit];
    let creditTotal = 0;
    for(let i =0; i< newCredit.length; i++){
      creditTotal+=newCredit[i].amount;
    }
    creditTotal = Math.round((creditTotal + Number.EPSILON) * 100) / 100
    this.setState({credit: newCredit, creditTotal: creditTotal})
  }

  LogIn = (Info) =>{
    const newUser = {...this.state.currentUser};
    newUser.userName = Info.userName;
    newUser.loggedIn = true;
    this.setState({currentUser: newUser});
  }
  render(){

    let HomeComponent = () => (<Home accountBalance={this.state.accountBalance} user={this.state.currentUser} debitTotal={this.state.debitTotal} creditTotal={this.state.creditTotal} />);
    let UserProfileComponent = () => (<UserProfile  user={this.state.currentUser} memberSince={this.state.currentUser.memberSince} accountBalance={this.state.accountBalance} debitTotal={this.state.debitTotal} creditTotal={this.state.creditTotal}/>)
    let SignInComponent = () => (<SignIn user={this.state.currentUser} LogIn={this.LogIn} {...this.props} />)
    let DebitsComponent = () => (<Debits accountBalance={this.state.accountBalance}  user={this.state.currentUser} debits={this.state.debits} addDebit={this.addDebit} debitTotal={this.state.debitTotal} creditTotal={this.state.creditTotal}/>)
    let CreditComponent = () => (<Credit accountBalance={this.state.accountBalance}  user={this.state.currentUser} credit={this.state.credit} addCredit={this.addCredit} debitTotal={this.state.debitTotal} creditTotal={this.state.creditTotal}/>)
    return (
      <Router>
      <div className="App">
        <Switch>
        <Route exact path = "/" render={HomeComponent}/>
        <Route exact path = "/login" render={SignInComponent}/>
        <Route exact path = "/userProfile" render={UserProfileComponent}/>
        <Route exact path ="/debits" render={DebitsComponent} />
        <Route exact path ="/credit" render={CreditComponent} />
        </Switch>
      </div>
      </Router>
    );
  }
}

export default App;