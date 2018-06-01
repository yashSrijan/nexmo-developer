---
title: Authentication
---

# Authentication

Nexmo API provides various means of Authentication depending on what product you are using.

API | API Key and Secret (Query String) | API Key and Secret (Header) | JSON Web Token (JWT) | OAuth
-- | -- | -- | -- | --
[SMS](/api/sms) | ✅ | ❎ | ❎ | ✅
[Voice](/api/voice) | ❎ | ❎ | ✅ | ❎
[Verify](/api/verify) | ✅ | ❎ | ❎| ❎
[Number Insight](/api/number-insight) | ✅ | ❎ | ❎| ❎
[Conversion](/api/conversion) | ✅ | ❎ | ❎| ❎
[Developer](/api/developer) | ✅ | ❎ | ❎| ❎
[Messages](/api/messages-and-workflows-apis/messages) | ❎ | ✅ | ✅| ❎
[Workflows](/api/messages-and-workflows-apis/workflows) | ❎ | ✅ | ✅| ❎

## Contents

In this document you can learn about authentication via the following means:

* [API Key and Secret](#api-key-secret)
  * [Request Body](#request-body)
  * [Query String](#query-string)
  * [Header-based](#header-based-api-key-secret-authentication)
* [JSON Web Tokens (JWT)](#json-web-tokens-jwt)
* [OAuth](#oauth)

## API Key and Secret

When you create a Nexmo account you will be provided an API key and an API secret. The API key is used to identify the Nexmo account and the API secret is used to verify the identity. These can be found in your [account settings](https://dashboard.nexmo.com/settings) in the Nexmo Dashboard.

> Note: The secret should always be kept secure and never shared. Be careful when adding it to your codebase to make sure it is not shared with anyone who may use it maliciously. Read more about the [Best Security Practices for your Nexmo Account](https://help.nexmo.com/hc/en-us/articles/115014939548).

Nexmo APIs may require your API Key and Secret in a number of different ways.

### Request Body

For `POST` requests to the SMS API, your API key and secret should be sent as part of the body of the request in the JSON object.

### Query String

Your API key and secret should be included in the parameters of requests you make to the Conversion, Number Insight or Developer API.

### Header-based API Key and Secret Authentication

A number of newer Nexmo APIs require authentication to be done using an API key and secret sent Base64-encoded in the `Authorization` header.

For these APIs, you send your API key and secret in the following way:

```
Authorization: Basic base64(API_KEY:API_SECRET)
```

If your API key were `aaa012` and your API secret were `abc123456789`, you would concatenate the key and secret with a `:` (colon) symbol and then encode them using Base64 encoding to produce a value like this:

```
Authorization: Basic YWFhMDEyOmFiYzEyMzQ1Njc4OQ==
```

A website for generating Base64 encoded strings can be found here:

* General: [Base64 Encode and Decode](https://www.base64encode.org/)

Details on how to encode Base64 strings in a variety of programming languages can be found at the following websites:

* C#/.NET: [How do I encode and decode a base64 string?](https://stackoverflow.com/questions/11743160/how-do-i-encode-and-decode-a-base64-string) from StackOverflow
* Go: [Base64 Encoding](https://gobyexample.com/base64-encoding) from Go By Example
* Java: [Base64](https://docs.oracle.com/javase/8/docs/api/java/util/Base64.html)
* JavaScript: [Base64 encoding and decoding](https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding) from MDN web docs
* PHP: [base64_encode](https://secure.php.net/manual/en/function.base64-encode.php)
* Python: [base64](https://docs.python.org/2/library/base64.html)
* Ruby: [Base64](https://ruby-doc.org/stdlib-2.5.0/libdoc/base64/rdoc/Base64.html)
* Swift: [Base64 Encode and Decode in Swift](http://iosdevelopertips.com/swift-code/base64-encode-decode-swift.html) from iOS Developer Tips

### API Secret Rotation
It is possible to have two API secrets to be used against one API key at the same time. This way you can create a second API secret and test it before revoking the existing API secret in your production network. The API secret rotation procedure consists of the following steps:

1. Create a second API secret in your [account settings](https://dashboard.nexmo.com/settings)
2. Update one or more of your servers to use the newly created API secret for making calls to Nexmo APIs
3. Test that there are no connectivity issues and roll out the API secret update across the remaining servers
4. Delete the replaced API secret

## JSON Web Tokens (JWT)

JSON Web Tokens (JWT) are a compact, URL-safe means of representing claims to be transferred between two parties.

JWTs are supported by the Voice API as a means of authenticating your requests. The [Nexmo libraries](/tools) and CLI handle JWT generation using a unique Nexmo Voice Application ID and a Private Key.

Values for the Header are:

Name | Description | Required
-- | -- | --
`alg` | The encryption algorithm used to generate the JWT. `RS256` is supported. | ✅
`typ` | The token structure. Set to `JWT`. | ✅

The values for the payload claim are:

Name | Description | Required
-- | -- | --
`application_id` | The unique ID allocated to your application by Nexmo. | ✅
`iat` | The UNIX timestamp at UTC + 0 indicating the moment the JWT was requested. | ✅
`jti` | The unique ID of the JWT. | ✅
`nbf` | The UNIX timestamp at UTC + 0 indicating the moment the JWT became valid. | ❎
`exp` | The UNIX timestamp at UTC + 0 indicating the moment the JWT is no longer valid. Minimum time of 30 seconds from the time the JWT is generated. Maximim value of 24 hours from the time the JWT is generated. Default value of 15 minutes from the time the JWT is generation. | ❎

If you are not using a Nexmo library you should refer to [RFC 7519](https://tools.ietf.org/html/rfc7519) to implement JWT.

## OAuth

Some Nexmo APIs support OAuth as a means of authenticating. We provide an in-depth guide on how to authenticate with OAuth [here](/concepts/guides/oauth).

## References

* [Voice API Reference](/api/voice)
* [SMS API Reference](/api/sms)
