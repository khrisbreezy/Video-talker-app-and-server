import React from 'react';
import { useSelector } from 'react-redux';

import ConversationButtons from '../ConversationButtons/ConversationButtons';

import './GroupCallRoom.css';

const GroupCallRoom = () => {

  const localMicrophoneEnabled = useSelector(state => state.call.localMicrophoneEnabled);
  const localCameraEnabled = useSelector(state => state.call.localCameraEnabled);
  const screenSharing = useSelector(state => state.call.screenSharing);

  return (
    <div className='group_call_room_container'>
      <span className='group_call_title'>Group Call</span>
      <div className='group_call_videos_container'>
        display the streams from the other users
      </div>
      <ConversationButtons
        localMicrophoneEnabled={localMicrophoneEnabled}
        localCameraEnabled={localCameraEnabled}
        screenSharing={screenSharing}
      />
    </div>
  );
};

export default GroupCallRoom;
