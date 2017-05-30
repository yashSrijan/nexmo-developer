---
title: Receive a phone call
navigation_weight: 2
---

# Receive a phone call

The example below shows how to handle an incoming call in the simplest possible way: by returning a simple text-to-speech command that will be played to the caller.

```tabbed_examples
source: /_examples/voice/building-blocks/receive-a-phone-call
```

If you are running the above code on a local server, you need to make that accessible to the Internet. [ngrok](https://ngrok.com/) is a common and easy way to do this. Once your service is publicly accessible, you can test that it loads by visiting it at `https://YOURURL.ngrok.com/call` and checking to make sure it returns the appropriate JSON.

Using a number you have bought from Nexmo, you can then wire your incoming calls up to that server using either the Developer API or the [nexmo-cli](http://github.com/nexmo/nexmo-cli), like this:

````
nexmo app:create "MyVoiceApp" https://YOURURL.ngrok.com/call https://YOURURL.ngrok.com/event
````

Now link your number to your app.

````
nexmo link:app 447700900000 f00f000-0000-0f00-f00f-f00f00f00f00
````

Now ring your number and it should connect through to your NCCO and you should get a text-to-speech greeting
