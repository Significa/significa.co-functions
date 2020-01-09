<a href="https://significa.co"><img src="https://user-images.githubusercontent.com/4838076/70076649-20d29b00-15f7-11ea-9379-e2fa1889a525.png" alt="logo" width="300px"></a>

![cover](https://user-images.githubusercontent.com/17513388/71968850-8cfb7c80-31fd-11ea-830a-771f2d97be13.png)

## Significa.co Functions

Serverless framework project to handle the backend requirements for significa.co

### Configure AWS

Make sure you have the aws cli installed on your machine and run

```sh
aws configure
```

You will be prompted for your Access Key and Secret, so make sure you have your credentials nearby.

### Deploy

To deploy the entire infrastructure

```sh
sls deploy
```

### Deploy specific function

If you make a change that doesn't impact any other resource (API Gateway, S3, etc.), this (significantly faster) command deploys only a specific function

```sh
sls deploy --function functionName
```

[![Significa footer](https://user-images.githubusercontent.com/17513388/71971185-fc736b00-3201-11ea-9678-090b6b6a0b3f.png)](https://significa.co)
