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
  console.log("pp",props?.blur)
  const router = useRouter();
  let name = props.item[`name`];
  let time = new Date(props.item[`timestamp`]);
  return (
  <div onClick={()=>{
   
    if( props?.blur==true){
      props?.setBlur(false)
      return;
    }
    let slug =  name.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');
     router.push(`/post-detail/${props.item?.eid}/${slug}/`)
    }} key={props.index} className="my-3  mt-6 zoom overflow-hidden cursor-pointer py-2 bg-card rounded-md fab flex-col justify-center inline-flex  hover:bg-primary/10 hover_effect  hover:border-primary/50 zoomcss" style={{width:"200px"}}>
    <div className="w-40 h-44 bg-cover imagefit rounded mx-auto justify-center items-center inline-flex" style={{'backgroundImage':`url("${props.item[`thumbnail`] ? props.item[`thumbnail`] : props.categoryId==="XXX"?"https://i.therarbg.com/xnp.jpg": "https://i.therarbg.com/np.jpg"}")`}}>
    </div>
    <br />
      <div className="text-off-white  h-auto pt-1.5 long-and-truncated font-medium w-fit break-all" style={{fontSize:"12px"}}>
      <span>
      {props?.item?.name}
      </span>
    </div>
    <div className="flex text-off-white  h-auto pt-1.5 long-and-truncated font-light justify-between" style={{fontSize:"10px"}}>
      <span >
        {props.item['c'] || props.categoryId}
      </span>
      <span>・</span>
      <span >
        {time.getDate()}-{time.getMonth()+1}-{time.getFullYear()}
      </span>
      <span>・</span>
      <span >
        {formatBytes(props.item['size']||props.item['s'])}
      </span>
    </div>
  </div>);
};

export default CardExpanded;
