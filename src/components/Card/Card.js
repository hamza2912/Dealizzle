import classes from './Card.module.scss';
import CloseIcon from '@material-ui/icons/Close';
import { useEffect, useState } from 'react';
const Card = (props) => {
    const [prodetail, setProdetail] = useState();
    const [otp, setOtp] = useState(false);
    const [total, setTotal] = useState(0);
    let sum = 0;
    let s_cost = 0;
    let proDetail = JSON.parse(localStorage.getItem("details"));
    if (proDetail == null) {
        proDetail = []
    }
    const orderConfirmHandler = () => {
        setOtp(true);
    }
    const orderSubmitHandler = () => {
        setOtp(false);
    }
    const removeHandler = (indexx) => {
        console.log("chalra hon");
        console.log(indexx)
        let valProduct = proDetail.filter((val, index) => index !== indexx);
        console.log(valProduct)
        localStorage.setItem("details", JSON.stringify(valProduct));
        proDetail = valProduct;
        setProdetail(true)
    }
    let val = proDetail.map((value, index) => {
        sum += (+value[5] * +value[1])
        // return <div style={{ backgroundColor: 'white', padding: '1rem', marginBottom: '1rem', display: 'flex' }}>
        //     <div style={{ textAlign: 'right' }}>
        //         <CloseIcon fontSize="large" style={{ color: 'black', }} />

        //     </div>
        //     <div style={{ padding: '1rem 0 ' }}>
        //         <img style={{ height: '100px', marginRight: '2rem' }} src={value[6]} />
        //         <h2>{value[0]}</h2>
        //         <h3>Price:{value[5]}</h3>
        //         <h3>Quantity:{value[1]}</h3>

        //     </div>
        // </div>


        return <div className={classes.subCard}>
            <div style={{ textAlign: 'right' }}>
                <CloseIcon style={{ color: 'black' }} onClick={removeHandler.bind(this, index)} />
            </div>
            <div style={{ display: 'flex' }}>

                <img style={{ height: '100px' }} src={value[6]} />
                <div style={{ padding: '1rem' }}>
                    <h2>{value[0]}</h2>
                    <h3>Price : {value[5]} AED</h3>
                    <h3>Quantity : {value[1]}</h3>
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
                <CloseIcon fontSize="large" style={{ color: 'white' }} onClick={props.close} />
                <div className={classes.mobile}>
                    <h1 style={{ color: 'white', margin: '1rem' }}>Cart</h1>
                    {proDetail.length != 0 ?
                        <div style={{ overflow: 'auto' }}>

                            {val}
                        </div> : <h3 style={{ textAlign: 'center', color: 'white' }}>No Product Added</h3>
                    }
                    {proDetail.length !== 0 ?
                        <div className={classes.buttonn}>
                            <hr />
                            {proDetail.length == 0 ? null : proDetail.length == 1 ? < h3 style={{ color: 'white' }} >Shipping  Cost: {s_cost = 50} AED</h3> : <h3 style={{ color: 'white' }}>Free Shipping</h3>}
                            <h2 style={{ color: 'white' }}>Total :{sum + s_cost} AED</h2>
                            {!otp && <button className={classes.button} onClick={orderConfirmHandler}>Confirm Order</button>}
                            {otp && <div style={{ marginTop: '1rem' }}>
                                <input style={{ width: '100%', padding: '0.5rem', borderRadius: '0.5rem', fontSize: 'medium' }} type="text" placeholder="OTP" />
                                <button className={classes.button}>Submit Order</button>
                            </div>}
                            <button className={classes.buttonss} onClick={() => { window.location.replace(window.location.origin + "/home"); }}>Add Products</button></div> : null
                    }

                </div>
            </div >
        </div >
    )
}
export default Card;

