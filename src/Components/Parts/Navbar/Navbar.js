
import React from 'react'
import { request, gql } from 'graphql-request';
import companyLogo from "../../Assets/Icon.png"
import cartIcon from '../../Assets/Empty Cart.png'
import { Link } from 'react-router-dom';
import './Navbar.css'
const getBooks = gql`
  {
    categories {
      name
    }
  }
`;
class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isSelected: false,
            count: 0,

        }
    }
    componentDidMount() {
        localStorage.setItem("currency", "USD")
        localStorage.setItem("curcurrency", "$")
    }

    render() {


        return (
            <nav className='navbar'>
                <div className='navbar-left-content'>
                    {
                        this.props.categories.map((category) => (

                            <Link key={category.name} onClick={() => this.setState({ categoryClass: "1234" })} style={{ textDecoration: "none", color: "black", fontWeight: "300" }} to={`category=${category.name}`}>
                                <p className={window.location.pathname.includes(category.name) || (window.location.pathname.length < 2 && category.name == "all") ? "categoryName1" : "categoryName"} key={category.name}
                                >{category.name.toUpperCase()}
                                </p>
                            </Link>

                        ))
                    }
                </div>
                <div className='navbar-mid-content'>
                    <Link to="/"><img src={companyLogo} alt="logo" /></Link>
                </div>
                <div className='navbar-right-content' >
                    <div className='currency' style={{ paddingTop: ".8rem" }} >
                        <select onChange={(e) => {
                            localStorage.setItem("currency", JSON.parse(e.target.value).currencylabel)
                            localStorage.setItem("curcurrency", JSON.parse(e.target.value).currencysymbol)
                            this.props.reRender()
                        }} style={{ zoom: "1.5", maxWidth: "30.5px", }} onClick={() => {
                            this.setState({ isSelected: !this.state.isSelected })

                        }
                        }>
                            {
                                this.props.currencies.map((currency) => (

                                    <option key={currency.symbol} style={{ zoom:0.8}} value={`{"currencylabel":"${currency.label}","currencysymbol":"${currency.symbol}"}`} placeholder={currency.symbol} >
                                        {currency.symbol}{currency.label}
                                    </option>
                                ))

                            }
                        </select>
                    </div>

                    <div style={{ display: "flex", alignItems: "center" }} onClick={() => this.props.displayCart()}>
                        <img src={cartIcon} className="cart" alt="cart" />
                        {this.props.getCartItems ? <span className='cartlength'><p>{this.props.getCartItems.length}</p></span> : <span className='cartlength'>0</span>}
                    </div>
                   
                   
                </div>
                <div className='lines' style={{  alignItems: "center" }} onClick={() => this.props.displayCart()}>
                        <img src={cartIcon} className="cart" alt="cart" />
                        {this.props.getCartItems ? <span className='cartlength'><p>{this.props.getCartItems.length}</p></span> : <span className='cartlength'>0</span>}
                    </div>
            </nav>
        )



    }
}
export default Navbar

