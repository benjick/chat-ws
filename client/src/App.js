import React, {Component} from 'react';
import Messages from './Messages';
import Form from './Form';
import './style.css';

class App extends Component {
  state = {
    messages: [],
  };
  componentDidMount() {
    const ws = new WebSocket('ws://localhost:8080');
    ws.addEventListener('message', message => {
      const parsed = JSON.parse(message.data);
      if (parsed.type === 'message') {
        this.setState(state => ({
          messages: [...state.messages, parsed].slice(-20),
        }));
      }
      if (parsed.type === 'history') {
        this.setState({
          messages: parsed.messages,
        });
      }
    });
    this.ws = ws;
  }
  sendMessage = (name, string) => {
    const message = {
      type: 'message',
      name,
      string,
    };
    this.ws.send(JSON.stringify(message));
  };
  render() {
    return (
      <div style={{display: 'flex', flexDirection: 'column', height: '90vh'}}>
        <Messages messages={this.state.messages} />
        <Form sendMessage={this.sendMessage} />
      </div>
    );
  }
}

export default App;
