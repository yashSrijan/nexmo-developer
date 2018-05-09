---
title: Recording
navigation_weight: 4
---

# Recording audio

## Overview

The Nexmo Voice API offers the ability to record call audio in several
ways:

1. You can record a call between two people in a passive 'monitor'
   manner.
2. You can use record audio from a single caller when they are
   prompted. For example, as in a voicemail system.
3. You can also enable recording for a named conversation
   (conference).

By default all recordings are in a mono format, with all parts of the
call mixed together into a single channel. 

Nexmo also offers a split recording feature where the audio will be
saved as a stereo file. In this case the audio spoken and audio heard
by the callers is saved to separate left and right channels. This is
often useful for passing to transcription systems where you wish to
identify who said what. Split recording can be enabled via the NCCO.

You would initiate the recording using the `record` action of an NCCO
but the behaviour will differ depending on how you configure the
action.

Once the recording has been completed your application will be sent a
webhook to the Event URL that you specified when configuring the
recording. This webhook contains a URL where the recording file can be
downloaded from. You will need to authenticate with a JWT signed by
the same applicaton key that created the recording in order to
download the recording file.

NOTE: After your recording is complete, it is stored by Nexmo for 30 days.


## Synchronous and asynchronous modes

A `record` action will complete when either the `endOnSilence` timer
has been reached, or the `endOnKey` key is sent. At this point the
recording will be ended and a record event sent before the next action
is executed. This is used for scenarios similar to voicemail.

If `endOnSilence` or `endOnKey` is not set, then the record will work
in an asynchronous mannner and will instantly continue on to the next
action while still recording the call. The recording will only end and
send the relevant event when either the `timeout` value is reached, or
the call is ended. This is used for scenarios similar to call
monitoring.

When recording a named conversation, the recording is always
asynchronous and tied to the lifecycle of the conference.

## Split recordings

When recording a call, you can enable split recording which will
result in the recording being a stereo file with one channel having
the audio sent from the caller and another channel being the audio
heard by the caller. This applies when recording a call between
two people, or recording a `conversation`.

## File formats

Nexmo supports recording in MP3 or WAV format, the default is MP3.

MP3 files are recorded with a 16-bit depth and a 16kHz sample rate.
They are encoded with a constant bit rate of 32Kbps. 

WAV files are recorded with a 16-bit depth and a 16kHz sample rate.

Both formats are mono by default. If split recording is enabled, a
stereo file with each channel using the previously mentioned bit-depth
and sampling rates is created.

