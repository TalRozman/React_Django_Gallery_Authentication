import { MY_SERVER } from "../../env";
import axios from "axios";
import IProfile from "../../models/profile";

export const getProfile = async (obj:{id:number,accessToken:string}) => {
  const res = await axios.get(`${MY_SERVER}profile/${obj.id}`,{
    headers:{
      'Authorization': `Bearer ${obj.accessToken}`
    }})
  return res.data
}

export const addProfile = async (obj:{pro: IProfile,accessToken:string}) => {
  const res = await axios.post(`${MY_SERVER}profile/`,obj.pro,{
    headers:{
      'Authorization': `Bearer ${obj.accessToken}`
    }})
  return res.data
}

export const updProfile = async (obj:{pro: IProfile,accessToken:string}) => {
  const res = await axios.put(`${MY_SERVER}profile/${obj.pro.user}`,obj.pro,{
    headers:{
      'Authorization': `Bearer ${obj.accessToken}`
    }})
  return res.data
}

export const delProfile = async (obj:{id: number,accessToken:string}) => {
  const res = await axios.delete(`${MY_SERVER}users/${obj.id}`,{
    headers:{
      'Authorization': `Bearer ${obj.accessToken}`
    }})
  return res.data
}