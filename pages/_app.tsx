import type { AppProps } from 'next/app'
import '../styles/main.scss'
import 'bootstrap/dist/css/bootstrap.css'
import React, { Fragment } from 'react'
import Head from '@components/head'
import Header from '@components/header'
import { ToastContainer } from 'react-toastify'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const APP = ({ Component, pageProps }: AppProps): React.ReactElement => {
  const router = useRouter()

  //BECAUSE LOGIN CHECKING ALLWAYS NEED TO BE ON SERVER SIDE YOU WILL SEE A FLASH OF THE INDEX PAGE OR OTHER PAGES
  useEffect(() => {
    if (router.pathname != "/login" && Cookies.get("authorization") == undefined) {
      router.push("/./login")
    }
  })

  return (
    <Fragment>
      <Head />
      <Header />
      <ToastContainer />
      <Component {...pageProps} />
    </Fragment>
  )
}

export default APP
