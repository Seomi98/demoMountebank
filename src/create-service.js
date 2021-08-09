const mbHelper = require('./mountebank-helper');
const settings = require('./settings');

function addService() {
    const response = [{
        "id": "1000",
        "name": "Bamboo Watch",
        "description": "Product Description",
        "price": 65,
        "category": "Accessories",
    },
    {
        "id": "1001",
        "code": "nvklal433",
        "name": "Black Watch",
        "description": "Product Description",
        "price": 72,
        "category": "Accessories",
    }]

    const stubs = [
        {
            predicates: [{
                // equals: {
                //     "method": "POST",
                //     "path": "/api/create",
                //     "body": { 
                //         "id": "1001",
                //         "code": "nvklal433",
                //         "name": "Black Watch",
                //         "description": "Product Description",
                //         "price": 72,
                //         "category": "Accessories" 
                //     }
                // },
                exists: {
                    "method": "POST",
                    "path": "/api/create",
                    "body": {
                        "id": true,
                        "name": true,
                        "price": true,
                        "category": true 
                    }
                }
            }],
            responses: [
                {
                    is: {
                        statusCode: 201,
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(response)
                    }
                }
            ]
        },
        {
            predicates: [{
                exists: {
                    "method": "POST",
                    "path": "/api/create",
                }
            }],
            responses: [
                {
                    is: {
                        statusCode: 500,
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: {"message": "create fail" }
                    }
                }
            ]
        }
    ];

    const imposter = {
        port: settings.create_port,
        protocol: 'http',
        stubs: stubs
    };

    return mbHelper.postImposter(imposter);
}

module.exports = { addService };