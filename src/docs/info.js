export const info = {
    definition: {
        neetlify: '3.0.0',   
        info: {
            title: 'API Ecommerce',
            version: '1.0.0',
            description: 'Ecommerce Gragera'
        },
        servers: [  
            {
                url: 'https://ecommerce-gragera.netlify.app'
                //url: 'http://localhost:8080/api'

            }
        ]
    },
    apis: ['./src/docs/*.yml']
}