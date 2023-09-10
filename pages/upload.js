import React, { useEffect, useState } from 'react'
import { createTorrent, updateTorrent } from '../service/service';
import { Loader } from '../Common/Loader'
import ToastMsg from '../Common/ToastMsg';
import { useRouter } from 'next/router';
import Select from 'react-select';
import { formatBytes } from '../Common/CardExpanded';


const Upload = () => {
  const [token, setToken] = useState("")
  const [loader, setLoader] = useState(false)
  const [formInput, setFormInput] = useState()
  const [fileInput, setFileInput] = useState([{ name: "" }])
  const [imageArray, setImageArray] = useState([])
  const [errors, setErrors] = useState({})


  const [selectedOption, setSelectedOption] = useState([]);
  const router = useRouter()
  const { data } = router.query;
  useEffect(() => {
    let temp = data && JSON.parse(data)

    const _data = temp && temp?.genre.map((item, index) => {
      return { value:item, label:item };
    })
    setFormInput(temp)
    setImageArray(temp?.images)
    setSelectedOption(temp?.genre)
    setFileInput(temp?.images)

   
  setSelectedOption(_data)
    return setToken(localStorage.getItem("access_token"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])// eslint-disable-next-line react-hooks/exhaustive-deps
useEffect(()=>{

},[])

  console.log("formInput", formInput)
  console.log("select", selectedOption)
  const handleUpload = (e) => {
    e.preventDefault()
    let _genre = []
    _genre = selectedOption && selectedOption.map((item, index) => {
      return item.value;
    })
    console.log("pp", _genre)


    if (!formInput?.name) {
      setErrors({ ...errors, name: "This is Mandatory Field" })
      return
    }
    if (!formInput?.short_name) {
      setErrors({ ...errors, short_name: "This is Mandatory Field" })
      return
    }
    if (!formInput?.language) {
      setErrors({ ...errors, language: "This is Mandatory Field" })
      return
    }
    if (!formInput?.category_str) {
      setErrors({ ...errors, category_str: "This is Mandatory Field" })
      return
    }
    if (formInput?.category_str === "Movies" || formInput?.category_str === "TV") {
      if (!selectedOption || selectedOption?.length === 0) {
        setErrors({ ...errors, genre: "This is Mandatory Field" })
        return
      }

    }

    if (!formInput?.type) {
      setErrors({ ...errors, type: "This is Mandatory Field" })
      return
    }
    if (!formInput?.size) {
      setErrors({ ...errors, size: "This is Mandatory Field" })
      return
    }
    if (!formInput?.imdb) {
      setErrors({ ...errors, imdb: "This is Mandatory Field" })
      return
    }
    if (!formInput?.thumbnail) {
      setErrors({ ...errors, thumbnail: "This is Mandatory Field" })
      return
    }
    if (!formInput?.info_hash) {
      setErrors({ ...errors, info_hash: "This is Mandatory Field" })
      return
    }
    if (!formInput?.info_hash.length > 70) {
      setErrors({ ...errors, info_hash: "Torrent Hash Length can not be greater than 70" })
      return
    }

    if (!formInput?.descr) {
      setErrors({ ...errors, descr: "This is Mandatory Field" })
      return
    }

    let data = {
      name: formInput?.name,
      category_str: formInput?.category_str,
      short_name: formInput?.short_name,
      descr: formInput?.descr,

      type: formInput?.type,
      genre: _genre,
      language: formInput?.language,
      size: formInput?.size,
      size_char: formatBytes(formInput?.size),
      thumbnail: formInput?.thumbnail,
      images: imageArray,
      imdb: formInput?.imdb,
      downloads: 1,
      seeders: 1,
      leechers: 1,
      info_hash: formInput?.info_hash,
    }
    setLoader(true)
    createTorrent(data, token).then((res) => {
      setLoader(false)
      console.log(res)
      ToastMsg("File Uploaded Successfully", "success")
      router.push("/lendingPage/")
    }).catch((err) => {
      setLoader(false)
      if (err?.response?.status === 401) {
        ToastMsg("Session Expired !!", "error")
        localStorage.clear()
        window.location.href = "/login"
      }
      console.log(err)
    })
  }

  const handleUpdated = (e) => {
    e.preventDefault()
    let _genre = []
    _genre = selectedOption && selectedOption.map((item, index) => {
      return item.value;
    })
    console.log("pp", _genre)


    if (!formInput?.name) {
      setErrors({ ...errors, name: "This is Mandatory Field" })
      return
    }
    if (!formInput?.short_name) {
      setErrors({ ...errors, short_name: "This is Mandatory Field" })
      return
    }
    if (!formInput?.language) {
      setErrors({ ...errors, language: "This is Mandatory Field" })
      return
    }
    if (!formInput?.category_str) {
      setErrors({ ...errors, category_str: "This is Mandatory Field" })
      return
    }
    if (formInput?.category_str === "Movies" || formInput?.category_str === "TV") {
      if (!selectedOption || selectedOption?.length === 0) {
        setErrors({ ...errors, genre: "This is Mandatory Field" })
        return
      }

    }

    if (!formInput?.type) {
      setErrors({ ...errors, type: "This is Mandatory Field" })
      return
    }
    if (!formInput?.size) {
      setErrors({ ...errors, size: "This is Mandatory Field" })
      return
    }
    if (!formInput?.imdb) {
      setErrors({ ...errors, imdb: "This is Mandatory Field" })
      return
    }
    if (!formInput?.thumbnail) {
      setErrors({ ...errors, thumbnail: "This is Mandatory Field" })
      return
    }
    if (!formInput?.info_hash) {
      setErrors({ ...errors, info_hash: "This is Mandatory Field" })
      return
    }
    if (!formInput?.info_hash.length > 70) {
      setErrors({ ...errors, info_hash: "Torrent Hash Length can not be greater than 70" })
      return
    }

    if (!formInput?.descr) {
      setErrors({ ...errors, descr: "This is Mandatory Field" })
      return
    }

    let data = {
      eid:formInput?.eid,
      name: formInput?.name,
      category_str: formInput?.category_str,
      short_name: formInput?.short_name,
      descr: formInput?.descr,

      type: formInput?.type,
      genre: _genre,
      language: formInput?.language,
      size: formInput?.size,
      size_char: formatBytes(formInput?.size),
      thumbnail: formInput?.thumbnail,
      images: imageArray,
      imdb: formInput?.imdb,
      downloads: 1,
      seeders: 1,
      leechers: 1,
      info_hash: formInput?.info_hash,
    }
    setLoader(true)
    updateTorrent(data, token).then((res) => {
      setLoader(false)
      console.log(res)
      ToastMsg("Torrent Updated Successfully", "success")
      router.push("/lendingPage/")
    }).catch((err) => {
      setLoader(false)

      if (err?.response?.status === 401) {
        ToastMsg("Session Expired !!", "error")
        localStorage.clear()
        window.location.href = "/login"
      }
      console.log(err)
    })
  }

  


  console.log("pppp", errors)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setErrors({})
    if (name == "size") {
      setFormInput({ ...formInput, [name]: value.replace(/[^0-9{" "}]/g, '') })
    }
    else if (name === "info_hash") {
      setFormInput({ ...formInput, [name]: value.toUpperCase().replace(/[^0-9a-zA-Z{" "}]/g, '') })
    }
    else {
      setFormInput({ ...formInput, [name]: value })
    }
  }

  let addCreditFormFields = () => {
    setFileInput([...fileInput, { name: "" }]);
  };
  let removeCreditFormFields = (i) => {
    let newCreditFormValues = [...fileInput];
    let temp = [...imageArray]
    temp.splice(i, 1);

    newCreditFormValues.splice(i, 1);
    setFileInput(newCreditFormValues);
    setImageArray(temp)
  };


  const cateArray = ['Anime', 'Games', 'Books', 'XXX', 'Documentaries', 'Other', 'Apps', 'Music', 'TV', 'Movies'];

  const languageArray = ["english", "russian", "other", "german", "hindi"]
  const TypeList = ['3D', '3DS', 'AAC', 'Album', 'Android', 'Anime', 'Audiobook', 'Bollywood', 'Box Set', 'Cartoon', 'Comics', 'Concerts', 'DS', 'DVD', 'Discography', 'Divx/Xvid', 'Documentary', 'Dreamcast', 'Dual Audio', 'Dubbed', 'Dubs/Dual Audio', 'E-Books', 'Emulation', 'GameCube', 'Games', 'HD', 'HEVC/x265', 'Hentai', 'Images', 'Linux', 'Lossless', 'MP3', 'Mac', 'Magazine', 'Mobile Phone', 'Mp4', 'Nulled Script', 'Other', 'PC Game', 'PC Software', 'PS1', 'PS2', 'PS3', 'PS4', 'PSP', 'Picture', 'Radio', 'Raw', 'SD', 'SVCD/VCD', 'Single', 'Sounds', 'Subbed', 'Switch', 'Tutorials', 'UHD', 'Video', 'Wii', 'Xbox360', 'bluray', 'h.264/x264', 'iOS', 'web']
  const genre = [{ value: 'film-noir', label: "Film Noir" }, { valye: 'documentary', label: "Documentary" }, { value: 'adventure', label: "Adventure" }, { value: 'music', label: "Music" },
  { value: 'romance', label: "Romance" }, { value: 'animation', label: "Animation" },
  { value: 'crime', label: "Crime" }, { value: 'comedy', label: "Comedy" },
  { value: 'talk-show', label: "Talk Show" }, { value: 'sport', label: "Sport" },
  { value: 'news', label: "News" }, { value: 'biography', label: "Biography" },
  { value: 'history', label: "History" }, { value: 'musical', label: "Musical" },
  { value: 'horror', label: "Horror" }, { value: 'action', label: "Action" },
  { value: 'sci-fi', label: "Sci Fi" }, { value: 'reality-tv', label: "Reality tv" },
  { value: 'game-show', label: "Game Show" }, { value: 'war', label: "War" }, { value: 'adult', label: "Adult" },
  { value: 'drama', label: "Drama" }, { value: 'mystery', label: "Mystery" }, { value: 'thriller', label: "Thriller" },
  { value: 'western', label: "Western" }, { value: 'short', label: "Short" }, { value: 'fantasy', label: "Fantasy" },
  { value: 'family', label: "Family" }]

  console.log("sleect", selectedOption)
  useEffect(() => {
    setErrors({})
  }, [selectedOption])
  console.log(selectedOption)

  return (
    <div>
      {loader ? <Loader /> : null}
      <div className='w-[50%] pb-5 m-auto'>

        <div className='text-center justify-center mt-2'> <span className='text-[16px]  font-bold mt-3 pt-3'>You can get Image URL from : <a href="https://freeimage.host/" className='text-blue-600' target="_blank" rel="noreferrer">https://freeimage.host/</a></span>  </div>
        <div className="mt-[3rem] justify-center pt-5 pb-2 bg-gray-200 bg-opacity-10 rounded-lg border-gray-200 border-opacity-30 flex relative">

          <form onSubmit={(e)=>{
            if(formInput?.eid){
              handleUpdated(e)
            }
            else{
            handleUpload(e)
            }
            }} className='w-[85%]'>
            <div className="grid gap-6 mb-6 md:grid-cols-2">
              <div>
                <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title name</label>
                <input type="text" id="first_name" name="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Name" value={formInput?.name} onChange={handleChange} />
                <span className='text-red-400 text-[13px] '>{errors?.name}</span>
              </div>

              <div>
                <label htmlFor="file" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Short Name</label>
                <input type="text" id="id" name="short_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-[7px] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Short Name" value={formInput?.short_name} onChange={handleChange} />
                <span className='text-red-400 text-[13px] '>{errors?.short_name}</span>
              </div>


              <div>
                <label htmlFor="language" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Language</label>
                <select name="language" id="language" className="bg-gray-50 cursor-pointer border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" value={formInput?.language} onChange={handleChange} placeholder="Flowbite"  >
                  <option >
                    Select
                  </option>
                  {languageArray.map((item, index) => {
                    return (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    )
                  })}
                </select>
                <span className='text-red-400 text-[13px] '>{errors?.language}</span>
              </div>
              <div>
                <label htmlFor="category_str" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                <select id="category_str" name="category_str" className="bg-gray-50 cursor-pointer border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" value={formInput?.category_str} onChange={handleChange} placeholder="Flowbite" >
                  <option>
                    Select
                  </option>
                  {cateArray.map((item, index) => {
                    return (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    )
                  })}
                </select>
                <span className='text-red-400 text-[13px] '>{errors?.category_str}</span>
              </div>




              <div>
                <label htmlFor="language" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Type</label>
                <select name="type" id="language" className="bg-gray-50 border cursor-pointer border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" value={formInput?.type} onChange={handleChange} placeholder="Flowbite" >
                  <option>
                    Select
                  </option>
                  {TypeList.map((item, index) => {
                    return (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    )
                  })}
                </select>
                <span className='text-red-400 text-[13px] '>{errors?.type}</span>
              </div>
              <div >
                <label htmlFor="info_hash" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Size (in Bytes)</label>


                <div className='flex relative'>
                  <input type="text" name="size" maxLength={11} id="info_hash" className="bg-gray-50 mb-2 relative border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="987897" value={formInput?.size} onChange={handleChange} />
                  <span className='text-[12px] absolute text-green-400  right-5 top-[12px]'>{formatBytes(formInput?.size)}</span>

                </div>
                <span className='text-red-400 text-[13px] '>{errors?.size}</span>


              </div>
              <div >
                <label htmlFor="info_hash" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Imdb ID</label>


                <div className='flex relative'>
                  <input type="text" name="imdb" id="info_hash" className="bg-gray-50 mb-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="tt34057778" value={formInput?.imdb} onChange={handleChange} />


                </div>
                <span className='text-red-400 text-[13px] '>{errors?.imdb}</span>


              </div>

            </div>
            <div className="mb-6 text-white">
              <label htmlFor="category_str" className="block mb-2 text-sm font-medium text-white dark:text-white">Genre</label>
              <Select
                className="react-select-container "
                classNamePrefix="react-select"
                defaultValue={selectedOption}
                onChange={setSelectedOption}
              
                isMulti={true}
                options={genre}
                isSearchable
                theme={(theme) => ({
                  ...theme,
                  colors: {
                    ...theme.colors,
                    primary25: '#55aa7b',
  
                  },
                })}

              />
              <span className='text-red-400 text-[13px] '>{errors?.genre}</span>
            </div>


            <div className="mb-6">
              <label htmlFor="info_hash" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Thumbnail Images Urls</label>


              <div className='flex relative'>
                <input type="text" name="thumbnail" id="info_hash" className="bg-gray-50 mb-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Thumbnail image url" value={formInput?.thumbnail} onChange={handleChange} />


              </div>
              <span className='text-red-400 text-[13px] '>{errors?.thumbnail}</span>


            </div>

            <div className="mb-6">
              <label htmlFor="info_hash" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Add Images Urls</label>
              {
              fileInput&&  fileInput.map((item, index) => {
                  return (
                    <div key={index} className='flex relative'>
                      <input type="text" name={"image" + index} id="info_hash" className="bg-gray-50 mb-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Image url" value={formInput?.[`image${index}`]||item} onChange={(e) => {

                        let _data = [...imageArray]
                        _data[index] = e.target.value;
                        setImageArray(_data);
                      }} />
                      {index === 0 ? <span className='flex ml-2 cursor-pointer center text-[25px] font-bold text-primary/70' onClick={() => addCreditFormFields()}>+</span>
                        : <span className='flex ml-2 cursor-pointer center text-[25px] font-bold' onClick={() => removeCreditFormFields()}>-</span>
                      }
                    </div>
                  )

                })
              }


            </div>
            <div className="mb-6">
              <label htmlFor="info_hash" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Torrent Hash</label>
              <input type="text" name="info_hash" id="info_hash" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="309626C8000F9C006782B097E7B6EAADD7F7C3E7" value={formInput?.info_hash} onChange={handleChange} />
              <span className='text-red-400 text-[13px] '>{errors?.info_hash}</span>
            </div>

            <div className="mb-6">
              <label htmlFor="tag" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Torrent Descriptions</label>
              <textarea name="descr" rows={6} id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" value={formInput?.descr} onChange={handleChange} placeholder="" >
              </textarea>
              <span className='text-red-400 text-[13px] '>{errors?.descr}</span>
            </div>

            {/* <div className="flex items-start mb-6">
              <div className="flex items-center h-5">
                <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"  />
              </div>
              <label htmlFor="remember" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">I agree with the <a href="#" className="text-primary-600 hover:underline dark:text-primary-500">terms and conditions</a>.</label>
            </div> */}
            <button type="submit" className="bg-primary/10 text-primary border-primary my-3 hover:bg-primary/30 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-1.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700" style={{ border: "solid 0.5px" }} >Submit</button>
          </form>

        </div>
      </div>
    </div>

  )
}

export default Upload
