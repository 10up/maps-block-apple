=== Block for Apple Maps ===
Contributors:      10up, helen, welcher, fabiankaegy, dinhtungdu, jeffpaul
Tags:              apple maps, map block, block
Tested up to:      6.6
Stable tag:        1.1.4
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

= 1.1.3 - 2023-11-16 =
* **Changed:** Bump WordPress "tested up to" version to 6.4 (props [@QAharshalkadu](https://github.com/QAharshalkadu), [@jeffpaul](https://github.com/jeffpaul) via [#190](https://github.com/10up/maps-block-apple/pull/190), [#191](https://github.com/10up/maps-block-apple/pull/191)).

= 1.1.2 - 2023-10-16 =
* **Changed:** Bump WordPress "tested up to" version to 6.3 (props [@QAharshalkadu](https://github.com/QAharshalkadu), [@jeffpaul](https://github.com/jeffpaul) via [#179](https://github.com/10up/maps-block-apple/pull/179)).
* **Fixed:** Ensure our Mapkit JS only loads when a Map block is in place (props [@jayedul](https://github.com/jayedul), [@fabiankaegy](https://github.com/fabiankaegy), [@faisal-alvi](https://github.com/faisal-alvi) via [#161](https://github.com/10up/maps-block-apple/pull/161)).
* **Fixed:** Better error handling for environments that don't match our minimum PHP version (props [@rahulsprajapati](https://github.com/rahulsprajapati), [@dkotter](https://github.com/dkotter), [@ravinderk](https://github.com/ravinderk) via [#174](https://github.com/10up/maps-block-apple/pull/174)).
* **Fixed:** Ensure that the Apple Maps block works fine in WordPress 6.4 (props [@iamdharmesh](https://github.com/iamdharmesh), [@fabiankaegy](https://github.com/fabiankaegy), [@faisal-alvi](https://github.com/faisal-alvi) via [#183](https://github.com/10up/maps-block-apple/pull/183)).
* **Fixed:** Ensure that our Cypress E2E tests pass (props [@iamdharmesh](https://github.com/iamdharmesh), [@Sidsector9](https://github.com/Sidsector9) via [#181](https://github.com/10up/maps-block-apple/pull/181)).
* **Security:** Bump `word-wrap` from 1.2.3 to 1.2.4 (props [@dependabot](https://github.com/apps/dependabot), [@ravinderk](https://github.com/ravinderk) via [#173](https://github.com/10up/maps-block-apple/pull/173)).
* **Security:** Bump `tough-cookie` from 4.1.2 to 4.1.3 (props [@dependabot](https://github.com/apps/dependabot), [@faisal-alvi](https://github.com/faisal-alvi) via [#176](https://github.com/10up/maps-block-apple/pull/176)).
* **Security:** Bump `cypress` from 11.2.0 to 13.2.0 and `@cypress/request` from 2.88.11 to 3.0.0 (props [@dependabot](https://github.com/apps/dependabot), [@ravinderk](https://github.com/ravinderk), [@faisal-alvi](https://github.com/faisal-alvi), [@iamdharmesh](https://github.com/iamdharmesh), [@Sidsector9](https://github.com/Sidsector9) via [#176](https://github.com/10up/maps-block-apple/pull/176), [#180](https://github.com/10up/maps-block-apple/pull/180), [#181](https://github.com/10up/maps-block-apple/pull/181)).
* **Security:** Bump `postcss` from 8.4.23 to 8.4.31 (props [@dependabot](https://github.com/apps/dependabot), [@ravinderk](https://github.com/ravinderk) via [#184](https://github.com/10up/maps-block-apple/pull/184)).
* **Security:** Bump `@10up/cypress-wp-utils` from 0.1.0 to 0.2.0, `@wordpress/env` from 5.6.0 to 8.7.0 and `cypress-mochawesome-reporter` from 3.4.0 to 3.6.0 (props [@iamdharmesh](https://github.com/iamdharmesh), [@Sidsector9](https://github.com/Sidsector9) via [#181](https://github.com/10up/maps-block-apple/pull/181)).

= 1.1.1 - 2023-06-21 =
* **Note that this release bumps the PHP minimum supported version from 5.6 to 7.4.**

* **Added:** Mochawesome reporter added for Cypress test report (props [@jayedul](https://github.com/jayedul), [@iamdharmesh](https://github.com/iamdharmesh) via [#168](https://github.com/10up/maps-block-apple/pull/168)).
* **Changed:** Bump PHP minimum supported version from 5.6 to 7.4 (props [@jayedul](https://github.com/jayedul), [@csloisel](https://github.com/csloisel), [@faisal-alvi](https://github.com/faisal-alvi), [@dkotter](https://github.com/dkotter) via [#133](https://github.com/10up/maps-block-apple/pull/133)).
* **Changed:** Run E2E tests on the zip generated by "Build release zip" action (props [@jayedul](https://github.com/jayedul), [@peterwilsoncc](https://github.com/peterwilsoncc) via [#163](https://github.com/10up/maps-block-apple/pull/163)).
* **Changed:** Bump WordPress "tested up to" version to 6.2 (props [@jayedul](https://github.com/jayedul), [@peterwilsoncc](https://github.com/peterwilsoncc), [@Sidsector9](https://github.com/Sidsector9) via [#165](https://github.com/10up/maps-block-apple/pull/165), [#167](https://github.com/10up/maps-block-apple/pull/167)).
* **Changed:** Update Cypress E2E and Dependency Review GitHub Actions (props [@jayedul](https://github.com/jayedul), [@jeffpaul](https://github.com/jeffpaul), [@Sidsector9](https://github.com/Sidsector9) via [#166](https://github.com/10up/maps-block-apple/pull/166), [#169](https://github.com/10up/maps-block-apple/pull/169)).
* **Security:** Bump `simple-git` from 3.15.1 to 3.16.0 (props [@dependabot](https://github.com/apps/dependabot) via [#158](https://github.com/10up/maps-block-apple/pull/158)).
* **Security:** Bump `http-cache-semantics` from 4.1.0 to 4.1.1 (props [@dependabot](https://github.com/apps/dependabot) via [#159](https://github.com/10up/maps-block-apple/pull/159)).
* **Security:** Bump `@sideway/formula` from 3.0.0 to 3.0.1 (props [@dependabot](https://github.com/apps/dependabot) via [#160](https://github.com/10up/maps-block-apple/pull/160)).
* **Security:** Bump `webpack` from 5.73.0 to 5.76.1 (props [@dependabot](https://github.com/apps/dependabot) via [#162](https://github.com/10up/maps-block-apple/pull/162)).

= 1.1.0 - 2023-01-23 =
* **Note that this release bumps the WordPress minimum version from 5.2 to 5.8.**

* **Added:** Support for custom marker icons (props [@iamdharmesh](https://github.com/iamdharmesh), [@dinhtungdu](https://github.com/dinhtungdu), [@fabiankaegy](https://github.com/fabiankaegy) via [#136](https://github.com/10up/maps-block-apple/pull/136)).
* **Added:** Ability to control margin of map (props [@fabiankaegy](https://github.com/fabiankaegy), [@dkotter](https://github.com/dkotter) via [#157](https://github.com/10up/maps-block-apple/pull/157)).
* **Added:** End-to-end testing setup with Cypress (props [@cadic](https://github.com/cadic), [@peterwilsoncc](https://github.com/peterwilsoncc) via [#126](https://github.com/10up/maps-block-apple/pull/126)).
* **Changed:** Bump minimum WordPress version from 5.2 to 5.8 (props [@cadic](https://github.com/cadic), [@peterwilsoncc](https://github.com/peterwilsoncc) via [#126](https://github.com/10up/maps-block-apple/pull/126)).
* **Changed:** Update linting workflows to take advantage of GitHub Actions summaries (props [@dinhtungdu](https://github.com/dinhtungdu), [@fabiankaegy](https://github.com/fabiankaegy) via [#128](https://github.com/10up/maps-block-apple/pull/128)).
* **Changed:** Update Support Level from `Active` to `Stable` (props [@jeffpaul](https://github.com/jeffpaul), [@dkotter](https://github.com/dkotter) via [#135](https://github.com/10up/maps-block-apple/pull/135)).
* **Changed:** Update composer dependencies to avoid conflict (props [@peterwilsoncc](https://github.com/peterwilsoncc), [@iamdharmesh](https://github.com/iamdharmesh) via [#145](https://github.com/10up/maps-block-apple/pull/145)).
* **Changed:** Bump WordPress "tested up to" version to 6.1 (props [@iamdharmesh](https://github.com/iamdharmesh), [@cadic](https://github.com/cadic) via [#148](https://github.com/10up/maps-block-apple/pull/148)).
* **Security:** Bump `terser` from 5.14.1 to 5.14.2 (props [@dependabot](https://github.com/apps/dependabot) via [#132](https://github.com/10up/maps-block-apple/pull/132)).
* **Security:** Bump `markdown-it` from 12.0.4 to 12.3.2 and `@wordpress/scripts` from 20.0.2 to 24.5.0 (props [@dependabot](https://github.com/apps/dependabot) via [#138](https://github.com/10up/maps-block-apple/pull/138)).
* **Security:** Bump `loader-utils` from 2.0.2 to 2.0.4 (props [@dependabot](https://github.com/apps/dependabot) via [#146](https://github.com/10up/maps-block-apple/pull/146)).
* **Security:** Bump `simple-git` from 3.10.0 to 3.15.1 (props [@dependabot](https://github.com/apps/dependabot) via [#149](https://github.com/10up/maps-block-apple/pull/149)).
* **Security:** Bump `json5` from 1.0.1 to 1.0.2 (props [@dependabot](https://github.com/apps/dependabot) via [#153](https://github.com/10up/maps-block-apple/pull/153)).

= Earlier versions =
For the changelog of earlier versions, please refer to the [changelog on github.com](https://github.com/10up/maps-block-apple/blob/develop/CHANGELOG.md).

== Upgrade Notice ==

= 1.1.4 =

* Note that this version bumps the minimum WordPress version from 5.8 to 6.4

= 1.1.1 =

* Note that this version bumps the PHP minimum supported version from 5.6 to 7.4

= 1.1.0 =

* Note that this version bumps the minimum WordPress version from 5.2 to 5.8.
