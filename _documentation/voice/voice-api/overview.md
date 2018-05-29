---
title: Overview
navigation_weight: 1
description: the Voice API overview.
---

# Voice API Overview

The Nexmo Voice API is the easiest way to build high-quality voice applications in the Cloud. With the Voice API you can:

* Build apps that scale with the web technologies that you are already using
* Control the flow of inbound and outbound calls in JSON with Nexmo Call Control Objects (NCCO)
* Record and store inbound or outbound calls
* Create conference calls
* Send text-to-speech messages in 23 languages with different genders and accents

## Contents

In this document you can learn about:

* [Nexmo Voice API Concepts](#concepts)
* [How to Get Started with the Voice API](#getting-started)
* [Guides](#guides)
* [Building Blocks](#building-blocks)
* [Tutorials](#tutorials)
* [Reference](#reference)

## Concepts

* **Authentication with JWTs** - interaction with the Voice API are authenticated using JWTs. The [Nexmo libraries](/tools) handle JWT generation using a unique Nexmo Voice Application ID and a Private Key. For more information see [authenticating your applications](/concepts/guides/authentication)

* **Nexmo Voice Applications** - Nexmo Voice Applications represent a one-to-one mapping with the application that you are building. They contain configuration such virtual numbers and webhook callback URLs. You can create Nexmo Voice Applications using the [Nexmo CLI](/tools) or the [Application API](/concepts/guides/applications)

* **[NCCOs](/voice/voice-api/guides/ncco)** - Nexmo Call Control Objects are a set of actions that instruct the Nexmo how to control call to your Nexmo application. For example, you can `connect` a call, send synthesized speech using `talk`, `stream` audio, or `record` a call. They are represented in JSON form as an Array of objects. For more information see the [NCCO Reference](/voice/guides/ncco-reference) and [NCCO guide](/voice/voice-api-guides/ncco).

* **[Numbers](/voice/voice-api/guides/numbers)** - The key concepts of using phone numbers in the nexmo voice API

* **[Webhooks](/voice/voice-api/guides/webhooks)** - HTTP requests are made to your application web server so that you can act upon them. For example, an incoming call will send a webhook.

## Getting Started

### Voice Playground

In the [Nexmo Dashboard](https://dashboard.nexmo.com), you can try out the Voice API interactively in the Voice Playground. Once you are [signed up for a Nexmo account](https://dashboard.nexmo.com/signup), you can go to [Voice Playground](https://dashboard.nexmo.com/voice/playground) in the Dashboard (Voice ‣ Voice Playground).

When you use the Voice Playground, you will be guided through the process of buying a phone number and assigning it to the Voice Playground, then you can interactively test NCCOs in the browser and see the results. Voice Playground also has a number of common use cases as examples you can try. These are listed below with links to guides and tutorials on how to implement them yourself:

* Connecting two users ([guide](/voice/voice-api/guides/connect-two-users), [tutorial](/tutorials/private-voice-communication))
* Interactive Voice Response (IVR) using DTMF tones ([guide](/voice/voice-api/guides/interactive-voice-response), [tutorial](/tutorials/interactive-voice-response))
* Conference Call ([guide](/voice/voice-api/guides/create-conferences))
* Send audio to call ([NCCO reference](/api/voice/ncco#stream), [API reference](/api/voice#stream))

More details are available in this blog post: [Meet Voice Playground, Your Testing Sandbox for Nexmo Voice Apps](https://www.nexmo.com/blog/2017/12/12/voice-playground-testing-sandbox-nexmo-voice-apps/)

## Guides

* [Call Flow](guides/call-flow): The various stages of a call and how they interact
* [Conversations](guides/calls-conversations): A conversation is between multiple callers, either as a conference bridge or a 1-to-1 call.
* [DTMF](guides/dtmf): User input via DTMF tones.
* [Endpoints](guides/endpoints): Call endpoints.
* [Lex connector](guides/lex-connector): Connecting to Amazon Lex.
* [NCCO](guides/ncco): Nexmo Call Control Objects (NCCO).
* [Numbers](guides/numbers): Nexmo Numbers.
* [Recording](guides/recording): Recording audio input from a caller or recording the conversation between two callers.
* [Text to Speech](guides/text-to-speech): Playing machine generated speech to your caller.
* [Websockets](guides/websockets): You can connect the audio of a call to a websocket to work with it in real time.

## Building Blocks

* [Before you begin](building-blocks/before-you-begin)
* [Connect an inbound call](building-blocks/connect-an-inbound-call)
* [Download a recording](building-blocks/download-a-recording)
* [Earmuff a call](building-blocks/earmuff-a-call)
* [Handle user input with DTMF](building-blocks/handle-user-input-with-dtmf)
* [Join multiple calls into a conversation](building-blocks/join-multiple-calls-into-a-conversation)
* [Make an outbound call](building-blocks/make-an-outbound-call)
* [Mute a call](building-blocks/mute-a-call)
* [Play an audio stream into a call](building-blocks/play-an-audio-stream-into-a-call)
* [Play DTMF into a call](building-blocks/play-dtmf-into-a-call)
* [Play Text-to-Speech into a call](building-blocks/play-text-to-speech-into-a-call)
* [Receive an inbound call](building-blocks/receive-an-inbound-call)
* [Record a call with split audio](building-blocks/record-a-call-with-split-audio)
* [Record a call](building-blocks/record-a-call)
* [Record a conversation](building-blocks/record-a-conversation)
* [Record a message](building-blocks/record-a-message)
* [Retrieve information for a call](building-blocks/retrieve-info-for-a-call)
* [Retrieve information for all calls](building-blocks/retrieve-info-for-all-calls)
* [Transfer a call](building-blocks/transfer-a-call)

## Tutorials

* [Tutorials](voice/voice-api/tutorials)

## Reference

* [REST API Reference](/api/voice)
* [NCCO Reference](/voice/voice-api/ncco-reference)