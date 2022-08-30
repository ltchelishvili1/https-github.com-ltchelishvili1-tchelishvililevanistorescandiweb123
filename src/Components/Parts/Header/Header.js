import React from "react";
import './Header.css'
import CircleIcon from '../../Assets/Circle Icon.png'
import { Link } from "react-router-dom";
class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],

        }

    }

    componentDidMount() {
        this.setState({
            items: this.props.categories
        })

    }
    render() {
        return (
            <div className="mainCont" id="sidebar">
                <p className="catName">{this.props.category.toUpperCase()}</p>
                <div className="cont" id="item">

                    {this.state.items.filter((product) => (
                        product.name == this.props.category
                    )).map(filteredName => (
                        filteredName.products.map((product) => (
                            <Link to={`/${product.id}`} key={`qw${product.id}`} style={{ textDecoration: "none", color: "black" }}>
                                <div className="container" id="list_item">

                                    <div className={product.inStock == true ? "item imagenonstock" : "item"}>
                                        <div className="itcont">
                                            {product.inStock == true ? <img className="image " src={product.gallery[0]} />
                                                : <img className="image " src={product.gallery[0]} />}
                                            {product.inStock == false ? <div className="middle">
                                                <img src={CircleIcon} onClick={(e) => {
                                                    e.preventDefault()
                                                    { console.log(product) }
                                                    this.props.handleCart(product, null, null, true)
                                                }} style={{ maxWidth: "60px", maxHeight: "60px" }} alt="" />
                                            </div> : null}
                                            {product.inStock == true ?
                                                <div className="asdf"> <p className="outofstock">Out Of Stock</p></div>
                                                : <div> <p className="outofstock outofstockhide">Out Of Stock</p></div>}
                                        </div>
                                        <p style={{ fontSize: "18px", fontWeight: "300" }}> {product.name}</p>
                                        <p style={{ fontSize: "18px", fontWeight: "500" }} >Price :  {product.prices.filter((item) =>
                                            (item.currency.label == localStorage.getItem("currency"))
                                        ).map((x) =>
                                        (<span key={`1234dsf${x.amount}`}>
                                            {x.currency.symbol}{x.amount.toFixed(2)}</span>
                                        )
                                        )
                                        }</p>


                                    </div>


                                </div>

                            </Link>

                        ))


                    ))}

                </div>
            </div>
        )



    }
}
export default Header
