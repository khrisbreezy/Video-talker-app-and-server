import { callStates, setCallState, setGroupCallActive } from "../../store/actions/call";
import store from "../../store/store";
import { registerGroupCall, userWantsToJoinGroupCall } from "../wssConnection/wssConnection";

let mypeer;
let peerID;

export const connectWithPeer = () => {
    mypeer = new window.Peer(undefined, {
        path: '/peerjs',
        host: '/',
        port: '5000'
    });

    mypeer.on('open', (id) => {
        peerID = id;
        console.log(`Succesfully connected with peer server with id: ${id}`);
    });

    mypeer.on('call', (call) => {
        call.answer(getLocalStream());
        call.on('stream', incomingStream => {
            console.log('Stream inconing');
        });
    });
};

const getLocalStream = () => {
    return store.getState().call.localStream;
};

export const createGroupCall = () => {
    registerGroupCall({
        username: store.getState().dashReducer.username,
        id: peerID
    });
    store.dispatch(setGroupCallActive(true));
    store.dispatch(setCallState(callStates.CALL_IN_PROGRESS));
};

export const joinGroupCall = (hostSocketId, roomId) => {
    const localStream = getLocalStream();
    userWantsToJoinGroupCall({
        peerId: peerID,
        hostSocketId,
        roomId,
        streamId: localStream.id
    });
    store.dispatch(setGroupCallActive(true));
    store.dispatch(setCallState(callStates.CALL_IN_PROGRESS));
};

export const connectToNewUser = (data) => {
    const localStream = getLocalStream();
    const call = mypeer.call(data.peerId, localStream);

    call.on('stream', (incomingStream) => {
        console.log('Incoming stream');
    });
};

