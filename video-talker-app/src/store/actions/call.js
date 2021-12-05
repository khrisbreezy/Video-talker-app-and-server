export const SET_LOCAL_STREAM = "SET_LOCAL_STREAM";
export const CALL_SET_STATE  = 'CALL_SET_STATE';
export const SET_CALLING_DIALOG = 'SET_CALLING_DIALOG';
export const  SET_CALLER_USERNAME = 'SET_CALLER_USERNAME';
export const SET_CALL_REJECTED = 'SET_CALL_REJECTED';
export const SET_REMOTE_STREAM = 'SET_REMOTE_STREAM';
export const SET_LOCAL_MICROPHONE_ENABLED = 'SET_LOCAL_MICROPHONE_ENABLED';
export const SET_LOCAL_CAMERA_ENABLED = 'SET_LOCAL_CAMERA_ENABLED';
export const SET_SCREEN_SHARING_ACTIVE = 'SET_SCREEN_SHARING_ACTIVE';
export const SET_RESET_CALL_DATA = 'SET_RESET_CALL_DATA';
export const SET_GROUP_CALL_ACTIVE = 'SET_GROUP_CALL_ACTIVE'

export const callStates = {
    CALL_UNAVAILABLE: 'CALL_UNAVAILABLE',
    CALL_AVAILABLE: 'CALL_AVAILABLE',
    CALL_REQUESTED: 'CALL_REQUESTED',
    CALL_IN_PROGRESS: 'CALL_IN_PROGRESS'
};


export const setLocalStream = (localStream) => ({
    type: SET_LOCAL_STREAM,
    localStream
});

export const setRemoteStream = (remoteStream) => ({
    type: SET_REMOTE_STREAM,
    remoteStream
})

export const setCallState = (callState) => ({
    type: CALL_SET_STATE,
    callState
});

export const setCallingDialog = (dialog) => ({
    type: SET_CALLING_DIALOG,
    dialog
});

export const setCallerUsername = (username) => ({
    type: SET_CALLER_USERNAME,
    username
});

export const setCallRejected = (rejectReason) => ({
    type: SET_CALL_REJECTED,
    rejectDetails: {
        rejection: rejectReason.rejection,
        reason: rejectReason.reason
    }
});

export const setLocalMicrophoneEnabled = (enabled) => ({
    type: SET_LOCAL_MICROPHONE_ENABLED,
    enabled
});

export const setLocalCameraEnabled = (enabled) => ({
    type: SET_LOCAL_CAMERA_ENABLED,
    enabled
});

export const setScreenSharingActive = (active) => ({
    type: SET_SCREEN_SHARING_ACTIVE,
    active
});

export const setResetCallData = () => ({
    type: SET_RESET_CALL_DATA
});

export const setGroupCallActive = (active) => ({
    type: SET_GROUP_CALL_ACTIVE,
    active
})