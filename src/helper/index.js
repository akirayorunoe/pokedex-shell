export const getQueryFromURL = (str) => {
    if (!str) return
    return (str)?.split('?')?.[1]
}