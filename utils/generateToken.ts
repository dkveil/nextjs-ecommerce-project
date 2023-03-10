import jwt from 'jsonwebtoken'

export const createAccessToken = (payload: object) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN, { expiresIn: '15m' })
}

export const createRefreshToken = (payload: object) => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN, { expiresIn: '7d'})
}