import React, { Component } from 'react';
import HomeIcon from '@material-ui/icons/Home';
import { NavLink } from 'react-router-dom';
import './styles.scss';
class Header extends Component {
  state = {
    activeIndex: null
  }
  constructor(props) {
    super(props);
    
  }
  handleClick = (index) => this.setState({ activeIndex: index });
  render() {

    return (

        <nav className="  text-center title top_header_span" className="navbar navbar-dark ">
        <NavLink className="nav-link" exact={true} to="/home">
        <img className=" image_settings" src={process.env.PUBLIC_URL + '/New_Dealiz.png'} />
        </NavLink>
          <ul className="nav nav-tabs">
            <li>
              <NavLink className="nav-link" exact={true} to="/home" activeClassName="active">new arrival</NavLink>
            </li>
            <li>
              <NavLink className="nav-link" exact={true} to="/text" activeClassName="active">TextField</NavLink>
            </li>
          </ul>

        </nav>
     

    )
  }
}

export default Header;