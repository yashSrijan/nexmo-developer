---
title: Send an SMS
description: How to send an SMS with the Nexmo SMS API
navigation_weight: 1
---

# Sending an SMS

Sending an SMS with Nexmo is easy. Simply [sign up for an account](https://dashboard.nexmo.com/sign-up) and replace the following variables in the example below:

| Key | Description |
| -------- | ----------- |
| `TO_NUMBER` | The number you are sending the SMS to |
| `API_KEY` | You can find this in your [account overview](https://dashboard.nexmo.com/account-overview) |
| `API_SECRET` | You can find this in your [account overview](https://dashboard.nexmo.com/account-overview) |

```tabbed_examples
tabs:
  cURL:
    source: _examples/messaging/sending-an-sms/basic/cURL
  c#:
    source: _examples/messaging/sending-an-sms/basic/c#
  Node:
    source: .repos/nexmo-community/nexmo-node-quickstart/sms/send.js
    from_line: 8
  PHP:
    source: _examples/messaging/sending-an-sms/basic/PHP
  Python:
    source: _examples/messaging/sending-an-sms/basic/Python
  Ruby:
    source: .repos/nexmo-community/nexmo-ruby-quickstart/sms/send.rb
    from_line: 8
```
