import PasswordInput from '@components/forms/passwordInput'
import TextInput from '@components/forms/textInput'
import { toast } from 'react-toastify'
import React, { useState } from 'react'
import axios from 'axios'
import Joi from 'joi'
import Cookie from 'js-cookie'
import { useRouter } from 'next/router'
import { GetStaticProps } from 'next'

const Login = (): React.ReactElement => {
    const router = useRouter()
    //Inputs state for the form
    const [form, setForm] = useState({
        username: {
            value: "",
            error: false,
        },
        password: {
            value: "",
            error: false,
        }
    }),
        [submitting, setSubmitting] = useState(false)

    //This arrow function is useful for handle all inputs in a form
    const handleInputs = (key: string, error?: boolean) => ({ target: { value } }) => {
        setForm({
            ...form, [key]: {
                value: value,
                error: error || false
            }
        })
    }

    const send = () => {
        const { password, username } = form
        //Checking form before submitting
        const ValidationSchema = Joi.object({
            username: Joi.string()
                .alphanum()
                .min(3)
                .max(30)
                .required(),
            password: Joi.string()
                .alphanum()
                .min(6)
                .max(16)
                .required()
        })
        const { error } = ValidationSchema.validate({
            username: username.value,
            password: password.value
        })
        //STOP SUBMITING
        if (error) {
            const locateInput = String(error.details[0].path[0])

            handleInputs(
                locateInput,
                true
            )({ target: { value: form[locateInput].value } })
        }

        setSubmitting(true)

        axios.post(`${process.env.NEXT_PUBLIC_API}/api/auth/login`, {
            username: username.value,
            password: password.value
        }).then(res => {
            const msg = res.data.msg
            if (msg && msg != "ok") {
                toast(msg)
                setSubmitting(false)
                return null
            }
            Cookie.set('authorization', res.data.token, { expires: 7 });
            router.push('/./')
        })
            .catch(err => {
                toast(err.message)
                setSubmitting(false)
            })
    }


    return (
        <div className="card mx-auto p-3 mt-4 border-0 shadow d-flex flex-column rounded-8 bg-light-2 col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4" >
            <div className="card-body">
                <h4 className="card-title">
                    Login
                </h4>
                <TextInput id="Username" label="Username" placeholder="Type your username here" value={form.username.value} onChange={handleInputs("username")} isInvalid={form.username.error} />

                <PasswordInput id="password" label="Password" placeholder="Type your password here" value={form.password.value} onChange={handleInputs("password")} isInvalid={form.password.error} />

                <input type="submit" onClick={send} className={`btn btn-primary ${submitting && "disabled"}`} value="Login" />

            </div>
        </div>
    )
}

export default Login

export const getStaticProps: GetStaticProps = async () => ({
    props: {},
})