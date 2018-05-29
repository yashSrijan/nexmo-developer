---
title: Account management
---

# Account management

Dashboard is a web application that makes it easy to:

* Manage your account - setup and configure your Nexmo account
* Manage payments - top up your account balance, configure notifications and generate invoices
* Manage numbers - view and buy virtual numbers and short codes
* Analyse your API use - each product has a dedicated page you use to search and interpret the results of your API requests

## Contents

* [Manage your account](#manage-your-account)
* [Create and configure a Nexmo account](#create-and-configure-a-nexmo-account)
* [Retrieve your account information](#retrieve-your-account-information)
* [Manage users](#manage-users)
* [Manage your profile](#manage-your-profile)
* [Reset your password](#reset-your-password)
* [Supported browsers](#supported-browsers)

## Manage your account

You use Dashboard to:

* [Create and configure a Nexmo account](#create-and-configure-a-nexmo-account)
* [Retrieve your account information](#retrieve-your-account-information)
* [Manage users](#manage-users)
* [Manage your profile](#manage-your-profile)
* [Reset your password](#reset-your-password)


## Create and configure a Nexmo account

To create your free Nexmo account:

1. In your browser, navigate to [Dashboard](https://dashboard.nexmo.com/sign-up).
2. Add  your company information and click **Sign up**.
   Nexmo sends a PIN to your phone as a text message or automated phone call. The timeout for each verification attempt is 5 minutes.
   **Note**: you can associate a phone number with one account only. If your phone number is already associated with a Nexmo account you should [remove that phone number](#manage_profile) from the existing account.
3. In **Phone number verification**, enter the PIN sent to you by Nexmo and click **Verify**.
  You are logged into Dashboard and shown how to start developing with Nexmo. This page is displayed each time you login until you have made your first successful call with Nexmo API.

When you create your Nexmo account you are given €2 free test credit and your account is set in DEMO mode. You can use our products to send messages to up to 10 destination numbers, *[Nexmo DEMO]* is added to all the SMS you send. To move out of the Demo mode [add credit to your account](#add_payment_method).

For very few countries we cannot create a Nexmo account automatically. This is because of payment restrictions or legal trading restrictions for a US registered company.

## Retrieve your account information

To retrieve your Nexmo account information:

1. [Sign in](https://dashboard.nexmo.com/sign-in) to Dashboard.
3. On the top-right of Dashboard, click the arrow next to **&lt;username>**, then click **Settings**.
4. In **API settings**, you see your **API key** and **API secret**. You need these values for all API calls.

## Manage users

When you setup your Nexmo account you create your primary user. The primary user has unlimited access to your Nexmo products and services. That is:

* Manage payments and view your payment history
* Rent virtual numbers and short codes
* Search through your requests
* Analyse your API use

After setup, you can add secondary users to your Nexmo account. A secondary account can have the same access rights as your primary account or a restricted set. For example, you can create a secondary account with no access to payments.

To create a secondary user:

1. [Sign in](https://dashboard.nexmo.com/sign-in) to Dashboard.
2. On the top-right of Dashboard, click the arrow next to **&lt;username>**, then click **Users**.
3. Click **Add User**.
4. Add the user information and choose the restrictions for a secondary account.
5. Click **Save**.
6. Your secondary user uses the temporary password they receive in an email to access Dashboard and create a new password.

You use the *api_key* and *api_secret* associated with primary and secondary accounts to connect to Nexmo API endpoints.

## Manage your profile

Dashboard uses the the information you gave during setup to create your Nexmo profile. This includes:

* Contact information - phone number, email, skype and password.
* Company information - name, address and VAT number.

To change your profile information:

1. [Sign in](https://dashboard.nexmo.com/sign-in) to Dashboard.
2. On the top-right of Dashboard, click the arrow next to **&lt;username>**, then click **Edit profile**.
3. Update your contact or company information, then click **Save changes**.

## Reset your password

To reset your Nexmo password:

1. Navigate to [Forgot your password?](https://dashboard.nexmo.com/sign-in/forgot-password).
2. Enter the email address associated with your Nexmo account and click **Reset password**.
3. You receive a password reset link at the the email address associated with your Nexmo account. This link is valid for 15 minutes.
4. Navigate to the reset link and reset your password.

If having are still having issues, please contact <support@nexmo.com>.

## Supported browsers

The following browsers are supported by Dashboard:

* Chrome Stable
* Firefox Stable
* OS X Safari 8
* OS X Safari 9
* iOS 9 Safari
* iOS Chrome Stable
* Internet Explorer 10
* Internet Explorer 11
* Android Chrome Tablet*
* Android Other Mobile*
* Android Firefox Stable*
* iOS Safari Tablet View*

The following dimensions are supported:

* 1366x768
* 1920x1080
* 1280x1024
* 1024x768*

> **Note**: you must have JavaScript enabled to view Dashboard correctly.
