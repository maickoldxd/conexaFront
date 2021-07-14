import React from 'react'

type Props = {
    id:string,
    value:string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    isInvalid:boolean,

    label?: string,
    placeholder?:string,
    //STYLING PROPS
    className?:string,
    inputClassName?:string,
    labelClassName?:string
}

class TextInput extends React.Component<Props> {
    
    render():React.ReactElement {
        const {id="inputText",
         label="Text", 
         placeholder="Type here", 
         onChange, value,
         isInvalid,
         className="mb-3", 
         labelClassName="form-label"
        } = this.props

         //In order to provide a custom style and keep invalid's style as well
         
         let inputClassName = "form-control"

         if (isInvalid) {
            inputClassName = "form-control is-invalid"
             if (this.props.inputClassName) {
                inputClassName = `${this.props.inputClassName} is-invalid`
             }
         }

         
        return(
            <div className={className || "mb-3"}>
                <label htmlFor={id} className={labelClassName}>{label}</label>

                <input type="text" id={id} value={value} onChange={onChange} className={inputClassName} autoComplete={id} placeholder={placeholder} required/>
            </div>
        )
    }

}
export default TextInput