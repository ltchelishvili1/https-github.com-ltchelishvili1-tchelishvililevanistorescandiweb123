
import React from 'react'
import "./Card.css"
import DOMPurify from 'dompurify';
class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clickedImage: this.props.product.gallery[0],
            atts: [],
            newAtt: {},
            clickedAttribute: false,
            showMore: false
        }
    }

    setAttributes1 = (x, y) => {
        const temp = this.state.newAtt

        {
            this.state.atts.map((t) => (
                temp[x.name] = y.value
            ))
        }
        this.setState({
            newAtt: temp,
            clickedAttribute: true
        })

    }
    componentDidMount() {
        const temp = []
        this.props.product.attributes.map((z) => (
            temp.push(z.id)
        ))
        this.setState({ atts: temp })

    }
    render() {
        return (
            <div className='card'>
                <div className='lcontent'>
                    {
                        this.props.product.gallery.map((img) => (
                            <img key={`werthgfd${img}`} className="lcontentimg" onClick={() => this.setState({ clickedImage: img })} src={img} alt="" />
                        ))
                    }
                </div>
                <div className='rcontent'>
                    <div className='rcontentimg'>

                        <img src={this.state.clickedImage} alt="img" />
                    </div>
                    <div className="cardleft">

                        <p className="caritembrand">{this.props.product.brand}</p>
                        <p style={{ transform: "translateY(-50%)" }} className="caritemname">{this.props.product.name}</p>


                        {this.props.product.attributes.map((att) => (
                            <div key={`sxadfsdasdsa${att.name}234r${this.props.product.tempp}`}>

                                <div className="size">
                                    <div >
                                        {att.type == "text" ?
                                            <div >
                                                <p>{att.name}</p>
                                                <div className="size">
                                                    {att.items.map((it) => (

                                                        <div key={`sxcvxadsa${it.value}2we3dd${this.props.product.tempp}`} className="sizecont">
                                                            <button style={this.state.newAtt[att.id] == it.value ? { backgroundColor: "black", color: "white", cursor: "pointer" } : { cursor: "pointer" }} onClick={() => this.setAttributes1(att, it)} value={it.value} key={it.id}>{it.value}</button>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                            : null
                                        }
                                    </div>
                                    <div  >
                                        {att.type == "swatch" ?
                                            <div>
                                                <p>COLOR:</p>
                                                <div style={{ display: "flex", paddingRight: ".3rem" }}>
                                                    {att.items.map((it) => (
                                                        <div key={`sxa345yt3dsa${it.value}${this.props.product.tempp}`} style={{ paddingRight: ".5rem" }}>
                                                            <div onClick={() => this.setAttributes1(att, it)
                                                            } style={this.state.newAtt[att.id] == it.value ? { backgroundColor: `${it.value}`, cursor: "pointer", border: " 3px solid #5ECE7B", transform: "translateY(-8%)" } : { backgroundColor: `${it.value}`, cursor: "pointer" }} className="swatchrect" value={it.value} key={it.id}></div>

                                                        </div>))}
                                                </div>
                                            </div>
                                            : null
                                        }
                                    </div>

                                </div>

                            </div>


                        ))}
                        <p style={{ fontSize: "15px", }} className="caritemprice">PRICE:</p>
                        <p className="caritemprice">
                            {this.props.product.prices.filter((item) =>
                                (item.currency.label == localStorage.getItem("currency"))
                            ).map((x) =>
                            (<span key={`sfa${x.amount}fds${this.props.product.tempp}dssd`}>
                                {x.currency.symbol}{x.amount.toFixed(2)}</span>)
                            )
                            }
                        </p>
                        <div id='msg' style={{ display: "none" }}><p style={{ color: "orangered", paddingLeft: "1rem" }}>NO ITEM IN INVENTORY</p></div>
                        <div id='msg1' style={{ display: "none" }}><p style={{ color: "orangered", paddingLeft: "1rem" }}>ALREADY IN CART</p></div>
                        <button className='btncart'  onClick={() => {
                            this.props.handleCart(this.props.product, this.state.newAtt, this.state.atts)
                        }}>Add to cart</button>
                       {this.props.product.description.length>100? 
                        this.state.showMore ?
                            <div>
                                <p style={{ maxWidth: "300px" }} dangerouslySetInnerHTML={{
                                    __html: DOMPurify.sanitize(this.props.product.description)
                                }}></p>
                                <button onClick={()=> this.setState({
                                    showMore: !this.state.showMore
                                })} style={{ border: "none", background: "transparent", cursor: "pointer", float: "right" }}>SEE LESS</button>
                            </div> :
                            <div>
                                <p style={{ maxWidth: "300px" }} dangerouslySetInnerHTML={{
                                    __html: DOMPurify.sanitize(this.props.product.description).substring(0, 100)
                                }}></p>
                                <button onClick={()=> this.setState({
                                    showMore: !this.state.showMore
                                })} style={{ border: "none", background: "transparent", cursor: "pointer", float: "right" }}>SEE MORE</button>
                            </div>

                        
                       : <p style={{ maxWidth: "300px" }} dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(this.props.product.description)
                    }}></p>}

                    </div>


                </div>
            </div>
        )



    }
}
export default Navbar

