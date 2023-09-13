import React from 'react';
import {useRouter } from 'next/router';

export function formatBytes(bytes, decimals = 1) {
  if (!+bytes) return '0 Bytes'

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}



const CardExpanded = (props) => {
  const router = useRouter();
  let name = props.item[`n`];
  let time = new Date(props.item[`a`]*1000);
  return (
  <div onClick={()=>{
    let slug =  name.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');
     router.push(`/post-detail/${props.item?.pk}/${slug}/`)
    }} key={props.index} className="my-3  overflow-hidden mt-6 cursor-pointer py-2 bg-card rounded-md flex-col justify-center inline-flex  hover:bg-primary/10 border border-off-white/10 hover:border-primary/50 zoomcss" style={{width:"200px"}}>
    <div className="w-40 h-44  bg-cover imagefit rounded mx-auto justify-center items-center inline-flex" style={{'backgroundImage':`url("${props.item[`t`] ? props.item[`t`] : props.categoryId==="XXX"?"https://i.therarbg.com/xnp.jpg": "https://i.therarbg.com/np.jpg"}")`}}>
    </div>
    <br />
      <div className="text-off-white text-[12px] h-auto pt-1.5 long-and-truncated font-medium w-fit break-all" style={{fontSize:"12px"}}>
      <span>
        {name}
      </span>
    </div>
    <div className="flex text-off-white text-[10px] h-auto pt-1.5 long-and-truncated font-light justify-between" style={{fontSize:"10px"}}>
      <span >
        {props.item['c'] || props.categoryId}
      </span>
      <span>・</span>
      <span >
        {time.getDate()}-{time.getMonth()+1}-{time.getFullYear()}
      </span>
      <span>・</span>
      <span >
        {formatBytes(props.item['s'])}
      </span>
    </div>
  </div>);
};

export default CardExpanded;
