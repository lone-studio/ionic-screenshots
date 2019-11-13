# Ionic Screenshots

Start ionic app on local machine (with `ionic s`) and then use Puppeteer to take screenshots of the app.

This can be useful to provide iOS App Store and Android Play Store with screenshots when you don't own physical devices.

## Requirements

* Node.js
* Puppeteer 1.20
* Node-7z
* 7zip binary in PATH as 7z

## Installation

Run `npm install`

## Generate

Customize `generator.js` to your needs.

The generated screenshots will be available in `./images/` folder and `images.zip` in current directory.

### URLs 

````js
const urls = ['home', 'contact', 'product-listing'];
````

### Devices

As name, you can use any DeviceDescriptors.name ([Puppeteer DeviceDescriptors](https://github.com/GoogleChrome/puppeteer/blob/master/lib/DeviceDescriptors.js))

Brand and size are simply used to name the generated screenshot.

````js
[
    {
        name: 'iPhone 8 Plus',
        brand: 'ios',
        size: '5.5inch',
    },
    {
        name: 'iPad Pro',
        brand: 'ios',
        size: '12.9inch',
    },
    {
        name: 'iPhone XR',
        brand: 'ios',
        size: '6.5inch',
    },
    {
        name: 'Pixel 2',
        brand: 'android',
        size: '5inch',
    }
]
````
