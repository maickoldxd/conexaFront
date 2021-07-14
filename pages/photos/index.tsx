import React from 'react'
import SWR from 'swr'
import axios from 'axios'
import Cookies from 'js-cookie'
import Photos from '@components/lists/photos'
import Pagination from '@components/pagination'

//BECAUSE IT'S A DEV PROJECT AND I'M USING THE WILDCARD FOR CORS, THE BEARER TOKEN IS SET MANUAL, BUT IN PRODUCTION IT SHOULD BE NOT NEEDED
const fetcher = url => axios(url,{headers:{authorization:Cookies.get("authorization")}}).then(res=>res.data)

const Index = ():React.ReactElement=>{
    const [currentPage,setCurrentPage] = React.useState(1)

    const { data, error } = SWR(`${process.env.NEXT_PUBLIC_API}/api/list/photos/${currentPage}`, fetcher)

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
    const handlePagination = (e)=>{
        setCurrentPage(parseInt(e.target.id))
    }
    //KEY MUST BE A TRUE UNIQUE ID BECAUSE IN LARGE PROJECT A KEY BASED IN INDEX COULD BE REPEATED 
    return (
        <>
        <div className="list-group mt-3 mb-3">
            {
                data.map((item,i) =>(
                    <Photos all={item} key={i}/>
                ))
            }
        </div>
        <Pagination pages={500} current={currentPage} onPageChange={handlePagination}/>
        </>
    )
}

export default Index

