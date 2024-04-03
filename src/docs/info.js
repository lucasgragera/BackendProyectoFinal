export const info = {
    definition: {
        openapi: '3.0.0',   
        info: {
            title: 'API Ecommerce',
            version: '1.0.0',
            description: 'Ecommerce Gragera'
        },
        servers: [  
            {
                url: 'https://660db2c5a9a42e41e3af10b2--ecommerce-gragera.netlify.app/'
                //url: 'http://localhost:8080/api'

            }
        ]
    },
    apis: ['./src/docs/*.yml']
}