var axios = require('axios');
var FormData = require('form-data');

module.exports = {
    init(providerOptions) {
        const clientId = providerOptions.clientId;

        return {
            upload(file) {
                return new Promise(async (resolve, reject) => {
                    var formData = new FormData();
                    formData.append('image', file.buffer);

                    var config = {
                        method: 'post',
                        url: 'https://api.imgur.com/3/image',
                        headers: {
                            'Authorization': `Client-ID ${clientId}`,
                            ...formData.getHeaders()
                        },
                        data: formData
                    };

                    const {data, status} = await axios(config).catch(error => {
                        reject(error);
                        return {data: null, status: null};
                    });
                    if (data && status === 200 && data.data) {
                        file.url = data.data.link;
                        file.provider_metadata = data.data
                    }
                    resolve();
                });
            },
            delete(file) {
                return new Promise(async (resolve, reject) => {
                    const deletehash = file.provider_metadata.deletehash;
                    var config = {
                        method: 'delete',
                        url: `https://api.imgur.com/3/image/${deletehash}`,
                        headers: {
                            'Authorization': `Client-ID ${clientId}`,
                        },
                    };
                    const {data, status} = await axios(config).catch(error => {
                        reject(error);
                        return {data: null, status: null};
                    });
                    resolve();
                })
            },
        };
    },
};
