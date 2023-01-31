import { server } from '../config';

const headersConfig = {
    'Content-Type': 'application/json',
}

export const getData = async (url:string) => {
    const res = await fetch(`${server}/api/${url}`, {
        method: 'GET',
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

export const putData = async <T>(url:string, post: T) => {
    const res = await fetch(`${server}/api/${url}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(post)
    })

    const data = await res.json();
    return data;
}

export const deleteData = async <T>(url:string, post: T) => {
    const res = await fetch(`${server}/api/${url}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(post)
    })

    const data = await res.json();
    return data;
}