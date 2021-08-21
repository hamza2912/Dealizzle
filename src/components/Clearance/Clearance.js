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
                        <h2 class="heading">Clearances</h2>
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

                                                        <span className="price">AED {item.location_data[1] != null ? item.discounted_retail_selling_price : null}</span>



                                                        <span className="discount"><del>AED {item.location_data[1] != null ? item.retail_selling_price : null}</del><span style={{ color: 'red' }}> {((item.discounted_retail_selling_price / item.retail_selling_price) * 100).toFixed(2)}% OFF</span></span>


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