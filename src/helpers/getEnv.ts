
export const getEnv = (): string => {
    const env:string = process.env.NODE_ENV ?? ''
    if(env === 'prod' || env === 'dev'){
        return env
    } else {
        return 'dev'
    }
}