import { addDoc, collection, doc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import { useRouter } from "next/router";
import { signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase';

const Profile = () => {

    const [user] = useAuthState(auth);
    const router = useRouter()

    const createRoomChat = async () => {
        const roomName = prompt('Enter the room name!');
        
        if (roomName) {
            const roomsRef = collection(db, 'rooms');
            const roomDoc = await addDoc(roomsRef, {
                adminId: user.uid,
                adminName: user.displayName,
                roomName,
            });

            await updateDoc(doc(roomsRef, roomDoc.id),  {
                roomId: roomDoc.id,
                timestamp: serverTimestamp()
            });

            const usersRef = doc(roomsRef, roomDoc.id, 'users', user.email);

            await setDoc(usersRef, {
                userId: user.uid,
                userImg: user.photoURL
            });

            alert('Room has been created!');
        } else {
            return false
        }
    };

    const joinRoom = async () => {
        const roomId = prompt('Enter room Id!')
        
        if (roomId) {
            const usersRef = doc(db, 'rooms', roomId, 'users', user.email)

            await setDoc(usersRef, {
                userId: user.uid
            });

            router.push(`/chat-room/${roomId}`)
        } else {
            return false
        }

    };

    return ( 
        <div className='flex md:flex-row flex-col items-center justify-center py-5 border-b border-gray-200'>
            <div className='flex flex-col items-center justify-center md:border-r pr-2 border-gray-200'>
                <img src={user.photoURL} alt="" className='rounded-full' />
                <h1 className='text-lg font-bold mt-3 px-3 rounded-lg bg-red-600'>{user.displayName}</h1>
                <h2>{user.email}</h2>
                <button onClick={()=>signOut(auth)} className="text-white mt-2 py-2 px-5 bg-blue-700 hover:bg-opacity-80 rounded-md">Sign Out</button>
            </div>
            <div className='flex md:flex-col space-x-2 items-center mx-5'>
                <button className="text-white py-2 px-5 bg-blue-700 hover:bg-opacity-80 rounded-md my-3" onClick={createRoomChat}>Create room chat</button>
                <button onClick={joinRoom} className="text-white py-2 px-5 bg-blue-700 hover:bg-opacity-80 rounded-md">Join room chat</button>
            </div>
        </div>
     );
}
 
export default Profile;