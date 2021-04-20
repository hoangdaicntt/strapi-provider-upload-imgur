# strapi-provider-upload-imgur

### Enabling the provider
To enable the provider, create or edit the file at ./config/plugins.js

```
module.exports = ({ env }) => ({
    upload: {
        provider: 'imgur',
        providerOptions: {
            clientId: '',
        },
    },
});
```
