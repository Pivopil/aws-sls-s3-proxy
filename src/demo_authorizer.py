import os
import logging
logger = logging.getLogger()
logger.setLevel(logging.INFO)


def generate_policy(principal_id, effect, resource):
    return {
        'context': {
                'stringKey': 'stringval',
                'numberKey': 123,
                'booleanKey': True
        },
        'principalId': principal_id,
        'policyDocument': {
            'Version': '2012-10-17',
            'Statement': [
                {
                    'Action': 'execute-api:Invoke',
                    'Effect': effect,
                    'Resource': resource
                }
            ]
        }
    }


def auth(event, context):

    logger.info(event)

    try:
        return generate_policy('User', 'Allow', event['methodArn'])
    except Exception as e:
        logger.info(f'Exception encountered: {e}')
        raise Exception('Unauthorized')
