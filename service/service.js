import axios from "axios";
export const API_BASE = 'https://therarbg.to';
//const API_BASE = 'https://therarbg.com';
let token;

const headersApplicationJson = {
  "Content-Type": "application/json"
};

export const registerApi = (data) => {
  let url = `${API_BASE}/auth/api/v1/user/`
  return axios.post(url, data, { headers: headersApplicationJson })
}
export const loginApi = (data) => {
  let url = `${API_BASE}/auth/api/v1/token/`
  return axios.post(url, data, { headers: headersApplicationJson })
}
export const moviesListApi = (page, category, time) => {
  let url = `${API_BASE}/get-posts/category:${category}:time:50D:format:json/?page=${page}`;
  return axios.get(url, { headers: headersApplicationJson })
}

export const getSearchResult = (search,category) => {
  let temp = category.map(item => `category:${item}`).join(':');
  let  cat = temp?`:${temp}`:"";

  let url = `${API_BASE}/get-posts/keywords:${search}${cat}:format:json`;
  return axios.get(url, { headers: headersApplicationJson })
}

export const moviesTopListApi = (page, category, time) => {
  let url = `${API_BASE}/?format=json`;
  return axios.get(url, { headers: headersApplicationJson })
}
export const movieDetailsPost = (id,slug) => {
  let url = `${API_BASE}/post-detail/${id}/${slug}/?format=json`;
  return axios.get(url, { headers: headersApplicationJson })
}

export const getProfileDetails = (token) => {
  let url = `${API_BASE}/auth/api/v1/get-profile/`;
  return axios.get(url,{ headers: {
    "Content-Type": "application/json",
    "Authorization":"Bearer "+token
  } })
}


export const getListComment = (eid,token) => {

  let headers  ={
    "Content-Type": "application/json",
    "Authorization":"Bearer "+token
  }

  let header  ={
    "Content-Type": "application/json",
   
  }
  let temp = token?headers:header;

  let url = `${API_BASE}/user/api/v1/list-comment/${eid}/`;
  return axios.get(url, { headers:temp })
}

export const getTorrentList = (token) => {

  let headers  ={
    "Content-Type": "application/json",
    "Authorization":"Bearer "+token
  }



  let url = `${API_BASE}/api/v1/list-trb-post/`;
  return axios.get(url, { headers:headers })
}

export const getLinkWithImdb = (imdb) => {
  let headers  ={
    "Content-Type": "application/json",
  }
  let url = `${API_BASE}/imdb-detail/${imdb}?format=json`;
  return axios.get(url, { headers:headers })
}



export const postComment = (data,token) => {
  let url = `${API_BASE}/user/api/v1/create-comment/`;
  return axios.post(url, data,{ headers: {
    "Content-Type": "application/json",
    "Authorization":"Bearer "+token
  } })
}

export const  createTorrent  = (data,token)=>{
  let url = `${API_BASE}/api/v1/create-trb-post/`
  return axios.post(url, data,{ headers: {
    "Content-Type": "application/json",
    "Authorization":"Bearer "+token
  } })
}


export const  updateTorrent  = (data,token)=>{
  let url = `${API_BASE}/api/v1/get-trb-post/${data?.eid}/`
  return axios.put(url, data,{ headers: {
    "Content-Type": "application/json",
    "Authorization":"Bearer "+token
  } })
}
