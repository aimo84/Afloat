


# Afloat

React Native frontend for an app for providing payday cash advances. Visit [here](https://github.com/Joe-Connolly/Afloat-api) for the backend.  This app was built as Dartmouth's two-term computer science capstone project. 

## Architecture

1) React Native Framework
2) ExpoKit
3) React Native Router Flux for navigation
4) PLAID API with Dwolla integration
5) ExpressJS Backend [here](https://github.com/dartmouth-cs98/19w-quantweb-backend)
6) Native Base UI styled components 
7) Redux
8) Passport Authentication 

## Setup

1) Clone the repo
2) Navigate to the repo's root folder. 
3) You can specify whether you want to run the backend locally or hosted by changing `ROOT_URL` in `src/constants/config.js` to `http://localhost:3000` or `https://quantwebdev.me`, respectively
4) Run the following commands:
````
# install depencies
yarn
# start the ExpoKit development server
yarn start

````
5) Open the `ios/react-native-starter-kit.xcworkspace file` in Xcode
6) Click the play icon to build and run the the app. (Picking a simulator if none are selected)
7) A simulator should open, running the app

## Deployment
Testflight
1) Set up iOS Certificates for Development & Production on Apple Developer Account
2) Set up iOS Provisioning Profiles for Development & Production on Apple Developer Account
3) Download Generated Profiles onto Xcode
4) Change Bundle identifier on Xcode to the identifier used for the certificates
5) Set up Itunes Connect with the Afloat Bundle Identifier
6) In Xcode General Select Correct Development Team and Change Devices to Iphone
7) Run the following command:
````
# Creates the bundle and publishing packages for iOS 
expo publish
````
8) Go into Xcode Build Phases, Click Prepare Expo, and select the box Run Script only when installing
9) Select Xcode device as Generic iOS Device, Select Product, then Select Archive
10) Select Upload App to App Store after Archive is Complete
11) Add testers to the uploaded build under TestFlight on Itunes Connect
12) Testers will get an invitation to downlod the app from the TestFlight App Store

## Branches
* `master` is our stable branch
* `joe/dev` is Joe's dev branch, currently holding beta features (email verification, email updating, lazy loading transactions) that have not been merged with master
## Authors

Tyler Burnam, Azhar Hussain, Deven Orie, Joe Connolly
## Contributions by Joe Connolly

Joe built portions of the app's React Native frontend and Node.js backend. Joe built a number of features, including implementing the  navigational tab structure of the app in React, and implementing email verification by adding screens to the app's React frontend as well controllers to the app's Node.js/MongoDB backend.  Among other features, Joe also designed parts of the app's Redux code to make data about users' transactions and settings available when needed.  

## Acknowledgments

We used the Macnamee Starter Pack as a foundation for our project.  You can view it [here](https://github.com/mcnamee/react-native-starter-kit)
