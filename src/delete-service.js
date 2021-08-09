const mbHelper = require('./mountebank-helper');
const settings = require('./settings');

function addService() {
    const response = [{
        "id": "1000",
        "name": "Bamboo Watch",
        "description": "Product Description",
        "price": 65,
        "category": "Accessories",
    }]

    const stubs = [
        {
            predicates: [{
                exists: {
                    "method": "DELETE",
                    "path": "/api/delete",
                    "query": { "id": false }
                }
            }],
            responses: [
                {
                    is: {
                        statusCode: 500,
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: {"message": "product not exists"}
                    }
                }
            ]
        },
        {
            predicates: [{
                exists: {
                    "method": "DELETE",
                    "path": "/api/delete",
                    "query": { "id": true }
                }
            }],
            responses: [
                {
                    is: {
                        statusCode: 200,
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify([])
                    }
                }
            ]
        }
    ];

    const imposter = {
        port: settings.delete_port,
        protocol: 'http',
        stubs: stubs
    };

    return mbHelper.postImposter(imposter);
}

module.exports = { addService };