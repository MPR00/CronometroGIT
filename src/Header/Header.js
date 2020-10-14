import React from 'react';
import './Header.css';

class Header extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    return (
      <div className="Header">
        <ul>
          <li onClick={event => this.props.handleSetActive('relogio')} className={this.props.active === 'relogio' ? 'active': ''}>
            Relógio
          </li>
          <li onClick={event => this.props.handleSetActive('cronometro')} className={this.props.active === 'cronometro' ? 'active': ''}>
            Cronômetro
          </li>
          <li onClick={event => this.props.handleSetActive('temporizador')} className={this.props.active === 'temporizador' ? 'active': ''}>
            Temporizador
          </li>
        </ul>
      </div>
    );
  }
}

export default Header;
