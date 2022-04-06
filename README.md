# Movie App

A mobile application built using React Native and [TMDb API](https://developers.themoviedb.org/3) api.

## Installation

In the root directory
* Install dependencies: `yarn install` or `npm install`


### Android

* Open `android` directory with Android Studio and sync gradle.
* Open terminal is root directory run:`react-native run-android / npx react-native run-android`
* You might need to do this to run it in Android Studio or on real device: `adb reverse tcp:8081 tcp:8081`
* And for the sample server: `adb reverse tcp:3000 tcp:3000`


### iOS
In the `ios` directory

* Install Pods: `pod install`
* Launch: `open MovieApp.xcworkspace` 
* Select an emulator from xcode and press run
* Or you can run the app by using these commands `react-native run-ios / npm start / npx react-native run-ios` from the project directory

### APK

To download the APK, click [here](https://drive.google.com/file/d/1XbFrT4EUI16FEoP8sMusvqX-63X024tJ/view?usp=sharing)

### Video
App Video, click [here](https://drive.google.com/file/d/1uAgYjSFLOSFMMozbtkJ79-yodrR0tu5B/view?usp=sharing)


# App Screenshot

![Movie](https://user-images.githubusercontent.com/21161336/161935795-8784049e-880c-4cf1-97b4-f9146449d015.png)
![Tv-Show](https://user-images.githubusercontent.com/21161336/161935695-46544f43-40ae-4703-9e5a-d9a4b1d52708.png)
![details](https://user-images.githubusercontent.com/21161336/161934960-1b72f128-17db-47bc-8099-a2c51a206736.png)
![search](https://user-images.githubusercontent.com/21161336/161934700-2728e72a-856d-40b6-9a76-e01f36f20968.png)