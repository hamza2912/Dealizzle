import classes from './Card.module.scss';
import CloseIcon from '@material-ui/icons/Close';
import { useEffect, useState } from 'react';
const Card = (props) => {
    const [prodetail, setProdetail] = useState();
    let proDetail = JSON.parse(localStorage.getItem("details"));
    if (proDetail == null) {
        proDetail = []
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
                    <h3>Price : {value[5]}</h3>
                    <h3>Quantity : {value[1]}</h3>
                </div>

            </div>
        </div>
    })


    console.log(proDetail)
    console.log("Baasit")
    return (
        <div className={`${classes.Card} ${classes.Open}`}>
            <CloseIcon fontSize="large" style={{ color: 'white' }} onClick={props.close} />
            <div className={classes.mobile}>
                <h1 style={{ color: 'white', margin: '1rem' }}>Card</h1>
                {proDetail.length != 0 ?
                    <div style={{ overflow: 'auto' }}>

                        {val}
                    </div> : <h3 style={{ textAlign: 'center', color: 'white' }}>No Product Added</h3>
                }
                {proDetail.length !== 0 ?
                    <div className={classes.buttonn}>
                        <hr />
                        <h2 style={{ color: 'white' }}>Total :</h2>
                        <button className={classes.button}>Confirm Order</button></div> : null}

            </div>
        </div >
    )
}
export default Card;

