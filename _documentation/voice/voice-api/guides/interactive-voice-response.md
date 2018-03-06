---
title: Interactive Voice Response (IVR)
---
# Interactive Voice Response (IVR)

With the Voice API you can create an IVR by generating NCCOs (define this acronym) in a webhook.

Interactive Voice Response (IVR) allows your application to interact with humans through the use of voice as well as DTMF tones input on the handset keypad.
You can create IVR-based applications for a wide range of scenarios including mobile purchases, banking payments and services, retail orders, utility service enquiries, travel information and checking weather conditions.

In this section you will see how to build an IVR system using Nexmo APIs:

* [Prerequisites](#prerequisites) - rent and configure a virtual number for your IVR
* [Create your IVR](#create_ncco) - user NCCOs to create an experience for your user

## Prerequisites

To follow the steps in this tutorial you need to:

* Setup a [Nexmo account](/account/guides/management#create-and-configure-a-nexmo-account)
* Rent a virtual number using [Dashboard](/account/guides/numbers#rent-virtual-numbers) or [Developer API](/api/developer/numbers#buy-a-number) and set the webhook endpoint to your app (assumes how to set an endpoint)
* [Create an application](/concepts/guides/applications#apps_quickstart) and associate it with your virtual number. Nexmo retrieves the initial NCCO from the *answer_url* webhook and sends the DTMF input to the *eventUrl* webhook defined in the initial NCCO

## Create your IVR

In an IVR, when your user calls your virtual number you first send a welcome message using text-to-speech or an audio stream. This message tells your user which button to push for your available services. Then, in function of the *dtmf* input, you generate the NCCOS that create a customized experience for your user. (this last sentence is not clear)

Using *bargeIn*, your users do not have to listen to the whole announcement. If they already know their desired option, they can press an option during a *talk* or *stream* action, and the announcement is stopped and the IVR executes their instruction. Using *bargeIn* requires the *talk* or *stream* actions to be asynchronous, and this means you must set an *input* action later in the NCCO stack (how to do this?).

## IVR workflow

The workflow for an IVR is:

```js_sequence_diagram
Participant answer_url
Participant eventUrl
Participant Nexmo
Participant User
User->Nexmo: Call virtual number
Nexmo->answer_url: Send call info
answer_url->Nexmo: Return NCCO with options\n Set eventUrl
Nexmo->User: Send welcome message set in NCCO
User->Nexmo: Press digits in function of welcome message
Nexmo->eventUrl: Send dtmf input
eventUrl->Nexmo: Send customized NCCO\n in function of dtmf input
Note over Nexmo: Execute actions in NCCO
Nexmo->User: Customized user experience
```

## Implement IVR workflow

To implement the IVR workflow:

1. Supply your users with a virtual number to contact.

2. When a user calls the virtual numbers, Nexmo forwards information about the Call to your webhook endpoint.

3. At the webhook endpoint, store the caller information and send an NCCO with the welcome message and options:

    ```tabbed_examples
    source: '_examples/voice/guides/interactive-voice-response/1'
    ```

4. Your user hears the welcome message and presses a key to choose an option.

5. Your code at the <i>eventUrl</i> webhook endpoint returns a customized NCCO in function of the keys pressed by your user:

    ```tabbed_examples
    source: '_examples/voice/guides/interactive-voice-response/2'
    ```

## Summary

You have now built a simple IVR-based application.

In this guide you saw an example of how to provision and configure a virtual number, send a generic welcome message, handle inbound calls and created a customized experience for your user.

Note: add some more text on what the user should actually run and see as a result so they know their test application worked.

## Next steps

pointers to what to try next?
