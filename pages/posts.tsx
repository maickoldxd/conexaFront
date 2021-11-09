import React from 'react'
import axios from 'axios'
import Posts, {PostsOnDataTypes} from '@components/lists/posts'
import { GetStaticProps } from "next";
import { nanoid } from 'nanoid'
import fetcher from '@utils/client/fetcher'
import useSWR from 'swr'

const PostsPage = ({ data }: PostsOnDataTypes): React.ReactElement => {

    const localData = useSWR(`${process.env.NEXT_PUBLIC_API}/api/list/posts`, fetcher,{fallbackData:data})

    //KEY MUST BE A TRUE UNIQUE ID BECAUSE IN LARGE PROJECT A KEY BASED IN INDEX COULD BE REPEATED 
    return (
        <div className="list-group mt-3 mb-3">
            {
                localData.data.map((item) => (
                    <Posts all={item} key={nanoid()} />
                ))
            }
        </div>
    )
}

export default PostsPage

export const getStaticProps: GetStaticProps = async () => {
    const req = await axios.get(`${process.env.NEXT_PUBLIC_API}/api/list/posts`, {
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
            data: req
        },
        //NEXT JS NOW SUPPORT CONTENT REBUILDING, THIS PAGE WILL EXPIRE EVERY 60 SECONDS, AND WHEN A USER REQUEST THIS, IT WILL BE REBUILD, ALSO NEXT JS WILL SERVE PREVIOUS VERSION OF THIS, SO NO FALLBACK PAGE WILL EVER SHOW
        revalidate: 60
    };
};