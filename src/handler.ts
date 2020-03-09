import { ICallback, IEventPayload } from '../types/models';

const getApiRequest = require('./lib/getApiRequest');
const uri = 'https://jsonplaceholder.typicode.com/users';

module.exports.example = async(event: IEventPayload, context: any, callback: ICallback) => {
    const response = await getApiRequest.getApiRequest(uri);
    let statusCode: number;
    let responseBody: string;

    if ((typeof response) == 'object') {
        statusCode = response.statusCode || '';
        responseBody = JSON.stringify(response.body) || '';
    } else if ((typeof response) == 'string') {
        statusCode = 404;
        responseBody = response;
    } else {
        statusCode = 404;
        responseBody = '';
    }

    const output = {
        'statusCode': statusCode,
        'headers': {},
        'body': responseBody,
        'isBase64Encoded': false
    };

    callback(null, output);
};
