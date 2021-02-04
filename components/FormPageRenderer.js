import {useState} from 'react'

export default function FormPageRenderer({prevPage, stageData, saveValue, styles, nextStage, index}) {
    const [value, setValue] = useState(stageData.value)
    const [error, setError] = useState("")

    const waitForEnter = e => {
        if(e.key  === "Enter"){
            submit()
        }
    }

    const inputChange = e => {
        if(error) setError("")
        stageData.value = ""
        setValue(e.target.value)
    }

    const submit = () => {

        if(value){
            let isValid = stageData.validate(value)

            if(isValid.value)
            {
                saveValue(value, index)
                setValue("")
                setError("")
                nextStage(index + 1)
                return;
            }
    
            return setError(isValid.msg)
        }else{
            if(!stageData.value) return setError("Fill out the form first to continue")
        }

        nextStage(index + 1)
        
    }

    return (
        <div className={styles.foreground}>
            <h2>{stageData.title} <span className={styles.mainColor}>{stageData.keyWord}</span>{stageData.aKeyword}</h2>

            <p className={styles.errorMessage}>{error}</p>
        {
            stageData.type === "choices" 

            ?
                <div className={styles.formContainer}>
                    <div className={styles.choices}>
                        {stageData.choices.map((choice, index) => 
                            <label key={index}>
                            <input
                                onChange={inputChange} 
                                className="uk-radio" 
                                type="radio" 
                                name="radioCol" 
                                value={choice} 
                                checked={stageData.value === choice || value === choice ? true : false}
                            />  {choice}</label>
                        )}
                    </div>
                </div>
            :

            <div className={styles.formContainer}>
                <input 
                className={`uk-input uk-form-width-large ${error ? "uk-form-danger" : null}`}
                value={!value ? stageData.value : value} 
                onChange={inputChange} 
                type={stageData.type} 
                onKeyPress={waitForEnter}
                {...stageData.attr} 
                autoFocus={true}
             />
            </div>
           
        }
          
            <div className={styles.nextPrevCont}>
                <button className="uk-button uk-button-link" onClick={() => {
                    setValue("")
                    setError("")
                    prevPage(index - 1)
                }}>Prev</button>
                <button className="uk-button uk-button-primary" onClick={submit}>Next</button>
            </div>
        </div>
    )
}
