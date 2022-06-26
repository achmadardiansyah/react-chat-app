import { collection, doc, getDoc, getDocs, query } from "firebase/firestore";
import Head from 'next/head';
import Input from "../../components/Input";
import { db } from "../../firebase";

const ChatRoom = ({ chatData }) => {

    return ( 
        <div className="">
            <Head>
                <title>{chatData.roomName}</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className='bg-[#06283D] h-[100vh] flex md:flex-row flex-col items-center justify-center'>
                <div className='h-[90vh] md:h-[80vh] md:w-[40vw] w-[60vw] bg-white rounded-lg overflow-hidden'>
                    <Input chatData={chatData}  />
                </div>
            </div>
        </div>
     );
}
 
export default ChatRoom;

export const getServerSideProps = async (context) => {

    const q = query(doc(db, 'rooms', context.params.id));

    const chatData = await getDoc(q);
    
    return {
        props: {
            chatData: JSON.parse(JSON.stringify(chatData.data())),
        }
    };
};