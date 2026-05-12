=== Block for Apple Maps ===
Contributors:      10up, helen, welcher, fabiankaegy, dinhtungdu, jeffpaul
Tags:              apple maps, map block, block
Tested up to:      7.0
Stable tag:        1.1.5
License:           GPL-2.0-or-later
License URI:       https://spdx.org/licenses/GPL-2.0-or-later.html

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

= 1.1.5 - 2025-07-14 =
* **Note that this release bumps the WordPress minimum version from 6.4 to 6.6.**

* **Changed:** Bump WordPress "tested up to" version 6.8 (props [@sudip-md](https://github.com/sudip-md), [@mehidi258](https://github.com/mehidi258), [@jeffpaul](https://github.com/jeffpaul), [@dkotter](https://github.com/dkotter), [@peterwilsoncc](https://github.com/peterwilsoncc), [@Rishabh-fueled](https://github.com/@Rishabh-fueled) via [#229](https://github.com/10up/maps-block-apple/pull/229), [#230](https://github.com/10up/maps-block-apple/pull/230), [#237](https://github.com/10up/maps-block-apple/pull/237), [#238](https://github.com/10up/maps-block-apple/pull/238)).
* **Changed:** Bump WordPress minimum supported version to 6.6 (props [@sudip-md](https://github.com/sudip-md), [@mehidi258](https://github.com/mehidi258), [@jeffpaul](https://github.com/jeffpaul), [@dkotter](https://github.com/dkotter), [@peterwilsoncc](https://github.com/peterwilsoncc), [@Rishabh-fueled](https://github.com/@Rishabh-fueled) via [#229](https://github.com/10up/maps-block-apple/pull/229), [#230](https://github.com/10up/maps-block-apple/pull/230), [#238](https://github.com/10up/maps-block-apple/pull/238)).
* **Fixed:** Block crash when no Apple Maps credentials are configured (props [@elvismdev](https://github.com/elvismdev), [@peterwilsoncc](https://github.com/peterwilsoncc) via [#233](https://github.com/10up/maps-block-apple/pull/233)).
* **Security:** Bump `braces` from 3.0.2 to 3.0.3, `express` from 4.18.2 to 4.19.2, `webpack` from 5.89.0 to 5.94.0 and `webpack-dev-middleware` from 5.3.3 to 5.3.4 (props [@dependabot](https://github.com/apps/dependabot), [@faisal-alvi](https://github.com/faisal-alvi) via [#224](https://github.com/10up/maps-block-apple/pull/224)).
* **Security:** Bump `@wordpress/scripts` from 27.9.0 to 30.6.0, `body-parser` from 1.20.2 to 1.20.3, `express` from 4.19.2 to 4.21.1, `ws` from 7.5.9 to 8.18.0, `send` from 0.18.0 to 0.19.0 and `serve-static` from 1.15.0 to 1.16.2 (props [@dependabot](https://github.com/apps/dependabot), [@peterwilsoncc](https://github.com/peterwilsoncc) via [#231](https://github.com/10up/maps-block-apple/pull/231)).
* **Security:** Bump `@wordpress/e2e-test-utils-playwright` from 1.13.0 to 1.18.0, `serialize-javascript` from 6.0.1 to 6.0.2, `mocha` from 10.2.0 to 11.1.0 and removes `cookie` (props [@dependabot](https://github.com/apps/dependabot), [@peterwilsoncc](https://github.com/peterwilsoncc) via [#234](https://github.com/10up/maps-block-apple/pull/234)).
* **Security:** Bump `axios` from 1.7.4 to 1.9.0 and `http-proxy-middleware` from 2.0.6 to 2.0.9 (props [@dependabot](https://github.com/apps/dependabot), [@peterwilsoncc](https://github.com/peterwilsoncc) via [#241](https://github.com/10up/maps-block-apple/pull/241)).

= 1.1.4 - 2024-08-22 =
* **Note that this release bumps the WordPress minimum version from 5.8 to 6.4.**

* **Changed:** Update the `apiVersion` of the Apple Maps Block to Version 3 (props [@fabiankaegy](https://github.com/fabiankaegy), [@wadebekker](https://github.com/wadebekker), [@dkotter](https://github.com/dkotter) via [#211](https://github.com/10up/maps-block-apple/pull/211)).
* **Changed:** Bump WordPress "tested up to" version to 6.6 (props [@QAharshalkadu](https://github.com/QAharshalkadu), [@sudip-md](https://github.com/sudip-md), [@jeffpaul](https://github.com/jeffpaul), [@dkotter](https://github.com/dkotter) via [#212](https://github.com/10up/maps-block-apple/pull/212), [#218](https://github.com/10up/maps-block-apple/pull/218)).
* **Changed:** Bump minimum WordPress version from 5.8 to 6.4 (props [@QAharshalkadu](https://github.com/QAharshalkadu), [@sudip-md](https://github.com/sudip-md), [@jeffpaul](https://github.com/jeffpaul), [@dkotter](https://github.com/dkotter) via [#212](https://github.com/10up/maps-block-apple/pull/212), [#218](https://github.com/10up/maps-block-apple/pull/218)).
* **Fixed:** Load the Apple MapKit script in the editor iframe to ensure the Apple Maps block works correctly (props [@fabiankaegy](https://github.com/fabiankaegy), [@wadebekker](https://github.com/wadebekker), [@dkotter](https://github.com/dkotter) via [#211](https://github.com/10up/maps-block-apple/pull/211)).
* **Security:** Bump `postcss` from 8.4.23 to 8.4.32 (props [@dependabot](https://github.com/apps/dependabot), [@faisal-alvi](https://github.com/faisal-alvi) via [#194](https://github.com/10up/maps-block-apple/pull/194)).
* **Security:** Bump `@babel/traverse` from 7.21.5 to 7.23.7 (props [@dependabot](https://github.com/apps/dependabot), [@peterwilsoncc](https://github.com/peterwilsoncc) via [#200](https://github.com/10up/maps-block-apple/pull/200)).
* **Security:** Bump `axios` from 0.25.0 to 1.7.4, `@wordpress/scripts` from 24.6.0 to 27.5.0, `express` from 4.18.2 to 4.19.2, `follow-redirects` from 1.15.3 to 1.15.6 and `webpack-dev-middleware` from 5.3.3 to 5.3.4 (props [@dependabot](https://github.com/apps/dependabot), [@Sidsector9](https://github.com/Sidsector9) via [#209](https://github.com/10up/maps-block-apple/pull/209), [#219](https://github.com/10up/maps-block-apple/pull/219)).
* **Security:** Bump `braces` from 3.0.2 to 3.0.3 and `ws` from 7.5.9 to 7.5.10 (props [@dependabot](https://github.com/apps/dependabot), [@iamdharmesh](https://github.com/iamdharmesh) via [#215](https://github.com/10up/maps-block-apple/pull/215)).
* **Developer:** Support for the WordPress.org plugin preview (props [@dkotter](https://github.com/dkotter), [@jeffpaul](https://github.com/jeffpaul) via [#196](https://github.com/10up/maps-block-apple/pull/196)).

= Earlier versions =
For the changelog of earlier versions, please refer to the [changelog on github.com](https://github.com/10up/maps-block-apple/blob/develop/CHANGELOG.md).

== Upgrade Notice ==

= 1.1.5 =

* Note that this version bumps the minimum WordPress version from 6.4 to 6.6.

= 1.1.4 =

* Note that this version bumps the minimum WordPress version from 5.8 to 6.4

= 1.1.1 =

* Note that this version bumps the PHP minimum supported version from 5.6 to 7.4

= 1.1.0 =

* Note that this version bumps the minimum WordPress version from 5.2 to 5.8.
