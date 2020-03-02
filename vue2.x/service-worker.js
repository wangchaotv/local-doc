/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["/vue2.x/2019/02/18/hello/index.html","3c491dc1e438b628123f0408501f7a22"],["/vue2.x/about/index.html","51bf487633eb08901e2d292f2e70990a"],["/vue2.x/api/index.html","79ae69473c7948c00c35acf2a6693784"],["/vue2.x/archives/2019/02/index.html","a57b503366430dfa3fae5e1c05619f8f"],["/vue2.x/archives/2019/index.html","d3a47f9d8edc08497a9f24db8bec7570"],["/vue2.x/archives/index.html","cef602aea101111e00b771357bd87a94"],["/vue2.x/atom.xml","94286e88726e895f419a017d9dc9a1d1"],["/vue2.x/browserconfig.xml","a1327babc882f9875f57f5b367c9ffc9"],["/vue2.x/coc/index.html","8a8d3245eb013d28bf7c1d9ea74aeb6d"],["/vue2.x/css/benchmark.css","b083e0006589a5ba88a250eb8ee12cc5"],["/vue2.x/css/index.css","3f1d917ba13afab3f681f2dfa9394bdf"],["/vue2.x/css/page.css","fddbfad77a4902970987e695bf743444"],["/vue2.x/css/search.css","98bc5fed33d9deaea04ed36de435afd7"],["/vue2.x/examples/commits.html","21081212209096c4ad4e7671760721bc"],["/vue2.x/examples/elastic-header.html","5d18072cfa9c5ddf8010cf141dcd8da6"],["/vue2.x/examples/firebase.html","6d7b1ee82f697461518876fc64304197"],["/vue2.x/examples/grid-component.html","73e0fafe7e6354363cee36114e087660"],["/vue2.x/examples/hackernews.html","c7568ffc9ecf6f6a73e96591ee9a3e08"],["/vue2.x/examples/index.html","eb4e409b7be269cd3377c0f33c146f11"],["/vue2.x/examples/modal.html","eec940a07784fa8cd10998a225c9eba9"],["/vue2.x/examples/select2.html","511489b646bcaea22e07fbc8d352fd3f"],["/vue2.x/examples/svg.html","994d63d11b76a98ad0d0befd612b5dc5"],["/vue2.x/examples/todomvc.html","bbaf24dc9f811846401f492975d7a680"],["/vue2.x/examples/tree-view.html","a98a7d52837e551e81de243b851a2731"],["/vue2.x/fonts/Dosis/Dosis-Medium.ttf","1a7809b30cc0cb7fc96feb3cad2eefb7"],["/vue2.x/fonts/Roboto_Mono/RobotoMono-Regular.ttf","a48ac41620cd818c5020d0f4302489ff"],["/vue2.x/fonts/Source_Sans_Pro/SourceSansPro-Light.ttf","b2e90cc01cdd1e2e6f214d5cb2ae5c26"],["/vue2.x/fonts/Source_Sans_Pro/SourceSansPro-Regular.ttf","ba6cad25afe01d394e830f548a7f94df"],["/vue2.x/fonts/Source_Sans_Pro/SourceSansPro-Semibold.ttf","52984b3a4e09652a6feee711d5c169fd"],["/vue2.x/guide/class-and-style.html","b96c461d5ac9ebe7cb5b93270890f029"],["/vue2.x/guide/comparison.html","cc0178789093b1a87a6132c4499fbf50"],["/vue2.x/guide/components.html","1c3bff98ae1c6350db4c904144919e1e"],["/vue2.x/guide/computed.html","8e675a9a228315ae2c3d94ce29c8fd43"],["/vue2.x/guide/conditional.html","900007081d861c01645938ee4186ebf9"],["/vue2.x/guide/custom-directive.html","2429c3922ec28515b58dfb75fa3eb0fd"],["/vue2.x/guide/deployment.html","43da3aafee7d897bfc4f1e37092b0362"],["/vue2.x/guide/events.html","c8b6927fb8f08baefedbb1face7c6b0e"],["/vue2.x/guide/forms.html","e16396df95cdd81ef1c042dbd358ce96"],["/vue2.x/guide/index.html","8b7a18dec3d395109eaf25d6daab3891"],["/vue2.x/guide/installation.html","5b089790b6369d12f369ba9503a3a7c3"],["/vue2.x/guide/instance.html","3cd1bc54fecdec6302bf5d25f21b29c4"],["/vue2.x/guide/join.html","f7052786de3c46a87244004f2f49c5d7"],["/vue2.x/guide/list.html","000538a54c7da9b181dcde054f8fe967"],["/vue2.x/guide/migration-vue-router.html","7fabd60ecd42b5439d2a7d30b1645bd9"],["/vue2.x/guide/migration-vuex.html","bdff23f22747b468accd2b4f2d8c8fa4"],["/vue2.x/guide/migration.html","da475cfc429711f0d8907a8afb7c78da"],["/vue2.x/guide/mixins.html","918ed972001355c3b54b3f04e66ecdad"],["/vue2.x/guide/plugins.html","88917422e5da864929090826441c5c99"],["/vue2.x/guide/reactivity.html","4b279f33899c9e51b5a8cfa3d9c20757"],["/vue2.x/guide/render-function.html","49f32cca917bac98771802687a8f8616"],["/vue2.x/guide/routing.html","c38ba9ec591b5d71ec91e4625569e91d"],["/vue2.x/guide/single-file-components.html","5e7b06480b9dd0016715e95a007dbc40"],["/vue2.x/guide/ssr.html","39822dcbd9d49192ad745ed053ba4aed"],["/vue2.x/guide/state-management.html","77ff1815f87c1a4bb59bbca908fc5048"],["/vue2.x/guide/syntax.html","0a77e1006a330f7093da30e83fa898e6"],["/vue2.x/guide/transitioning-state.html","72d1559ee717a30b8c765b2fc8488cf2"],["/vue2.x/guide/transitions.html","a3826d710a6f6a4ddb433dbece69f0ca"],["/vue2.x/guide/unit-testing.html","aa9128238ed39bdd92ed27f13fc5bd01"],["/vue2.x/images/Monterail.png","bf1ec94a0ca48f0e6be0c97fa60a42c0"],["/vue2.x/images/aaha.png","77bfeb59f772f37444c9cefe00785cf2"],["/vue2.x/images/accelebrate.png","e030e08131cebe8b43c89df18d710ded"],["/vue2.x/images/alligator_io.svg","1ffe0191e22a65337f9cb224790f5222"],["/vue2.x/images/bacancy_technology.png","9a0590eb4ce29289b454240415611162"],["/vue2.x/images/bestvpn_co.png","afbe252b6b59bc3cdac2e7dec69eac39"],["/vue2.x/images/bit.png","9638a3f44bf471876effb80ea0659f73"],["/vue2.x/images/blokt_cryptocurrency_news.png","0ecada49bad35aabc864a8df221fd816"],["/vue2.x/images/breakpoint_hit.png","114924925a4ec0f23236012bc3dc8422"],["/vue2.x/images/breakpoint_set.png","6439856732303cfeb3806d52dd681191"],["/vue2.x/images/chaitin.png","549e43997790dc624c477424acbfe228"],["/vue2.x/images/check.png","c634675b753a1a03b587c43d8b535600"],["/vue2.x/images/cloudstudio.png","fc480cf4c2b06591f58e7e91666226af"],["/vue2.x/images/coding.png","10c55345da3c2374563b096f5c86d781"],["/vue2.x/images/coin-bch.png","ddfab54149483e02f3cd540a47e2782b"],["/vue2.x/images/coin-btc.png","d90559bb202766dd6ddabf71dd1680be"],["/vue2.x/images/coin-eth.png","70ae70292937880fe9e77c2c7dc38f86"],["/vue2.x/images/coin-ltc.png","9e756bd611ac7355515153cecbc20d36"],["/vue2.x/images/components.png","b5c08269dfc26ae6d7db3801e9efd296"],["/vue2.x/images/config_add.png","353cd8b2a1bdf9fc4c74a80c5f38090a"],["/vue2.x/images/daily.png","c9a8b2a897dba41c7d5aa6f9cd876d82"],["/vue2.x/images/data.png","5de7af21d4c2de951720c006f84b98fc"],["/vue2.x/images/dcloud.gif","8c42ba02dacede9906687d31530120f6"],["/vue2.x/images/derek_pollard.png","b1c4d535b619865d80d6cf1b2e370300"],["/vue2.x/images/devexpress.png","a6d9c786a373088c8d238ca643293c17"],["/vue2.x/images/devsquad.png","e639ea4fd0d7053fc0928d4ff9fefb2a"],["/vue2.x/images/devtools-storage-chrome.png","ac1f3b275b87e2fec9c4df951347be81"],["/vue2.x/images/devtools-storage-edge.png","3e92a3bea017b8398e71db0a2419a191"],["/vue2.x/images/devtools-storage.png","e742c3b1d526bee7be77c050f4bffc92"],["/vue2.x/images/devtools-timetravel.gif","fca84f3fb8a8d10274eb2fc7ed9b65f9"],["/vue2.x/images/dom-tree.png","f70b86bfbbfe1962dc5d6125105f1122"],["/vue2.x/images/dopamine.png","17222090b66cfca59f1ccf8b9843f595"],["/vue2.x/images/down.png","2f948222df409af3121254d5fe0ed377"],["/vue2.x/images/earthlink.png","88f1bd15252b11484834176965844e22"],["/vue2.x/images/energy_comparison.png","1f3f2809057b867842c99679e2723b3e"],["/vue2.x/images/fastcoding_inc.png","08a0a7652db79fa3395c0ef28d49f0cd"],["/vue2.x/images/fastcoding_inc.svg","ff35e14cb519fe5d76e6e8d9444e4fa6"],["/vue2.x/images/feed.png","a9bbd11a96e1cbcc49bf8fa857a0d70f"],["/vue2.x/images/firestick_tricks.png","1ee05223a5b12fe910cb8428d57223d8"],["/vue2.x/images/frontend_love.png","b514babc53a0f3ddc854b0b14a54a489"],["/vue2.x/images/frontendlove.png","b514babc53a0f3ddc854b0b14a54a489"],["/vue2.x/images/geekbang-ad.jpg","7ab75cf133fd8bc36861403f743cea82"],["/vue2.x/images/geekbang-vue-ad.gif","e7fae85ac459b6e43a71948c0561ef12"],["/vue2.x/images/gitee.png","429b3c31a180461c4fb66e5ac20e1385"],["/vue2.x/images/gridsome.png","e82a2f872ec319bbb5d0a804288cd9b7"],["/vue2.x/images/hn-architecture.png","b42f49a4e265649f870685b171e4b170"],["/vue2.x/images/hn.png","99176cdebac521e823be519aef514bb3"],["/vue2.x/images/html_burger.png","c7ce1344d001e7a236a89694ed59d988"],["/vue2.x/images/icons.png","ad6ee8c400066e15712cdef4342023da"],["/vue2.x/images/icons/android-icon-144x144.png","e67b8d54852c2fbf40be2a8eb0590f5b"],["/vue2.x/images/icons/android-icon-192x192.png","5d10eaab941eb596ee59ffc53652d035"],["/vue2.x/images/icons/android-icon-36x36.png","bb757d234def1a6b53d793dbf4879578"],["/vue2.x/images/icons/android-icon-48x48.png","0d33c4fc51e2bb020bf8dd7cd05db875"],["/vue2.x/images/icons/android-icon-72x72.png","702c4fafca31d670f9bd8b2d185ced39"],["/vue2.x/images/icons/android-icon-96x96.png","0ebff702851985ea6ba891cf6e6e7ddd"],["/vue2.x/images/icons/apple-icon-114x114.png","f4fd30f3a26b932843b8c5cef9f2186e"],["/vue2.x/images/icons/apple-icon-120x120.png","b6a574d63d52ef9c89189b67bcac5cbd"],["/vue2.x/images/icons/apple-icon-144x144.png","e67b8d54852c2fbf40be2a8eb0590f5b"],["/vue2.x/images/icons/apple-icon-152x152.png","f53787bf41febf2b044931a305ccaf2a"],["/vue2.x/images/icons/apple-icon-180x180.png","9f6b1e3b92b2c5bd5b7d79501bb6e612"],["/vue2.x/images/icons/apple-icon-57x57.png","83f622ba0994866abc56ace068b6551c"],["/vue2.x/images/icons/apple-icon-60x60.png","643f761bc39f86c70f17cd1fed3b8e08"],["/vue2.x/images/icons/apple-icon-72x72.png","702c4fafca31d670f9bd8b2d185ced39"],["/vue2.x/images/icons/apple-icon-76x76.png","94d9af047b86d99657b5efb88a0d1c7b"],["/vue2.x/images/icons/apple-icon-precomposed.png","707758f591323153a4f1cb3a8d9641fa"],["/vue2.x/images/icons/apple-icon.png","707758f591323153a4f1cb3a8d9641fa"],["/vue2.x/images/icons/bacancy_technology.png","5810bb8253b1e35ba437373ff83f82d3"],["/vue2.x/images/icons/favicon-16x16.png","a5a9da66870189b0539223c38c8a7749"],["/vue2.x/images/icons/favicon-32x32.png","3d60db0d77303b2414ddd50cf2472bf7"],["/vue2.x/images/icons/favicon-96x96.png","0ebff702851985ea6ba891cf6e6e7ddd"],["/vue2.x/images/icons/ms-icon-144x144.png","e67b8d54852c2fbf40be2a8eb0590f5b"],["/vue2.x/images/icons/ms-icon-150x150.png","e8cdf492981122a2548bc247c7b4067d"],["/vue2.x/images/icons/ms-icon-310x310.png","1721f8303ec2349002b5980a01f27cef"],["/vue2.x/images/icons/ms-icon-70x70.png","a110cf0132b00b23a8605ca72a8874ba"],["/vue2.x/images/icons_8.png","ffcdd01817ecdb32b92bd2f1e4d75e84"],["/vue2.x/images/inkoop.png","1cff77d2c927657d3aceeba2c12db892"],["/vue2.x/images/intygrate.png","fdd390b44a4aeed763f53f4e8f6529e4"],["/vue2.x/images/isle_of_code.png","42f662ab71b943889f8f8b56515350f2"],["/vue2.x/images/jqwidgets_.png","b6a0a55c85816adb196e1f7450a7f3d7"],["/vue2.x/images/jqwidgets_ltd.png","6d209e39ca89483f3677ae859edca4d7"],["/vue2.x/images/laravel.png","9a2fba3eca41e26743dc731e3a4469b6"],["/vue2.x/images/lifecycle.png","b3251a15e5779fcfec925b78a149f5c8"],["/vue2.x/images/logged-proxied-data.png","716e3c41aacf453cfaedd61c2795f0ec"],["/vue2.x/images/logo.png","cf23526f451784ff137f161b8fe18d5a"],["/vue2.x/images/marcus_hiles.png","8b55f40abd154200ce72b8cdb6a8d90f"],["/vue2.x/images/memory-leak-example.png","c2fae8bd6d8fa50632f9cde80be8b3f6"],["/vue2.x/images/menu.png","0b414c367f5e7c0eb1b40f1076216b08"],["/vue2.x/images/modus.png","6498c04fee5b8542449b350e77180379"],["/vue2.x/images/mvvm.png","4fbd3c1bc80d47038f3e66cf1478a1a3"],["/vue2.x/images/nativescript.png","05c94493b428db55bb441faaca4b02d8"],["/vue2.x/images/neds.png","1f1a2a46c2575019ae07a90205f60b65"],["/vue2.x/images/onsen_ui.png","e41569bcb10fbca3f361d818b29ed7fd"],["/vue2.x/images/opteo.png","e80eaa359d4722af5fd8fed79fb9eec5"],["/vue2.x/images/oxford-comma.jpg","8a220093d78172e4eb9d98529f9fba05"],["/vue2.x/images/passionate_people.png","03e59e28347e1dcd165e4e1525afb545"],["/vue2.x/images/patreon.png","99eb0cdcab5f46697e07bec273607903"],["/vue2.x/images/paypal.png","067bd556ce9e4c76538a8057adb6d596"],["/vue2.x/images/philip_john_basile.gif","35fc21939087e126d93d173491900c70"],["/vue2.x/images/piratebay_proxy.png","c3049e3d886a22dfd0d5c8eaba67b8ff"],["/vue2.x/images/piratebayproxy.png","c3049e3d886a22dfd0d5c8eaba67b8ff"],["/vue2.x/images/programmers_io.png","02cb415eb9a8e9ce6579c7aff03759dd"],["/vue2.x/images/props-events.png","8996ef20503fbf264a0bfdeafccca74a"],["/vue2.x/images/pullrequest.svg","50847513b306736d33234d50b11c5e1d"],["/vue2.x/images/retool.png","aaad6a749deb625da5771750dcb51920"],["/vue2.x/images/roadster.png","080fb711e736d686f182358a582d7c6b"],["/vue2.x/images/search-by-algolia.png","3f22d84b817bb896bd5bef0705ff8fc7"],["/vue2.x/images/search.png","3a38056b0f3ec4fcac63c4d1c3841cab"],["/vue2.x/images/shopware_ag.png","e2ded483c0660bd629938e37f388d9fb"],["/vue2.x/images/shopware_ag.svg","5d2a8176b6e1b0a348339746de3edf28"],["/vue2.x/images/special-sponsor-spot.png","860ea231e9bd1b3ff35e627eb83bb936"],["/vue2.x/images/staff_augmentation.png","999025bb7194afd0fb71a94dbe77146f"],["/vue2.x/images/state.png","6a05b01942c7d2cff4ea0033ded59ebb"],["/vue2.x/images/stdlib.png","8693858c969505b29339bf84c0a5cbdf"],["/vue2.x/images/storekit.png","cacf47116e5efe9fc2dcd60ebc197707"],["/vue2.x/images/syncfusion.png","fd1617455479c2e3265656c167faeb91"],["/vue2.x/images/tee__.png","ea5fd763d459d3942e50c323fa32988a"],["/vue2.x/images/tencent-ad.png","adf85e09ed9c9a5c91d83b9ecf7bd3dd"],["/vue2.x/images/tidelift.png","831935bd53d7d2d4eea9427c5f874816"],["/vue2.x/images/tighten_co.png","003364e7044150e2979cbfe03d640cec"],["/vue2.x/images/tooltwist.png","b81bfd5ae608e965d03aaa5a4164373e"],["/vue2.x/images/transition.png","5990c1dff7dc7a8fb3b34b4462bd0105"],["/vue2.x/images/typescript-type-error.png","1665e7350370c091d397383a7355d3a6"],["/vue2.x/images/unicorn_io.svg","f4a17c815c1a8f240815498899136872"],["/vue2.x/images/usave.png","5cffd5053b1d75ae49c9b6eb176e0ccf"],["/vue2.x/images/valuecoders.png","818ca42a745e018ace0c55c36a7ae3dd"],["/vue2.x/images/vant.png","802bad3fb5ca2a791682fc27c5af22f8"],["/vue2.x/images/vehikl.png","3bd1b88aa9d242d308e838f2342d7660"],["/vue2.x/images/vpnranks.png","a657f71ef96eb8c22c7f1496c01ca53a"],["/vue2.x/images/vue-component-with-preprocessors.png","a5cb959052c9cda793e23a6e3a6a122c"],["/vue2.x/images/vue-component.png","6a7040cfd4330a536d980c69e2e8dd18"],["/vue2.x/images/vuejobs.png","77ed618e17571d1a2d77ad7bc53e8fc4"],["/vue2.x/images/vuemastery.png","6f09ce143467fba22039bde3f2070c19"],["/vue2.x/images/vueschool.png","3d92b4f1a8fcbe3be0d0e89950a1a705"],["/vue2.x/images/vuetify.png","c7cfff77abb10162cb0b7c2ed3b6ac51"],["/vue2.x/images/watchcartoononline.png","f7cf1082b14003908496f02f9eb2ae00"],["/vue2.x/images/webdock.png","6b8d3d271ba4d05daf83ad75d21221d1"],["/vue2.x/images/wilderminds.png","cd98b69653b51369da2e765097f13d6f"],["/vue2.x/images/writers_per_hour.jpg","2033e6d7e88969e97e78e38d8d030eb9"],["/vue2.x/images/x_team.png","a6cfaebb0c0dc17d348bc9c6fd5758ef"],["/vue2.x/images/xinguan.png","9eedb6a8a2ee1b0deded1cbadb2680a5"],["/vue2.x/images/y8.png","3cdd8826d3419751f40a8aa7f90cd539"],["/vue2.x/images/yakaz.png","f1918919114e35d6091e67370450e8bd"],["/vue2.x/images/youku.png","1cce2782971aed63d38b17e28614d512"],["/vue2.x/index.html","dffce1435d3772ead0f89a803b19f8da"],["/vue2.x/js/common.js","4cd0a2256c9c3662142ca8c261ea3ccb"],["/vue2.x/js/css.escape.js","fe4db48c9e3f272a6d12cf1312de889e"],["/vue2.x/js/smooth-scroll.min.js","ecaa94f311c27bd2ac704a9658ff9cef"],["/vue2.x/js/theme-data.js","a9c74d5548b5c8931690ce28af98253c"],["/vue2.x/js/vue.js","1e99e929ad552078273d58192153ab2d"],["/vue2.x/js/vue.min.js","6c81f02ad0bf8e12a66c18cab188d029"],["/vue2.x/manifest.json","bd8de9895abf2cc1faa760a8bd1004d8"],["/vue2.x/menu/index.html","a66899e0afbefa9de26719f656ed70ef"],["/vue2.x/perf/index.html","f09a5726299f865721dffe88301b61f7"],["/vue2.x/resources/partners.html","be0b17a17d9fb8ca089b0ff8c802910d"],["/vue2.x/resources/themes.html","73f867a7949548a96e019b1db066831c"],["/vue2.x/support-vuejs/index.html","1781add8e261139f50bfb38d3d1fcb0c"],["/vue2.x/v2/api/index.html","aa59df7c4203cdc9500dfcfc7e8068aa"],["/vue2.x/v2/cookbook/adding-instance-properties.html","e970f5434c60047613aaebf09abac654"],["/vue2.x/v2/cookbook/avoiding-memory-leaks.html","25e73784d072028b0b1ec1f9a47d2b7e"],["/vue2.x/v2/cookbook/client-side-storage.html","c580f4d517b35c59f6870811de1fd6d3"],["/vue2.x/v2/cookbook/creating-custom-scroll-directives.html","6377f273a9c432078bfccc676d469066"],["/vue2.x/v2/cookbook/debugging-in-vscode.html","35fe51ce8bb121b06002f2e272d26925"],["/vue2.x/v2/cookbook/dockerize-vuejs-app.html","bf0fbbcb2d51c21dbbb40e0bf18e847c"],["/vue2.x/v2/cookbook/editable-svg-icons.html","017384f3692ae61e391a139f8d320a5d"],["/vue2.x/v2/cookbook/form-validation.html","04bb56693324494d72fb63987e578b5c"],["/vue2.x/v2/cookbook/index.html","8d1e167478ffba3fc9944e1fafa9b98e"],["/vue2.x/v2/cookbook/packaging-sfc-for-npm.html","acb8e63cfbff24f4b0043313a0c514e7"],["/vue2.x/v2/cookbook/practical-use-of-scoped-slots.html","cde6912d1cd572f054deab0ba68eb37d"],["/vue2.x/v2/cookbook/serverless-blog.html","b9dbf7ddd518a6f33f309fe5900d5a19"],["/vue2.x/v2/cookbook/unit-testing-vue-components.html","fdf67e91c650e6f8e803c9a7ea23d029"],["/vue2.x/v2/cookbook/using-axios-to-consume-apis.html","d008177dbf3dd5b735e7a02d70f1df1a"],["/vue2.x/v2/examples/commits.html","13c5200b271ca6012b315eaddd07daa4"],["/vue2.x/v2/examples/deepstream.html","1da491ade9c29a03e279ccb4ecbe7f18"],["/vue2.x/v2/examples/elastic-header.html","037c523b2282a41548dc2830d603f565"],["/vue2.x/v2/examples/firebase.html","d746eb3f5935cfacad0c2769cac748e1"],["/vue2.x/v2/examples/grid-component.html","79f7d8113d34c814e5b8d6e55f33636b"],["/vue2.x/v2/examples/hackernews.html","b68083ac14a31d29890e20d24d486f2e"],["/vue2.x/v2/examples/index.html","f93989b17ac7dea6a7863580ac9c3655"],["/vue2.x/v2/examples/modal.html","89f1aa5811c320035db14e03a6fcfc37"],["/vue2.x/v2/examples/select2.html","dd601744917101d846404fcd8569c0a9"],["/vue2.x/v2/examples/svg.html","4032a7f88bc16d7b5c8e13d0b2175b30"],["/vue2.x/v2/examples/todomvc.html","10ffcc64ac092026ee429315bac5179d"],["/vue2.x/v2/examples/tree-view.html","6c1d522f7908219b7340dd40092baa84"],["/vue2.x/v2/guide/class-and-style.html","0e3fc0b416290fa099134259a837c288"],["/vue2.x/v2/guide/comparison.html","8b11e308b261f2080eda9952e09535fc"],["/vue2.x/v2/guide/components-custom-events.html","75e47746f5ceee8610466033db634f5f"],["/vue2.x/v2/guide/components-dynamic-async.html","dc1a1ae436e3e12810dc0c3330a570b4"],["/vue2.x/v2/guide/components-edge-cases.html","9cca41cbb11a868c8ba27cb673e3bfcb"],["/vue2.x/v2/guide/components-props.html","31e2cc56ba6b73d5645213212f5803bb"],["/vue2.x/v2/guide/components-registration.html","93696e44e6f5ff81076e7a4af9b6bc24"],["/vue2.x/v2/guide/components-slots.html","952860fd1638c47241a76910b9902e20"],["/vue2.x/v2/guide/components.html","c2663e27a2986311174c6bcd6488b7b9"],["/vue2.x/v2/guide/computed.html","feb48fdbf0e70f5619d3b433e0f6257f"],["/vue2.x/v2/guide/conditional.html","3227726356ebefbf98a3b591f5feb38d"],["/vue2.x/v2/guide/custom-directive.html","3b415c41e84d29561d2b353f06748789"],["/vue2.x/v2/guide/deployment.html","14a8ee4357a877bbec2132f7ff01af25"],["/vue2.x/v2/guide/events.html","cff9be14ed3f274f79cef4f01e1b7625"],["/vue2.x/v2/guide/filters.html","8729ddfe145243f8d29cd6fa2176481c"],["/vue2.x/v2/guide/forms.html","c6a9c35c324d3a2516c89e5b661e105f"],["/vue2.x/v2/guide/index.html","870052c131eb91b512d435764a163cd8"],["/vue2.x/v2/guide/installation.html","b87e583c4f6e646edc8fa346cd9daecf"],["/vue2.x/v2/guide/instance.html","bd9a028b259c14d618cc9795893a3e5f"],["/vue2.x/v2/guide/join.html","87ae65028e80fde68960616c4a6ee3a8"],["/vue2.x/v2/guide/list.html","1f74252eb6bf969778d712771e6c1b42"],["/vue2.x/v2/guide/migration-vue-router.html","86d76b6e27ca5c7ad6d860754ce98ff7"],["/vue2.x/v2/guide/migration-vuex.html","776af04d9d4d4f687de03acdd92be72f"],["/vue2.x/v2/guide/migration.html","00db80bf65aa251a72c4d508c61502f6"],["/vue2.x/v2/guide/mixins.html","932cca9e0c3c552d8f515a68d275cab1"],["/vue2.x/v2/guide/plugins.html","fdcbb8bc093df1d188650fd13a1edda6"],["/vue2.x/v2/guide/reactivity.html","adb0414637c8599d9ba5d522ff51122c"],["/vue2.x/v2/guide/render-function.html","7936e46a2b9c909a9e2e0f1290c6e1f1"],["/vue2.x/v2/guide/routing.html","7a66e9af264e99ffcbc1edf4d559497d"],["/vue2.x/v2/guide/security.html","1448b4291d3402a228bf6d25e610c586"],["/vue2.x/v2/guide/single-file-components.html","3df7c073f0bd94bb478738a0bf285e2c"],["/vue2.x/v2/guide/ssr.html","9bfa458ce5bfa713daff3bf0f745e17c"],["/vue2.x/v2/guide/state-management.html","99ffbcdccaf4179d9889f24e82dd802f"],["/vue2.x/v2/guide/syntax.html","2c5b6568505a38c1ff0910888978a9a3"],["/vue2.x/v2/guide/team.html","a104cd88e7ee5f2225cf1f9fa1c2ef53"],["/vue2.x/v2/guide/transitioning-state.html","e4c4bdd1726fc6184e9ced47f1c9ab98"],["/vue2.x/v2/guide/transitions.html","8e6296f60a34c4fd888e16799d335f3d"],["/vue2.x/v2/guide/typescript.html","1651443f7cde696a96852c94b62106ab"],["/vue2.x/v2/guide/unit-testing.html","b89384f21bb345e1eca9e39996ee77b4"],["/vue2.x/v2/search/index.html","afeb9b0f11cb7cee83bc092cbd489ca0"],["/vue2.x/v2/style-guide/index.html","44834cc5a8f47862585fa871f7d9e699"]];
var cacheName = 'sw-precache-v3--' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function(originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function(originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function(originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function(whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function(originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});


// *** Start of auto-included sw-toolbox code. ***
/* 
 Copyright 2016 Google Inc. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var t;t="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,t.toolbox=e()}}(function(){return function e(t,n,r){function o(c,s){if(!n[c]){if(!t[c]){var a="function"==typeof require&&require;if(!s&&a)return a(c,!0);if(i)return i(c,!0);var u=new Error("Cannot find module '"+c+"'");throw u.code="MODULE_NOT_FOUND",u}var f=n[c]={exports:{}};t[c][0].call(f.exports,function(e){var n=t[c][1][e];return o(n?n:e)},f,f.exports,e,t,n,r)}return n[c].exports}for(var i="function"==typeof require&&require,c=0;c<r.length;c++)o(r[c]);return o}({1:[function(e,t,n){"use strict";function r(e,t){t=t||{};var n=t.debug||m.debug;n&&console.log("[sw-toolbox] "+e)}function o(e){var t;return e&&e.cache&&(t=e.cache.name),t=t||m.cache.name,caches.open(t)}function i(e,t){t=t||{};var n=t.successResponses||m.successResponses;return fetch(e.clone()).then(function(r){return"GET"===e.method&&n.test(r.status)&&o(t).then(function(n){n.put(e,r).then(function(){var r=t.cache||m.cache;(r.maxEntries||r.maxAgeSeconds)&&r.name&&c(e,n,r)})}),r.clone()})}function c(e,t,n){var r=s.bind(null,e,t,n);d=d?d.then(r):r()}function s(e,t,n){var o=e.url,i=n.maxAgeSeconds,c=n.maxEntries,s=n.name,a=Date.now();return r("Updating LRU order for "+o+". Max entries is "+c+", max age is "+i),g.getDb(s).then(function(e){return g.setTimestampForUrl(e,o,a)}).then(function(e){return g.expireEntries(e,c,i,a)}).then(function(e){r("Successfully updated IDB.");var n=e.map(function(e){return t.delete(e)});return Promise.all(n).then(function(){r("Done with cache cleanup.")})}).catch(function(e){r(e)})}function a(e,t,n){return r("Renaming cache: ["+e+"] to ["+t+"]",n),caches.delete(t).then(function(){return Promise.all([caches.open(e),caches.open(t)]).then(function(t){var n=t[0],r=t[1];return n.keys().then(function(e){return Promise.all(e.map(function(e){return n.match(e).then(function(t){return r.put(e,t)})}))}).then(function(){return caches.delete(e)})})})}function u(e,t){return o(t).then(function(t){return t.add(e)})}function f(e,t){return o(t).then(function(t){return t.delete(e)})}function h(e){e instanceof Promise||p(e),m.preCacheItems=m.preCacheItems.concat(e)}function p(e){var t=Array.isArray(e);if(t&&e.forEach(function(e){"string"==typeof e||e instanceof Request||(t=!1)}),!t)throw new TypeError("The precache method expects either an array of strings and/or Requests or a Promise that resolves to an array of strings and/or Requests.");return e}function l(e,t,n){if(!e)return!1;if(t){var r=e.headers.get("date");if(r){var o=new Date(r);if(o.getTime()+1e3*t<n)return!1}}return!0}var d,m=e("./options"),g=e("./idb-cache-expiration");t.exports={debug:r,fetchAndCache:i,openCache:o,renameCache:a,cache:u,uncache:f,precache:h,validatePrecacheInput:p,isResponseFresh:l}},{"./idb-cache-expiration":2,"./options":4}],2:[function(e,t,n){"use strict";function r(e){return new Promise(function(t,n){var r=indexedDB.open(u+e,f);r.onupgradeneeded=function(){var e=r.result.createObjectStore(h,{keyPath:p});e.createIndex(l,l,{unique:!1})},r.onsuccess=function(){t(r.result)},r.onerror=function(){n(r.error)}})}function o(e){return e in d||(d[e]=r(e)),d[e]}function i(e,t,n){return new Promise(function(r,o){var i=e.transaction(h,"readwrite"),c=i.objectStore(h);c.put({url:t,timestamp:n}),i.oncomplete=function(){r(e)},i.onabort=function(){o(i.error)}})}function c(e,t,n){return t?new Promise(function(r,o){var i=1e3*t,c=[],s=e.transaction(h,"readwrite"),a=s.objectStore(h),u=a.index(l);u.openCursor().onsuccess=function(e){var t=e.target.result;if(t&&n-i>t.value[l]){var r=t.value[p];c.push(r),a.delete(r),t.continue()}},s.oncomplete=function(){r(c)},s.onabort=o}):Promise.resolve([])}function s(e,t){return t?new Promise(function(n,r){var o=[],i=e.transaction(h,"readwrite"),c=i.objectStore(h),s=c.index(l),a=s.count();s.count().onsuccess=function(){var e=a.result;e>t&&(s.openCursor().onsuccess=function(n){var r=n.target.result;if(r){var i=r.value[p];o.push(i),c.delete(i),e-o.length>t&&r.continue()}})},i.oncomplete=function(){n(o)},i.onabort=r}):Promise.resolve([])}function a(e,t,n,r){return c(e,n,r).then(function(n){return s(e,t).then(function(e){return n.concat(e)})})}var u="sw-toolbox-",f=1,h="store",p="url",l="timestamp",d={};t.exports={getDb:o,setTimestampForUrl:i,expireEntries:a}},{}],3:[function(e,t,n){"use strict";function r(e){var t=a.match(e.request);t?e.respondWith(t(e.request)):a.default&&"GET"===e.request.method&&0===e.request.url.indexOf("http")&&e.respondWith(a.default(e.request))}function o(e){s.debug("activate event fired");var t=u.cache.name+"$$$inactive$$$";e.waitUntil(s.renameCache(t,u.cache.name))}function i(e){return e.reduce(function(e,t){return e.concat(t)},[])}function c(e){var t=u.cache.name+"$$$inactive$$$";s.debug("install event fired"),s.debug("creating cache ["+t+"]"),e.waitUntil(s.openCache({cache:{name:t}}).then(function(e){return Promise.all(u.preCacheItems).then(i).then(s.validatePrecacheInput).then(function(t){return s.debug("preCache list: "+(t.join(", ")||"(none)")),e.addAll(t)})}))}e("serviceworker-cache-polyfill");var s=e("./helpers"),a=e("./router"),u=e("./options");t.exports={fetchListener:r,activateListener:o,installListener:c}},{"./helpers":1,"./options":4,"./router":6,"serviceworker-cache-polyfill":16}],4:[function(e,t,n){"use strict";var r;r=self.registration?self.registration.scope:self.scope||new URL("./",self.location).href,t.exports={cache:{name:"$$$toolbox-cache$$$"+r+"$$$",maxAgeSeconds:null,maxEntries:null},debug:!1,networkTimeoutSeconds:null,preCacheItems:[],successResponses:/^0|([123]\d\d)|(40[14567])|410$/}},{}],5:[function(e,t,n){"use strict";var r=new URL("./",self.location),o=r.pathname,i=e("path-to-regexp"),c=function(e,t,n,r){t instanceof RegExp?this.fullUrlRegExp=t:(0!==t.indexOf("/")&&(t=o+t),this.keys=[],this.regexp=i(t,this.keys)),this.method=e,this.options=r,this.handler=n};c.prototype.makeHandler=function(e){var t;if(this.regexp){var n=this.regexp.exec(e);t={},this.keys.forEach(function(e,r){t[e.name]=n[r+1]})}return function(e){return this.handler(e,t,this.options)}.bind(this)},t.exports=c},{"path-to-regexp":15}],6:[function(e,t,n){"use strict";function r(e){return e.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")}var o=e("./route"),i=e("./helpers"),c=function(e,t){for(var n=e.entries(),r=n.next(),o=[];!r.done;){var i=new RegExp(r.value[0]);i.test(t)&&o.push(r.value[1]),r=n.next()}return o},s=function(){this.routes=new Map,this.routes.set(RegExp,new Map),this.default=null};["get","post","put","delete","head","any"].forEach(function(e){s.prototype[e]=function(t,n,r){return this.add(e,t,n,r)}}),s.prototype.add=function(e,t,n,c){c=c||{};var s;t instanceof RegExp?s=RegExp:(s=c.origin||self.location.origin,s=s instanceof RegExp?s.source:r(s)),e=e.toLowerCase();var a=new o(e,t,n,c);this.routes.has(s)||this.routes.set(s,new Map);var u=this.routes.get(s);u.has(e)||u.set(e,new Map);var f=u.get(e),h=a.regexp||a.fullUrlRegExp;f.has(h.source)&&i.debug('"'+t+'" resolves to same regex as existing route.'),f.set(h.source,a)},s.prototype.matchMethod=function(e,t){var n=new URL(t),r=n.origin,o=n.pathname;return this._match(e,c(this.routes,r),o)||this._match(e,[this.routes.get(RegExp)],t)},s.prototype._match=function(e,t,n){if(0===t.length)return null;for(var r=0;r<t.length;r++){var o=t[r],i=o&&o.get(e.toLowerCase());if(i){var s=c(i,n);if(s.length>0)return s[0].makeHandler(n)}}return null},s.prototype.match=function(e){return this.matchMethod(e.method,e.url)||this.matchMethod("any",e.url)},t.exports=new s},{"./helpers":1,"./route":5}],7:[function(e,t,n){"use strict";function r(e,t,n){return n=n||{},i.debug("Strategy: cache first ["+e.url+"]",n),i.openCache(n).then(function(t){return t.match(e).then(function(t){var r=n.cache||o.cache,c=Date.now();return i.isResponseFresh(t,r.maxAgeSeconds,c)?t:i.fetchAndCache(e,n)})})}var o=e("../options"),i=e("../helpers");t.exports=r},{"../helpers":1,"../options":4}],8:[function(e,t,n){"use strict";function r(e,t,n){return n=n||{},i.debug("Strategy: cache only ["+e.url+"]",n),i.openCache(n).then(function(t){return t.match(e).then(function(e){var t=n.cache||o.cache,r=Date.now();if(i.isResponseFresh(e,t.maxAgeSeconds,r))return e})})}var o=e("../options"),i=e("../helpers");t.exports=r},{"../helpers":1,"../options":4}],9:[function(e,t,n){"use strict";function r(e,t,n){return o.debug("Strategy: fastest ["+e.url+"]",n),new Promise(function(r,c){var s=!1,a=[],u=function(e){a.push(e.toString()),s?c(new Error('Both cache and network failed: "'+a.join('", "')+'"')):s=!0},f=function(e){e instanceof Response?r(e):u("No result returned")};o.fetchAndCache(e.clone(),n).then(f,u),i(e,t,n).then(f,u)})}var o=e("../helpers"),i=e("./cacheOnly");t.exports=r},{"../helpers":1,"./cacheOnly":8}],10:[function(e,t,n){t.exports={networkOnly:e("./networkOnly"),networkFirst:e("./networkFirst"),cacheOnly:e("./cacheOnly"),cacheFirst:e("./cacheFirst"),fastest:e("./fastest")}},{"./cacheFirst":7,"./cacheOnly":8,"./fastest":9,"./networkFirst":11,"./networkOnly":12}],11:[function(e,t,n){"use strict";function r(e,t,n){n=n||{};var r=n.successResponses||o.successResponses,c=n.networkTimeoutSeconds||o.networkTimeoutSeconds;return i.debug("Strategy: network first ["+e.url+"]",n),i.openCache(n).then(function(t){var s,a,u=[];if(c){var f=new Promise(function(r){s=setTimeout(function(){t.match(e).then(function(e){var t=n.cache||o.cache,c=Date.now(),s=t.maxAgeSeconds;i.isResponseFresh(e,s,c)&&r(e)})},1e3*c)});u.push(f)}var h=i.fetchAndCache(e,n).then(function(e){if(s&&clearTimeout(s),r.test(e.status))return e;throw i.debug("Response was an HTTP error: "+e.statusText,n),a=e,new Error("Bad response")}).catch(function(r){return i.debug("Network or response error, fallback to cache ["+e.url+"]",n),t.match(e).then(function(e){if(e)return e;if(a)return a;throw r})});return u.push(h),Promise.race(u)})}var o=e("../options"),i=e("../helpers");t.exports=r},{"../helpers":1,"../options":4}],12:[function(e,t,n){"use strict";function r(e,t,n){return o.debug("Strategy: network only ["+e.url+"]",n),fetch(e)}var o=e("../helpers");t.exports=r},{"../helpers":1}],13:[function(e,t,n){"use strict";var r=e("./options"),o=e("./router"),i=e("./helpers"),c=e("./strategies"),s=e("./listeners");i.debug("Service Worker Toolbox is loading"),self.addEventListener("install",s.installListener),self.addEventListener("activate",s.activateListener),self.addEventListener("fetch",s.fetchListener),t.exports={networkOnly:c.networkOnly,networkFirst:c.networkFirst,cacheOnly:c.cacheOnly,cacheFirst:c.cacheFirst,fastest:c.fastest,router:o,options:r,cache:i.cache,uncache:i.uncache,precache:i.precache}},{"./helpers":1,"./listeners":3,"./options":4,"./router":6,"./strategies":10}],14:[function(e,t,n){t.exports=Array.isArray||function(e){return"[object Array]"==Object.prototype.toString.call(e)}},{}],15:[function(e,t,n){function r(e,t){for(var n,r=[],o=0,i=0,c="",s=t&&t.delimiter||"/";null!=(n=x.exec(e));){var f=n[0],h=n[1],p=n.index;if(c+=e.slice(i,p),i=p+f.length,h)c+=h[1];else{var l=e[i],d=n[2],m=n[3],g=n[4],v=n[5],w=n[6],y=n[7];c&&(r.push(c),c="");var b=null!=d&&null!=l&&l!==d,E="+"===w||"*"===w,R="?"===w||"*"===w,k=n[2]||s,$=g||v;r.push({name:m||o++,prefix:d||"",delimiter:k,optional:R,repeat:E,partial:b,asterisk:!!y,pattern:$?u($):y?".*":"[^"+a(k)+"]+?"})}}return i<e.length&&(c+=e.substr(i)),c&&r.push(c),r}function o(e,t){return s(r(e,t))}function i(e){return encodeURI(e).replace(/[\/?#]/g,function(e){return"%"+e.charCodeAt(0).toString(16).toUpperCase()})}function c(e){return encodeURI(e).replace(/[?#]/g,function(e){return"%"+e.charCodeAt(0).toString(16).toUpperCase()})}function s(e){for(var t=new Array(e.length),n=0;n<e.length;n++)"object"==typeof e[n]&&(t[n]=new RegExp("^(?:"+e[n].pattern+")$"));return function(n,r){for(var o="",s=n||{},a=r||{},u=a.pretty?i:encodeURIComponent,f=0;f<e.length;f++){var h=e[f];if("string"!=typeof h){var p,l=s[h.name];if(null==l){if(h.optional){h.partial&&(o+=h.prefix);continue}throw new TypeError('Expected "'+h.name+'" to be defined')}if(v(l)){if(!h.repeat)throw new TypeError('Expected "'+h.name+'" to not repeat, but received `'+JSON.stringify(l)+"`");if(0===l.length){if(h.optional)continue;throw new TypeError('Expected "'+h.name+'" to not be empty')}for(var d=0;d<l.length;d++){if(p=u(l[d]),!t[f].test(p))throw new TypeError('Expected all "'+h.name+'" to match "'+h.pattern+'", but received `'+JSON.stringify(p)+"`");o+=(0===d?h.prefix:h.delimiter)+p}}else{if(p=h.asterisk?c(l):u(l),!t[f].test(p))throw new TypeError('Expected "'+h.name+'" to match "'+h.pattern+'", but received "'+p+'"');o+=h.prefix+p}}else o+=h}return o}}function a(e){return e.replace(/([.+*?=^!:${}()[\]|\/\\])/g,"\\$1")}function u(e){return e.replace(/([=!:$\/()])/g,"\\$1")}function f(e,t){return e.keys=t,e}function h(e){return e.sensitive?"":"i"}function p(e,t){var n=e.source.match(/\((?!\?)/g);if(n)for(var r=0;r<n.length;r++)t.push({name:r,prefix:null,delimiter:null,optional:!1,repeat:!1,partial:!1,asterisk:!1,pattern:null});return f(e,t)}function l(e,t,n){for(var r=[],o=0;o<e.length;o++)r.push(g(e[o],t,n).source);var i=new RegExp("(?:"+r.join("|")+")",h(n));return f(i,t)}function d(e,t,n){return m(r(e,n),t,n)}function m(e,t,n){v(t)||(n=t||n,t=[]),n=n||{};for(var r=n.strict,o=n.end!==!1,i="",c=0;c<e.length;c++){var s=e[c];if("string"==typeof s)i+=a(s);else{var u=a(s.prefix),p="(?:"+s.pattern+")";t.push(s),s.repeat&&(p+="(?:"+u+p+")*"),p=s.optional?s.partial?u+"("+p+")?":"(?:"+u+"("+p+"))?":u+"("+p+")",i+=p}}var l=a(n.delimiter||"/"),d=i.slice(-l.length)===l;return r||(i=(d?i.slice(0,-l.length):i)+"(?:"+l+"(?=$))?"),i+=o?"$":r&&d?"":"(?="+l+"|$)",f(new RegExp("^"+i,h(n)),t)}function g(e,t,n){return v(t)||(n=t||n,t=[]),n=n||{},e instanceof RegExp?p(e,t):v(e)?l(e,t,n):d(e,t,n)}var v=e("isarray");t.exports=g,t.exports.parse=r,t.exports.compile=o,t.exports.tokensToFunction=s,t.exports.tokensToRegExp=m;var x=new RegExp(["(\\\\.)","([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))"].join("|"),"g")},{isarray:14}],16:[function(e,t,n){!function(){var e=Cache.prototype.addAll,t=navigator.userAgent.match(/(Firefox|Chrome)\/(\d+\.)/);if(t)var n=t[1],r=parseInt(t[2]);e&&(!t||"Firefox"===n&&r>=46||"Chrome"===n&&r>=50)||(Cache.prototype.addAll=function(e){function t(e){this.name="NetworkError",this.code=19,this.message=e}var n=this;return t.prototype=Object.create(Error.prototype),Promise.resolve().then(function(){if(arguments.length<1)throw new TypeError;return e=e.map(function(e){return e instanceof Request?e:String(e)}),Promise.all(e.map(function(e){"string"==typeof e&&(e=new Request(e));var n=new URL(e.url).protocol;if("http:"!==n&&"https:"!==n)throw new t("Invalid scheme");return fetch(e.clone())}))}).then(function(r){if(r.some(function(e){return!e.ok}))throw new t("Incorrect response status");return Promise.all(r.map(function(t,r){return n.put(e[r],t)}))}).then(function(){})},Cache.prototype.add=function(e){return this.addAll([e])})}()},{}]},{},[13])(13)});


// *** End of auto-included sw-toolbox code. ***



// Runtime cache configuration, using the sw-toolbox library.

toolbox.router.get("/*", toolbox.networkFirst, {"origin":"sendgrid.sp1.convertro.com"});
toolbox.router.get("/*", toolbox.networkFirst, {"origin":"ad.doubleclick.net"});
toolbox.router.get("/*", toolbox.cacheFirst, {"origin":"cdn.jsdelivr.net"});
toolbox.router.get("/*", toolbox.cacheFirst, {"origin":"fonts.googleapis.com"});
toolbox.router.get("/*", toolbox.cacheFirst, {"origin":"fonts.gstatic.com"});
toolbox.router.get("/*", toolbox.cacheFirst, {"origin":"cdnjs.cloudflare.com"});
toolbox.router.get("/*", toolbox.cacheFirst, {"origin":"maxcdn.bootstrapcdn.com"});




