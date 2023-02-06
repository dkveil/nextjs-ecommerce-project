export const getInMB = (bites: number) => {
    return `${(bites / 1024 / 1024).toFixed(2)} MB`
}