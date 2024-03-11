import React, { useContext, useEffect } from 'react'
import IncomingVideoCallUi from './IncomingVideoCallUi'
import CallContext from '../../../callStore/call-context';
import { useNavigate } from 'react-router-dom';

const IncomingVideoCall = () =>
{
    const { setIsAnswer, declineCall, call, myMedia, establishStream, stream, setCall } = useContext(CallContext);

    // establish stream (take permission & get video, audio)
    const navigate = useNavigate();
    const handleAnswer = () =>
    {
        navigate("/video");
        setCall(prev => ({ ...prev, isReceivingCall: false }))
        setIsAnswer(true)
    }

    useEffect(() =>
    {
        if (!stream) establishStream("video");
    }, [establishStream, stream])
    return (
        <IncomingVideoCallUi
            myMedia={myMedia}
            answerCall={handleAnswer}
            declineCall={declineCall}
            call={call}
            stream={stream}
        />
    )
}

export default IncomingVideoCall