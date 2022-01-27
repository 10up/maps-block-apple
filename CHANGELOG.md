# Changelog

All notable changes to this project will be documented in this file, per [the Keep a Changelog standard](http://keepachangelog.com/), and will adhere to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased] - TBD

## [1.0.2] - 2022-01-28
### Added
- `wp env` for local development (props [@fabiankaegy](https://github.com/fabiankaegy), [@dinhtungdu](https://github.com/dinhtungdu), [@jeffpaul](https://github.com/jeffpaul) via [#77](https://github.com/10up/maps-block-apple/pull/77)).
- Issue management automation via GitHub Actions (props [@jeffpaul](https://github.com/jeffpaul) via [#96](https://github.com/10up/maps-block-apple/pull/96)).

### Changed
- Bump WordPress version "tested up to" 5.9 (props [@jeffpaul](https://github.com/jeffpaul), [@fabiankaegy](https://github.com/fabiankaegy), [@dinhtungdu](https://github.com/dinhtungdu), [@barneyjeffries](https://github.com/barneyjeffries) via [#80](https://github.com/10up/maps-block-apple/pull/80), [#99](https://github.com/10up/maps-block-apple/pull/99)).
- Turn off `autoComplete` for the search input field (props [@dinhtungdu](https://github.com/dinhtungdu) via [#111](https://github.com/10up/maps-block-apple/pull/111)).

### Fixed
- `block.json` syntax error (props [@dinhtungdu](https://github.com/dinhtungdu), [@jeffpaul](https://github.com/jeffpaul), [@ryanwelcher](https://github.com/ryanwelcher) via [#76](https://github.com/10up/maps-block-apple/pull/76)).
- Enqueue map assets only when being used and clean up unused assets (props [@joshuaabenazer](https://github.com/joshuaabenazer), [@fabiankaegy](https://github.com/fabiankaegy) via [#97](https://github.com/10up/maps-block-apple/pull/97)).
- Remove orign restriction in local environments to allow for proxied domains (props [@fabiankaegy](https://github.com/fabiankaegy), [@dinhtungdu](https://github.com/dinhtungdu) via [#98](https://github.com/10up/maps-block-apple/pull/98)).
- Block not working in Site Editor due to iframed editor (props [@fabiankaegy](https://github.com/fabiankaegy), [@dinhtungdu](https://github.com/dinhtungdu) via [#99](https://github.com/10up/maps-block-apple/pull/99)).
- Search popover sizing (props [@fabiankaegy](https://github.com/fabiankaegy), [@dinhtungdu](https://github.com/dinhtungdu), [@ankitguptaindia](https://github.com/ankitguptaindia) via [#110](https://github.com/10up/maps-block-apple/pull/110)).

### Security
- Bump `ini` from 1.3.5 to 1.3.8 (props [@dependabot](https://github.com/apps/dependabot) via [#79](https://github.com/10up/maps-block-apple/pull/79)).
- Bump `elliptic` from 6.5.3 to 6.5.4 (props [@dependabot](https://github.com/apps/dependabot) via [#81](https://github.com/10up/maps-block-apple/pull/81)).
- Bump `y18n` from 4.0.0 to 4.0.1 (props [@dependabot](https://github.com/apps/dependabot) via [#84](https://github.com/10up/maps-block-apple/pull/84)).
- Bump `ssri` from 6.0.1 to 6.0.2 (props [@dependabot](https://github.com/apps/dependabot) via [#86](https://github.com/10up/maps-block-apple/pull/86)).
- Bump `lodash` from 4.17.19 to 4.17.21 (props [@dependabot](https://github.com/apps/dependabot) via [#89](https://github.com/10up/maps-block-apple/pull/89)).
- Bump `hosted-git-info` from 2.8.8 to 2.8.9 (props [@dependabot](https://github.com/apps/dependabot) via [#90](https://github.com/10up/maps-block-apple/pull/90)).
- Bump `normalize-url` from 4.5.0 to 4.5.1 (props [@dependabot](https://github.com/apps/dependabot) via [#91](https://github.com/10up/maps-block-apple/pull/91)).
- Bump `path-parse` from 1.0.6 to 1.0.7 (props [@dependabot](https://github.com/apps/dependabot) via [#94](https://github.com/10up/maps-block-apple/pull/94)).

## [1.0.1] - 2020-08-11
### Added
- Internationalization support via loading translations for the block (props [@dinhtungdu](https://github.com/dinhtungdu), [@helen](https://github.com/helen) via [#69](https://github.com/10up/maps-block-apple/pull/69))
- WordPress.org Block Directory integration (props [@jeffpaul](https://github.com/jeffpaul) via [#63](https://github.com/10up/maps-block-apple/pull/63))
- Documentation and GitHub Action updates (props [@helen](https://github.com/helen), [@jeffpaul](https://github.com/jeffpaul) via [#59](https://github.com/10up/maps-block-apple/pull/59), [#60](https://github.com/10up/maps-block-apple/pull/60), [#68](https://github.com/10up/maps-block-apple/pull/68))

### Fixed
- Debounce `addMarker` call when marker settings are changed (props [@fabiankaegy](https://github.com/fabiankaegy), [@dinhtungdu](https://github.com/dinhtungdu) via [#70](https://github.com/10up/maps-block-apple/pull/70))
- Key and Team ID settings placeholders (props [@dinhtungdu](https://github.com/dinhtungdu), [@helen](https://github.com/helen), [@jeffpaul](https://github.com/jeffpaul) via [#57](https://github.com/10up/maps-block-apple/pull/57))

### Security
- Bump `lodash` from 4.17.15 to 4.17.19 (props [@dependabot](https://github.com/apps/dependabot) via [#67](https://github.com/10up/maps-block-apple/pull/67))
- Bump `elliptic` from 6.5.2 to 6.5.3 (props [@dependabot](https://github.com/apps/dependabot) via [#71](https://github.com/10up/maps-block-apple/pull/71))

## [1.0.0] - 2020-06-25
### Added
- Ability to add Markers to the map (props [@fabiankaegy](https://github.com/fabiankaegy) via [#51](https://github.com/10up/maps-block-apple/pull/51))
- In-editor credential setup (props [@fabiankaegy](https://github.com/fabiankaegy) via [#20](https://github.com/10up/maps-block-apple/pull/20))
- Rich preview in block inserter view (props [@fabiankaegy](https://github.com/fabiankaegy) via [#40](https://github.com/10up/maps-block-apple/pull/40))
- Error messaging on plugin activation for WordPress versions below 5.2 (props [@helen](https://github.com/helen), [@kopepasah](https://github.com/kopepasah) via [#50](https://github.com/10up/maps-block-apple/pull/50))
- Plugin deletion routine (props [@dinhtungdu](https://github.com/dinhtungdu) via [#47](https://github.com/10up/maps-block-apple/pull/47))
- Documentation improvements (props [@jeffpaul](https://github.com/jeffpaul), [@kopepasah](https://github.com/kopepasah), [ryanwelcher](https://github.com/ryanwelcher), [@fabiankaegy](https://github.com/fabiankaegy), [@helen](https://github.com/helen) via [#22](https://github.com/10up/maps-block-apple/pull/22), [#25](https://github.com/10up/maps-block-apple/pull/25), [#26](https://github.com/10up/maps-block-apple/pull/26), [#30](https://github.com/10up/maps-block-apple/pull/30), [#35](https://github.com/10up/maps-block-apple/pull/35), [#41](https://github.com/10up/maps-block-apple/pull/41), [#42](https://github.com/10up/maps-block-apple/pull/42), [#45](https://github.com/10up/maps-block-apple/pull/45), [#46](https://github.com/10up/maps-block-apple/pull/46))
- Plugin header, plugin icon, and block icon images (props [@JackieKjome](https://github.com/JackieKjome), [@jeffpaul](https://github.com/jeffpaul), [@ryanwelcher](https://github.com/ryanwelcher), [@fabiankaegy](https://github.com/fabiankaegy), [@helen](https://github.com/helen) via [#32](https://github.com/10up/maps-block-apple/pull/32), [#33](https://github.com/10up/maps-block-apple/pull/33), [#39](https://github.com/10up/maps-block-apple/pull/39))
- GitHub Action for JS and PHP linting (props [@helen](https://github.com/helen) via [#49](https://github.com/10up/maps-block-apple/pull/49))
- GitHub Actions for WordPress.org plugin deploy and readme/asset update (props [@jeffpaul](https://github.com/jeffpaul) via [#36](https://github.com/10up/maps-block-apple/pull/36))

### Changed
- Refactored codebase, build system to use `@wordpress/scripts` (props [@fabiankaegy](https://github.com/fabiankaegy), [@ryanwelcher](https://github.com/ryanwelcher) via [#20](https://github.com/10up/maps-block-apple/pull/20))
- Revamped settings screen to go with refactored codebase (props [@ryanwelcher](https://github.com/ryanwelcher) and [@dinhtungdu](https://github.com/dinhtungdu) via [#31](https://github.com/10up/maps-block-apple/pull/31))
- Permissions to change the MapKit JS authentication keys to users with the capability to `manage_options` (props [@fabiankaegy](https://github.com/fabiankaegy), [@ryanwelcher](https://github.com/ryanwelcher) via [#29](https://github.com/10up/maps-block-apple/pull/29))
- Authorizations by passing a callback function to `authorizationCallback` (props [@fabiankaegy](https://github.com/fabiankaegy) via [#52](https://github.com/10up/maps-block-apple/pull/52))
- Re-licensed to GPLv2 (props [@jeffpaul](https://github.com/jeffpaul) via [#21](https://github.com/10up/maps-block-apple/pull/21))

### Security
- Bump `websocket-extensions` from 0.1.3 to 0.1.4 (props [@dependabot](https://github.com/apps/dependabot) via [#28](https://github.com/10up/maps-block-apple/pull/28))

## [0.1.0] - 2020-05-13
- Initial private release of Block for Apple Maps plugin.

[Unreleased]: https://github.com/10up/maps-block-apple/compare/trunk...develop
[1.0.2]: https://github.com/10up/maps-block-apple/compare/1.0.1...1.0.2
[1.0.1]: https://github.com/10up/maps-block-apple/compare/1.0.0...1.0.1
[1.0.0]: https://github.com/10up/maps-block-apple/releases/tag/1.0.0
[0.1.0]: https://github.com/10up/maps-block-apple/tree/a2fe565d64e2c59070f2dc3611700718d7383d37
