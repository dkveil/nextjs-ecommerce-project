import { server } from '../config';

const headersConfig = {
    'Content-Type': 'application/json',
}

export const getData = async (url:string, token?: string) => {
    const res = await fetch(`${server}/api/${url}`, {
        method: 'GET',
        headers: token ? Object.assign(headersConfig, { 'Authorization': token }) : headersConfig,
    })

    const data = await res.json();
    return data;
}

export const postData = async <T>(url:string, post: T, token?: string) => {
    const res = await fetch(`${server}/api/${url}`, {
        method: 'POST',
        headers: token ? Object.assign(headersConfig, { 'Authorization': token }) : headersConfig,
        body: JSON.stringify(post)
    })

    const data = await res.json();
    return data;
}

export const patchData = async <T>(url: string, post: T, token?: string) => {
    const res = await fetch(`${server}/api/${url}`, {
        method: 'PATCH',
        headers: token ? Object.assign(headersConfig, { 'Authorization': token }) : headersConfig,
        body: JSON.stringify(post)
    })

    const data = await res.json();
    return data;
}

export const putData = async <T>(url:string, post: T, token?: string)  => {
    const res = await fetch(`${server}/api/${url}`, {
        method: 'PUT',
        headers: token ? Object.assign(headersConfig, { 'Authorization': token }) : headersConfig,
        body: JSON.stringify(post)
    })

    const data = await res.json();
    return data;
}

export const deleteData = async <T>(url:string, post: T, token?: string) => {
    const res = await fetch(`${server}/api/${url}`, {
        method: 'DELETE',
        headers: token ? Object.assign(headersConfig, { 'Authorization': token }) : headersConfig,
        body: JSON.stringify(post)
    })

    const data = await res.json();
    return data;
}