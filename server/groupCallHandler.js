const createPeerServerListeners = (peerServer) => {
    peerServer.on('connection', (client) => {
        console.log('Successfully connected to peerjs server');
        console.log('peer server ID',client.id);
    });

};

// export default ;
module.exports = {
    createPeerServerListeners
}