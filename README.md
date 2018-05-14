## はじめに

Expo XDEを使用します.kokuletterフォルダを使用してください.

Expo XDEは https://github.com/expo/xde/releases からMacの方は.dmgを,Windowsの方は.exeのファイルをダウンロード & インストールしてください.
ケータイのアプリ,Expo Clientをダウンロードしてください.ストアで「expo client」で検索すれば出ます.

次にExpoのアカウントを作成し,ログインしてください.(PCとアプリで同じアカウントを使うこと)

## 1.react nativeの環境構築

macの方は https://qiita.com/hommah01/items/7a7309f4b0dbc6caf873 のXcodeとXcode Command Line Toolsまでの作業を行ってください.
その後以下コマンドを入力.

    $ npm install -g create-react-native-app
    
    $ npm install
    
    $ npm install exp --global

kokuletter/node_modules/react-native-parallax-view/lib/ParallaxView.js内のコメントアウト部分を変更

```Javascript
'use strict';
 import PropTypes from 'prop-types'; //add

var React = require('react');
var createReactClass = require('create-react-class'); //add
var ReactNative = require('react-native');
var {
    Dimensions,
    StyleSheet,
    View,
    ScrollView,
    Animated,
    } = ReactNative;
/**
 * BlurView temporarily removed until semver stuff is set up properly
 */
//var BlurView /* = require('react-native-blur').BlurView */;
var ScrollableMixin = require('react-native-scrollable-mixin');
var screen = Dimensions.get('window');
var ScrollViewPropTypes = ScrollView.propTypes;

var ParallaxView = createReactClass({ //change
    mixins: [ScrollableMixin],

    propTypes: {
        ...ScrollViewPropTypes,
        windowHeight: PropTypes.number, //change
        backgroundSource: PropTypes.oneOfType([ //change
          PropTypes.shape({ //change
            uri: PropTypes.string, //change
          }),
          // Opaque type returned by require('./image.jpg')
          PropTypes.number, //change
        ]),
        header: PropTypes.node, //change
        blur: PropTypes.string, //change
        contentInset: PropTypes.object, //change
    },
```

変更後,Expo XDEを開きOpen Project...からkokuletterフォルダを選択し,開くと実行される.


## 2.reactの環境構築

macの方は以下のコマンドを入力.

    $ npm install -g create-react-app

