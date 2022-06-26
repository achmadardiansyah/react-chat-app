import Head from "next/head";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { auth } from "../firebase";

const Login = () => {

    const provider = new GoogleAuthProvider()

    return ( 
        <div>
            <Head>
                <title>Login</title>
            </Head>
            <div className="flex items-center justify-center h-[100vh] bg-black">
                <button onClick={()=>signInWithPopup(auth, provider)} className="text-white py-2 px-5 bg-blue-700 hover:bg-opacity-80 rounded-md">Sign In With Google</button>
            </div>
        </div>
     );
}
 
export default Login;