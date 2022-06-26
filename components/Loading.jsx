import Head from 'next/head';
import { TailSpin } from  'react-loader-spinner';

const Loading = () => {
    return ( 
        <div>
            <Head>
                <title>Loading...</title>
            </Head>
            <div style={{display: 'grid', placeItems: 'center', height: '100vh'}}>
                <TailSpin height={80} width={80} />
            </div>
        </div>
     );
}
 
export default Loading;