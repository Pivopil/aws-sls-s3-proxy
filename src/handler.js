module.exports.hello = function(event, context, callback) {
    console.log('>>>>>>>>>>>>> event <<<<<<<<<<<<<<<<<<<<<');
    console.log(event);
    console.log('>>>>>>>>>>>>> context <<<<<<<<<<<<<<<<<<<<');
    console.log(context);

    const response = {
        statusCode: 200,
        headers: {
            'x-custom-header': 'My Header Value',
        },
        body: JSON.stringify({ message: 'Hello World!' }),
    };

    callback(null, response);
};
