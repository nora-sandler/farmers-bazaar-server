module.exports = {
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    DB_URL: process.env.DB_URL || 'postgres://uqjrychxytvvgs:ee3377e6ec9e0e35d530f629040d0b539eaaf334fa1db3ea296451c4d02fe38a@ec2-52-206-15-227.compute-1.amazonaws.com:5432/d2a1j1gfkjslgl',

    //'postgresql://postgres@localhost/farmers-bazaar',
    JWT_SECRET: process.env.JWT_SECRET || 'change-this-secret',
    CLIENT_ORIGIN: '*',
    PGSSLMODE: "require"
}

