import classes from './Card.module.scss';
import { useState } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import { connect } from "react-redux";
import { removeProduct } from '../../js/actions'
const Card = (props) => {
    localStorage.setItem("name", JSON.stringify(props.productList));
    const productRemovehandler = (value) => {

        console.log(props.removeProduct(value));
    }
    let valuee = 0;
    let name = props.productList.map((value, index) => {
        valuee += value.p_price
        return (
            <div className={classes.subCard}>
                <div style={{ textAlign: 'right' }}>
                    <CloseIcon key={index} style={{ color: 'black', }} onClick={productRemovehandler.bind(this, index)} />
                </div>
                <div style={{ display: 'flex' }}>

                    <img style={{ height: '100px' }} src={value.p_image} />
                    <div style={{ padding: '1rem' }}>
                        <h2>{value.p_name}</h2>
                        <h3>Price : {value.p_price}</h3>
                        <h3>Quantity : {value.p_quantity}</h3>
                    </div>

                </div>
            </div>
        )
    })

    console.log(valuee);

    return (
        <div className={`${classes.Card} ${classes.Open}`}>
            <CloseIcon fontSize="large" style={{ color: 'white' }} onClick={props.close} />
            <div className={classes.mobile}>
                <h1 style={{ color: 'white', margin: '1rem' }}>Card</h1>
                {props.productList.length != 0 ?
                    <div style={{ overflow: 'auto' }}>

                        {name}
                    </div> : <h3 style={{ textAlign: 'center', color: 'white' }}>No Product Added</h3>
                }
                {props.productList.length !== 0 ?
                    <div className={classes.buttonn}>
                        <hr />
                        <h2 style={{ color: 'white' }}>Total : {valuee}</h2>
                        <button className={classes.button}>Confirm Order</button></div> : null}

            </div>
        </div >
    )
}
const mapDispatchToProps = dispatch => {
    return {

        removeProduct: payload => dispatch(removeProduct(payload)),

    }
}
const mapStateToProps = state => ({
    productList: state.productList,

})


export default connect(mapStateToProps, mapDispatchToProps)(Card);

