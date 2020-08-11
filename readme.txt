=== Block for Apple Maps ===
Contributors:      10up, helen, welcher, fabiankaegy, dinhtungdu
Tags:              apple maps, map block, block
Requires at least: 5.2
Tested up to:      5.5
Requires PHP:      5.6
Stable tag:        1.0.1
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

1. If you don't already have an Apple ID, then please [create an Apple ID](https://appleid.apple.com/account#!&page=create) as it is required in order to enroll in the Apple Developer Program in the next step.
1. [Enroll in the Apple Developer Program as either an individual or organization](https://developer.apple.com/programs/enroll/).  Note that its possible to have an existing Apple Developer account but not be enrolled in the Apple Developer Program, so please be sure to complete the enrollment process in this step.
1. Sign the Apple Developer Program License Agreement in the [Agreements, Tax, and Banking section of App Store Connect](https://appstoreconnect.apple.com/WebObjects/iTunesConnect.woa/da/jumpTo?page=contracts).

=== Create a Maps Identifier and Private Key ===

1. [Create a Maps ID and a MapKit JS Private Key](https://developer.apple.com/documentation/mapkitjs/creating_a_maps_identifier_and_a_private_key).
1. Copy the Private Key, paste it into the respective plugin setup field, and ensure the key includes the `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----` lines.
1. Open the Key you created in Step 1, copy the `Key ID` value, and paste it into the respective plugin setup field.
1. Open the Identifier you created in Step 1, copy the `App ID Prefix` value (notice the value is appended with `(Team ID)`), and paste it into the respective plugin setup field.
1. Click the `Confirm MapKit Credentials` button in the plugin setup to gain access to the block options and begin customizing your Apple Maps block!

== Frequently Asked Questions ==

= I'm seeing validation errors when trying to authenticate my MapKit JS credentials, what am I doing wrong? =

If you have WordPress installed in a subdirectory, then there is a [known issue](https://github.com/10up/maps-block-apple/issues/34) specifically related to this setup where the WordPress Admin URL is different from the site URL.  We're working on a [minor release](https://github.com/10up/maps-block-apple/milestone/3) to resolve this issue.

= I want to update my MapKit JS credentials, what's the best way to do this? =

Our recommendation on updating the Apple Maps block settings focuses on ensuring the best experience for your site users.  Specifically we recommend the following approach to ensure that existing Apple Maps on your site continue to be displayed during your MapKit JS credential transition.

1. Create a new MapKit JS Private Key, Key ID, and/or Team ID.
2. Update the Apple Maps block settings with the newly created Private Key, Key ID, and/or Team ID.
3. Delete your old MapKit JS Private Key, Key ID, and/or Team ID.

= Are there any MapKit JS rate limits? =

There is a free daily limit of 250,000 map views and 25,000 service calls per the Apple Developer Program membership.  For additional MapKit JS capacity needs you will need to [contact Apple directly](https://developer.apple.com/contact/request/mapkitjs/).

= Can I see how many map views and service requests are made to my MapKit JS Private Key? =

Yes, you can track your MapKit JS useage on the [MapKit JS Developer Dashboard](https://maps.developer.apple.com/).  You can also monitor map initializations and service requests in realtime, or see up to a year of activity by day, week, month, or year via the MapKit JS Dashboard.

== Screenshots ==

1. Block settings
2. Block marker settings
3. Block initial install view showing MapKit JS credential fields
4. Block settings page showing MapKit JS credential fields

== Changelog ==

= 1.0.1 =
* **Added:** Internationalization support via loading translations for the block (props [@dinhtungdu](https://profiles.wordpress.org/dinhtungdu/), [@helen](https://profiles.wordpress.org/helen/) via [#69](https://github.com/10up/maps-block-apple/pull/69))
* **Added:** WordPress.org Block Directory integration (props [@jeffpaul](https://profiles.wordpress.org/jeffpaul/) via [#63](https://github.com/10up/maps-block-apple/pull/63))
* **Added:** Documentation and GitHub Action updates (props [@helen](https://profiles.wordpress.org/helen/), [@jeffpaul](https://profiles.wordpress.org/jeffpaul/) via [#59](https://github.com/10up/maps-block-apple/pull/59), [#60](https://github.com/10up/maps-block-apple/pull/60), [#68](https://github.com/10up/maps-block-apple/pull/68))
* **Fixed:** Debounce `addMarker` call when marker settings are changed (props [@fabiankaegy](https://profiles.wordpress.org/fabiankaegy/), [@dinhtungdu](https://profiles.wordpress.org/dinhtungdu/) via [#70](https://github.com/10up/maps-block-apple/pull/70))
* **Fixed:** Key and Team ID settings placeholders (props [@dinhtungdu](https://profiles.wordpress.org/dinhtungdu/), [@helen](https://profiles.wordpress.org/helen/), [@jeffpaul](https://profiles.wordpress.org/jeffpaul/) via [#57](https://github.com/10up/maps-block-apple/pull/57))
* **Security:** Bump `lodash` from 4.17.15 to 4.17.19 (props [@dependabot](https://github.com/apps/dependabot) via [#67](https://github.com/10up/maps-block-apple/pull/67))
* **Security:** Bump `elliptic` from 6.5.2 to 6.5.3 (props [@dependabot](https://github.com/apps/dependabot) via [#71](https://github.com/10up/maps-block-apple/pull/71))

= 1.0.0 =
🎉 Initial public release!

Block for Apple Maps gives you an easy way to add MapKit-powered maps with custom markers to your site. For all of the technical details, please see the [full changelog](https://github.com/10up/maps-block-apple/blob/develop/CHANGELOG.md).

= 0.1.0 =
* Initial private release of Block for Apple Maps plugin.
