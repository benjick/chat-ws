/* eslint-disable no-underscore-dangle */
import React, {Component} from 'react';
import styled from 'styled-components';
import Divider from './Divider';

const Wrapper = styled.div`
  flex: 1;
  overflow-y: scroll;
`;

const Avatar = styled.img`
  border-radius: 50%;
  margin-right: 25px;
  flex: 0;
  height: 50px;
  width: 50px;
`;

const Username = styled.div`
  font-size: 0.8em;
  text-transform: uppercase;
  font-weight: bolder;
`;

const Text = styled.div`
  font-size: 1.2em;
`;

class Messages extends Component {
  componentDidUpdate = () => {
    this.messagesRef.current.scrollTop = this.messagesRef.current.scrollHeight;
  };
  messagesRef = React.createRef();
  render() {
    return (
      <Wrapper innerRef={this.messagesRef}>
        {this.props.messages.map(message => (
          <React.Fragment key={`message-${message._id}`}>
            <div style={{display: 'flex'}}>
              <Avatar
                alt="User avatar"
                src={`http://i.pravatar.cc/50?u=${message.name}`}
              />
              <div style={{display: 'flex', flexDirection: 'column'}}>
                <Username>{message.name}:</Username>
                <Text>{message.string}</Text>
              </div>
            </div>
            <Divider />
          </React.Fragment>
        ))}
      </Wrapper>
    );
  }
}

export default Messages;
