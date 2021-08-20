import './Details.scss';
import React from 'react'
import { useState } from 'react';
import { classes } from 'istanbul-lib-coverage';
const Details = (props) => {
    const [btn1, setBtn1] = useState(true);
    const [btn2, setBtn2] = useState(false);
    // const [btn3, setBtn3] = useState(false);

    const btn1Handler = () => {
        setBtn1(true);
        setBtn2(false);
        // setBtn3(false);
    }
    const btn2Handler = () => {
        setBtn1(false);
        setBtn2(true);
        // setBtn3(false);
    }
    const btn3Handler = () => {
        setBtn1(false);
        setBtn2(false);
        // setBtn3(true);
    }

    let classes1 = btn1 ? "button aactive" : "button";
    let classes2 = btn2 ? "button aactive" : "button";
    // let classes3 = btn3 ? "button aactive" : "button";
    let details;
    if (btn1 === true) {
        details = <h3 >Delivery charges of AED 16 will be added to your total amount at the time of delivery
            Enter your delivery address and your correct mobile phone number at check out
            Delivery within 5 -7 working days from the time you place the order
            Delivery within city limits in the UAE
            Buy One Product Or 10, We charge AED 16 To Deliver All. We charge Per Delivery Not Per Item. Free Delivery Above AED 200
            If you have any questions related to this deal please contact 0566455348</h3>
    }
    else if (btn2 === true) {
        details = <h3>Size Available: 35, 36, 37, 38, 39, 40
            Colors Available: Pink, White, Black</h3>
    }
    // else if (btn3 === true) {
    //     details = <h3>
    //         Size Available: 35, 36, 37, 38, 39, 40
    //         Colors Available: Pink, White, Black
    //     </h3>
    // }

    return (
        <div style={{ height: '300px' }}>
            <div className="allButton">
                <button className={classes1} onClick={btn1Handler}>Fine Print</button>
                <button className={classes2} onClick={btn2Handler}>Description</button>
                {/* <button className={classes3} onClick={btn3Handler}>Size Guide</button> */}
            </div>
            <hr />
            {details}


        </div>
    )
}

export default Details
