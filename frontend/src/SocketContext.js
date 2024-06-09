import React, {createContext, useState, useRef, useEffect} from "react";
import { io } from "socket.io/client";
import Peer from 'simple-peer';

const SocketContext = createContext();

const socket=io('http://localhost:5000'); //pass url of deployed server later

const ContextProvider = ({children})=>{
    const [stream, setStream] = useState(null);
    const myVideo = useRef();
    const [me, setMe]=useState("");
    const[call, setCall]=useState(null);
    const [callAccepted, setCallAccepted]=useState(false);
    const[callEnded, setCallEnded]=useState(false);

    useEffect(() =>{
        navigator.mediaDevices.getUserMedia({video:true, audio:true}).then((currentstream)=>{
            setStream(currentstream);
            myVideo.current.srcObject=currentStream
; //ew set to ref which populate our video iframe;
        });
        socket.on('me',(id)=> setImmediate(id)); //we listen for the me action
        socket.on('calluser', ({from, name:callerName, signal})=>{
            setCall({isReceivedCall: true, from, name:callerName, signal})
            
        });
    }, []); //we have empty dependencyarray becuse else its always gonna run
    
    const answercall=()=>{
        setCallAccepted(true);

        const peer=new Peer({initiator: false, trickle: false, stream});

    }

    const callUser = () =>{

    }

    const leaveCall = () =>{

    }
}

