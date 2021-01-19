import React, {Component} from 'react';

class AccountBalance extends Component {
  render() {
    let accountBalance = this.props.accountBalance;
    let debitTotal = this.props.debitTotal;
    let creditTotal = this.props.creditTotal;
    return (
        <div>
          
          Balance: $ {Math.round(((accountBalance+creditTotal-debitTotal)) * 100) / 100}
        </div>
    );
  }
}

export default AccountBalance;