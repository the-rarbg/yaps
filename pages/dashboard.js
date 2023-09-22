import React, { useEffect, useState } from 'react'
import Card from '../Common/Card';
import { Loader } from '../Common/Loader'
import ToastMsg from '../Common/ToastMsg'
import { getTorrentList } from '../service/service'
import Head from 'next/head'
const Dashboard = () => {


  const [loader, setLoader] = useState(false)
  const [userData, setUserData] = useState({})
  const [list, setList] = useState([])

  useEffect(() => {

    let token = localStorage.getItem("access_token")

    let temp = JSON.parse(localStorage.getItem("user_profile"))
    setUserData(temp)
    getInformation(token)
  }, [])

  const getInformation = (token) => {
    setLoader(true)
    getTorrentList(token).then((res) => {
      console.log("log", res?.data)
      setList(res?.data?.results)
      setLoader(false)
    }).catch((err) => {
      console.log("res", err)
      ToastMsg((err?.response?.data?.message || "something went wrong"), "error")
      if (err?.response?.status === 401) {
        localStorage.clear()
        window.location.href = "/"
      }
      setLoader(false)
    })
  }
  return (
    <>
    
     <Head>
        <title>Dashboard | Yaps</title>
      </Head>
      <div className="flex justify-center">

        <div className='text-center mt-4 text-[32px] font-bold w-[95%]'>
          {loader ? <Loader /> : null}
          <h1>Dashboard</h1>
          <div className='text-[16px] font-md text-right mt-3'>
            <h1> {"Welcome " + userData?.first_name + " " + userData?.last_name}</h1>
          </div>
        </div>

      </div>
      <br />
      <br />

      <div className='w-auto mb-[3rem] mx-4 md:mx-[9rem] dark:bg-card bg-white relative text-center flex rounded-xl overflow-hidden'>

        <div className={`flex-1 px-4 flex-wrap py-8 justify-center`}>
          {list.length > 0 ? list?.map((item, index) => {

            return (
              <>
                <Card item={item} categoryId={item?.category_str} page="dashboard" />
              </>

            )

          }) : <h1>No Data Fount</h1>}
        </div>
      </div>
    </>
  )
}

export default Dashboard
