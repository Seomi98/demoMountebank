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
        "id": "1003",
        "code": "nvklal433",
        "name": "Black Watch3",
        "description": "Product Description3",
        "price": 73,
        "category": "Accessories" ,
    }]

    const stubs = [
        {
            predicates: [{
                exists: {
                    "method": "PUT",
                    "path": "/api/update",
                    "body": {
                        "id": false,
                    }
                }
            }],
            responses: [
                {
                    is: {
                        statusCode: 500,
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: {"message": "update fail" }
                    }
                }
            ]
        },
        {
            predicates: [{
                equals: {
                    "method": "PUT",
                    "path": "/api/update",
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
        }
    ];

    const imposter = {
        port: settings.update_port,
        protocol: 'http',
        stubs: stubs
    };

    return mbHelper.postImposter(imposter);
}

module.exports = { addService };