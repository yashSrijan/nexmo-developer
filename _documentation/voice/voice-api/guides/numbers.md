---
title: Numbers
description: the key concepts of using phone numbers in the nexmo voice API
navigation_weight: 1
---

# Numbers

## Overview

Numbers are key to using the Nexmo Voice API. The following points
should be considered before developing your Nexmo Application.

### Formatting

Within the Nexmo Voice API all numbers are in E.164 format. The
correct format is the full international format without a `+`, and
without the international access code such as `00` or `001`. Also, no
spaces or other characters such as `()-.` should be used. For example,
a US number would have the format `14155550101`. A UK number would
have the format `447700900123`. If you are unsure how to format the
number the Number Insight API can be used to find correct information
about a number.

### Outgoing CallerID

When making an outbound call from Nexmo the CallerID, `from` value
needs to be a Nexmo Number associated with your account. It does not
have to be linked to the application you are using, but it needs to be
within your account. If you set it to any other value then `from` is
set to `unknown`.


### Incoming CallerID

Nexmo endeavours to present to you the caller ID of the party calling
your Nexmo application in international format. However, this can
occasionally be incorrectly formatted by the originating
network. Nexmo passes through the number received from the number
supplier.


### Incoming Call Numbers 

Nexmo offers for rental incoming numbers located in many countries
around the world. In some countries the numbers may be enabled for SMS
or Voice only, or in others they will support both.

Nexmo can also provide numbers in both 'landline' and 'mobile' ranges
for many countries. You can search for and rent an available number
via the Dashboard or the Nexmo CLI tool. To use a number you have
rented from Nexmo with your voice application you need to link that
number to the application again either via the Dashboard or the CLI
tool. You can link multiple incoming numbers to the same application,
the called number will be passed to your webhook.
