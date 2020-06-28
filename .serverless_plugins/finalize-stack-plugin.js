class FinalizeStackPlugin {
    constructor(serverless, options) {
        this.hooks = {
            'before:package:finalize': () => addConvertToTextContentHandling(serverless)
        }
    }
}

function addConvertToTextContentHandling({ service: { provider: { compiledCloudFormationTemplate: { Resources }} } }) {
    for (let key in Resources) {
        const resource = Resources[key];
        if (isAWSApiGatewayMethodType(resource) && isHttpMethodPost(resource) && isIntegrationHttpMethodPost(resource)
            && isPassthroughBehavior(resource)) {
            resource.Properties.Integration.ContentHandling = 'CONVERT_TO_TEXT';
        }
    }
}

function isAWSApiGatewayMethodType({ Type }) {
    return Type === 'AWS::ApiGateway::Method';
}

function isHttpMethodPost({ Properties: { HttpMethod }}) {
    return HttpMethod === 'POST';
}

function isIntegrationHttpMethodPost({ Properties: { Integration: { IntegrationHttpMethod } } }) {
    return IntegrationHttpMethod === 'POST'
}

function isPassthroughBehavior({ Properties: { Integration: { PassthroughBehavior } } }) {
    return PassthroughBehavior === 'WHEN_NO_TEMPLATES';
}

module.exports = FinalizeStackPlugin;
