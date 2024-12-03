const path = require('path');
const got = require('got');
const FormData = require('form-data');
const fs = require('fs');

const url = "https://imgtg.com/api/v1/upload"; // Your API URL
const token = "128|IFA3OJeCfXNDcxCvmM36H7dXrtwDsfhFip1Lzoeh"; // Your token

module.exports = async function (filePath, savePath, markdownPath) {
    const form = new FormData();
    form.append('file', fs.createReadStream(filePath));
    try {
        const response = await got.post(url, {
            headers: {
                'Authorization': token
            },
            body: form
        });

        const responseBody = JSON.parse(response.body);
        console.log(responseBody);

        if (responseBody.status) {
            const url = responseBody.data.links.url.replace(/\\\//g, '/');
            console.log(url);
            return url;
        } else {
            console.error(responseBody.message);
            throw new Error(responseBody.message);
        }
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}
