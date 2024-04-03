export const info = {
    definition: {
        openapi: '3.0.0',   
        info: {
            title: 'Ecommerce Gragera',
            version: '1.0.0',
            description: 'Ecommerce Gragera'
        },
        servers: [  
            {
                url: 'https://ecommerce-gragera.netlify.app/docs'
            }
        ]
    },
    apis: ['./src/docs/*.yml']
}