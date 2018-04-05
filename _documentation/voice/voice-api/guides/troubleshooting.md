---
title: Troubleshooting
navigation_weight: 9
---


# Troubleshooting

## Overview
The Nexmo Voice API offers a highly availble service, however due to the nature of providing service across hunderouds of phone carriers around the world occasionally problems may arise that are outside of our control. In addition there are certain limitations placed on us by our partner networks which can have an impact on how you application functions. 
While not exhaustive here are a few things to look for if  you are experiencing problems

## Timeouts
When Nexmo sends a webhook to your answer URL it expects the server to respond in a certain timeframe.

The TCP connection should be established within 3 seconds
The HTTP response (NCCO) should be returned within 5 seconds

If Nexmo does not get a response in these times it will retry the request.

## Regions

## Capacity

## Restrictions

## Error Events