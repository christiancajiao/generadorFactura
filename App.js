import React from "react";
import Producto from "./Producto";
import uniqid from "uniqid";
import "./App.css";
import ModoDePago from "./ModoPago";
import { prettyDOM } from "@testing-library/react";

let products = [
  { id: 1, name: "Cepillado", price: 10000 },
  { id: 2, name: "Corte dama", price: 30000 },
  { id: 3, name: "Corte caballero", price: 25000 },
];
const sellers = [
  { id: 1, name: "seller 1" },
  { id: 2, name: "seller 2" },
];

let unic;
let unicPayment;
class App extends React.Component {
  state = {
    date: "",
    clientName: "",
    products: [],
    payment: [],

    total: 0,
    clients: [
      { id: 1, name: "Pepito Perez" },
      { id: 2, name: "Paquita Ramirez" },
    ],

    change: 0,
  };

  idUnico = () => {
    unic = uniqid();
  };
  idlistPayments = () => {
    unicPayment = uniqid();
  };
  componentDidMount = () => {
    this.idUnico();
    this.idlistPayments();
  };

  componentDidUpdate() {
    console.log(this.state);
    console.log(this.state.products[0]);
  }

  onChangeClient = (e) => {
    this.setState({
      clientName: e.target.value,
    });
  };
  calculateTotal = () => {
    if (this.state.products === []) {
      return;
    }
    let productos = this.state.products;
    let total;
    for (var i = 0; i < productos.length; i++) {
      total = total + productos[i];
    }
    return total;
  };

  clientListCreation = (list) => {
    let listClients = list.map((element) => {
      return (
        <option key={element.name} value={element.name}>
          {element.name}
        </option>
      );
    });
    return listClients;
  };

  propProductComponent = (stateFromComponent) => {
    //recorrer el stateFromComponent producto
    let indexToChange = false;
    let arregloProducts = this.state.products;
    for (var i = 0; i < arregloProducts.length; i++) {
      if (arregloProducts[i].idProduct === stateFromComponent.idProduct) {
        arregloProducts[i] = stateFromComponent;
        indexToChange = true;
      }
    }

    //comparacion para setstate por el arreglo con el change o agregar uno nuev
    this.setState({
      products: indexToChange
        ? arregloProducts
        : [...this.state.products, stateFromComponent],
    });
  };

  statePayment = (stateFromComponent) => {
    let indexToChange = false;
    let newPaymentArr = this.state.payment;
    for (var i = 0; i < newPaymentArr.length; i++) {
      if (newPaymentArr[i].idPayment === stateFromComponent.idPayment) {
        newPaymentArr[i] = stateFromComponent;
        indexToChange = true;
      }
    }
    let listPayments = this.state.payment;
    let totallistPayments = 0;
    for (var i = 0; i < listPayments.length; i++) {
      totallistPayments =
        totallistPayments + parseInt(listPayments[i].totalAmount);
    }

    //comparacion para setstate por el arreglo con el change o agregar uno nuevo

    this.setState({
      payment: indexToChange
        ? newPaymentArr
        : [...this.state.payment, stateFromComponent],
      change: totallistPayments - this.state.total,
    });
  };
  calcaulteChange = () => {
    let totalProductos = this.total();
    let arrPagos = this.state.payment;
    let totalPagos = 0;
    for (var i = 0; i < arrPagos.length; i++) {
      let pagoscondescuento =
        parseInt(arrPagos[i].amount) + parseInt(arrPagos[i].shopDiscount);
      totalPagos = totalPagos + pagoscondescuento;
    }
    return totalProductos - totalPagos;
  };

  newClient = (e) => {
    let clientToAgregate = {
      id: this.state.clients.length + 1,
      name: e.target.value,
    };
    this.setState({
      clients: [...this.state.clients, clientToAgregate],
    });
  };

  newPaymentMethod = () => {
    this.idlistPayments();
    this.setState({
      payment: [
        ...this.state.payment,
        {
          idPayment: unicPayment,
          paymentTypes: "",
          amount: 0,
          totalAmount: 0,
        },
      ],
    });
  };

  newProduct = () => {
    this.idUnico();
    this.setState({
      products: [
        ...this.state.products,
        {
          idProduct: unic,
          product: { id: 0, name: "", price: 0 },
          amount: 0,
          seller: "",
        },
      ],
    });
  };

  deletePayment = (e) => {
    this.setState({
      payment: this.state.payment.filter((element) => {
        return element.idPayment !== e.target.id;
      }),
    });
  };

  deleteProduct = (e) => {
    this.setState({
      products: this.state.products.filter((element) => {
        return element.idProduct !== e.target.id;
      }),
    });
    let products = this.state.products;
    let generalTotal = 0;
    for (var i = 0; i < products.length; i++) {
      generalTotal = generalTotal + products[i].totalwithdiscount;
    }
    this.setState({
      total: generalTotal,
    });
  };

  total = () => {
    let arrProductos = this.state.products;
    let sumatoriaProductos = 0;
    for (var i = 0; i < arrProductos.length; i++) {
      let productoxcantidad =
        arrProductos[i].product.price * arrProductos[i].amount;
      let totaldescuento =
        arrProductos[i].amount * arrProductos[i].productDiscount;
      let totalcondescuento = productoxcantidad - totaldescuento;
      sumatoriaProductos = sumatoriaProductos + totalcondescuento;
    }
    return sumatoriaProductos;
  };

  fecha = (e) => {
    this.setState({
      date: e.target.value,
    });
  };

  render() {
    return (
      <div className="App">
        <div className="super-titulo">GENERADOR DE FACTURAS</div>
        <div className="fechaynombre">
          <div>
            <label htmlFor="nombreCliente" className="titulos">
              FECHA:
              <input type="date" onChange={this.fecha.bind(this)}></input>
            </label>
          </div>

          <div>
            <label htmlFor="nombreCliente" className="titulos">
              CLIENTE
              <input
                name="nombreCliente"
                list="clients"
                id="nombreCliente"
                type="text"
                value={this.state.clientName}
                onChange={this.onChangeClient.bind(this)}
              />
            </label>
            <datalist id="clients">
              {this.clientListCreation(this.state.clients)}
            </datalist>
            <button
              value={this.state.clientName}
              onClick={this.newClient}
              className="boton-azul"
            >
              Nuevo Cliente
            </button>
          </div>
        </div>

        <div className="tablero-operaciones">
          <div className="contenedor-products">
            <div className="super-titulo">LISTADO PRODUCTOS</div>
            {this.state.products.map((item, i) => {
              return (
                <div className="unidad-producto" key={item.idProduct}>
                  <Producto
                    propProductComponent={this.propProductComponent}
                    idOfProduct={unic}
                  />
                  <button
                    onClick={this.deleteProduct}
                    id={item.idProduct}
                    className="boton-rojo"
                  >
                    X
                  </button>
                </div>
              );
            })}

            <button onClick={this.newProduct} className="boton-producto">
              Nuevo Producto
            </button>
          </div>

          <div className="contenedor-products">
            <div className="super-titulo">LISTADO PAGOS</div>
            {this.state.payment.map((item, i) => {
              return (
                <div key={item.idPayment} className="unidad-producto">
                  <ModoDePago
                    estadoPago={this.statePayment}
                    idPayment={unicPayment}
                  />
                  <button
                    onClick={this.deletePayment}
                    id={item.idPayment}
                    className="boton-rojo"
                  >
                    X
                  </button>
                </div>
              );
            })}
            <button onClick={this.newPaymentMethod} className="boton-azul">
              Nuevo Pago
            </button>
          </div>
        </div>

        <div className="factura">
          <div>Fecha: {this.state.date}</div>
          <div>Cliente: {this.state.clientName}</div>
          {this.state.products.map((element, i) => {
            return (
              <div key={element.id}>
                <div>Tipo de producto: </div>
                <div>Cantidad Producto:</div>
              </div>
            );
          })}
          <div>TOTAL:{this.total()}</div>
          <div>
            PAGO:
            {this.state.payment.map((element) => {
              return (
                <div>
                  <div>Tipo de pago: {element.paymentType}</div>
                  <div>Cantidad: {element.amount}</div>
                  <div>Descuento Tienda: {element.shopDiscount}</div>
                </div>
              );
            })}
          </div>
          <div>change: {this.calcaulteChange()}</div>
        </div>
      </div>
    );
  }
}

export default App;
