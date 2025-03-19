# Changelog

## [2.0.0](https://github.com/apollo-server-integrations/apollo-server-integration-h3/compare/v1.2.1...v2.0.0) (2025-03-19)


### ⚠ BREAKING CHANGES

* exclude websocket features from main entry file ([#125](https://github.com/apollo-server-integrations/apollo-server-integration-h3/issues/125))

### 🔖 Features

* improve ws protocol and closure handling ([#123](https://github.com/apollo-server-integrations/apollo-server-integration-h3/issues/123)) ([f79bf78](https://github.com/apollo-server-integrations/apollo-server-integration-h3/commit/f79bf78347460042365b55cb222371ce34813ee3))
* use `WithRequired` from `@apollo/utils.withrequired` ([#12](https://github.com/apollo-server-integrations/apollo-server-integration-h3/issues/12)) ([7a83402](https://github.com/apollo-server-integrations/apollo-server-integration-h3/commit/7a83402a8bc19a82f73b920d75a9359f46c3b23f))


### 🐛 Bug Fixes

* don't fail if graphql-ws is not installed ([#79](https://github.com/apollo-server-integrations/apollo-server-integration-h3/issues/79)) ([6907a36](https://github.com/apollo-server-integrations/apollo-server-integration-h3/commit/6907a3632f965151c8fd002b2b64dd9a056e7600))
* exclude websocket features from main entry file ([#125](https://github.com/apollo-server-integrations/apollo-server-integration-h3/issues/125)) ([62a2088](https://github.com/apollo-server-integrations/apollo-server-integration-h3/commit/62a2088ed1cf50eaf8fadce46ac9b216aa232f0b))
* make code and reason for ws close event optional ([#85](https://github.com/apollo-server-integrations/apollo-server-integration-h3/issues/85)) ([d2ccc86](https://github.com/apollo-server-integrations/apollo-server-integration-h3/commit/d2ccc86fb4259aaba1e36cf9f505a802babdb058))


### 🧹 Miscellaneous

* **deps:** lock file maintenance ([#110](https://github.com/apollo-server-integrations/apollo-server-integration-h3/issues/110)) ([406f9ec](https://github.com/apollo-server-integrations/apollo-server-integration-h3/commit/406f9ec6a421dd472f92dccc46382e56f492827b))
* **deps:** pin dependencies ([#113](https://github.com/apollo-server-integrations/apollo-server-integration-h3/issues/113)) ([190bc14](https://github.com/apollo-server-integrations/apollo-server-integration-h3/commit/190bc144e3296e1284aeb41af4d4a93ad683622c))
* **deps:** pin dependencies ([#114](https://github.com/apollo-server-integrations/apollo-server-integration-h3/issues/114)) ([ef1eeda](https://github.com/apollo-server-integrations/apollo-server-integration-h3/commit/ef1eeda7ac012f9ceb5ce4df2842d23bc557f3fb))
* **deps:** pin node.js to 23.9.0 ([#115](https://github.com/apollo-server-integrations/apollo-server-integration-h3/issues/115)) ([279d0cb](https://github.com/apollo-server-integrations/apollo-server-integration-h3/commit/279d0cb59849935b983e64bebe2544d585c8a185))
* **deps:** replace dependency standard-version with commit-and-tag-version 9.5.0 ([#112](https://github.com/apollo-server-integrations/apollo-server-integration-h3/issues/112)) ([64247c8](https://github.com/apollo-server-integrations/apollo-server-integration-h3/commit/64247c8d6754ce2b8c5e67a57b0babfd667e296a))
* **deps:** update all non-major dependencies ([1138b13](https://github.com/apollo-server-integrations/apollo-server-integration-h3/commit/1138b13cece33e4be6224d880143839f6023583f))
* **deps:** update all non-major dependencies ([4a6689e](https://github.com/apollo-server-integrations/apollo-server-integration-h3/commit/4a6689e45dfd59295162748deeeeebcae5f97a3b))
* **deps:** update all non-major dependencies ([ff07953](https://github.com/apollo-server-integrations/apollo-server-integration-h3/commit/ff079534c43bd7cee926fcf38ebf0e437fcf6b40))
* **deps:** update all non-major dependencies ([c2c912d](https://github.com/apollo-server-integrations/apollo-server-integration-h3/commit/c2c912db7f070fe674738aef4c2b3baad9c15a56))
* **deps:** update all non-major dependencies ([#100](https://github.com/apollo-server-integrations/apollo-server-integration-h3/issues/100)) ([29741f0](https://github.com/apollo-server-integrations/apollo-server-integration-h3/commit/29741f04fcf243a2e573aa1c1e0d0d82b464ad2e))
* **deps:** update all non-major dependencies ([#101](https://github.com/apollo-server-integrations/apollo-server-integration-h3/issues/101)) ([3c4c4ed](https://github.com/apollo-server-integrations/apollo-server-integration-h3/commit/3c4c4ed35e730c1086d414f1c88a35f60c295f49))
* **deps:** update all non-major dependencies ([#105](https://github.com/apollo-server-integrations/apollo-server-integration-h3/issues/105)) ([e9e9fb6](https://github.com/apollo-server-integrations/apollo-server-integration-h3/commit/e9e9fb60464cd89dc9772a3eab46cd710403f8fd))
* **deps:** update all non-major dependencies ([#84](https://github.com/apollo-server-integrations/apollo-server-integration-h3/issues/84)) ([09bdae4](https://github.com/apollo-server-integrations/apollo-server-integration-h3/commit/09bdae4c330cf5e83080f9c16989f1638d997a6c))
* **deps:** update all non-major dependencies ([#86](https://github.com/apollo-server-integrations/apollo-server-integration-h3/issues/86)) ([36f47c7](https://github.com/apollo-server-integrations/apollo-server-integration-h3/commit/36f47c7e76a86cbdc8a3f840c14e079f7a520eb4))
* **deps:** update all non-major dependencies ([#88](https://github.com/apollo-server-integrations/apollo-server-integration-h3/issues/88)) ([d526715](https://github.com/apollo-server-integrations/apollo-server-integration-h3/commit/d5267151143295e6619ea522bc76d1d6d0452b31))
* **deps:** update all non-major dependencies ([#91](https://github.com/apollo-server-integrations/apollo-server-integration-h3/issues/91)) ([ce8f24f](https://github.com/apollo-server-integrations/apollo-server-integration-h3/commit/ce8f24f1dbc5adced3d51599b63cc52b96a5f207))
* **deps:** update all non-major dependencies ([#93](https://github.com/apollo-server-integrations/apollo-server-integration-h3/issues/93)) ([55e9dcd](https://github.com/apollo-server-integrations/apollo-server-integration-h3/commit/55e9dcd4d3445133fafef40123a7b58742d0356f))
* **deps:** update all non-major dependencies ([#95](https://github.com/apollo-server-integrations/apollo-server-integration-h3/issues/95)) ([f8e60e6](https://github.com/apollo-server-integrations/apollo-server-integration-h3/commit/f8e60e636f4c831e6f9b506bf50a584d8b43447d))
* **deps:** update all non-major dependencies ([#97](https://github.com/apollo-server-integrations/apollo-server-integration-h3/issues/97)) ([30a0b66](https://github.com/apollo-server-integrations/apollo-server-integration-h3/commit/30a0b66f91b23a79787a8b7ff20488f5fbab3d7c))
* **deps:** update all non-major dependencies ([#98](https://github.com/apollo-server-integrations/apollo-server-integration-h3/issues/98)) ([6346800](https://github.com/apollo-server-integrations/apollo-server-integration-h3/commit/6346800205df99420c6bf26725c4d61d801c7987))
* **deps:** update codecov/codecov-action action to v5 ([#94](https://github.com/apollo-server-integrations/apollo-server-integration-h3/issues/94)) ([1f37e41](https://github.com/apollo-server-integrations/apollo-server-integration-h3/commit/1f37e41c4dfb55180f464b269b93c571a21bede3))
* **deps:** update codecov/codecov-action digest to 0565863 ([#116](https://github.com/apollo-server-integrations/apollo-server-integration-h3/issues/116)) ([db07269](https://github.com/apollo-server-integrations/apollo-server-integration-h3/commit/db072697cfbb71fe6765df82d8edc51ee8040adc))
* **deps:** update dependency @graphql-tools/schema to v10.0.21 ([#122](https://github.com/apollo-server-integrations/apollo-server-integration-h3/issues/122)) ([f429fb3](https://github.com/apollo-server-integrations/apollo-server-integration-h3/commit/f429fb33dfb0d3c7b24fd984e2287079338e35bb))
* **deps:** update dependency @typescript-eslint/parser to v8.26.0 ([#121](https://github.com/apollo-server-integrations/apollo-server-integration-h3/issues/121)) ([25f980b](https://github.com/apollo-server-integrations/apollo-server-integration-h3/commit/25f980b37a13d5ca009530972a42d3d3f864d892))
* **deps:** update dependency commit-and-tag-version to v12 ([#119](https://github.com/apollo-server-integrations/apollo-server-integration-h3/issues/119)) ([31761c2](https://github.com/apollo-server-integrations/apollo-server-integration-h3/commit/31761c27776e8afe9ad2b778f6819d730f5f5828))
* **deps:** update dependency commit-and-tag-version to v9.6.0 ([#118](https://github.com/apollo-server-integrations/apollo-server-integration-h3/issues/118)) ([bbc8369](https://github.com/apollo-server-integrations/apollo-server-integration-h3/commit/bbc83699c07e0629bd8941f0a6e7100f66bf7598))
* **deps:** update dependency eslint-config-prettier to v10 ([#102](https://github.com/apollo-server-integrations/apollo-server-integration-h3/issues/102)) ([dfa97a0](https://github.com/apollo-server-integrations/apollo-server-integration-h3/commit/dfa97a0abc3aaac5549fd457e070b496cb58d369))
* **deps:** update dependency graphql-subscriptions to v3 ([#92](https://github.com/apollo-server-integrations/apollo-server-integration-h3/issues/92)) ([b789bea](https://github.com/apollo-server-integrations/apollo-server-integration-h3/commit/b789bea9ed4355838ea716ef916cdcee75b6a39d))
* **deps:** update dependency graphql-ws to v6 ([#103](https://github.com/apollo-server-integrations/apollo-server-integration-h3/issues/103)) ([7182753](https://github.com/apollo-server-integrations/apollo-server-integration-h3/commit/718275312ddacb1e3c744aab0e7d9e6d0c30676d))
* **deps:** update dependency prettier to v3.5.3 ([#120](https://github.com/apollo-server-integrations/apollo-server-integration-h3/issues/120)) ([e32b158](https://github.com/apollo-server-integrations/apollo-server-integration-h3/commit/e32b158ea5b14d6c98520d57cf77fe382c5a8e86))
* **deps:** update dependency unbuild to v3 ([#99](https://github.com/apollo-server-integrations/apollo-server-integration-h3/issues/99)) ([c789f70](https://github.com/apollo-server-integrations/apollo-server-integration-h3/commit/c789f703d2ef683dedc92556b6a7a938bf29075d))
* **deps:** update devdependency @typescript-eslint/parser to v8 ([#83](https://github.com/apollo-server-integrations/apollo-server-integration-h3/issues/83)) ([071519f](https://github.com/apollo-server-integrations/apollo-server-integration-h3/commit/071519ffaa11aef56ec82d1857b4039ca9fabae6))
* **deps:** update devdependency eslint to ^9.13.0 ([389d2e0](https://github.com/apollo-server-integrations/apollo-server-integration-h3/commit/389d2e02fac9a1372026e50bd383359451357de6))
* **deps:** update pnpm to v10 ([#106](https://github.com/apollo-server-integrations/apollo-server-integration-h3/issues/106)) ([9547cf2](https://github.com/apollo-server-integrations/apollo-server-integration-h3/commit/9547cf2b52a1f487d673c3aa1383a14fe284a08b))
* **deps:** update pnpm to v10.5.2 ([#117](https://github.com/apollo-server-integrations/apollo-server-integration-h3/issues/117)) ([6962a96](https://github.com/apollo-server-integrations/apollo-server-integration-h3/commit/6962a96550bbe4026c91eeea728e5f90e6cc70a6))
* **deps:** update vitest monorepo to v3 ([#104](https://github.com/apollo-server-integrations/apollo-server-integration-h3/issues/104)) ([726eeaa](https://github.com/apollo-server-integrations/apollo-server-integration-h3/commit/726eeaafd3c2b90b5eac02cd50fd7ffc3a49d5f1))
* fix CI by using `pnpm/action-setup` in place of corepack ([#108](https://github.com/apollo-server-integrations/apollo-server-integration-h3/issues/108)) ([894ae6c](https://github.com/apollo-server-integrations/apollo-server-integration-h3/commit/894ae6c7c3f3f7ea5da70ab84a923bd27c785bba))
* update renovate config ([#109](https://github.com/apollo-server-integrations/apollo-server-integration-h3/issues/109)) ([8d9e75f](https://github.com/apollo-server-integrations/apollo-server-integration-h3/commit/8d9e75f9d195536ea4c35c8a5f227a98ad61389e))

## [1.2.1](https://github.com/apollo-server-integrations/apollo-server-integration-h3/compare/v1.2.0...v1.2.1) (2024-07-09)

### 🧹 Miscellaneous

- rename prepare to dev:prepare in package.json to fix publish process ([#77](https://github.com/apollo-server-integrations/apollo-server-integration-h3/issues/77)) ([b9fb1ee](https://github.com/apollo-server-integrations/apollo-server-integration-h3/commit/b9fb1eee893975282782a6e0a4edf2bc9ac9516c))

## [1.2.0](https://github.com/apollo-server-integrations/apollo-server-integration-h3/compare/v1.1.6...v1.2.0) (2024-07-09)

### 🔖 Features

- add websocket support for subscriptions via crossws ([#65](https://github.com/apollo-server-integrations/apollo-server-integration-h3/issues/65)) ([6a7b9c2](https://github.com/apollo-server-integrations/apollo-server-integration-h3/commit/6a7b9c228699302676910df4eaffc356fc192c98))

### 📚 Documentation

- add a simple h3 example ([#59](https://github.com/apollo-server-integrations/apollo-server-integration-h3/issues/59)) ([31935e1](https://github.com/apollo-server-integrations/apollo-server-integration-h3/commit/31935e1c2910e002528d038ea5de1a1c10626abd))

### 🧹 Miscellaneous

- add documentation section to changelog ([#60](https://github.com/apollo-server-integrations/apollo-server-integration-h3/issues/60)) ([707ec29](https://github.com/apollo-server-integrations/apollo-server-integration-h3/commit/707ec292ab6c0d0213a0889dca19fbe67dac6f8e))
- add release please manifest ([#56](https://github.com/apollo-server-integrations/apollo-server-integration-h3/issues/56)) ([4d26ce4](https://github.com/apollo-server-integrations/apollo-server-integration-h3/commit/4d26ce4c6e79ee860ff91f1c22b468a03ba014af))
- **deps:** update actions/checkout action to v4 ([#41](https://github.com/apollo-server-integrations/apollo-server-integration-h3/issues/41)) ([78887f8](https://github.com/apollo-server-integrations/apollo-server-integration-h3/commit/78887f8af88935ac027a41deb2cfc213e27d4e95))
- **deps:** update actions/checkout digest to 8ade135 ([#47](https://github.com/apollo-server-integrations/apollo-server-integration-h3/issues/47)) ([487a914](https://github.com/apollo-server-integrations/apollo-server-integration-h3/commit/487a9140017f01c4926f992b20e7e31100fc3843))
- **deps:** update actions/setup-node action to v4 ([#48](https://github.com/apollo-server-integrations/apollo-server-integration-h3/issues/48)) ([efc80f5](https://github.com/apollo-server-integrations/apollo-server-integration-h3/commit/efc80f5da318c92e0b04e6afd8ceca542e25199f))
- **deps:** update all non-major dependencies ([#40](https://github.com/apollo-server-integrations/apollo-server-integration-h3/issues/40)) ([dcb6958](https://github.com/apollo-server-integrations/apollo-server-integration-h3/commit/dcb6958b89df05d987f13bc19ef507ed17bfcd70))
- **deps:** update all non-major dependencies ([#61](https://github.com/apollo-server-integrations/apollo-server-integration-h3/issues/61)) ([042b09c](https://github.com/apollo-server-integrations/apollo-server-integration-h3/commit/042b09c16f6badd49ff799bd6373c1deaef57191))
- **deps:** update all non-major dependencies ([#67](https://github.com/apollo-server-integrations/apollo-server-integration-h3/issues/67)) ([c71c9b2](https://github.com/apollo-server-integrations/apollo-server-integration-h3/commit/c71c9b27229c88d4072c074f866d42a25202a6a3))
- **deps:** update codecov/codecov-action action to v4 ([#51](https://github.com/apollo-server-integrations/apollo-server-integration-h3/issues/51)) ([0a0c0fa](https://github.com/apollo-server-integrations/apollo-server-integration-h3/commit/0a0c0fa1f00e7d3aade0419ae7b3267bd572b50d))
- **deps:** update devdependency eslint to v9 ([#70](https://github.com/apollo-server-integrations/apollo-server-integration-h3/issues/70)) ([0f5ead5](https://github.com/apollo-server-integrations/apollo-server-integration-h3/commit/0f5ead5cbdbc84dc061647d7d127dab6ead07738))
- **deps:** update devdependency eslint-config-unjs to ^0.3.2 ([#75](https://github.com/apollo-server-integrations/apollo-server-integration-h3/issues/75)) ([30af89a](https://github.com/apollo-server-integrations/apollo-server-integration-h3/commit/30af89afa2b811020d3b5364c5fa01550e1235c0))
- **deps:** update devdependency eslint-plugin-unused-imports to v4 ([#72](https://github.com/apollo-server-integrations/apollo-server-integration-h3/issues/72)) ([5bf90a6](https://github.com/apollo-server-integrations/apollo-server-integration-h3/commit/5bf90a6286ca86e2d8ff589099e893e247de4637))
- **deps:** update devdependency vitest to v1 ([#50](https://github.com/apollo-server-integrations/apollo-server-integration-h3/issues/50)) ([377463b](https://github.com/apollo-server-integrations/apollo-server-integration-h3/commit/377463bbe6f2e2288b2c620cf315943eb8bb1c09))
- **deps:** update google-github-actions/release-please-action action to v4 ([#49](https://github.com/apollo-server-integrations/apollo-server-integration-h3/issues/49)) ([0b26309](https://github.com/apollo-server-integrations/apollo-server-integration-h3/commit/0b26309e260f61ec1dd56bee59b52eefd5668434))
- **deps:** update mcr.microsoft.com/vscode/devcontainers/base docker tag to v1 ([#71](https://github.com/apollo-server-integrations/apollo-server-integration-h3/issues/71)) ([6d1ecf1](https://github.com/apollo-server-integrations/apollo-server-integration-h3/commit/6d1ecf1fd20a9435daf98c8085a6ee65ba3b6fb9))
- **deps:** update pnpm to v9 ([#69](https://github.com/apollo-server-integrations/apollo-server-integration-h3/issues/69)) ([b86ce31](https://github.com/apollo-server-integrations/apollo-server-integration-h3/commit/b86ce31d58848944c2533f3332d7e1a1c351c402))
- **deps:** update typescript-eslint monorepo to v7 ([#52](https://github.com/apollo-server-integrations/apollo-server-integration-h3/issues/52)) ([e7e70a3](https://github.com/apollo-server-integrations/apollo-server-integration-h3/commit/e7e70a3d14f73d226cf30cc3a39cfb0d54b6225b))
- **deps:** update vitest monorepo to v2 ([#73](https://github.com/apollo-server-integrations/apollo-server-integration-h3/issues/73)) ([810d1b6](https://github.com/apollo-server-integrations/apollo-server-integration-h3/commit/810d1b6f9844c3c33d87987da252925457dcc7ff))
- format .release-please-manifest.json with Prettier ([#57](https://github.com/apollo-server-integrations/apollo-server-integration-h3/issues/57)) ([55c6454](https://github.com/apollo-server-integrations/apollo-server-integration-h3/commit/55c64541bbd06ae5878524f8865f42d691a0805a))
- move please-release config to config file ([97ef2f7](https://github.com/apollo-server-integrations/apollo-server-integration-h3/commit/97ef2f79099c0ced39edf9f9148f6689d64e1f98))
- only try to push changes when release PR is created ([79ccbe5](https://github.com/apollo-server-integrations/apollo-server-integration-h3/commit/79ccbe5fb6b3a5b59a610d082b90871ea0377a5c))
- update @vitest/coverage-c8 to @vitest/coverage-v8 ([#66](https://github.com/apollo-server-integrations/apollo-server-integration-h3/issues/66)) ([1da98de](https://github.com/apollo-server-integrations/apollo-server-integration-h3/commit/1da98de5118b9414ddfb48ba24d217feb3196c1f))
- update CI workflow to include running type tests (and other minor improvements from unjs/template) ([#76](https://github.com/apollo-server-integrations/apollo-server-integration-h3/issues/76)) ([bc62b2b](https://github.com/apollo-server-integrations/apollo-server-integration-h3/commit/bc62b2b5d0a5f780ed5d3db2604dff7ed1f43b1b))
- update Node.js version to 16.10.0 or &gt;=18.0.0 in package.json ([#74](https://github.com/apollo-server-integrations/apollo-server-integration-h3/issues/74)) ([ce8958c](https://github.com/apollo-server-integrations/apollo-server-integration-h3/commit/ce8958c8470868049dc4c0bcbb809cd745fa76a1))
- update release-please config to exclude component in tag ([#58](https://github.com/apollo-server-integrations/apollo-server-integration-h3/issues/58)) ([3553907](https://github.com/apollo-server-integrations/apollo-server-integration-h3/commit/3553907d8fe0628468b9ac5972cbc97934afb8b5))

## [1.1.6](https://github.com/apollo-server-integrations/apollo-server-integration-h3/compare/v1.1.5...v1.1.6) (2023-08-23)

### 🐛 Bug Fixes

- improve request body parsing ([#39](https://github.com/apollo-server-integrations/apollo-server-integration-h3/issues/39)) ([01c7834](https://github.com/apollo-server-integrations/apollo-server-integration-h3/commit/01c783499fb992a5ff3f04852c9f09b72805ef4d))

### 🧹 Miscellaneous

- **deps:** update all non-major dependencies ([#25](https://github.com/apollo-server-integrations/apollo-server-integration-h3/issues/25)) ([f84bd81](https://github.com/apollo-server-integrations/apollo-server-integration-h3/commit/f84bd810cb7e898a73d481064f1b948edc61bb0b))
- **deps:** update all non-major dependencies ([#27](https://github.com/apollo-server-integrations/apollo-server-integration-h3/issues/27)) ([d56b97a](https://github.com/apollo-server-integrations/apollo-server-integration-h3/commit/d56b97a698cc02e5f19f0a19936ccca3e3d6f52b))
- **deps:** update all non-major dependencies ([#29](https://github.com/apollo-server-integrations/apollo-server-integration-h3/issues/29)) ([608fca2](https://github.com/apollo-server-integrations/apollo-server-integration-h3/commit/608fca2ddaaa5f0c92feda6e167e3e5be5205f61))
- **deps:** update all non-major dependencies ([#36](https://github.com/apollo-server-integrations/apollo-server-integration-h3/issues/36)) ([fd9e66e](https://github.com/apollo-server-integrations/apollo-server-integration-h3/commit/fd9e66ec035c60a208005119f57373346c1d177f))
- **deps:** update devdependency @apollo/utils.withrequired to v3 ([#32](https://github.com/apollo-server-integrations/apollo-server-integration-h3/issues/32)) ([d6a38aa](https://github.com/apollo-server-integrations/apollo-server-integration-h3/commit/d6a38aa016263977a41758c4b8f7c52f01d2f173))
- **deps:** update devdependency eslint-config-prettier to v9 ([#37](https://github.com/apollo-server-integrations/apollo-server-integration-h3/issues/37)) ([d65787c](https://github.com/apollo-server-integrations/apollo-server-integration-h3/commit/d65787ced1f6e6a3e3ce89fd308240e9c8464735))
- **deps:** update devdependency eslint-plugin-unused-imports to v3 ([#35](https://github.com/apollo-server-integrations/apollo-server-integration-h3/issues/35)) ([4bf76f0](https://github.com/apollo-server-integrations/apollo-server-integration-h3/commit/4bf76f090e067f71237b1062bd6890ecddcf1fa7))
- **deps:** update devdependency prettier to v3 ([#33](https://github.com/apollo-server-integrations/apollo-server-integration-h3/issues/33)) ([e4b6d52](https://github.com/apollo-server-integrations/apollo-server-integration-h3/commit/e4b6d52d46325dcbc723a930ab686228dc6793f1))
- **deps:** update devdependency typescript to v5 ([#30](https://github.com/apollo-server-integrations/apollo-server-integration-h3/issues/30)) ([aaa80fb](https://github.com/apollo-server-integrations/apollo-server-integration-h3/commit/aaa80fb05bba53c568047b279ff8485bb1b51559))
- **deps:** update devdependency unbuild to v2 ([80894a0](https://github.com/apollo-server-integrations/apollo-server-integration-h3/commit/80894a0dac52bf2b04048eb12ecc3822707c68b8))
- **deps:** update pnpm to v7.29.0 ([#28](https://github.com/apollo-server-integrations/apollo-server-integration-h3/issues/28)) ([ba669c5](https://github.com/apollo-server-integrations/apollo-server-integration-h3/commit/ba669c5c169b696ba357942b79c923431f0c4ec5))
- **deps:** update pnpm to v8 ([#31](https://github.com/apollo-server-integrations/apollo-server-integration-h3/issues/31)) ([ef38ad7](https://github.com/apollo-server-integrations/apollo-server-integration-h3/commit/ef38ad7f0e159834886dc0d16d0ed9999bb2019c))
- **deps:** update typescript-eslint monorepo to v6 ([#34](https://github.com/apollo-server-integrations/apollo-server-integration-h3/issues/34)) ([e963517](https://github.com/apollo-server-integrations/apollo-server-integration-h3/commit/e963517f0223b760a7fe8845fe6ebc8f452a61b1))
- remove problematic types export and instead bundle type definitions for esm and cjs ([8e99791](https://github.com/apollo-server-integrations/apollo-server-integration-h3/commit/8e99791406815b5008fcf655dfe685f05322a93a))

## [1.1.5](https://github.com/apollo-server-integrations/apollo-server-integration-h3/compare/v1.1.4...v1.1.5) (2023-02-01)

### 🧹 Miscellaneous

- **deps:** update all non-major dependencies ([#18](https://github.com/apollo-server-integrations/apollo-server-integration-h3/issues/18)) ([a4dbc4d](https://github.com/apollo-server-integrations/apollo-server-integration-h3/commit/a4dbc4d319235e3959cdb0ac45ec46fad5f8e3df))

## [1.1.4](https://github.com/apollo-server-integrations/apollo-server-integration-h3/compare/v1.1.3...v1.1.4) (2022-11-20)

### 🧹 Miscellaneous

- **deps:** update devdependency @apollo/utils.withrequired to v2 ([#23](https://github.com/apollo-server-integrations/apollo-server-integration-h3/issues/23)) ([6a8df13](https://github.com/apollo-server-integrations/apollo-server-integration-h3/commit/6a8df1392aa5f3c0bc475babb0a494f6d4fa1c70))
- **deps:** update devdependency @nuxtjs/eslint-config-typescript to v12 ([#22](https://github.com/apollo-server-integrations/apollo-server-integration-h3/issues/22)) ([079544c](https://github.com/apollo-server-integrations/apollo-server-integration-h3/commit/079544c8ffd96618a6cac81090ec924ed7580895))
- **deps:** update devdependency unbuild to v1 ([#21](https://github.com/apollo-server-integrations/apollo-server-integration-h3/issues/21)) ([67b271f](https://github.com/apollo-server-integrations/apollo-server-integration-h3/commit/67b271f7db44f52404d16faac112d585afb2e37d))
- **deps:** update peerdependency h3 to v1 ([#19](https://github.com/apollo-server-integrations/apollo-server-integration-h3/issues/19)) ([6581693](https://github.com/apollo-server-integrations/apollo-server-integration-h3/commit/6581693f17e7d1fddc41ea568136f1045f7cad13))
- **deps:** widen admissable version range for h3 ([0ce0ce4](https://github.com/apollo-server-integrations/apollo-server-integration-h3/commit/0ce0ce4dfb88abff4d9cb431e0c073c7272552e4))
- use renovate widenPeerDependencies preset ([97694bf](https://github.com/apollo-server-integrations/apollo-server-integration-h3/commit/97694bf7f0edf667064a924d7596a742e0abbe2f))

## [1.1.3](https://github.com/apollo-server-integrations/apollo-server-integration-h3/compare/v1.1.2...v1.1.3) (2022-11-07)

### 🧹 Miscellaneous

- provide npm auth token via npmrc ([ef0833b](https://github.com/apollo-server-integrations/apollo-server-integration-h3/commit/ef0833b9030525dd166522e100d3ff396cbcee05))
- specify correct repo in package.json ([1554e4a](https://github.com/apollo-server-integrations/apollo-server-integration-h3/commit/1554e4adbcbc9cf87397e9b86a37e7c7ae32d51d))

## [1.1.2](https://github.com/apollo-server-integrations/apollo-server-integration-h3/compare/v1.1.1...v1.1.2) (2022-11-07)

Only changes to build infrastructure.

## [1.1.1](https://github.com/apollo-server-integrations/apollo-server-integration-h3/compare/v1.1.0...v1.1.1) (2022-11-07)

### 🧹 Miscellaneous

- change owner in license from unjs to Tobias Diez ([b5bcf4a](https://github.com/apollo-server-integrations/apollo-server-integration-h3/commit/b5bcf4ae7ecbf990d4336e80e80f6f72cc231fa5))
- **deps:** update all non-major dependencies ([#10](https://github.com/apollo-server-integrations/apollo-server-integration-h3/issues/10)) ([cb2fb2a](https://github.com/apollo-server-integrations/apollo-server-integration-h3/commit/cb2fb2acbe4e5da913e60f39cca72b04eb3ba116)) ([#13](https://github.com/apollo-server-integrations/apollo-server-integration-h3/issues/13)) ([3462b74](https://github.com/apollo-server-integrations/apollo-server-integration-h3/commit/3462b7422358793defd1a706873e037f10df8994)) ([#15](https://github.com/apollo-server-integrations/apollo-server-integration-h3/issues/15)) ([21d536f](https://github.com/apollo-server-integrations/apollo-server-integration-h3/commit/21d536f4993f88a958e41b9e3bebd52e5c952021))

## [1.1.0](https://github.com/apollo-server-integrations/apollo-server-integration-h3/compare/v1.0.0...v1.1.0) (2022-10-17)

### 🧹 Miscellaneous

- **deps:** update all non-major dependencies ([#8](https://github.com/apollo-server-integrations/apollo-server-integration-h3/issues/8)) ([1f01f30](https://github.com/apollo-server-integrations/apollo-server-integration-h3/commit/1f01f309849bb4fac5aa9de7b0cd23170912886f))

## 1.0.0 (2022-10-15)

Initial release.
