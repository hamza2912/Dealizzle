import React from 'react';
import './styles.scss';
import { connect } from 'react-redux';
import { getProducts, setProduct, addProduct, addProductLocal } from '../../js/actions'
import Card from '../Card/Card';
import classNames from 'classnames';

class LandingPage extends React.Component {
  constructor(props) {
    super(props);

    if (this.props.products.length > 1) {
      this.state = { products: this.props.products, skip: this.props.products.length * 12, loading: false, val: true }
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
      this.props.getProducts(skip + 12);

      this.setState({ skip: skip + 12 });

    }


  }
  componentDidMount() {
    console.log("landingPage")
    if (this.props.products.length < 1) {
      this.props.getProducts(0);
    }
    let valueeee = JSON.parse(localStorage.getItem('name'));
    if (valueeee !== null) {

      this.props.addProductLocal(valueeee);
      console.log(valueeee)

    }
    this.setState({ val: !this.state.val })




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

          <div className='w-full h-auto px-3 lg:px-0'>
              <img src="home-banner.jpg" alt="" />
          </div>

          <div className='w-full px-5 mt-10'>
              <h2 className='text-center top-categories'>Top Categories</h2>
              <div className='w-full border-b-2 mt-3 mb-5'></div>
              <div className='w-full lg:w-1/4 mx-auto grid grid-cols-2 gap-4'>
                <a href="/home" className='cursor-pointer'>
                  <div className='flex flex-col items-center'>
                    <div className='w-full h-auto p-1 border-2'>
                      <img className='w-full h-auto' src="new-arrival.jpg" alt="" />
                    </div>
                    <p className='top-title'>New Arrival</p>
                  </div>
                </a>
                <a href="/clearnece" className='cursor-pointer'>
                  <div className='flex flex-col items-center'>
                    <div className='w-full h-auto p-1 border-2'>
                      <img className='w-full h-auto' src="clearance.jpg" alt="" />
                    </div>
                    <p className='top-title'>Clearance</p>
                  </div>
                </a>
              </div>
              {/* <div className='w-full border-b-2 mt-3'></div> */}
          </div>

          <div className='mt-5'>
            <h2 class="heading">New Arrival</h2>
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
                              <span className="price" style={{ marginTop: '1.5rem' }}>{item.location_data[1] != null ? <div>{"AED " + item.discounted_retail_selling_price}<del style={{ color: "rgb(161, 156, 156)", fontSize: '1.5rem', fontWeight: 400 }}>{"AED " + item.retail_selling_price}</del></div> : null}</span>
                              <div style={{ color: 'red', fontWeight: 300, fontSize: "14px" }}>{((item.discounted_retail_selling_price / item.retail_selling_price) * 100).toFixed(2) + "% OFF"}</div>


                            </div>
                            {/* <span className="discount"><del>AED {item.location_data[1] != null ? item.retail_selling_price : null}</del></span> */}


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
            
          <div className='w-90 mx-auto h-auto footer mt-16'>
            <div className='w-full footer-logo h-auto py-12 lg:py-24 px-6'>
              <img src="New_Dealiz.png" alt="" />
            </div>
            <div className='flex flex-col mt-5 pl-2'>
              <p className='text-white text-4xl'>Address</p>
              <p>Ajman Media City Free Zone, A-63-01-01-12, Flamingo. UAE</p>
              <p>info@dealizzle.com</p>
              <div className='w-full border-b mb-5'></div>
              <p className='text-center'>Copyright © 2021-Dealizle. All rights reserved. </p>
            </div>
          </div>

        </div>
      </>
    )

  }
}
const mapDispatchToProps = dispatch => {
  return {
    getProducts: payload => dispatch(getProducts(payload)),
    setProduct: payload => dispatch(setProduct(payload)),
    addProduct: payload => dispatch(addProduct(payload)),
    addProductLocal: payload => dispatch(addProductLocal(payload)),
  }
}
const mapStateToProps = state => {
  return {
    products: state.products
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
