import React, { Component } from 'react';
import HomeIcon from '@material-ui/icons/Home';
import { NavLink } from 'react-router-dom';
import './styles.scss';
import Card from '../Card/Card';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
class Header extends Component {
  state = {
    activeIndex: null,
    card: false
  }
  constructor(props) {
    super(props);

  }
  handleClick = (index) => this.setState({ activeIndex: index });

  render() {

    return (
      <>

        <nav className="  text-center title top_header_span" className="navbar navbar-dark ">
          <NavLink className="nav-link" exact={true} to="/home">
            <img className=" image_settings" src={process.env.PUBLIC_URL + '/New_Dealiz.png'} />
          </NavLink>
          <ul className="nav nav-tabs">
            <li>
              <NavLink className="nav-link navstyle" exact={true} to="/home" activeClassName="active">new arrival</NavLink>
            </li>
            <li>
              <NavLink className="nav-link navstyle" exact={true} to="/clearnece" activeClassName="active">Clearances</NavLink>
            </li>
            <li>
              <a style={{ cursor: 'pointer' }} className="nav-link navstyle" onClick={this.props.open}><ShoppingBasketIcon fontSize="large" /></a>
            </li>
          </ul>

        </nav>

      </>
    )
  }
}

export default Header;