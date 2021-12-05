const express = require('express');
const socket = require('socket.io');
const { ExpressPeerServer } = require('peer');
const groupCallHandler = require('./groupCallHandler');
const { v4: uuidv4 } = require('uuid')

let PORT = 5000;

const app = express();


const server = app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
    console.log(`http://localhost:${PORT}`)
});

// Peer Server
const peerServer = ExpressPeerServer(server, {
    debug: true
});

app.use('/peerjs', peerServer);

const io = socket(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

let peers = [];
let groupCallRooms = [];

console.log({peers}, 'Server');

const broadcastEventTypes = {
    ACTIVE_USERS: 'ACTIVE_USERS',
    GROUP_CALL_ROOMS: 'GROUP_CALL_ROOMS'
}

// Group call server
groupCallHandler.createPeerServerListeners(peerServer)

// const broadcastEvent = {
//     event: broadcastEventTypes.ACTIVE_USERS,
//     activeUsers: peers
// }

io.on('connection', (socket) => {
    socket.emit('connection', null);
    console.log('New user connection');
    console.log(socket.id);

    // Listening for new register users
    socket.on('register-new-user', (data) => {
        peers.push({
            username: data.username,
            socketId: data.socketId
        });
        console.log('registered new user');


        io.sockets.emit('broadcast', {
            event: broadcastEventTypes.ACTIVE_USERS,
            activeUsers: peers
        });

        io.sockets.emit('broadcast', {
            event: broadcastEventTypes.GROUP_CALL_ROOMS,
            groupCallRooms
        });
    });

    // Listening for when a user disconnect
    socket.on('disconnect', () => {
        peers = peers.filter(peer => peer.socketId !== socket.id);
        groupCallRooms = groupCallRooms.filter(groups => groups.socketId !== socket.id);
        console.log({peers});
        console.log({groupCallRooms});
        io.sockets.emit('broadcast', {
            event: broadcastEventTypes.ACTIVE_USERS,
            activeUsers: peers
        });
        io.sockets.emit('broadcast', {
            event: broadcastEventTypes.GROUP_CALL_ROOMS,
            groupCallRooms
        });
        console.log('User disconnected');
    });

    // Listening for direct calls
    socket.on('pre-offer', (data) => {
        console.log('pre-offer handled');
        io.to(data.callee.socketId).emit('pre-offer', {
            callerUsername: data.caller.username,
            callerSocketId: socket.id
        });
    });

    // Listening for answers
    socket.on('pre-offer-answer', (data) => {
        console.log('pre-offer answer');
        io.to(data.callerSocketId).emit('pre-offer-answer', {
            answer: data.answer
        });
    });

    // Listening for WEBRTCOffer
    socket.on('webRTC-offer', (data) => {
        console.log('handling webRTC offer');
        io.to(data.calleeSocketId).emit('webRTC-offer', {
            offer: data.offer
        })
    });

    // Listening for WEBRTCAnswer
    socket.on('webRTC-answer', (data) => {
        console.log('handling webRTC answer');
        io.to(data.callerSocketId).emit('webRTC-answer', {
            answer: data.answer
        })
    });

    // Listening for WebRTCCandidate
    socket.on('webRTC-candidate', (data) => {
        console.log('handling ice candidate');
        io.to(data.connectedUserSocketId).emit('webRTC-candidate', {
            candidate: data.candidate
        });
    });

    // Listening for WebRTC Video Hangup
    socket.on('user-hanged-up', (data) => {
        console.log('User hanged up the call');
        io.to(data.connectedUserSocketId).emit('user-hanged-up');
    });

    // Listeners related to group call
    socket.on('reg-group-call', (data) => {
        const roomId = uuidv4();
        socket.join(roomId);
        groupCallRooms.push({
            hostName: data.username,
            peerId: data.id,
            socketId: socket.id,
            roomId: roomId
        });

        io.sockets.emit('broadcast', {
            event: broadcastEventTypes.GROUP_CALL_ROOMS,
            groupCallRooms
        });
    });

    //Listeners to join/request gorup call join
    socket.on('user-request-groupcall-join', (data) => {
        io.to(data.roomId).emit('user-request-groupcall-join', {
            peerId: data.peerId,
            streamId: data.streamId
        });
        socket.join(data.roomId);
    });

});