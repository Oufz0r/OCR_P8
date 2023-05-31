import { useState, useEffect } from "react";
// eslint-disable-next-line
import { getDatabase, onValue, child, ref, get} from 'firebase/database';
// eslint-disable-next-line
import { initializeApp } from 'firebase/app';

export default function ConnectDB(props) {
    const [data, setData] = useState([]);


    const firebaseConfig = {
        apiKey: process.env.REACT_APP_API_KEY,
        authDomain: process.env.REACT_APP_AUTH_DOMAIN,
        databaseURL: process.env.REACT_APP_DATABASE_URL,
        projectId: process.env.REACT_APP_PROJECT_ID,
        storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
        messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
        appId: process.env.REACT_APP_APP_ID,
        measurementId: process.env.REACT_APP_MEASUREMENT_ID,
    };
    
    const app = initializeApp(firebaseConfig);
    const db = getDatabase(app);


    const dbRef = ref(db);
    useEffect(() => {
        get(child(dbRef, `/projets`))
        .then((snapshot) => {
            if (snapshot.exists()) {
                // console.log(snapshot.val());
                setData(snapshot.val());
                
            } else {
                console.log("Aucune donnée disponible");
            }
            }).catch((error) => {
                console.error(error);
        });
    },[dbRef]);



    // Appel de la fonction de rappel avec les données récupérées
    useEffect(() => {
        props.onDataReceived(data);
    }, [data, props]);
}