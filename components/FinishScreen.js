import {useState, useEffect} from "react"
import styles from "../styles/FinishScreen.module.css"

export default function FinishScreen({results, reset}) {
    const [data, setData] = useState()

    useEffect(() => {
        let lastRestult = {}
        results.forEach(obj => {
            lastRestult = 
            {
                ...lastRestult,
                [obj.keyWord]: !isNaN(obj.value) ? Number(obj.value) : obj.value
            }
        })
        setData(lastRestult)

    }, [])
  

    return (
        <div className={styles.screen}>
            <h2>You need about</h2>
            <h1><span className="mainColor">{data ? getNeedCalores(data) : "Loading..."}</span><span className={styles.smallText}>calories</span></h1>
            <button className="uk-button uk-button-primary uk-button-small" onClick={()=> reset()}>Try Again</button>
        </div>
    )
}


const getNeedCalores = data => {
    let BMR;
    if(data.Gender === "Male"){
        BMR = 66.47 + (13.75 * data.Weigh) + (5.003 * data.Tall) - (6.755 * data.Age)
    }else{
        BMR = 655.1 + (9.563 * data.Weigh) + (1.85 * data.Tall) - (4.676 * data.Age)
    }

    switch(data.Exercise){
        case "Little/no exercise":
            BMR *= 1.2;
            break;
        case "Light exercise":
            BMR *= 1.375;
            break;
        case "Moderate exercise":
            BMR *= 1.55;
            break;
        case "Very active":
            BMR *= 1.725;
            break;
        case "Extra active":
            BMR *= 1.9;
            break;  
        default:
            BMR *= 1.2;
            break; 

    }
   

    return Math.round(BMR)
}