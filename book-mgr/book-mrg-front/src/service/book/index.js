import axios from 'axios'

export const add = (form) => {
    return axios.post('http://localhost:3000/book/add', form);
}

export const list = () => {
    return axios.get('http://localhost:3000/book/list')
}