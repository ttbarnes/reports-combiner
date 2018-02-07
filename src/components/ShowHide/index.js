import React , { Component } from 'react';

class ShowHide extends Component {
  constructor() {
    super();
    this.state = {
      childVisible: false
    }
  }

  onClick() {
    this.setState({
      childVisible: !this.state.childVisible
    });
  }

  render() {
    const {
      name,
      integrated
    } = this.props;
    return (
      <div className={this.state.childVisible ? 'show-hide-exchange active' : 'show-hide-exchange'}>
        <div className="cta">
          <button
            onClick={() => this.onClick()}
            className="button-link block"
          >
            <h3>
              {name}
              {integrated ?
                <i className="lnr lnr-checkmark-circle" />
              :
                <i className="lnr lnr-cross-circle" /> 
              }
            </h3>
          </button>
        </div>

          <div className="content">
            {this.props.children}
          </div>

      </div>
    )
  }

};

export default ShowHide;
