import React from 'react';
import {StreamChat} from 'stream-chat';
import {Chat} from 'stream-chat-react';
import Cookies from 'universal-cookie';
import { useState } from 'react';

import { ChannelListContainer, ChannelContainer, Auth } from './components'

import './App.css'
import 'stream-chat-react/dist/css/index.css';

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
  const [createType, setCreateType] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  if(!authToken) return <Auth />

  return (
    <div className='app__wrapper'>
        <Chat client={client} theme="team light">
            <ChannelListContainer 
                isCreating={isCreating}
                setIsCreating={setIsCreating}
                setCreateType={setCreateType}
                setIsEditing={setIsEditing}
            />
            <ChannelContainer 
                isCreating={isCreating}
                setIsCreating={setIsCreating}
                setIsEditing={setIsEditing}
                isEditing={isEditing} 
                createType={createType}
            />
        </Chat>
    </div>
  )
}

export default App