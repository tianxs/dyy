import axios from 'axios';

let base = '';
axios.create({ headers: {'content-type': 'application/x-www-form-urlencoded'} });

export const requestLogin = params => { return axios.post(`${base}/login`, params).then(res => res.data); };

export const getUserList = params => { return axios.get(`${base}/user/list`, { params: params }); };

export const getProductInfoList = params => { return axios.get(`${base}/v2/productInfo/getProductInfoList`, { params: params }); };

export const removeUser = params => { return axios.get(`${base}/user/remove`, { params: params }); };

export const batchRemoveUser = params => { return axios.get(`${base}/user/batchremove`, { params: params }); };

export const editUser = params => { return axios.get(`${base}/user/edit`, { params: params }); };

export const addUser = params => { return axios.get(`${base}/user/add`, { params: params }); };

export const getStaffList = params => { return axios.get(`${base}/user/updateUser`, { params: params }); };

export const addStaff = params => { return axios.get(`${base}/user/saveUser`, { params: params }); };

export const resetPassword = params => { return axios.get(`${base}/user/resetPassword`, { params: params }); };
