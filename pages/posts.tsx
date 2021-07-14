import React from 'react'
import SWR from 'swr'
import axios from 'axios'
import Cookies from 'js-cookie'
import Posts from '@components/lists/posts'
//import { GetStaticPropsResult, GetStaticProps } from "next";

//BECAUSE IT'S A DEV PROJECT AND I'M USING THE WILDCARD FOR CORS, THE BEARER TOKEN IS SET MANUAL, BUT IN PRODUCTION IT SHOULD BE NOT NEEDED
const fetcher = url => axios(url,{headers:{authorization:Cookies.get("authorization")}}).then(res=>res.data)

const Index = ():React.ReactElement=>{

    const { data, error } = SWR(`${process.env.NEXT_PUBLIC_API}/api/list/posts`, fetcher)

    if (error) {
        //CAN BE ALSO A ERROR COMPONENT OR A REDIRECT TO A 500 ERROR
        return (
            <h3>Cargando...</h3>
        )
    }
    if (!data){
        //CAN BE ALSO A LOADING COMPONENT
        return (
            <h3>Cargando...</h3>
        )
    }
    //KEY MUST BE A TRUE UNIQUE ID BECAUSE IN LARGE PROJECT A KEY BASED IN INDEX COULD BE REPEATED 
    return (
        <div className="list-group mt-3 mb-3">
            {
                data.map((item,i) =>(
                    <Posts all={item} key={i}/>
                ))
            }
        </div>
    )
}

export default Index

//IN PRODUCTION IT WILL BE BETTER IF IT'S SERVER SIDE
/**
 * export const getStaticProps: GetStaticProps = async () => {
 * const req = await fetch(...)
    return {
      props: {data:req},
    };
};
 */