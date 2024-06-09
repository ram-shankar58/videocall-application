// import React, {createContext, useState, useRef, useEffect} from "react";
// import { io } from "socket.io-client";
// import Peer from 'simple-peer';

// const SocketContext = createContext();

// const socket=io('http://localhost:5000'); //pass url of deployed server later

// const ContextProvider = ({children})=>{
//     const [stream, setStream] = useState();
//     const myVideo = useRef();
//     const [me, setMe]=useState("");
//     const[call, setCall]=useState({});
//     const [callAccepted, setCallAccepted]=useState(false);
//     const[callEnded, setCallEnded]=useState(false);
//     const userVideo = useRef();
//     const connectionRef=useRef();
//     const[name, setName]=useState('');

//     useEffect(() =>{
//         navigator.mediaDevices.getUserMedia({video:true, audio:true}).then((currentStream)=>{
//             setStream(currentStream);
//             myVideo.current.srcObject=currentStream
// ; //ew set to ref which populate our video iframe;
//         });
//         socket.on('me',(id)=> setMe(id)); //we listen for the me action
//         socket.on('calluser', ({from, name:callerName, signal})=>{
//             setCall({isReceivingCall: true, from, name:callerName, signal});
            
//         });
//     }, []); //we have empty dependencyarray becuse else its always gonna run
    
//     const answerCall=()=>{
//         setCallAccepted(true);

//         const peer=new Peer({initiator: false, trickle: false, stream});
//         peer.on('signal', (data)=>{
//             socket.emit('answercall', {signal: data, to:call.from})
//         });

//         peer.on('stream', (currentStream)=>{
//             userVideo.current.srcObject=currentStream;
//         });

//         peer.signal(call.signal);

//         connectionRef.current=peer;

//     }

//     const callUser = (id) =>{
//         const peer=new Peer({initiator: true, trickle: false, stream});
//         peer.on('signal', (data)=>{
//             socket.emit('calluser', {userToCall:id, signalData: data, from:me, name})
//         });

//         peer.on('stream', (currentStream)=>{
//             userVideo.current.srcObject=currentStream;
//         });

//         socket.on('callaccepted', (signal)=>{
//             setCallAccepted(true);
//             peer.signal(signal);
//         });
//         connectionRef.current=peer;
//     }

//     const leaveCall = () =>{

//         setCallEnded(true);
//         connectionRef.current.destroy(); //stops from user audio and camera

//         window.location.reload(); //gives a new id after ending call 


//     }

//     return (
//         //everythignwe give in as value is globally accepible
//         <SocketContext.Provider value={{
//             call,
//             callAccepted,
//             myVideo,
//             stream,
//             name,
//             setName,
//             callEnded,
//             me,
//             callUser,
//             leaveCall,
//             answerCall,
//         }}>
//             {children}
//         </SocketContext.Provider>
//     );
// };

// export {ContextProvider, SocketContext};

import React, { createContext, useState, useRef, useEffect } from 'react';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';

const SocketContext = createContext();

 const socket = io('http://localhost:5000');

const ContextProvider = ({ children }) => {
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [stream, setStream] = useState();
  const [name, setName] = useState('');
  const [call, setCall] = useState({});
  const [me, setMe] = useState('');

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);

        myVideo.current.srcObject = currentStream;
      });

    socket.on('me', (id) => setMe(id));

    socket.on('callUser', ({ from, name: callerName, signal }) => {
      setCall({ isReceivingCall: true, from, name: callerName, signal });
    });
  }, []);

  const answerCall = () => {
    setCallAccepted(true);

    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on('signal', (data) => {
      socket.emit('answerCall', { signal: data, to: call.from });
    });

    peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    peer.signal(call.signal);

    connectionRef.current = peer;
  };

  const callUser = (id) => {
    const peer = new Peer({ initiator: true, trickle: false, stream });

    peer.on('signal', (data) => {
      socket.emit('callUser', { userToCall: id, signalData: data, from: me, name });
    });

    peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    socket.on('callAccepted', (signal) => {
      setCallAccepted(true);

      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);

    connectionRef.current.destroy();

    window.location.reload();
  };

  return (
    <SocketContext.Provider value={{
      call,
      callAccepted,
      myVideo,
      userVideo,
      stream,
      name,
      setName,
      callEnded,
      me,
      callUser,
      leaveCall,
      answerCall,
    }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { ContextProvider, SocketContext };

