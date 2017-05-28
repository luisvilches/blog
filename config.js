module.exports = {
    static:{
        dir: 'uploads/',
        uploads:'./uploads'
    },
    bodyParser: {
        url:{
            extended: false
        }
    },
    server:{
        port: 5000
    },
    database: {
        connection: "mongodb://blog:blog@ds151461.mlab.com:51461/blog"
    },
    TOKEN_SECRET: process.env.TOKEN_SECRET || "79d27Mh1swkXnqGp2GdB0Xlgd28gdf1864zmTKox2T"
}