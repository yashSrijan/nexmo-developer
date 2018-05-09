---
title: DTMF
navigation_weight: 6
---

# DTMF Tones

## Overview

Dual Tone Multi Frequency (DTMF), is a form of signalling used by
phone systems to transmit the digits `0-9` and the `*` and `#`
characters. Typically a caller presses these buttons on their
telephone keypad and the phone then generates a tone made up of two
frequencies played simultaneously (hence Dual Tone).

DTMF is used both for dialing a destination on a landline telephone
and also for signalling to the remote end once a call is answered.
Typically this is used to implement an Interactive Voice Response
(IVR) system, where or to enter information like a PIN number or
conferance number.  The Nexmo Voice API supports both collecting
information from callers using the `input` action in an NCCO as well
as sending DTMF tones within a call.
 
## Collecting Input

You can collect input from your caller on either an inbound or
outbound call by using the `input` action within your NCCO. You need
to set certain parameters so that Nexmo can return the data to you via
webhook, such as specifying either how many digits you expect, a
timeout value or asking the user to press `#` when completed. The
input action will then send a new webhook to your Event URL and you
can return a new NCCO to be executed.

## Sending DTMF 

There are two ways to send DTMF tones to a call:

1. For an outbound call made either via the REST API method
`create_call`, or via a `connect` action, you can set the `dtmfAnswer`
parameter within the phone endpoint. This means that when the call is
answered, Nexmo will automatically send the defined string of tones.

2. You can also send DTMF digits to a call at any time by sending a
PUT request to the REST API and specifying a string of `digits`.

You can use digits `0-9`, `*`, and `#`. A `p` indicates a pause of
500ms if you need to add a delay in sending the digits.


## Troubleshooting

DTMF can be sent across digtal phone networks in several ways, known
as In-Band and Out-of-Band, with In-Band the tones are played in the
audio channel of the call and will be heard by the parties on the
call. With Out-of-Band signalling the tones are sent in a separate
signalling channel and may not be heard by a caller listening on the
other end. This means that if you are testing sending DTMF by calling
your own phone, you may not hear the tones in your earpiece.

DTMF can also have specific local carrier problems. If you experience
difficulties in using DTMF please contact support@nexmo.com with
details of your problem.
