import PasswordInput from '@components/forms/passwordInput'
import TextInput from '@components/forms/textInput'
import { toast } from 'react-toastify'
import React from 'react'
import axios from 'axios'
import Cookie from 'js-cookie'
import { useRouter } from 'next/router'

const Login = ():React.ReactElement=>{
    const router = useRouter()
    //Inputs state for the form
    const [form,setForm] = React.useState({username:"",password:""}),
    [isInvalid,setInvalid] = React.useState({username:false,password:false})

    //This arrow function is useful for handle all inputs in a form
    const handleInputs = (key:string)=>({target:{value}})=>{
        setForm({...form,[key]:value})
        setInvalid({...isInvalid,[key]:false})
    }

    const inValid = (key,text)=>{
        toast(`${key} ${text}`)
        setInvalid({...isInvalid,[key]:true})
    }

    const send = e=>{
        const {password,username} = form
        //Checking form before submitting

        //Username
        if (username.length <= 3) return inValid("username","to short");
        if (username.length >= 32) return inValid("username","to long");
        if (typeof username !== 'string') return inValid("username","is not text");
        //password
        if (password.length <= 6) return inValid("password","to short");
        if (password.length >= 16) return inValid("password","to long");
        if (typeof password !== 'string') return inValid("password","is not text");

        e.target.className= "btn btn-primary disabled"

        axios.post(`${process.env.NEXT_PUBLIC_API}/api/auth/login`,form).then(res=>{
            const msg = res.data.msg
            if (msg && msg != "ok") {
                toast(msg)
                e.target.className= "btn btn-primary"
                return null
            }
            Cookie.set('authorization', res.data.token, { expires: 7 });
            router.push('/./')
        })       
    }


    return(
        <form onSubmit={e=>e.preventDefault()} className="card translate-middle-x start-50 bg-light p-3 mt-4 border-0 shadow-sm col-lg-6 col-md-6 col-sm-12 col-12" noValidate>
            <div className="card-body">
                <h4 className="card-title">
                    Login
                </h4>
                <TextInput id="Username" label="Username" placeholder="Type your username here" value={form.username} onChange={handleInputs("username")} isInvalid={isInvalid.username}/>

                <PasswordInput id="password" label="Password" placeholder="Type your password here" value={form.password} onChange={handleInputs("password")} isInvalid={isInvalid.password}/>

                <input type="submit" onClick={send} className="btn btn-primary" value="Login"/>

            </div>
        </form>
    )
}

export default Login