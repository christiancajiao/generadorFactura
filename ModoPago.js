import React from "react";
import uniqid from "uniqid";
import "./App.css";

const paymentType = ["efectivo", "tarjeta"];

class ModoPago extends React.Component {
  state = {
    idPayment: "",
    paymentType: "",
    amount: 0,
    shopDiscount: 0,
  };

  componentDidMount() {
    this.setState({
      idPayment: this.props.idPayment,
    });
  }

  sendComponentState = () => {
    this.props.estadoPago(this.state);
  };

  onChangePaymentAmount = (e) => {
    this.setState({
      amount: e.target.value,
    });
  };

  onChangePaymentType = (e) => {
    this.setState(
      {
        paymentType: e.target.value,
      },
      () => {
        this.sendComponentState();
      }
    );
  };

  creationPaymentList = (list) => {
    let paymentList = list.map((elemento, i) => {
      return (
        <option key={i} id={i} value={elemento}>
          {elemento}
        </option>
      );
    });
    return paymentList;
  };

  shopDiscount = (e) => {
    this.setState(
      {
        shopDiscount: e.target.value,
      },
      () => {
        this.sendComponentState();
      }
    );
  };

  onChange = (e) => {
    let name = e.target.name;
    this.setState(
      {
        [name]: e.target.value,
      },
      () => {
        this.sendComponentState();
      }
    );
  };
  render() {
    return (
      <div>
        <label className="titulos">Pago</label>
        <select name="paymentType" onChange={this.onChange}>
          <option value=" ">Tipo Pago</option>
          {this.creationPaymentList(paymentType)}
        </select>

        <label className="titulos">MONTO</label>
        <input
          type="number"
          placeholder="($)"
          min="0"
          name="amount"
          onChange={this.onChange}
        />
        <input
          name="shopDiscount"
          className="input-des"
          type="number"
          placeholder="DesTien"
          min="0"
          onChange={this.onChange}
        />
        <span>{}</span>
      </div>
    );
  }
}
export default ModoPago;
