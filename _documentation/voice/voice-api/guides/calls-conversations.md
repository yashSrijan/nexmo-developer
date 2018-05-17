---
title: Conversations
navigation_weight: 2
---

# Calls and Conversations

## Overview

The Nexmo Voice API has two types of object: a call and a conversation. 

A call refers to a single call either to or from the Nexmo platform.
Sometimes this is also referred to as a leg.

A conversation contains one or more call legs. A new inbound or
outbound phone call will result in a new conversation being started,
the NCCO then executes within the context of a conversation.

Additional calls may be added to the conversation by the use of the
`connect` action. If an NCCO contains multiple `connect` actions then
each call will be joined into the same conversation and all parties
will be able to hear each other.

Calls and Conversations are each identified by their own UUID,
converstaion UUID's are prefixed with `CON-`

## Conferences

You can create a special type of conversation by using the
`conversation` action within an NCCO, this resulting named
conversation then acts like a conference bridge, new calls can be
added to this conversation by calling a `conversation` action with the
same name.

Conversation names are scoped to an application level, so any calls
that are connected to a conversation with the same name will be able
to hear each other, provided they are using the same application.
 