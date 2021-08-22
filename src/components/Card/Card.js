import classes from './Card.module.scss';
import CloseIcon from '@material-ui/icons/Close';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { LocalConvenienceStoreOutlined } from '@material-ui/icons';
const Card = (props) => {
    const [prodetail, setProdetail] = useState(true);
    const [otp, setOtp] = useState(false);
    const [total, setTotal] = useState(0);
    let model;
    let sum = 0;
    let quantity = 0;
    let sumProCost = 0;
    let s_cost = 0;
    let proDetail = JSON.parse(localStorage.getItem("details"));
    let c_details = JSON.parse(localStorage.getItem("name"));
    console.log("Customer details")
    console.log(c_details);
    if (proDetail == null) {
        proDetail = []
    }
    const orderConfirmHandler = () => {
        setOtp(true);
    }
    const orderSubmitHandler = () => {
        console.log("Basit")
        console.log(order_data)
        setOtp(false);
        model = {
            "order_quantity": quantity,
            "order_price": sum,
            "order_cost": sumProCost,
            "location_id": '5f8be51e3277577ba1b84d2c',
            "location_name": c_details["c_city"],
            "delivery_charge": s_cost,
            "customer_details": {
                "customer_name": c_details["c_fullName"],
                "customer_address": c_details["c_delivery"],
                "customer_city": c_details["c_erim"],
                "contact_number": c_details["c_phone"],
            },
            "order_data": order_data
        }
        console.log("model")
        console.log(model)
        axios.post('http://office21.dealizle.com/api/store/order/guests/create', {
            "models": model
        })
            .then(function (response) {
                console.log("response");
                console.log(response);
                localStorage.removeItem("details");
                props.close()
                alert("Dear Customer, Thank you for your order. Your order number is " + response.data.order_number)
            })
            .catch(function (error) {
                console.log("error");
                console.log(error);
                alert(error)
            });
    }
    const removeHandler = (indexx) => {
        console.log("chalra hon");
        console.log(indexx)
        let valProduct = proDetail.filter((val, index) => index !== indexx);
        console.log(valProduct)
        localStorage.setItem("details", JSON.stringify(valProduct));
        proDetail = valProduct;
        setProdetail(!prodetail)
    }
    let order_data = []
    let delivery = false;
    let date;
    let date2;
    let val = proDetail.map((value, index) => {
        if (value[16] == true) {
            delivery = true;
            date = value[17]
        }
        date2 = value[17]
        sum += (+value[6] * +value[7])
        quantity += value[6];
        sumProCost += (+value[6] * +value[8])
        order_data.push({
            "product_name": value[0],
            "product_id": value[1],
            "parent_id": value[2],
            "product_sku": value[3],
            "parent_sku": value[4],
            "image_name": value[15],
            "order_quantity": value[6],
            "available_quantity": 0,
            "product_price": value[7],
            "product_cost": value[8],
            "supplier_id": value[9],
            "supplier_name": value[10],
            "size_id": value[11],
            "size_name": value[12],
            "color_id": value[13],
            "color_name": value[14],
            "design_id": "",
            "design_name": "",
            "location_id": "5f8be51e3277577ba1b84d2c",
            "location_name": "DUBAI",
            "entry_type": "Order"
        })

        return <div className={classes.subCard}>
            <div style={{ textAlign: 'right' }}>
                <CloseIcon style={{ color: 'black' }} onClick={removeHandler.bind(this, index)} />
            </div>
            <div style={{ display: 'flex' }}>

                <img style={{ height: '100px', width: '80px' }} src={value[5]} />
                <div style={{ padding: '0rem 1rem' }}>
                    <h2>{value[0]}</h2>
                    <h5 className={classes.fontSemibold}>Price : {value[7]} AED</h5>
                    <h5 className={classes.fontSemibold}>Quantity : {value[6]}</h5>
                    <h5 className={classes.fontSemibold}>Size : {value[12]}</h5>
                    <h5 className={classes.fontSemibold}>Color : {value[14]}</h5>
                </div>

            </div>
        </div>
    })


    console.log(proDetail)
    console.log("Baasit")
    return (
        <div>
            <div style={{ width: '100%', height: '100%', position: 'fixed', backgroundColor: "rgba(0,0,0,0.5)", zIndex: '10' }}></div>
            <div className={`${classes.Card} ${classes.Open}`}>
                <CloseIcon fontSize="large" style={{ color: 'black' }} onClick={props.close} />
                <div className={classes.mobile}>
                    <h1 style={{ color: 'black', margin: '1rem' }}>Cart</h1>
                    {proDetail.length != 0 ?
                        <div className='cartProducts'>

                            {val}
                        </div> : <h3 style={{ textAlign: 'center', color: 'black' }}>No Product Added</h3>
                    }
                    {proDetail.length !== 0 ?
                        <div style={{ padding: "0rem 1rem"}} className={classes.buttonn}>
                            <hr />
                            {delivery ? <h4 className={classes.fontSemibold} style={{ color: 'black' }}>Estimated Delivery time <span style={{ color: 'red' }}>{date}</span> between 9 am till 5 Pm</h4> : <h4 className={classes.fontSemibold} style={{ color: 'black' }}>Estimated Delivery time <span style={{ color: 'red' }}>{date2}</span> between 9 am till 5 Pm</h4>}
                            {proDetail.length == 0 ? null : proDetail.length == 1 ? <div style={{ display: "flex"}}>< h3 className={classes.marginTop2} style={{ color: '#545353' }} >Shipping: <span className={classes.fontSemibold} style={{ color: 'black' }}>{s_cost = 50} AED</span></h3><h3 className={classes.fontSemibold} style={{ backgroundColor: '#FFEC00', color: 'black', padding: "6px", fontSize: "8px", height: "22px", borderRadius: "5px",marginLeft: "10px", marginTop: "18px"}}> <span style={{ color: 'red' }}>Buy More</span> and Save Shipping Cost</h3></div> : <h3 className={classes.marginTop2} style={{ color: '#545353' }}>Shipping: <span className={classes.fontSemibold} style={{ color: '#24b124' }}>Free</span></h3>}
                            <h3 style={{ color: '#545353' }}>VAT: <span className={classes.fontSemibold} style={{ color: 'black' }}>{sum + s_cost}5% AED</span></h3>
                            <h3 style={{ color: '#545353' }}>Total: <span className={classes.fontSemibold} style={{ color: 'black' }}>{sum + s_cost} AED</span></h3>
                            <div style={{position: "absolute", bottom: "0", left: "0", padding: "20px"}}>
                            {!otp && <button className={classes.button} onClick={orderConfirmHandler}>Confirm Order</button>}
                            {otp && <div style={{ marginTop: '1rem' }}>
                                <h3 style={{ color: 'black' }}>Enter OTP Code:</h3>
                                <input style={{ width: '100%', padding: '0.5rem', borderRadius: '0.5rem', fontSize: 'medium' }} type="text" placeholder="OTP" />
                                <button className={classes.button} onClick={orderSubmitHandler}>Submit Order</button>
                            </div>}
                            {!otp && <button className={classes.buttonss} onClick={() => { window.location.replace(window.location.origin + "/home"); }}>Add Products</button>}</div></div> : null
                    }

                </div>
            </div >
        </div >
    )
}
export default Card;

