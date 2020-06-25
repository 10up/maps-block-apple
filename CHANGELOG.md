# Changelog

All notable changes to this project will be documented in this file, per [the Keep a Changelog standard](http://keepachangelog.com/), and will adhere to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased] - TBD

## [1.0.0] - 2020-06-22
### Added
- Rich preview to block inserter view (props [@fabiankaegy](https://github.com/fabiankaegy) via [#40](https://github.com/10up/maps-block-apple/pull/40))
- Error messaging on plugin activation for WordPress versions below 5.2 (props [@helen](https://github.com/helen), [@kopepasah](https://github.com/kopepasah) via [#50](https://github.com/10up/maps-block-apple/pull/50))
- Plugin deletion routine (props [@dinhtungdu](https://github.com/dinhtungdu) via [#47](https://github.com/10up/maps-block-apple/pull/47))
- Documentation improvements (props [@jeffpaul](https://github.com/jeffpaul), [@kopepasah](https://github.com/kopepasah), [ryanwelcher](https://github.com/ryanwelcher), [@fabiankaegy](https://github.com/fabiankaegy), [@helen](https://github.com/helen) via [#22](https://github.com/10up/maps-block-apple/pull/22), [#25](https://github.com/10up/maps-block-apple/pull/25), [#26](https://github.com/10up/maps-block-apple/pull/26), [#30](https://github.com/10up/maps-block-apple/pull/30), [#35](https://github.com/10up/maps-block-apple/pull/35), [#41](https://github.com/10up/maps-block-apple/pull/41), [#42](https://github.com/10up/maps-block-apple/pull/42), [#45](https://github.com/10up/maps-block-apple/pull/45), [#46](https://github.com/10up/maps-block-apple/pull/46))
- Plugin header, plugin icon, and block icon images (props [@JackieKjome](https://github.com/JackieKjome), [@jeffpaul](https://github.com/jeffpaul), [@ryanwelcher](https://github.com/ryanwelcher), [@fabiankaegy](https://github.com/fabiankaegy), [@helen](https://github.com/helen) via [#32](https://github.com/10up/maps-block-apple/pull/32), [#33](https://github.com/10up/maps-block-apple/pull/33), [#39](https://github.com/10up/maps-block-apple/pull/39))
- GitHub Action for JS and PHP linting (props [@helen](https://github.com/helen) via [#49](https://github.com/10up/maps-block-apple/pull/49))
- GitHub Actions for WordPress.org plugin deploy and readme/asset update (props [@jeffpaul](https://github.com/jeffpaul) via [#36](https://github.com/10up/maps-block-apple/pull/36))

### Changed
- Refactored codebase, build system to use `@wordpress/scripts` (props [@fabiankaegy](https://github.com/fabiankaegy), [@ryanwelcher](https://github.com/ryanwelcher) via [#20](https://github.com/10up/maps-block-apple/pull/20))
- Permissions to change the MapKit JS authentication keys to users with the capability to `manage_options` (props [@fabiankaegy](https://github.com/fabiankaegy), [@ryanwelcher](https://github.com/ryanwelcher) via [#29](https://github.com/10up/maps-block-apple/pull/29))
- Authorizations by passing a callback function to `authorizationCallback` (props [@fabiankaegy](https://github.com/fabiankaegy) via [#52](https://github.com/10up/maps-block-apple/pull/52))
- Re-licensed to GPLv2 (props [@jeffpaul](https://github.com/jeffpaul) via [#21](https://github.com/10up/maps-block-apple/pull/21))

### Security
- Bump `websocket-extensions` from 0.1.3 to 0.1.4 (props [@dependabot](https://github.com/apps/dependabot) via [#28](https://github.com/10up/maps-block-apple/pull/28))

## [0.1.0] - 2020-05-13
- Initial private release of Block for Apple Maps plugin.

[Unreleased]: https://github.com/10up/maps-block-apple/compare/trunk...develop
[1.0.1]: https://github.com/10up/maps-block-apple/compare/1.0.0...1.0.1
[1.0.0]: https://github.com/10up/maps-block-apple/releases/tag/1.0.0
[0.1.0]: https://github.com/10up/maps-block-apple/tree/a2fe565d64e2c59070f2dc3611700718d7383d37
