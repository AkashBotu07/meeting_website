require('dotenv').config()
module.exports = {
    METERED_DOMAIN: process.env.METERED_DOMAIN || "meeting_website.metered.live",
    METERED_SECRET_KEY: process.env.METERED_SECRET_KEY || "TImrZqqHD5t1ddxc8-SDl98TX_OtJ4Sjbq2zk00LVso_xHzE",
    port: process.env.PORT || 4000
}
