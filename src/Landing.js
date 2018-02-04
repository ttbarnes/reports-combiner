import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import BitfinexLogo from './images/bitfinex.png';
import BittrexLogo from './images/bittrex.png';
import GdaxLogo from './images/gdax.png';

export class Landing extends PureComponent {
  render() {
    return (
      <div className="landing align-center">

        <div className="hero-intro">
          <h2>Merge all the things</h2>
        </div>

        <p><small>...Currently supporting...</small></p>
        <div className="exhanges-list">
          <div>
            <img src={BitfinexLogo} alt="Bitfinex" />
          </div>
          <div>
            <img src={BittrexLogo} alt="Bittrex" />
          </div>
          <div>
            <img src={GdaxLogo} alt="GDAX" />
          </div>
          <div>
            <p>Cryptopia</p>
          </div>
        </div>

        <p><Link to="/summary" className="button">Go to summary</Link></p>

      </div>
    );
  }
}

export default Landing;
