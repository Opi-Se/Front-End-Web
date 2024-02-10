import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"

import { joinMatchRoom, listenToLeaveRoom, listenToMatchRequestApproved } from "../store/match-slice";
import { joinUserRoom, listenToShowNotificationMark } from "../store/user-slice";
import { listenToEndToSessionRequest, listenToReceiveMedia, listenToReceiveMessage, listenToReplyToSessionRequest, listenToStartChatSession } from "../store/chat-slice";

const useGeneralSocket = () =>
{
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const isHavePartner = !!useSelector((state) => state.auth?.userData?.partnerId?._id);
    const partnerId = useSelector((state) => state.auth?.userData?.partnerId?._id);

    // handle all general sockets (app root sockets)
    useEffect(() =>
    {
        //if logged in sockets
        if (isLoggedIn)
        {
            //-- user module
            dispatch(joinUserRoom());

            dispatch(listenToShowNotificationMark());
            // ______________________________

            // -- Match module

            //listen to MatchRequestApproved
            dispatch(listenToMatchRequestApproved());
        }

        //if have partner sockets
        if (isHavePartner)
        {
            //-- Match module

            // join match room
            dispatch(joinMatchRoom());

            //listen to if the other partner un match me 
            dispatch(listenToLeaveRoom());
            // ______________________________

            //-- chat module

            //Messages listener
            dispatch(listenToReceiveMessage());

            //Media listener
            dispatch(listenToReceiveMedia(partnerId));

            //Session listener
            dispatch(listenToStartChatSession());
            dispatch(listenToReplyToSessionRequest());
            dispatch(listenToEndToSessionRequest());
            // ______________________________

        }

    }, [dispatch, isHavePartner, isLoggedIn, partnerId])
}
export default useGeneralSocket