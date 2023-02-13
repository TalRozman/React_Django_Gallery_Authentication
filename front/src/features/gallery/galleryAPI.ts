import axios from "axios";
import { MY_SERVER } from "../../env";
import IGallery from "../../models/gallery";

export const getImage = async(token:String) =>
{
    const res = await axios.get(MY_SERVER + "gallery/",{
      headers:{
        'Authorization': `Bearer ${token}`
      }
    })
    return res.data
}

export const addImage = async(img:{pic:IGallery,token:String}) =>
{
    const res = await axios.post(MY_SERVER + "gallery/",{"title":img.pic.title,"content":img.pic.content,"user":img.pic.userId,"image":img.pic.image},{
        headers: {
          "content-type": "multipart/form-data",
          'Authorization': `Bearer ${img.token}`
        },
      })
    return res.data
}

export const updImage = async(img:{pic:IGallery,token:String}) =>
{
    const res = await axios.put(`${MY_SERVER}gallery/${img.pic.id}`,img.pic,{
        headers: {
          "content-type": "multipart/form-data",
          'Authorization': `Bearer ${img.token}`
        },
      })
    return res.data
}

export const delImage = async(img:{id:number,token:String}) =>
{
    const res = await axios.delete(`${MY_SERVER}gallery/${img.id}`,{
      headers:{
        'Authorization': `Bearer ${img.token}`
      }
    })
    return res.data
}

