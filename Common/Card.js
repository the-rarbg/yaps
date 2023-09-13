import React from 'react';
import {useRouter } from 'next/router';

function formatBytes(bytes, decimals = 1) {
  if (!+bytes) return '0 Bytes'

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}


const Card = (props) => {
  const router = useRouter();
  let name = props.item[`name`];
  let time = new Date(props.item[`timestamp`]);
  return (
  <div onClick={()=>{
    if(props?.page ==="dashboard" || props?.blur){
      return;
    }
    let slug =  name.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');
     router.push(`/post-detail/${props.item?.eid}/${slug}/`)
  }} key={props.index} style={{marginBottom:"10px"}} className={`my-2 overflow-hidden w-full  ${props?.page ==="dashboard"?"":"cursor-pointer"} py-2 bg-card rounded-md flex justify-center hover:bg-primary/10  hover:border-primary/50 flex-col  md:flex-row `}>
    <div className='flex  p-2'>
    <div className="imagefit bg-cover rounded mx-auto justify-center items-center inline-flex ml-2" style={{'backgroundImage':`url("${props.item[`thumbnail`] ? props.item[`thumbnail`] : props.categoryId==="XXX"?"https://i.therarbg.com/xnp.jpg": "https://i.therarbg.com/np.jpg"}")`,width:"50px",height:"50px"}}>
    </div>
   
      <div className="text-off-white  flex items-center text-[14px] w-[90%] text-left h-auto pt-1.5 text-ellipsis overflow-hidden pl-4 font-light break-all">
      
        {props?.item?.name}
     
    </div>
    </div>
   
    <div className="flex shift-right  items-center  text-off-white text-[14px] h-auto pt-1.5 long-and-truncated font-light gap-4 " style={{fontSize:"12px"}}>
      <span className='w-14'>
        {props.item['c'] || props.categoryId}
      </span>
     
      <span className='w-14'>
        {time.getDate()||""}-{time.getMonth()+1||""}-{time.getFullYear()||""}
      </span>
     
      <span className='w-14'>
        {formatBytes(props.item['size'])}
      </span>
     {props?.page ==="dashboard"?  <span onClick={()=>{router.push(`/upload?data=${JSON.stringify(props?.item)}`)}} className='font-light cursor-pointer text-primary' >Edit</span>:null}
    </div>
  </div>);
};

export default Card;
