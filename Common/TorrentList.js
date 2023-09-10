import moment from 'moment';
import { useRouter } from 'next/router';
import React from 'react'
import Modal from "react-modal";
import { formatBytes } from './CardExpanded';
const TorrentList = ({ setisTorrent,torrent_list, runtime }) => {
  const router = useRouter()
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      background: "#171e30",
      maxHeight: "700px",
      maxWidth: "900px",
      width: "100%",
      borderColor:"#454851",
     
    },
  };


  return (
    <>

      <Modal
        isOpen={true}
        style={customStyles}
        onRequestClose={()=>setisTorrent(false)}
      >
        {
          torrent_list.length>0?
          torrent_list?.map((item, index) => {
            return (
              <div key={index} style={{color:"#749BC2",borderColor:"#454851"}} onClick={() => {
                let slug = item?.name.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');
                router.push(`/post-detail/${item?.eid}/${slug}/`)

              }} className={`my-3 cursor-pointer  w-[]   py-2 bg-card rounded-md flex justify-center hover:bg-primary/10 border border-off-white/5 hover:border-primary/50 flex-col  md:flex-row`}>
                <div className="row-custom   text-[14px] justify-end h-auto pt-1.5 text-ellipsis overflow-hidden pl-4 font-medium ">
                  <span>
                    {item?.name}
                  </span>
                </div>


                <div className="flex  text-[14px] h-auto pt-1.5 justify-end long-and-truncated font-light gap-4">

                  <div className='w-4/12 md:w-[14%]'>
                    <a style={{ color: "#296ac8" }}>
                      Download
                    </a>
                  </div>
                  <span className='w-4/12 md:w-[14%]'>
                    {item?.category_str}
                  </span>
                  <span className='w-4/12 md:w-[14%]'>
                    {moment(item?.last_checked).format("DD-MM-YYYY")}
                  </span>
                 

                </div>
                <div className="flex  text-[14px] h-auto pt-1.5 justify-end long-and-truncated font-light gap-4">
                  <span className='w-4/12 md:w-[14%]'>
                      {moment.utc(runtime * 1000).format('HH:mm:ss')}
                    </span>
                    <span className='w-4/12 md:w-[14%]'>
                      {formatBytes(item?.size)}
                    </span>
                    <span className='w-4/12 md:w-[18%] text-green-500' style={{ color: "#00FF00" }}>
                      {item?.seeders}
                    </span>
                    <span className='w-4/12 md:w-[18%] text-red-600' style={{ color: "#ff0000" }}>
                      {item?.leechers}
                    </span>
                </div>
              </div>

            )
          })
       :<div className='nosimilar_torrent text-gray-700 '>
         <h1>
          Sorry Torrent Not Available Try after some days !!!
         </h1>
       </div> }

      </Modal>
    </>
  )
}

export default TorrentList