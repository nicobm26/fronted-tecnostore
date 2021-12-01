module.exports = {
    client: {
      service: {
        name: 'api-gateway',
        // URL to the GraphQL API
        url: 'https://gateway-g71.herokuapp.com',
      },
      // Files processed by the extension
      includes: [
        'src/**/*.vue',
        'src/**/*.js',
      ],
    },
  }
