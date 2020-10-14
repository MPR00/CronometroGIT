import React from 'react';
import Cronometro from './cronometro/Cronometro';
import Relogio from './relogio/Relogio';
import Temporizador from './temporizador/Temporizador';

import Header from './Header/Header';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      active: 'cronometro'
    }

    this.handleSetActive = this.handleSetActive.bind(this);
  }

  handleSetActive(active) {
    this.setState({ active })
  }

  render() {
    if (this.state.active === 'cronometro') {
      return (
        <div className="menu">
          <Cronometro />
          <Header active={this.state.active} handleSetActive={this.handleSetActive} />
        </div>
      );
    }

    if (this.state.active === 'relogio') {
      return (
        <div className="menu">
          <Relogio />
          <Header active={this.state.active} handleSetActive={this.handleSetActive} />
        </div>
      );
    }

    return (
      <div className="menu">
        <Temporizador />
        <Header active={this.state.active} handleSetActive={this.handleSetActive} />
      </div>
    );
  }
}

export default App;
