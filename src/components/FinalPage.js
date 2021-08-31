import React from 'react'
import { useLocation } from "react-router-dom";
import classes from './FinalPage.module.scss'
function FinalPage(props) {
    let location = useLocation();

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginTop: '15rem', padding: '2rem', textAlign: "center" }}>
            <h1 style={{ marginBottom: '2rem', color: 'green', fontWeight: "600" }}>Order has been placed Successfully</h1>
            <h3>Dear Customer, Thank you for your order. Your order number is: {location.state.key}</h3>
            {location.state.delivery ?
                <h3>Your order will be delivered between <span style={{ color: 'red' }}>{location.state.date} </span> between 9 am till 5 Pm</h3> :
                <h3>Your order will be delivered between <span style={{ color: 'red' }}>{location.state.date2} </span>between 9 am till 5 Pm</h3>
            }
            <h3>Thank you for shopping with us</h3>
            <button className={classes.buttonss} onClick={() => { window.location.replace(window.location.origin + "/home"); }}>Go Home</button>



        </div>
    )
}

export default FinalPage
