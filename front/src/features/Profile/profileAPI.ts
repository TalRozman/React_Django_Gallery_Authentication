import { MY_SERVER } from "../../env";
import axios from "axios";
import IProfile from "../../models/profile";

export const getProfile = async (obj:{id:number,token:string}) => {
  const res = await axios.get(`${MY_SERVER}profile/${obj.id}`,{
    headers:{
      'Authorization': `Bearer ${obj.token}`
    }})
  return res.data
}

export const addProfile = async (obj:{pro: IProfile,token:string}) => {
  const res = await axios.post(`${MY_SERVER}profile/`,obj.pro,{
    headers:{
      'Authorization': `Bearer ${obj.token}`
    }})
  return res.data
}

export const updProfile = async (obj:{pro: IProfile,token:string}) => {
  const res = await axios.put(`${MY_SERVER}profile/${obj.pro.user}`,obj.pro,{
    headers:{
      'Authorization': `Bearer ${obj.token}`
    }})
  return res.data
}