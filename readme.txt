=== Block for Apple Maps ===
Contributors:      10up, helen, welcher, fabiankaegy
Tags:              apple maps, map block
Requires at least: 5.2
Tested up to:      5.4.1
Requires PHP:      5.6
Stable tag:        0.1.0
License:           GPLv2 or later
License URI:       http://www.gnu.org/licenses/gpl-2.0.html

An Apple Maps block for the WordPress block editor (Gutenberg).

== Description ==

**Disclaimer:** _Apple Maps, MapKit JS, and the Apple logo are trademarks of Apple Inc.  Apple Maps may not be available in all countries or regions._

This plugin integrates Apple's [MapKit JS](https://developer.apple.com/maps/mapkitjs/) into an "Apple Maps" block in the WordPress block editor (Gutenberg).  You will need an [Apple Developer Program](https://developer.apple.com/programs/) account, Maps Identifier, and Private Key to configure this plugin and connect to the MapKit JS API in order for the block to function.  Note that the Apple Developer Program has an annual fee of 99 USD, in local currency where available.  Prices may vary by region and are listed in local currency during the enrollment process.  [Fee waivers are available for the Apple Developer Program for eligible organizations](https://developer.apple.com/support/membership-fee-waiver/).

== Installation ==

1. Install the plugin via the plugin installer, either by searching for it or uploading a .ZIP file.
1. Activate the plugin.
1. Follow the instructions to configure your accesss to the MapKit JS API.
1. Use Apple Maps for WordPress!

== Configuration ==

In order to start using the Apple Maps block, you will need to sign up for the Apple Developer Program and create your Maps identifiers, keys, and tokens.  Follow the steps below to generate the Private Key, Key ID, and Team ID that you will need to configure the plugin and gain access to the MapKit JS API for the Apple Maps block.

=== Create an Apple Developer account ===

1. [Enroll in the Apple Developer Program as either an individual or organization](https://developer.apple.com/programs/enroll/).
1. Sign the Apple Developer Program License Agreement in the [Agreements, Tax, and Banking section of App Store Connect](https://appstoreconnect.apple.com/WebObjects/iTunesConnect.woa/da/jumpTo?page=contracts).

=== Create a Maps Identifier and Private Key ===

1. [Create a Maps ID and a MapKit JS Private Key](https://developer.apple.com/documentation/mapkitjs/creating_a_maps_identifier_and_a_private_key).
1. Copy the Private Key, paste it into the respective plugin setup field, and ensure the key includes the `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----` lines.
1. Open the Key you created in Step 1, copy the `Key ID` value, and paste it into the respective plugin setup field.
1. Open the Identifier you created in Step 1, copy the `App ID Prefix` value (notice the value is appened with `(Team ID)`), and paste it into the respective plugin setup field.
1. Click the `Save API Key` button in the plugin setup to gain access to the block options and begin customizing your Apple Maps block!

== Frequently Asked Questions ==

= I'm seeing validation errors when trying to authenticate my MapKit JS credentials, what am I doing wrong? =

If you have WordPress installed in a subdirectory, then there is a [known issue](https://github.com/10up/maps-block-apple/issues/34) specifically related to this setup where the WordPress Admin URL is different from the site URL.  We're working on a [minor release](https://github.com/10up/maps-block-apple/milestone/3) to resolve this issue.
 
= Can I see how many map views and service requests are made to my MapKit JS Private Key? =
 
Yes, you can track your MapKit JS useage on the [MapKit JS Developer Dashboard](https://maps.developer.apple.com/).

== Screenshots ==


== Changelog ==

= 0.1.0 =
* Initial private release of Block for Apple Maps plugin.
