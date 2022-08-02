exports.handler = async (event, context) => {
    try {
        console.error('Hello world function');
        return {
            statusCode: 200,
            body: JSON.stringify({message: 'Hello world ! '}),
        };
    } catch (e: any) {
        return {
            statusCode: 500,
            body: JSON.stringify({error: 'Failed fetching'}),
        };
    }
};
