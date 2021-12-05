import React from "react";
import { useSelector } from "react-redux";


import { callStates } from "../../../store/actions/call";
import { createGroupCall } from "../../../utils/webRTC/webRTCGroupCallHandler";
import GroupCallButton from "../GroupCallButton/GroupCallButton";
import GroupCallRoom from "../GroupCallRoom/GroupCallRoom";

const GroupCall = () => {
  const localStream = useSelector(state => state.call.localStream);
  const callState = useSelector(state => state.call.callState);
  const groupCallActive = useSelector(state => state.call.groupCallActive);

  const createRoom = () => {
      createGroupCall();
  };

  return (
    <>
      {(!groupCallActive && localStream && callState !== callStates.CALL_IN_PROGRESS) && (
        <GroupCallButton onClickHandler={createRoom} label={"Create room"} />
      )}
      {groupCallActive && <GroupCallRoom />}
    </>
  );
};

export default GroupCall;
