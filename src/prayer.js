import React, {useEffect, useState} from "react";

function Prayer(){
    const [message, setMessage] = useState();
    let today = new Date();
    let hour = today.getHours();
    let minute = today.getMinutes();

    useEffect( () => {
        console.log(today.getHours())
        if ((hour >= 3 && minute >= 50) && (hour <= 4)){
            setMessage("আপনি কি আপনার ফজরের সালাত আদায় করেছেন?")
        }
        else if ((hour >= 13) && (hour <= 15)){
            setMessage("আপনি কি আপনার যোহরের সালাত আদায় করেছেন?")
        }
        else if ((hour >= 16 && minute >= 30) && (hour <= 17)){
            setMessage("আপনি কি আপনার আছরের সালাত আদায় করেছেন?")
        }
        else if ((hour >= 18 && minute >= 45) && (hour <= 18)){
            setMessage("আপনি কি আপনার মাগরিবের সালাত আদায় করেছেন?")
        }
        else if ((hour >= 20) && (hour <= 23)){
            setMessage("আপনি কি আপনার এশার সালাত আদায় করেছেন?")
        }
        else {
            setMessage("রমজানের পবিত্রতা রক্ষা করুন")
        }
    }, [])
    return (
        <div className={"position-sticky bottom-0 start-50"}>
            <div className={"alert alert-primary text-center"}>{message}</div>
        </div>
    )
}

export default Prayer;