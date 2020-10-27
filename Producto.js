import React from "react";

import "./App.css";

let products = [
  { id: 1, name: "Cepillado", price: 10000 },
  { id: 2, name: "Corte dama", price: 30000 },
  { id: 3, name: "Corte caballero", price: 25000 },
];
let sellers = [
  { id: 1, name: "vendedor 1" },
  { id: 2, name: "vendedor 2" },
];

class Producto extends React.Component {
  state = {
    idProduct: 0,
    seller: { id: 0, name: "" },
    product: { id: 0, name: "", price: 0 },
    amount: 0,
    productDiscount: 0,
  };

  componentDidMount() {
    this.setState({
      idProduct: this.props.idOfProduct,
    });
  }

  sendComponentState = () => {
    this.props.propProductComponent(this.state);
  };

  creactionlistsproducts = (list) => {
    let listproducts = list.map((element) => {
      return (
        <option key={element.id} value={element.id}>
          {element.name}
        </option>
      );
    });
    return listproducts;
  };
  creactionlistssellers = (list) => {
    let listsellers = list.map((element) => {
      return (
        <option key={element.id} value={element.id}>
          {element.name}
        </option>
      );
    });
    return listsellers;
  };

  amountOfProduct = (e) => {
    if (this.state.product === null) {
      return;
    }

    this.setState(
      {
        totalPerProduct: this.state.product.price * e.target.value,
      },
      () => {
        this.sendComponentState();
      }
    );
  };

  productDiscount = (e) => {
    this.setState(
      {
        productDiscount: e.target.value,
        totalwithdiscount: this.state.totalPerProduct - e.target.value,
      },
      () => {
        this.sendComponentState();
      }
    );
  };
  onChangeSellers = (e) => {
    let name = e.target.name;
    let objeto = sellers.find((element) => {
      return element.id === parseInt(e.target.value);
    });
    this.setState(
      {
        [name]: objeto,
      },
      () => {
        this.sendComponentState();
      }
    );
  };
  onChangeList = (e) => {
    let name = e.target.name;
    let objeto = products.find((element) => {
      return element.id === parseInt(e.target.value);
    });
    this.setState(
      {
        [name]: objeto,
        amount: 0,
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

  resultPerProduct = () => {
    if (this.state.product === undefined) {
      return;
    }
    let discountWithAllAmount = this.state.productDiscount * this.state.amount;
    return this.state.amount * this.state.product.price - discountWithAllAmount;
  };
  render() {
    return (
      <div className="contenedor-producto">
        <label className="titulos"></label>
        <select name="seller" onChange={this.onChangeSellers}>
          <option value={null}>Vendedores</option>
          {this.creactionlistssellers(sellers)}
        </select>

        <label className="titulos"></label>
        <select name="product" onChange={this.onChangeList}>
          <option value={null}>Productos</option>
          {this.creactionlistsproducts(products)}
        </select>

        <input
          type="number"
          placeholder="Cantidad"
          min="0"
          max="10"
          name="amount"
          onChange={this.onChange}
        />

        <input
          className="input-des"
          type="number"
          placeholder="DesProd"
          name="productDiscount"
          min="0"
          onChange={this.onChange}
        />

        <span className="putoresultado">{this.resultPerProduct()}</span>
      </div>
    );
  }
}
export default Producto;
