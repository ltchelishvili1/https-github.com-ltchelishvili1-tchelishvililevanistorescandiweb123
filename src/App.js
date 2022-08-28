

import React from 'react'
import { request, gql } from 'graphql-request';
import Navbar from './Components/Parts/Navbar/Navbar';
import './App.css'
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  Link,
} from "react-router-dom";
import Header from './Components/Parts/Header/Header';
import Cart from './Components/Parts/Cart/Cart';
import CartOverlay from './Components/Parts/CartOverlay/CartOverlay';
import Test from './Test';
import Card from './Components/Parts/Card/Card'
const getBooks = gql`
{
  categories{
    name
    products{
      id
      name
      inStock
      gallery
      description
      category
      attributes{
        id
        name
        type
        items{
          displayValue
          value
          id
        }
      }
      prices{
        currency{
          label
          symbol
        }
        amount
      }
      brand
    }
  }
}
`;
const getCurrency = gql`
{
  currencies{
    label
    symbol
  }
}`

/*

{
  
product(id: "huarache-x-stussy-le"){
    attributes{
      id
      name
      type
      items{
        displayValue
        value
        id
      }
    }
   
  }
}

*/



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      currencies: [],
      products: [],
      getCartItems: [],
      quantity: 123456,
      displayCartOverlay: false,
      tax: 21,
      curCategory: "ALL",
      currency: 0,
      inStock: false

    }
  }


  setCurrency = () => {
    this.setState({
      currency: []
    })
  }
  cartItemRemove(item) {
    const arr = JSON.parse(localStorage.getItem("Cart1")) || []
    const newArr = [...(
      arr.filter((product) => (
        product.tempp !== item.tempp
      ))
    )]

    localStorage.setItem("Cart1", JSON.stringify(newArr))
    this.reRender()

  }

  handlePrice = () => {
    let ans = 0;
    if (this.state.getCartItems) {
      this.state.getCartItems.map((item) => (ans += item.quantity * item.price));
    }


  };

  handleCart = (filteredName, properties, atts, mainPage) => {
    if (mainPage) {
      properties = []
      atts = []
      filteredName.attributes.map((t) => (
        atts.push(t.id),
        t.items.map((x) => (
          properties[t.name] = x.value
        ))


        //  
      ))

    }
    let x = 0
    let str = ''
    filteredName.quantity = 1
    filteredName.imageId = 0
    const arr = JSON.parse(localStorage.getItem("Cart1")) || []
    for (let i = 0; i < atts.length; i++) {
      str += (properties[atts[i]])
    }
    filteredName.tempp = str + filteredName.id
    if (!str.includes("undefined")) {
      for (let i = 0; i < atts.length; i++) {
        filteredName[atts[i]] = properties[atts[i]]
        console.log(filteredName[atts[i]])
      }
      if (!filteredName.inStock) {
        if (arr.length == 0) {
          localStorage.setItem("Cart1", JSON.stringify([filteredName]))
        } else {
          let newArr = [...arr, filteredName]
          if (JSON.stringify(arr).includes(JSON.stringify(filteredName))) {
            this.setState({
              alreadyInCart: true
            })
            return

          } else {
            localStorage.setItem("Cart1", JSON.stringify(newArr))
          }
        }
      } else {
        if (this.state.inStock) {
          const msg1 = document.getElementById('msg');
          msg1.style.display = 'block';
        }
        this.setState({
          inStock: true
        })

        setTimeout(() => {
          // msg.style.visibility = 'visible';
          const msg = document.getElementById('msg');
          msg.style.display = 'none';
        }, 1000);
      }
      this.handlePrice()
      this.reRender()
    }
  }

  quantityChange(item, x) {

    if (x != 1 && item.quantity == 1) {
      this.cartItemRemove(item)
    }
    else {
      const arr = JSON.parse(localStorage.getItem("Cart1")) || []

      for (let i = 0; i < arr.length; i++) {

        if (JSON.stringify(arr[i]).includes(JSON.stringify(item))) {
          if (x == 1) {
            arr[i].quantity = arr[i].quantity + 1

            localStorage.setItem("Cart1", JSON.stringify(arr))
          } else if (x == 2) {

            arr[i].quantity = arr[i].quantity - 1
            item.price = item.price * item.quantity
          }
          localStorage.setItem("Cart1", JSON.stringify(arr))
        }
      }

    }

  }

  reRender = () => {
    this.setState({ getCartItems: JSON.parse(localStorage.getItem("Cart1")) })
  }
  componentWillUnmount() {
    this.reRender()
  }

  componentDidMount() {
    if (localStorage.getItem("count") == null || localStorage.getItem("count").length < 6) {
      localStorage.setItem("count", localStorage.getItem("count") + "1")
      if (localStorage.getItem("count") == "null11") {

        localStorage.setItem("Cart1", JSON.stringify([]))
      }
    }
    request('http://localhost:4000/', getBooks).then((data) => (
      this.setState({
        categories:
          data.categories
      })
    ))
    request('http://localhost:4000/', getCurrency).then((data) => (
      this.setState({
        currencies:
          data.currencies
      })
    ))

  }
  getCartTotal = () => {
    return this.state.getCartItems
      .reduce((acc, value) => {
        let temp = value.prices.filter((item) => (
          item.currency.label == localStorage.getItem("currency"))
        )

        return acc + temp[0].amount * value.quantity;
      }, 0)
      .toFixed(2);
  };




  displayCart = () => {
    this.setState({ displayCartOverlay: !this.state.displayCartOverlay })
    this.reRender()

  }



  render() {


    return (
      <div onClick={(e) => {

        if (this.state.displayCartOverlay) {
          var ignoreClickOnMeElement1 = document.getElementById("cartapp")
          if (!ignoreClickOnMeElement1.contains(e.target)) {
            this.setState({
              displayCartOverlay: !this.state.displayCartOverlay
            })
          }
        }
      }} className="App">
        <BrowserRouter>
          <Navbar className="navbar" getCartItems={this.state.getCartItems} reRender={this.reRender} displayCart={this.displayCart} categories={this.state.categories} currencies={this.state.currencies} />
          {this.state.displayCartOverlay ? <div id='cartapp' ><CartOverlay displayCart={this.displayCart} tax={this.state.tax} className="cartoverlay " quantityChange={this.quantityChange}
            getCartTotal={this.getCartTotal} getCartItems={this.state.getCartItems}
            cartItemRemove={this.cartItemRemove} reRender={this.reRender}
          /> </div> : null}
          <div className={this.state.displayCartOverlay ? "background" : ""}>
            <Routes>
              {
                this.state.categories.map((x) => (
                  <Route key={`123${x.name}`}>
                    {x.name == "all" ? <Route path='' element={<Header isCartLoaded={localStorage.getItem("Cart1") !== null} handleCart={this.handleCart} category={x.name} categories={this.state.categories} />} /> : null}
                    <Route path={`/category=${x.name}`} element={<Header handleCart={this.handleCart} category={x.name} categories={this.state.categories} />} />
                  </Route>

                ))
              }
              {this.state.categories.filter((product) => (
                product.name == "all"
              )).map(filteredName => (
                filteredName.products.map((product) => (
                  <Route key={`d;l'${product.id}`} path={`${product.id}`} element={<Card handleCart={this.handleCart} product={product} />} />
                ))





              ))}

              <Route path={"/cart"} element={<Cart tax={this.state.tax} getCartTotal={this.getCartTotal} cartItemRemove={this.cartItemRemove} reRender={this.reRender} getCartItems={this.state.getCartItems}
                quantityChange={this.quantityChange} />} />
            </Routes>
          </div>

        </BrowserRouter>
      </div>
    )



  }
}
export default App




