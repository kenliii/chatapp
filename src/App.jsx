import React from 'react';
import {StreamChat} from 'stream-chat';
import {Chat} from 'stream-chat-react';
import Cookies from 'universal-cookie';

import { ChannelListContainer, ChannelContainer, Auth } from './components'

import './App.css'

const cookies = new Cookies();

const apiKey = 'qqb9v45f55vc';

const authToken = cookies.get("token");

const client = StreamChat.getInstance(apiKey);

if(authToken) {
  client.connectUser({
        id: cookies.get('userId'),
        name: cookies.get('username'),
        image: cookies.get('avatarURL'),
        fullName: cookies.get('fullName'),
        phoneNumber: cookies.get('phoneNumber'),
        hashedPassword: cookies.get('hashedPassword'),
        }, authToken)
}

const App = () => {

  if(!authToken) return <Auth />

  return (
    <div className='app__wrapper'>
        <Chat client={client} theme="team light">
            <ChannelListContainer 
                
            />
            <ChannelContainer 

            />
        </Chat>
    </div>
  )
}

export default App