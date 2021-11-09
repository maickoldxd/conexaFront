import React from 'react'
import axios from 'axios'
import Pagination from '@components/pagination'
import { GetStaticProps } from "next";
import Photos, { PhotosOnDataTypes } from '@components/lists/photos'
import fetcher from '@utils/client/fetcher'
import { useRouter } from 'next/router';

import useSwr from 'swr'

const PhotosPage = ({ data, page }: PhotosOnDataTypes): React.ReactElement => {
    const router = useRouter()

    const [currentPage, setCurrentPage] = React.useState(page)

    const localData = useSwr(`list/photos/${currentPage}`, fetcher,{fallbackData:data})

    const handlePagination = (e) => {
        setCurrentPage(parseInt(e.target.id))
        //I SHALLOW URL TRANSITION BECAUSE THE FETCHING IS DONE HERE
        router.push(`/./photos/${e.target.id}`, null, { shallow: true })
    }

    //KEY MUST BE A TRUE UNIQUE ID BECAUSE IN LARGE PROJECT A KEY BASED IN INDEX COULD BE REPEATED 
    return (
        <>
            <div className="list-group mt-3 mb-3 mx-auto w-50 rounded-8">
                {
                    localData.data.map((photo, i) => (
                        <Photos {...photo} key={i} />
                    ))
                }
            </div>
            <Pagination pages={500} current={currentPage} onPageChange={handlePagination} />
        </>
    )
}

export default PhotosPage

export const getStaticPaths = async ()=>{
    return {
        paths: [
            {
                params: {
                    page: "1"
                }
            }
        ],
        fallback: 'blocking'
    }
}

export const getStaticProps: GetStaticProps = async (ctx) => {

    const req = await axios.get(`${process.env.NEXT_PUBLIC_API}/api/list/photos/${ctx.params.page}`, {
        headers: {
            'authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImRldmVsb3BlciIsImFnZW50IjoiTW96aWxsYS81LjAgKFgxMTsgTGludXggeDg2XzY0KSBBcHBsZVdlYktpdC81MzcuMzYgKEtIVE1MLCBsaWtlIEdlY2tvKSBDaHJvbWUvOTUuMC40NjM4LjU0IFNhZmFyaS81MzcuMzYiLCJpcCI6IjEyNy4wLjAuMSIsImlhdCI6MTYzNjQzMTg1OSwiZXhwIjoxNjM3MDM2NjU5fQ.47LRtUiApKt03MkG-BykA_Zm0JMU-UlzcQkWBn--12s'
            //I know this is not the best aproach, but in certain cases like this, there is no dynamic content base on user, so I hard setting a valid token
        }
    }).then(res => res.data)
        .catch(err => {
            console.log(err)
            return []
        })
    return {
        props: {
            data: req,
            page: ctx.params.page,
        },
        //NEXT JS NOW SUPPORT CONTENT REBUILDING, THIS PAGE WILL EXPIRE EVERY 60 SECONDS, AND WHEN A USER REQUEST THIS, IT WILL BE REBUILD, ALSO NEXT JS WILL SERVE PREVIOUS VERSION OF THIS, SO NO FALLBACK PAGE WILL EVER SHOW
        revalidate: 60
    };
};