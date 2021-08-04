import React from 'react';
import './styles.scss';
import { connect } from 'react-redux';
import { getProducts, setProduct } from '../../js/actions'

class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    if(this.props.products.length>1){
      this.state = { products: this.props.products,  skip: this.props.products.length*12,loading: false}
    }else{
      this.state = { products: [],  skip: 12,loading: false}
    }
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.products !== this.props.products ) {
      this.setState({ products: this.props.products })
    }
  }

  handleNavigation = (e) => {
    const { skip } = this.state;

      if (e.target.scrollingElement.scrollTop + e.target.scrollingElement.clientHeight >= e.target.scrollingElement.scrollHeight) {
        this.props.getProducts(skip + 12);
      
      this.setState({  skip: skip + 12 });
     
      }

  
  }
  componentDidMount() {
    if(this.props.products.length<1){
      this.props.getProducts(0);
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
      <div className="container-fluid">
         <div>
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
                        <span className="price">AED {item.location_data[1] != null ? item.location_data[1].selling_price : null}</span>

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
    )

  }
}
const mapDispatchToProps = dispatch => {
  return {
    getProducts: payload => dispatch(getProducts(payload)),
    setProduct: payload => dispatch(setProduct(payload))
  }
}
const mapStateToProps = state => {
  return {
    products: state.products
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
