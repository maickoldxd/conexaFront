import Cookies from 'js-cookie'
import axios from "axios"

export default (endpoint:string) => axios.get(`${process.env.NEXT_PUBLIC_API}/api/${endpoint}`, { headers: { authorization: Cookies.get("authorization") } }).then(res => res.data)