import moment from "moment";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

const Message = ({message}) => {

    const [user] = useAuthState(auth)

    console.log(message.timestamp)

    return ( 
        <div className={`mx-3 w-fit my-5 flex flex-col justify-center ${user.uid === message.userId ? 'ml-auto' : 'mr-auto'}`}>
            <div className="flex items-center">
                <img src={message.userImg} className="w-8 h-8 mx-2 rounded-full" alt="" />
                <div className={`p-2 ${user.uid === message.userId ? 'bg-blue-600' : 'bg-gray-600'} text-ellipsis overflow-hidden text-white w-fit rounded-xl`}>
                    {message.text}
                </div>
                <small className="mx-1">{message.timestamp && moment(message.timestamp.toDate()).format('LT')}</small>
            </div>
            <small className="text-left ml-3">{message.username}</small>
        </div>
     );
}
 
export default Message;