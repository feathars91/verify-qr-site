export type AmplifyDependentResourcesAttributes = {
    "auth": {
        "verifyqrsite388b96f0": {
            "IdentityPoolId": "string",
            "IdentityPoolName": "string",
            "UserPoolId": "string",
            "UserPoolName": "string",
            "AppClientIDWeb": "string",
            "AppClientID": "string",
            "AppClientSecret": "string"
        }
    },
    "function": {
        "verilambda": {
            "Name": "string",
            "Arn": "string",
            "Region": "string",
            "LambdaExecutionRole": "string"
        },
        "authlambda": {
            "Name": "string",
            "Arn": "string",
            "Region": "string",
            "LambdaExecutionRole": "string"
        },
        "comebacklambda": {
            "Name": "string",
            "Arn": "string",
            "Region": "string",
            "LambdaExecutionRole": "string"
        }
    },
    "api": {
        "veriapi": {
            "RootUrl": "string",
            "ApiName": "string",
            "ApiId": "string"
        },
        "authapi": {
            "RootUrl": "string",
            "ApiName": "string",
            "ApiId": "string"
        },
        "comebackapi": {
            "RootUrl": "string",
            "ApiName": "string",
            "ApiId": "string"
        }
    }
}