import moment from 'moment'
import {useRouter} from 'next/router'
import React from 'react'

import Modal from 'react-modal'

import {formatBytes} from './CardExpanded'

import DataTable, {createTheme} from 'react-data-table-component'
import {useTheme} from 'next-themes'

const TorrentList = ({setisTorrent, torrent_list, runtime}) => {
    const theme = useTheme()
    const router = useRouter()

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            background: '#171e30',
            maxHeight: '700px',
            maxWidth: '1500px',
            border: '0px',
            width: '100%',
            borderColor: '#454851',
        },
    }

    const qualityRegex = /(4K|720p|1080p|2160p|720P|360P|360p|1080P)/i

    const columns = [
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'Action',

            cell: (row, index) => {
                let slug = row?.name
                    .toLowerCase()
                    .trim()
                    .replace(/[^\w\s-]/g, '')
                    .replace(/[\s_-]+/g, '-')
                    .replace(/^-+|-+$/g, '')

                return (
                    <a onClick={() => router.push(`/post-detail/${row?.eid}/${slug}/`)}>
                        Download
                    </a>
                )
            },
            width: '8%',
            style: {
                color: '#296ac8',
                cursor: 'pointer',
            },
        },
        {
            name: 'Category',
            selector: row => row.category_str,
            width: '8%',
            sortable: true,
        },
        {
            name: 'Res',
            selector: row =>
                row.name.match(qualityRegex) ? row.name.match(qualityRegex)[0] : '',
            width: '6%',
            sortable: true,
            sortFunction: (a, b) => {
                function compareQuality(a, b) {
                    if (a && b) {
                        const regex = /(\d+)p/
                        const qualityA = parseInt(
                            a.name.match(qualityRegex)
                                ? a.name.match(qualityRegex)[0]?.match(regex)
                                : ''
                        )
                        const qualityB = parseInt(
                            b.name.match(qualityRegex)
                                ? b.name.match(qualityRegex)[0]?.match(regex)
                                : ''
                        )
                        return qualityA - qualityB
                    }
                }

                return compareQuality(a, b)
            },
        },
        {
            name: 'Date',
            selector: row => moment(row?.last_checked).format('DD-MM-YYYY'),
            width: '9%',
            sortable: true,
        },
        {
            name: 'Runtime',
            selector: row => moment.utc(runtime * 1000).format('HH:mm:ss'),
            width: '9%',
            sortable: true,
        },
        {
            name: 'Size',
            selector: row => formatBytes(row?.size),
            sortable: true,
            width: '7%',
            sortFunction: (a, b) => {
                return a.size - b.size
            },
        },
        {
            name: 'S | L',
            cell: (row, index) => {
                let l = row?.leechers
                let s = row?.seeders
                return (
                    <span style={{color: "#00FF00"}}>
              {l} | <span style={{color: "#FF0000"}}>{s}</span>
            </span>
                )
            },
            sortable: true,
            sortFunction: (a, b) => {
                return a?.leechers - b?.leechers
            },
            width: '8%',
            style: {
                color: '#00FF00',
            },
        },

    ]
    createTheme('dark', {
        background: {
            default: 'transparent',
        },
    })

    const customCss = {
        headCells: {
            style: {
                fontSize: '14px',
                fontWeight: '700',
                color: theme === 'dark' ? '#C2D8D3' : '#000000',
            },
        },
    }

    console.log('torrent_list', torrent_list)

    createTheme('dark', {
        background: {
            default: 'transparent',
        },
    })

    return (
        <>
            <Modal
                isOpen={true}
                style={customStyles}
                onRequestClose={() => setisTorrent(false)}>
                {' '}
                {torrent_list.length > 0 ? (
                    <DataTable
                        columns={columns}
                        data={torrent_list}
                        theme={theme}
                        sortable
                        customStyles={customCss}
                    />
                ) : (
                    <div className='nosimilar_torrent text-gray-700 '>
                        <h1>Sorry Torrent Not Available Try after some days !!!</h1>
                    </div>
                )}
                {/* {

          torrent_list.length>0?

          torrent_list?.map((item, index) => {

            return (

              <div key={index} style={{color:"#749BC2",borderColor:"#454851"}} onClick={() => {

                let slug = item?.name.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');

                router.push(`/post-detail/${item?.eid}/${slug}/`)



              }} className={`my-3 cursor-pointer  w-[]   py-2 dark:bg-card bg-white rounded-md flex justify-center hover:bg-primary/10 border border-off-white/5 hover:border-primary/50 flex-col  md:flex-row`}>

                <div className="row-custom   text-[14px] justify-end h-auto pt-1.5 text-ellipsis overflow-hidden pl-4 font-light ">

                  <span>

                    {item?.name}

                  </span>

                </div>
                <div className="flex  text-[14px] h-auto pt-1.5 justify-end long-and-truncated font-light gap-4">



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

                <div className="flex  text-[14px] h-auto pt-1.5 justify-end long-and-truncated font-light gap-4">

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

       </div> } */}
            </Modal>
        </>
    )
}

export default TorrentList
