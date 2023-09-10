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


const CardCompact = (props) => {
  const router = useRouter();
  let name = props.item[`n`];
  let time = new Date(props.item[`a`]*1000);
  return (
  <div onClick={()=>{
    let slug =  name.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');
     router.push(`/post-detail/${props.item?.pk}/${slug}/`)
    }} key={props.index} style={{marginBottom:"10px"}} className={`my-2 overflow-hidden w-full  ${props?.page ==="dashboard"?"":"cursor-pointer"} py-2 bg-card rounded-md flex justify-center hover:bg-primary/10 border border-off-white/10 hover:border-primary/50 flex-col  md:flex-row`}>

    <div className='flex p-2'>
     <div className="bg-cover imagefit rounded mx-auto justify-center items-center inline-flex ml-2" style={{'backgroundImage':`url("${props.item[`t`] ? props.item[`t`] : props.categoryId==="XXX"?"https://i.therarbg.com/xnp.jpg": "https://i.therarbg.com/np.jpg"}")`, width:"50px",height:"50px"}}>
     </div>

      <div className="text-off-white  w-full text-[12px] text-left h-auto pt-1.5 text-ellipsis overflow-hidden pl-4 font-medium break-all">
      <span>
        {name}
      </span>
     </div>
    </div>


    <div className="flex text-off-white   h-auto pt-1.5 shift-right long-and-truncated font-light gap-4" style={{fontSize:"12px"}}>
      <span className='w-14'>
        {props.item['c'] || props.categoryId}
      </span>
      <span>・</span>
      <span className='w-14'>
        {time.getDate()}-{time.getMonth()+1}-{time.getFullYear()}
      </span>
      <span>・</span>
      <span className='w-14'>
        {formatBytes(props.item['s'])}
      </span>
    </div>
  </div>
  );
};

export default CardCompact;
