import React from 'react'
import './chatPage.css';
import NewPrompt from '../../components/newPrompt/NewPrompt';

export default function ChatPage() {
  return (
    <div className="chatPage">
      <div className="wrapper">
        <div className="chat">
          <div className="message">Test message from ai</div>
          <div className="message user">Test message from user Lorem 
            ipsum dolor sit amet consectetur adipisicing
             elit. Deleniti, enim! Nostrum, dicta. 
             Alias earum vitae aliquam repellat harum 
             obcaecati ad soluta. Nobis expedita ullam aperiam quidem
           </div>
          <div className="message">Test message from ai</div>
          <div className="message user">Test message from user </div>
          <div className="message">Test message from ai</div>
          <div className="message user">Test message from user</div>
          <div className="message">Test message from ai</div>
          <div className="message user">Test message from user </div>
          <div className="message">Test message from ai</div>
          <div className="message user">Test message from user</div>
          <div className="message">Test message from ai</div>
          <div className="message user">Test message from user </div>
          <div className="message">Test message from ai</div>
          <div className="message user">Test message from user</div>
          <div className="message">Test message from ai</div>
          <div className="message user">Test message from user </div>
          <div className="message">Test message from ai</div>
          <div className="message user">Test message from user</div>
          <div className="message">Test message from ai</div>
          <div className="message user">Test message from user </div>
          <NewPrompt />
        </div>
      </div>
    </div> 
  )
}
