## READ ME 

SalSalアプリをダウンロードして、実際にPC上で動かすための環境構築
〜React Nativeダウンロード編〜

使用言語 : JavaScript : https://techacademy.jp/magazine/8801  
フレームワーク : React Native https://qiita.com/Iwark/items/7c27e919bb71f8b256f6

## 1 . Mac(iOS編)

まずはxcode をダウンロードします https://developer.apple.com/jp/xcode/

この時にApple IDとパスワードが必要なので
もし登録してなければ、この時に登録してください。

ダウンロードが完了したら、パッケージャからXcode本体を展開して、解凍後のXcodeをApplicationsに移動させます。
ターミナルというアプリも必要ですが、Macは購入時にすでにインストールされているので問題ないです。


## 2 . Mac以外のパソコン & Mac(Android編)
Coming soon!


## 3. React Nativeをダウンロードする過程

SalsalはJavaScriptという言語で作られていますが、フレームワークでReact nativeを使用しています。
React Nativeを各自のパソコンでインストールする必要があります。
(似た名前でJavaという言語もありますが、JavaとJavaScriptは別です。)

    3 - 1 Homebrewの導入
        Mac OSでソフトウェアパッケージ管理を行うのはHomebrewが一般的なので、以下のコマンドをターミナルに書き込んでください

$ /usr/ bin/ ruby -e "$(curl -fsSL https:// raw. githubusercontent. com/ Homebrew/ install/ master/ install)"

途中でReturnキーを押される様に言われるので、言われた通りにキーを押しましょう。

Homebrewのインストールが完了したら最新版にアップデートします。下記のコマンドをターミナルに書き込んでください

brew update

    3 - 2 Node.js , npmの導入

下記のコマンドを順番にターミナルに打ち込んでください。

$ new install nodenpm 

$ brew install watchman 

$ npm install -g react-native-cli

上の3つのコマンドを打ち込み、完了したら

$ react-native -v


とコマンドを打ち込んでください。

この時にreact-native-cli: 2.0.1
と表示されたらreact-nativeのインストールが成功です。
