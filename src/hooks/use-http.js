import { useState, useCallback, } from "react";
import { useSnackbar } from "notistack";
import { trimObject } from "../helpers/trimObject";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { backendUrl } from "../config";
const useHttp = () =>
{
    const [isLoading, setIsLoading] = useState(false);
    const { enqueueSnackbar: popMessage } = useSnackbar();
    const token = useSelector((state) => state.auth.token)
    const sendRequest = useCallback(async (requestConfig, applyData) =>
    {
        setIsLoading(true);
        const requestData = requestConfig?.contentType === "form-data" ? {
            method: requestConfig?.method ? requestConfig.method : "GET",
            headers: {
                'Authorization': 'Bearer ' + token,
            },
            body: requestConfig?.body
        } : {
            method: requestConfig?.method ? requestConfig.method : "GET",
            headers: {
                'Authorization': 'Bearer ' + token,
                "Content-Type": "application/json",
            },
            body: requestConfig.body ?
                JSON.stringify(trimObject(requestConfig.body)) :
                null
        }
        try
        {
            const response =
                await fetch(
                    `${requestConfig.baseUrl ?
                        requestConfig.baseUrl :
                        backendUrl}${requestConfig.url}`,
                    requestData);
            const data = await response.json();
            applyData(data);
            if (!response.ok)
            {
                throw new Error(data.message)
            }
            let message = data.message;
            if (message)
            {
                message = message.toLowerCase();
                if (!message.includes("success")
                    // for not make error when no messages in chat
                    && (!message.includes("no") && !message.includes("yet")) &&
                    //  for not make error when notification failed
                    (!message.includes("notification"))
                ) { popMessage(message || "Something went wrong", { variant: "error" }) }
            }
        } catch (error)
        {
            setIsLoading(false)

            //  for not make error when notification failed
            if (!error.message.includes("notification")
                && !error.message.includes("unexpected error !"))
                popMessage(error.message || "Something went wrong", { variant: "error" })
        }
        setIsLoading(false)
    }, [popMessage, token])
    return {
        isLoading,
        sendRequest,
    }
}

export default useHttp;