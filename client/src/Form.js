import React, {Component} from 'react';

class Form extends Component {
  state = {
    name: 'Max',
    message: 'Hello',
  };
  submit = event => {
    event.preventDefault();
    if (!this.state.message) {
      return;
    }
    this.props.sendMessage(this.state.name, this.state.message);
    this.setState({
      message: '',
    });
  };
  render() {
    return (
      <form onSubmit={this.submit}>
        <div style={{flex: 0, height: 30, display: 'flex'}}>
          <input
            className="qa-name"
            style={{height: '100%'}}
            onChange={e => this.setState({name: e.target.value})}
            value={this.state.name}
          />
          <input
            className="qa-message"
            style={{flex: 1, height: '100%'}}
            onChange={e => this.setState({message: e.target.value})}
            value={this.state.message}
          />
          <button>Send message</button>
        </div>
      </form>
    );
  }
}

export default Form;
