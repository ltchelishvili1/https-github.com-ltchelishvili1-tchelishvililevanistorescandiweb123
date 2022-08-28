import React from 'react'
import './CartOverlay.css'
import { Link } from 'react-router-dom';
class CartOverlay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  render() {
    return (
      <div className='shcart'>
        <div className='top-part'>

          <p className='cartoverlayname '>
            <strong style={{ fontSize: "16px" }} className='caritemprice'>My Bag,</strong >
            <span> {this.props.getCartItems.length} items</span>
          </p>
        </div>
        <div className='mid-part'>
          {this.props.getCartItems.length  ?
            <>
              {this.props.getCartItems.map((cartItem) => (
                <div key={`2dfb345${cartItem.tempp}`}>
                  <div className="fullcart" style={{ paddingBottom: "2rem" }}>
                    <div style={{ transform: "translateY(-10%)" }} className="cartleft cartleft1">
                      <p style={{ fontWeight: "300" }} className="caritembrand">{cartItem.brand}</p>
                      <p style={{ fontWeight: "300", maxWidth: "250px" }} className="caritemname">{cartItem.name}</p>
                      <p  className="caritemprice">
                        {
                        cartItem.prices.filter((item) =>
                          (item.currency.label == localStorage.getItem("currency"))
                        ).map((x) =>
                        (<span key={`sxadsa${x.amount}${cartItem.tempp}`}>
                          {x.currency.symbol}{x.amount.toFixed(2)}</span>)
                        )

                      }</p>
                      {cartItem.attributes.map((att) => (
                        <div  key={`sxasdxz${att.name}${cartItem.tempp}`}>
                          <div className="size">
                            <div >
                              {att.type == "text" ?
                                <div >
                                  <p>{att.name}</p>
                            
                                  <div className="size">
                                    {att.items.map((it) => (
                                      <div  key={`sssa${it.value}sfdgrdf${cartItem.tempp}`} className="sizecont">

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
                                  <p>COLOR:</p>
                                  <div style={{ display: "flex", paddingRight: ".3rem" }}>
                                    {att.items.map((it) => (
                                      <div  key={`sdsa${it.value}${cartItem.tempp}niojkp`} style={{ paddingRight: ".5rem" }}>
                                        <div style={cartItem[att.id] == it.value ? {
                                          backgroundColor: `${it.value}`, border: " 3px solid #5ECE7B",
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
                        <p className="qchange qchangesmall" style={{ cursor: "pointer" }} onClick={() => {
                          this.props.quantityChange(cartItem, 1)
                          this.props.reRender()
                        }}>+</p>
                        <p >{cartItem.quantity} {this.state.rerender}</p>
                        <p className="qchange qchangesmall" style={{ cursor: "pointer" }} onClick={() => {
                          this.props.quantityChange(cartItem, 2)
                          this.props.reRender()
                        }}>-</p>

                      </div>
                      <div className="cartimage">
                        <img src={cartItem.gallery[0]} alt="cartimage" />
                      </div>

                    </div>

                  </div>

                </div>
              ))}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <p className='totalprice totprice'> TOTAL:</p>
                <p className="totalprice totprice" >{localStorage.getItem("curcurrency")}{this.props.getCartTotal()}</p>
              </div>
              <div className='buttons' >
                <Link to="/cart"><button onClick={() => this.props.displayCart()} className='btn1'>VIEW BAG</button></Link>
                <button className='btn11'>CHECKOUT</button>
              </div>
            </>
            : <>
              <p style={{ fontSize: "35px", fontWeight: "500" }}>Cart Is Empty</p>
              <Link style={{ textDecoration: "none" }} to={'/'}>Return To Main Page</Link>

            </>
          }
        </div>
        <div className='bottom-part'>

        </div>
      </div>
    )
  }
}




export default CartOverlay

