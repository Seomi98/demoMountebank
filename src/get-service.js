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
            predicates: [ {
                equals: {
                    method: "GET",
                    "path": "/api/get",
                }
            }],
            responses: [
                {
                    is: {
                        statusCode: 200,
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
        port: settings.get_port,
        protocol: 'http',
        stubs: stubs
    };

    return mbHelper.postImposter(imposter);
}

module.exports = { addService };