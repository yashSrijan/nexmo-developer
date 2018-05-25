---
title: Play an audio stream into a call
navigation_weight: 9
---

# Play an audio stream into a call

This building block plays an audio stream into the specified call.

## Example

Replace the following variables in the example code:

Key |	Description
-- | --
`UUID` | the UUID of the call into which to play an audio stream.
`URL` | The URL of the audio file that will be streamed into an array. The URL must be in an array.

```building_blocks
source: '_examples/voice/play-an-audio-stream-into-a-call'
```

## Try it out

When you run the code an audio stream from the file specified is played
into the call identified with the specified UUID.
