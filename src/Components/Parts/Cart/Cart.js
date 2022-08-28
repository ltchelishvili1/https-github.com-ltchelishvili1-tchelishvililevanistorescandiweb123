import React from "react";
import './Cart.css'
import { Link } from "react-router-dom";
import Left from '../../Assets/left.png'
import Right from '../../Assets/right.png'
class Cart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showMore: false,

        }

    }

    imageChange = (cartItem, x) => {

        if (x == "+") {
            if (cartItem.imageId == cartItem.gallery.length - 1) {
                cartItem.imageId = 0
            } else {
                cartItem.imageId = cartItem.imageId + 1
            }
        }
        else if (x == "-") {
            if (cartItem.imageId == 0) {
                cartItem.imageId = cartItem.gallery.length - 1
            } else {
                cartItem.imageId = cartItem.imageId - 1
            }
        }
    }
    forceUpdateState = () => {
        this.forceUpdate()
    }


    getQuantityTotal = () => {
        return this.props.getCartItems
            .reduce((acc, value) => {

                return acc + value.quantity;
            }, 0);

    };


    render() {
        return (
            <div className="wholecart">

                <div style={{ padding: "2rem 9rem" }}>
                    <p className="cartname">CART</p>
                    <hr
                        style={{
                            border: ".1rem",
                            height: '1px',
                            background: '#E5E5E5'
                        }}
                    />
                    {this.props.getCartItems.length !== 0 ?
                        <>
                            {this.props.getCartItems.map((cartItem) => (
                                <div key={cartItem.tempp}>
                                    <div className="fullcart">
                                        <div className="cartleft">

                                            <p className="caritembrand">{cartItem.brand}</p>
                                            <p className="caritemname">{cartItem.name}</p>
                                            <p className="caritemprice">
                                                {cartItem.prices.filter((item) =>
                                                    (item.currency.label == localStorage.getItem("currency"))
                                                ).map((x) =>
                                                (<span key={x.amount + JSON.stringify(cartItem.tempp)}>
                                                    {x.currency.symbol}{x.amount.toFixed(2)}</span>)
                                                )
                                                }
                                            </p>

                                            {cartItem.attributes.map((att) => (

                                                <div key={JSON.stringify(att) + cartItem.tempp} >

                                                    <div className="size">
                                                        <div >
                                                            {att.type == "text" ?
                                                                <div >
                                                                    <p>{att.name}</p>
                                                                    <div className="size">

                                                                        {att.items.map((it) => (
                                                                            <div key={it.value + "234" + JSON.stringify(cartItem.tempp)} className="sizecont">

                                                                                <button style={cartItem[att.id] == it.value ? { backgroundColor: "black", color: "white" } : null} value={it.value} key={it.id}>{it.value}</button>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                                : null
                                                            }
                                                        </div>
                                                        <div >
                                                            {att.type == "swatch" ?
                                                                <div>
                                                                    <p>{att.name}</p>
                                                                    <div style={{ display: "flex", paddingRight: ".3rem" }}>
                                                                        {att.items.map((it) => (
                                                                            <div key={"2343i" + it.value + JSON.stringify(cartItem.tempp)} style={{ paddingRight: ".5rem" }}>

                                                                                <div style={cartItem[att.id] == it.value ? {
                                                                                    backgroundColor: `${it.value}`, border: " 2px solid #5ECE7B",
                                                                                    boxSizing: "border-box",
                                                                                } : { backgroundColor: `${it.value}` }} className="swatchrect" value={it.value} key={it.id}>{ }</div>

                                                                            </div>))}
                                                                    </div>
                                                                </div>
                                                                : null
                                                            }
                                                        </div>
                                                    </div>

                                                </div>

                                            ))}

                                        </div>
                                        <div className="cartright">
                                            <div className="quantity">
                                                <p className="qchange" style={{ cursor: "pointer" }} onClick={() => {
                                                    this.props.quantityChange(cartItem, 1)
                                                    this.props.reRender()
                                                }}>+</p>
                                                <p >{cartItem.quantity} {this.state.rerender}</p>
                                                <p className="qchange" style={{ cursor: "pointer" }} onClick={() => {
                                                    this.props.quantityChange(cartItem, 2)
                                                    this.props.reRender()
                                                }}>-</p>

                                            </div>
                                            <div>
                                                <div className="cartimage">

                                                    <img src={cartItem.gallery[cartItem.imageId]} alt="cartimage" />
                                                </div>
                                                {
                                                    cartItem.gallery.length > 1 ?
                                                        <div className="arrowcont">
                                                            <img src={Right} onClick={() => {
                                                                this.imageChange(cartItem, "+")
                                                                this.forceUpdateState()
                                                            }} className='arrow' alt="cartimage" />
                                                            <img src={Left} onClick={() => {
                                                                this.imageChange(cartItem, "-")
                                                                this.forceUpdateState()
                                                            }} className="arrow" alt="cartimage" />

                                                        </div> :
                                                        null
                                                }
                                            </div>


                                        </div>

                                    </div>
                                    <hr
                                        style={{
                                            border: ".1rem",
                                            height: '1px',
                                            background: '#E5E5E5'
                                        }}
                                    />
                                </div>
                            ))}
                            <div>
                                <p className="tax">Tax {this.props.tax}%:<span style={{ marginLeft: "1rem" }}>{localStorage.getItem("curcurrency")}{(this.props.getCartTotal() * this.props.tax / 100).toFixed(2)}</span></p>
                                <p className="totalquantity">Quantity: <span>{this.getQuantityTotal()}</span> </p>
                                <p className="totalprice">Total: <span >{localStorage.getItem("curcurrency")}{this.props.getCartTotal()}</span> </p>
                                <button className='btnorder' >ORDER</button>
                            </div>
                        </>
                        : <>
                            <p style={{ fontSize: "35px", fontWeight: "500" }}>Cart Is Empty</p>
                            <Link style={{ textDecoration: "none" }} to={'/'}>Return To Main Page</Link>

                        </>
                    }
                </div>

            </div>
        )



    }
}
export default Cart

