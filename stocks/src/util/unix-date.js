export const getUnixDate = (date) => {
    return Math.floor(new Date(date).getTime() / 1000 )
}