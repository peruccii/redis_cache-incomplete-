const getRedisUrl = () => {
    if(process.env.REDIS_URL) {
        return process.env.REDIS_URL
    }
    throw new Error('RedisUrl is not definied')
}

