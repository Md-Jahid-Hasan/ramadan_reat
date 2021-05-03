import React, {useEffect, useState} from "react";
import Select from 'react-select'
import times from './time'
import districts from './district'
import Prayer from "./prayer";

let options = [];
let test = null;
let schedule = {};

function App() {
    const [dis, setDis] = useState(null);
    const [iftar, setIftar] = useState();
    const [sehri, setSehri] = useState();
    let i;
    let [month, date, year] = new Date().toLocaleDateString("en-US").split("/")
    let today = new Date();
    let hour = today.getHours();
    
    if (hour > 19) {
        date += 1;
    }
    let nowDate = year + "-" + ('0' + month).slice(-2) + "-" + ('0' + date).slice(-2);


    const sehri_district_time = [
        {time: 0, area: ["Dhaka"]},
        {time: 1, area: ["Manikganj", "Bogura", "Sirajganj", "Panchagarh", "Nilphamari"]},
        {
            time: 2,
            area: ["Bhola", "Shariatpur", "Dinajpur", "Thakurgaon", "Joypurhat", "Faridpur", "Madaripur", "Barisharl"]
        },
        {time: 3, area: ["Naogoan", "Jhalokati"]},
        {time: 4, area: ["Natore", "Pabna", "Rajbari", "Magura", "Patuakhali", "Gopalganj"]},
        {time: 5, area: ["Kushtia", "Rajshahi", "Pirojpur", "Barguna", "Narail", "Bagherhat", "Jhenaidah"]},
        {time: 6, area: ["Chapai Nababganj", "Jessore", "Chuadanga", "Khulna"]},
        {time: 7, area: ["Meherpur"]},
        {time: 8, area: ["Satkhira"]},
        {time: -1, area: ["Gazipur", "Lakshmipur", "Rongpur", "Noakhali", "Gaibandha", "Cox's Bazar"]},
        {time: -2, area: ["Sherpur", "Jamalpur", "Kurigram", "Lalmonirhat", "Chittagong", "Narsingdi"]},
        {time: -3, area: ["Comilla", "Mymensingh", "Kishoregonj", "Feni"]},
        {time: -4, area: ["Brahmanbaria", "Rangamati", "Bandarban"]},
        {time: -5, area: ["Netrakona", "Khagrachari"]},
        {time: -6, area: ["Habiganj"]},
        {time: -7, area: ["Sunamganj"]},
        {time: -8, area: ["Maulvibazar"]},
        {time: -9, area: ["Sylhet"]}
    ]

    const iftar_dis_time = [
        {time: 0, area: ["Dhaka"]},
        {time: 1, area: ["Gopalganj", "Mymensingh", "Bagherhat"]},
        {time: 2, area: ["Narail", "Faridpur", "Khulna", "Manikganj", "Tangail"]},
        {time: 3, area: ["Magura", "Sherpur"]},
        {time: 4, area: ["Sirajganj", "Jamalpur", "Rajbari", "Satkhira", "Jessore"]},
        {time: 5, area: ["Kushtia", "Pabna", "Jhenaidah"]},
        {time: 6, area: ["Chuadanga", "Bogura", "Gaibandha"]},
        {time: 7, area: ["Natore", "Meherpur", "Kurigram", "Lalmonirhat"]},
        {time: 8, area: ["Rajshahi", "Naogaon", "Rangpur", "Jaipurhat"]},
        {time: 10, area: ["Nilphamari", "Dinajpur", "Chapai Nababganj"]},
        {time: 12, area: ["Panchagarh", "Thakurgaon"]},
        {time: -1, area: ["Shariatpur", "Narsingdi", "Kishoregonj", "Narayanganj", "Munshiganj", "Jhalokati"]},
        {time: -2, area: ["Barishal", "Patuakhali", "Barguna", "Sunamganj", "Chandpur"]},
        {time: -3, area: ["Brahmanbaria", "Lakshmipur", "Bhola", "Habiganj"]},
        {time: -4, area: ["Comilla", "Noakhali", "Sylhet", "Maulvibazar"]},
        {time: -5, area: ["Feni"]},
        {time: -8, area: ["Khagrachari", "Chitagong"]},
        {time: -9, area: ["Rangamati"]},
        {time: -10, area: ["Bandarban", "Cox's Bazar"]},
    ]


    useEffect(() => {

        for (i = 0; i < times.length; i++) {
            if (times[i].fields.date === nowDate) {
                schedule.sehri_h = times[i].fields.sehri_hour;
                schedule.sehri_min = times[i].fields.sehri_minute;
                schedule.iftar_h = times[i].fields.iftar_hour;
                schedule.iftar_min = times[i].fields.iftar_minute;
                break;
            }
        }

        for (i = 0; i < districts.length; i++) {
            let temp = {};
            temp.value = districts[i].fields.name;
            temp.label = districts[i].fields.name;
            options.push(temp);
        }
    }, [])

    useEffect(() => {
        let a, b;

        if (dis !== null) {
            for (a in iftar_dis_time) {
                for (b in iftar_dis_time[a].area) {
                    console.log(iftar_dis_time[a].area[b], dis)
                    if (dis === iftar_dis_time[a].area[b]) {
                        let x = schedule.iftar_min + iftar_dis_time[a].time;
                        let y = schedule.iftar_h;
                        if(x < 0){
                            y -=1;
                            x = 60 -x;
                        }
                        setIftar(y + " : " + ('0' + x).slice(-2));
                    }
                }
            }

            for (a in sehri_district_time) {
                for (b in sehri_district_time[a].area) {
                    if (dis === sehri_district_time[a].area[b]) {
                        let x = schedule.sehri_min + sehri_district_time[a].time;
                        let y = schedule.sehri_h;
                        if(x < 0){
                            y -=1;
                            x = 60 +x;
                        }
                        else if (x > 59){
                            y += 1;
                            x = x - 60;
                        }
                        setSehri(y + " : " + ('0' + x).slice(-2));
                    }
                }
            }
        }
    })


    const handleSubmit = (test) => {
        setDis(test.label);
    }

    return (
        <div className={"container"}>
            <h2 className="text-center fw-bold fs-1 p-2">পবিত্র মাহে রমজানের সাহরী ও ইফতারের সময়সূচী হিজরি ১৪৪২</h2>
            <div className="text-center text-danger">
                <p className="fw-bold fs-2">আপনার জেলা নির্বাচন করুন</p>
                <p className="fw-bold fs-2"> আজকের সময়সূচী ({nowDate})</p>
            </div>

            <div className="mb-3 row">
                <div className="col-sm-12">
                    <form action="" method="post">
                        <Select options={options} value={test}
                            onChange={handleSubmit}
                            placeholder={dis ? dis : "Select"} />
                    </form>
                </div>
            </div>
            {dis &&
            <table className="table table-success">
                <thead>
                <tr>
                    <th className="text-center">সেহরীর শেষ সময় </th>
                    <th className="text-center">ইফতারের সময় </th>
                </tr>
                </thead>
                <tbody className="block-title">
                <tr>
                    <td className="text-center fw-bold fs-3">{sehri}</td>
                    <td className="text-center fw-bold fs-3">{iftar}</td>
                </tr>
                </tbody>
            </table>}
            <Prayer />
        </div>

    )
}

export default App;
