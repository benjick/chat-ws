import React, {Component} from 'react';

class ChildComponent extends Component {
  render() {
    return <button onClick={this.props.changeSomething}>Change state</button>;
  }
}

export default ChildComponent;
