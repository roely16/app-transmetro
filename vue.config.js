module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ?
        '/apps/auditoria-buses/app-auditoria/' : '/',
    pwa: {
        workboxOptions: {
            skipWaiting: true
        }
    }
}