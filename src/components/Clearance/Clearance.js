import React from 'react';
import './styles.scss';
import { connect } from 'react-redux';
import { getProducts, setProduct, addProduct, addProductLocal, getClearneceProducts } from '../../js/actions'
import Card from '../Card/Card';

class Clearance extends React.Component {
    constructor(props) {
        super(props);
        if (this.props.products.length > 1) {
            this.state = { products: this.props.products, skip: this.props.products.length * 12, loading: false }
        } else {
            this.state = { products: [], skip: 12, loading: false }
        }
    }

    componentDidUpdate = (prevProps) => {
        if (prevProps.products !== this.props.products) {
            this.setState({ products: this.props.products })
        }
    }

    handleNavigation = (e) => {
        const { skip } = this.state;

        if (e.target.scrollingElement.scrollTop + e.target.scrollingElement.clientHeight >= e.target.scrollingElement.scrollHeight) {
            this.props.getClearneceProducts(skip + 12);

            this.setState({ skip: skip + 12 });

        }


    }
    componentDidMount() {
        console.log("Clearence")
        if (this.props.products.length < 1) {
            this.props.getClearneceProducts(0);
        }
        let valueeee = JSON.parse(localStorage.getItem('name'));
        if (valueeee !== null) {

            this.props.addProductLocal(valueeee);
            console.log(valueeee)
        }



        // this.setState({ scroll: window.scrollY })
        window.addEventListener("scroll", (e) => this.handleNavigation(e));

    }

    productsPage = (product) => {
        localStorage.setItem('product_data', JSON.stringify(product));
        this.props.setProduct(product);
        this.props.history.push(`/product/${product._id}`);
    }

    render() {
        const { products } = this.state;
        return (
            <>
                {/* <Card /> */}
                <div className="container-fluid">

                    <div>
                        <h2 class="heading">Clearance Sale</h2>
                    </div>
                    <div className="row justify-content-md-center" style={{ marginLeft: "10px", marginRight: "10px" }}>

                        {
                            products.length > 0 ? (
                                products.map((product, index) => {

                                    return product.data.map((item, index) => {
                                        return (

                                            <div className="col-lg-3 col-md-4 col-sm-6 mix sale" style={{ display: "inline-block" }} data-bound="">

                                                <div className="single_product">
                                                    <div className="product_image">
                                                        <img onClick={() => this.productsPage(item)} src={'http://office21.dealizle.com/uploads/productImages/' + item.image_name[0].name} alt="" />
                                                        <div className="box-content">
                                                            {/* <a href="#"><i className="fa fa-heart"></i></a> */}
                                                            <a onClick={() => this.productsPage(item)}><i className="fa fa-cart-plus"></i></a>
                                                        </div>
                                                    </div>

                                                    <div className="product_btm_text product_text">
                                                        <h4><a onClick={() => this.productsPage(item)}>{item.product_name}</a></h4>
                                                        {/* <div className="p_rating">
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                        </div> */}
                                                        {/* {item.product_description == "" ? <p>A good product available in different colors and sizes</p> : <p>{item.product_description}</p>} */}
                                                        <div className="forMobile">
                                                            <div className="price" style={{ marginTop: '1.5rem' }}>{item.location_data[1] != null ? <div>{"AED " + item.discounted_retail_selling_price}<del style={{ color: "rgb(161, 156, 156)", fontSize: '1.5rem', fontWeight: 400 }}>{"AED " + item.retail_selling_price}</del></div> : null}</div>
                                                            <div style={{ color: 'red', fontWeight: 300, fontSize: "14px" }}>{((item.discounted_retail_selling_price / item.retail_selling_price) * 100).toFixed(2) + "% OFF"}</div>

                                                        </div>

                                                    </div>
                                                </div>

                                            </div>
                                        )
                                    })
                                })
                            )
                                : null
                        }
                    </div>
                </div>
            </>
        )

    }
}
const mapDispatchToProps = dispatch => {
    return {
        getClearneceProducts: payload => dispatch(getClearneceProducts(payload)),
        setProduct: payload => dispatch(setProduct(payload)),
        addProduct: payload => dispatch(addProduct(payload)),
        addProductLocal: payload => dispatch(addProductLocal(payload)),
    }
}
const mapStateToProps = state => {
    return {
        products: state.clearProducts
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Clearance);
