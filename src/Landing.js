import React, { PureComponent } from 'react';
import BitfinexLogo from './images/bitfinex.png';
import BittrexLogo from './images/bittrex.png';
import GdaxLogo from './images/gdax.png';
import CryptopiaLogo from './images/cryptopia.png';

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
            <img src={CryptopiaLogo} alt="Cryptopia" />
          </div>
        </div>

      </div>
    );
  }
}

export default Landing;
