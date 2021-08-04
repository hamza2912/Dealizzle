import React from 'react';
import './styles.scss';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from "react-redux";
import { getProducts, setProduct } from '../../js/actions'
import { Dropdown, DropdownButton, Form, Col, Row } from 'react-bootstrap';
import * as yup from 'yup';
import { Formik, Field, ErrorMessage } from 'formik';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Close from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import RefreshIcon from '@material-ui/icons/Refresh';

const schema = yup.object().shape({
  fullName: yup.string().required(),
  mobile: yup.string().required(),
  emirates: yup.string().required(),
  deliveryAddress: yup.string().required()
});

class ProductPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      size: null, color: null, design: null, quantity: 1, infoModal: false,
      fullName: "",
      mobile: "",
      emirates: "",
      deliveryAddress: ""
    }


  }



  componentDidMount = () => {
    const { product } = this.props;
  }

  handleSelect = (event, attr) => {
    this.setState({ [attr]: event });
  }

  handleCloseModal = () => {
    this.setState({ infoModal: false })
  }

  handleQuantityChange = (e) => {
    this.setState({ quantity: e.target.value })
  }
  handleSubmit = (e) => {
    console.log(e)
  }
  handleOpen = () => {
    this.setState({ infoModal: false })
  };

  handleClose = () => {
    this.setState({ infoModal: false })
  };

  disabledCheck = async () => {
    const { product } = this.props;
    let def = false;

    for (var i = 0; i < product.product_attributes.length; i++) {
      if (this.state[product.product_attributes[i]] === null) {
        def = false;
        break;
      }
      else {
        def = true;
      }
    }
    if (def) {
      this.setState({ infoModal: true })
    }
  }
  render() {
    const { product } = this.props;
    // console.log(this.state);
    return (
      <>
        <div className="card2">
          <div className="container-fliud">
            <div className="wrapper row">
              <div className="preview col-md-5">
                <div id='carousel-custom' className='carousel slide' data-ride='carousel'>
                  <div className='carousel-outer'>

                    <div className='carousel-inner'>

                      <div className='item active'>
                        <img src={'http://office21.dealizle.com/uploads/productImages/' + product.image_name[0].name} alt='' width="100%" />
                      </div>
                      {
                        product.image_name.map((pr, index) => {
                          if (index !== 0) {
                            return (
                              <div className='item'>
                                <img src={'http://office21.dealizle.com/uploads/productImages/' + pr.name} alt='' width="100%" />
                              </div>
                            )
                          }
                          else return null;
                        })
                      }

                    </div>

                    <a className='left carousel-control' href='#carousel-custom' data-slide='prev'>
                      <span className='glyphicon glyphicon-chevron-left'></span>
                    </a>
                    <a className='right carousel-control' href='#carousel-custom' data-slide='next'>
                      <span className='glyphicon glyphicon-chevron-right'></span>
                    </a>
                  </div>

                  <ol className='carousel-indicators'>
                    <li data-target='#carousel-custom' data-slide-to='0' className='active'><img src={'http://office21.dealizle.com/uploads/productImages/' + product.image_name[0].name} alt='' style={{ width: "50%" }} /></li>
                    {
                      product.image_name.map((pr, index) => {
                        if (index !== 0) {
                          return (
                            <li data-target='#carousel-custom' data-slide-to={index}><img src={'http://office21.dealizle.com/uploads/productImages/' + pr.name} alt='' style={{ width: "50%" }} /></li>
                          )
                        }
                        else return null;
                      })
                    }

                  </ol>
                </div>


              </div>
              <div className="details col-md-4">
                <h3 className="product-title">{product.product_name}</h3>
                <h4 className="product-sku">SKU: <span className="product-sub-title">{product.product_sku}</span></h4>
                <p className="product-description">{product.product_description !== null ? product.product_description : ""}</p>

                {
                  product.location_data[1].discounted_price == 0 ?
                    <h4 className="price">As low as: <span>AED {product.location_data[1].selling_price}</span></h4> :
                    <h4 className="price">As low as: <span className="strike">AED {product.location_data[1].selling_price}</span> <span>AED {product.location_data[1].discounted_price}</span></h4>
                }

                {
                  product.facebook_status[1].status === "Live" ?
                    <h4 className="stock">In Stock</h4> :
                    <h4 className="stock">Out of Stock</h4>
                }

                {
                  product.product_configuration === "configurable" ?
                    (<>
                      {product.product_attributes.map(attr => {
                        return (
                          <>

                            <FormControl variant="outlined"   >

                              <InputLabel className="product-select" htmlFor="select-options">{attr}</InputLabel>
                              <Select className="product-select" style={{ width: '50%', height: "80%" }}
                                labelId={attr}
                                id="dropdown-basic-button"
                                label={attr}
                                value={this.state[attr] != null ? this.state[attr] : null}
                                onChange={(evt) => { this.handleSelect(evt.target.value, attr) }}
                              >

                                <MenuItem value="">
                                  <em>None</em>
                                </MenuItem>
                                {product[attr].map(e => {
                                  return <MenuItem value={e.text}>{e.text}</MenuItem>
                                })}
                              </Select>
                            </FormControl>
                          </>)
                      })
                      }
                    </>
                    )
                    : null
                }

                <Form.Label className="stock">Quantity</Form.Label>

                <Form.Control
                  className="quantity"
                  required
                  type="number"
                  placeholder="Quantity"
                  defaultValue={this.state.quantity}
                  onChange={this.handleQuantityChange}
                  style={{ width: '70px', marginBottom: "1%", height: "5%" }}
                />

                <div className="action">

                  <button className="add-to-cart btn btn-default btn-lg" type="button" onClick={this.disabledCheck}><AddShoppingCartIcon /> Order Now</button>
                </div>
              </div>
              <div className="details col-md-">
                <ul className="desktop-services" >
                  <li>
                    <div className="service-content">
                      <div className="service-icon service1" ><RefreshIcon className="icon"  /><span className="hidden">Icon</span></div>
                      <div className="service-info">
                        <h4>FREE RETURNS REPLACEMENT</h4>
                        <p>Get Free returns Replacement on eligible items</p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="service-content">
                      <div className="service-icon service1" ><em className="fa fa-truck"><span class="hidden">Icon</span></em></div>
                      <div className="service-info">
                        <h4>TRUSTED SHIPPING</h4>
                        <p>Free shipping when you spend 200 and above</p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="service-content">
                      <div className="service-icon service1" ><em className="fa fa-lock"><span className="hidden">Icon</span></em></div>
                      <div className="service-info">
                        <h4>Buy With Confidence</h4>
                        <p>A website recommended by Gulf News for shoppping</p>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>



        <Dialog open={this.state.infoModal} onClose={() => { this.setState({ infoModal: false }) }} aria-labelledby="form-dialog-title">

          <DialogTitle id="form-dialog-title"><span className="product-order-title"> Order Details</span></DialogTitle>
          <DialogContent>
            <Formik
              validationSchema={schema}
              onSubmit={this.handleSubmit}
              initialValues={{
                fullName: '',
                mobile: '',
                emirates: '',
                deliveryAddress: '',
              }}
            >
              {({
                handleSubmit,
                handleChange,
                handleBlur,
                values,
                touched,
                isValid,
                errors,
              }) => (
                <Form noValidate onSubmit={handleSubmit}>
                  <Row className="mb-3">
                    <Form.Group as={Col} md="12" controlId="validationFormik01">
                      <Form.Label className="product-order" >First name</Form.Label>
                      <Form.Control
                        size="lg"
                        type="text"
                        name="fullName"
                        value={values.fullName}
                        onChange={handleChange}
                        isValid={touched.fullName && !errors.fullName}
                      />
                      <Form.Control.Feedback type="invalid" className="product-order">
                        {errors.fullName}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} md="12" controlId="validationFormik01">
                      <Form.Label className="product-order" >Mobile</Form.Label>
                      <Form.Control
                        size="lg"
                        type="text"
                        name="mobile"
                        value={values.mobile}
                        onChange={handleChange}
                        isValid={touched.mobile && !errors.mobile}
                      />
                      <Form.Control.Feedback type="invalid" className="product-order">
                        {errors.mobile}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} md="12" controlId="validationFormik01">
                      <Form.Label className="product-order"  >Emirates</Form.Label>
                      <Form.Control
                        size="lg"
                        type="text"
                        name="emirates"
                        value={values.emirates}
                        onChange={handleChange}
                        isValid={touched.emirates && !errors.emirates}
                      />
                      <Form.Control.Feedback type="invalid" className="product-order">
                        {errors.emirates}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} md="12" controlId="validationFormik01">
                      <Form.Label className="product-order"  >Delivery Address</Form.Label>
                      <Form.Control
                        size="lg"
                        type="text"
                        name="deliveryAddress"
                        value={values.deliveryAddress}
                        onChange={handleChange}
                        isValid={touched.deliveryAddress && !errors.deliveryAddress}
                      />
                      <Form.Control.Feedback type="invalid" className="product-order">
                        {errors.deliveryAddress}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Row>
                  <Button className="product-button-primary" variant="contained" color="primary" type="submit" onClick={this.handleSubmit} style={{ marginRight: "1%" }}>Confirm Order</Button>
                  <Button className="product-button" variant="contained" style={{ marginRight: "1%" }}>
                    Add More
                  </Button>

                </Form>
              )}
            </Formik>
          </DialogContent>
          <DialogActions>

            <IconButton className="product-button-close" variant="contained" color="secondary" onClick={this.handleCloseModal}>
              <Close />
            </IconButton>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getProducts: payload => dispatch(getProducts(payload)),
    setProduct: payload => dispatch(setProduct(payload))
  }
}
const mapStateToProps = state => {
  const data = localStorage.getItem('product_data');
  var result = null
  if (state.product == null) {
    result = JSON.parse(data)
  }
  else {
    result = state.product
  }
  return {
    product: result
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);


