const crypto = require("crypto");

/**
 * @author: Jeb.Wang
 * @date: 2023/8/19 07:56
 */
function sha256(d) {
    crypto.createHmac('sha256', d)

}


