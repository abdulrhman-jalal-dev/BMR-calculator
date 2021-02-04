import {useState} from "react"
import FormPageRenderer from "./FormPageRenderer"
import FinishScreen from "./FinishScreen"
import styles from "../styles/Form.module.css"

const formStages = [

    {
        title:"Choose your ",
        keyWord:"Gender",
        aKeyword:"!",
        type:"choices",
        choices:["Male", "Female"],
        value:"",
        validate:value => {
            return {value: true}
        }
    },
    {
        title:"What's your ",
        keyWord:"Age",
        aKeyword:"?",
        attr:{placeholder:"Age in (Years)"},
        type:"number",
        value:"",
        validate:value => {
            value = Number(value)
            if(value > 125 || value < 1) return {msg:"Age entered not valid"}

            return {value: true}
        }
    },
    {
        title:"How ",
        keyWord:"Tall",
        attr:{placeholder:"Height in (CM)"},
        aKeyword:" are you?",
        type:"number",
        value:"",
        validate:value => {
            if(value > 250 || value < 50) return {value:false, msg:"Height entered not valid"}

            return {value: true}
        }
    },
    {
        title:"How much do you ",
        keyWord:"Weigh",
        attr:{placeholder:"Weight in (KG)"},
        aKeyword:"?",
        type:"number",
        value:"",
        validate:value => {
            if(value > 450 || value < 15) return {value:false, msg:"Weight entered not valid"}

            return {value: true}
        }
    },
    {
        title:"How much do you ",
        keyWord:"Exercise",
        aKeyword:"?",
        type:"choices",
        choices:["Little/no exercise", "Light exercise", "Moderate exercise", "Very active", "Extra active"],
        value:"",
        validate:value => {
            if(value > 450 || value < 15) return {value:false, msg:"Weight entered not valid"}

            return {value: true}
        }
    }
]


// "GENDER WIEGHT HEIGHT EXC AGE"

export default function Form() {
    const [completedStages, setCompletedStages] = useState([])
    const [stageIndex, setStageIndex] = useState(0)
    const [finish, setFinish] = useState(false)

    const reset = () => {
        setFinish(false)
        setCompletedStages([])
        setStageIndex(0)

        formStages.map(stage => stage.value = "")
    }

    const nextStage = index => {
        if(index > completedStages.length - 1 && completedStages.length != 0)
        {
            setFinish(true)
        }else{
            setCompletedStages(formStages)
        }

        setStageIndex(index)
    }

    const prevPage = index => {
        if(index < 0) setCompletedStages([])
        setStageIndex(index)
    }

    const save = (value, index) => {
        completedStages[index].value = value;

        setCompletedStages([...completedStages])
    }

    return (
        <div className={styles.form + " uk-card uk-card-default uk-card-body"}>
            {
                completedStages.length === 0

                ?

                <>
                  <div className={styles.foreground}>
                    <h1>Know your daily <span className={styles.mainColor}>Calorie</span> amount!</h1>
                    <button className="uk-button uk-button-primary" onClick={() => nextStage(0)}>Start now &rarr;</button>
                   </div>
                   <img src="/assets/background.svg" className={styles.background}/>
                </>

                :
                !finish 

                ?

                <FormPageRenderer 
                    styles={styles} 
                    prevPage={prevPage} 
                    nextStage={nextStage} 
                    stageData={completedStages[stageIndex]} 
                    saveValue={save}
                    index={stageIndex} 
                />

                :

                <FinishScreen 
                    results={completedStages}
                    reset={reset}
                />
            }
            
        </div>
    )
}
