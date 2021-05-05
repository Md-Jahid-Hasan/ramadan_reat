import React, {useEffect, useState} from "react";

function Prayer(){
    const [message, setMessage] = useState([]);
    let today = new Date();
    let hour = today.getHours();
    let minute = today.getMinutes();

    useEffect(() => {
        console.log(Math.floor(Math.random() * 63))
        hadith();
    }, [])

    const hadith = async ()=>{
        let url = 'http://bn-hadith-api.herokuapp.com/hadiths/' + Math.floor(Math.random() * 63);
        let fetchAPI = fetch(url);
        let response = await fetchAPI;
        let data = await response.json();
        setMessage(message => [...message, data.description]);
    }

    useEffect( () => {

        if ((hour >= 3 && minute >= 50) && (hour <= 4)){
            setMessage([...message, "আপনি কি আপনার ফজরের সালাত আদায় করেছেন?"])
        }
        else if ((hour >= 13) && (hour <= 15)){
            setMessage([...message, "আপনি কি আপনার যোহরের সালাত আদায় করেছেন?"])
        }
        else if ((hour >= 16 && minute >= 30) && (hour <= 17)){
            setMessage([...message, "আপনি কি আপনার আছরের সালাত আদায় করেছেন?"])
        }
        else if ((hour >= 18 && minute >= 45) && (hour <= 18)){
            setMessage([...message, "আপনি কি আপনার মাগরিবের সালাত আদায় করেছেন?"])
        }
        else if ((hour >= 20) && (hour <= 23)){
            setMessage(message => [...message, "আপনি কি আপনার এশার সালাত আদায় করেছেন?"])
        }

    }, [])

    return (
        <div className={"position-sticky bottom-0 start-50"}>
            {message.map((i, index) =>
            <div key={index} className={"alert alert-primary text-center"}>{i}</div>)}

        </div>
    )
}

export default Prayer;