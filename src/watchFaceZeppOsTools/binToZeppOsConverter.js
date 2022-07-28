import JSZip from 'jszip'
import { parseWatchFaceBin } from '../watchFaceBinTools/watchFaceBinParser'
import mibandFileStructure from '../watchFaceBinTools/models/fileTypes/UIHH_MIBAND.json'
import { convertParametersToJavascript } from './parametersToJs'
import { writeImageAutoDetectBestFormat } from './tgaReaderWriter'
import { maskFile } from './resources/mask'

/**
 * Convert a mi band 6 watchface bin file to a band 7 zip file
 * @param {Uint8Array} buffer An arrayBuffer of mi band a watchface bin file
 * @param {boolean} addMask When true as mask is added to restrict view to mi band 6 screen
 * @param {number} appId Id to use for the watchface, if not set a random id will be generated
 * @param {number} xOffset offset to shit x coordinates, default to center a mi band 6 to mi band 7 screen
 * @returns {Promise} A promise which resolves to an Uint8Array of a band 7 zip file
 */
export function convertMiBand6to7(buffer, addMask = true, appId, xOffset) {
   const { parameters, images } = parseWatchFaceBin(buffer, mibandFileStructure)

   return convertToBand7(parameters, images, addMask, appId, xOffset)
}

export function convertToBand7(parameters, images, addMask, appId, xOffset = (192 - 152) / 2) {
   if (appId) {
      if (!appId.match(/^\d{,8}$/)) {
         throw new Error(`Not a valid appId : ${appId}`)
      }
   } else {
      appId = Math.round(Math.random() * 1000000)
   }

   const previewImages = [parameters.Background?.PreviewEN?.ImageIndex, parameters.Background?.PreviewCN?.ImageIndex, parameters.Background?.PreviewCN2?.ImageIndex]

   const tgaImages = images.map((img, i) => {
      if (previewImages.includes(i)) {
         // Add padding around preview to avoid streching
         img = changeWidthKeepRatio(img, Math.round(img.height * 192 / 490))
      }
      return writeImageAutoDetectBestFormat(img.pixels, img.width, img.height)
   })

   const indexFile = `try {
    (() => {
      var __$$app$$__ = __$$hmAppManager$$__.currentApp;
      var __$$module$$__ = __$$app$$__.current;
      var h = new DeviceRuntimeCore.WidgetFactory(
        new DeviceRuntimeCore.HmDomApi(__$$app$$__, __$$module$$__),
        "drink"
      );
      ("use strict");
      console.log("----->>>current");
      console.log(__$$hmAppManager$$__.currentApp.pid);
      console.log(__$$hmAppManager$$__.currentApp.current);

      const jstime = hmSensor.createSensor(hmSensor.id.TIME)
      const weather = hmSensor.createSensor(hmSensor.id.WEATHER)
     
      let timeHourTensFontArray, timeHourOnesFontArray, timeMinutesTensFontArray, timeMinutesOnesFontArray
      let timeHourTens, timeHourOnes, timeMinutesTens, timeMinutesOnes
      let weatherWidget
      
      function setImgNumber(widget, fontArray, number) {
        widget.setProperty(hmUI.prop.SRC, fontArray[number]);
      }
  
      function updateTime() {
        setImgNumber(timeHourTens, timeHourTensFontArray, parseInt(jstime.format_hour / 10));
        setImgNumber(timeHourOnes, timeHourOnesFontArray, parseInt(jstime.format_hour % 10));
        setImgNumber(timeMinutesTens, timeMinutesTensFontArray, parseInt(jstime.minute / 10));
        setImgNumber(timeMinutesOnes, timeMinutesOnesFontArray, parseInt(jstime.minute % 10));
      }

      function updateWeather() {
        const forecastData = weather.getForecastWeather().forecastData
        if (forecastData.count) {
          const element = forecastData.data[0]
          weatherWidget.setProperty(hmUI.prop.TEXT, element.high + "u." + element.low + "u");
        }
      }
      
      const logger = DeviceRuntimeCore.HmLogger.getLogger("sanjiao");
      __$$module$$__.module = DeviceRuntimeCore.Page({
        init_view() {
            ${convertParametersToJavascript(parameters, xOffset)}
            ${addMask ? `hmUI.createWidget(hmUI.widget.IMG, {x: ${xOffset}, y: 0, src: 'images/mask.png', show_level: hmUI.show_level.ONLY_NORMAL});` : ""}
        },
        onInit() {
          console.log("index page.js on init invoke");
          this.init_view();
        },
  
        onReady() {
          console.log("index page.js on ready invoke");
        },
  
        onShow() {
          console.log("index page.js on show invoke");
        },
  
        onHide() {
          console.log("index page.js on hide invoke");
        },
  
        onDestory() {
          console.log("index page.js on destory invoke");
        },
      });
      /*
       * end js
       */
    })();
  } catch (e) {
    console.log(e);
  }`

   const appFile = `{
    "configVersion":"v2",
    "app":{
       "appId":${appId},
       "appName":"Converted watchface",
       "appType":"watchface",
       "version":{
          "code":1,
          "name":"1.0"
       },
       "vender":"zepp",
       "description":"Watface converted from mi band 6",
       "icon":"images/${parameters.Background?.PreviewEN?.ImageIndex}.png"
    },
    "permissions":[
       "gps"
    ],
    "runtime":{
       "apiVersion":{
          "compatible":"1.0.0",
          "target":"1.0.1",
          "minVersion":"1.0.0"
       }
    },
    "i18n":{
       "en-US":{
          "icon":"images/${parameters.Background?.PreviewEN?.ImageIndex}.png"
       },
       "zh-CN":{
          "icon":"images/${parameters.Background?.PreviewCN?.ImageIndex}.png"
       },
       "zh-TW":{
          "icon":"images/${parameters.Background?.PreviewCN2?.ImageIndex}.png"
       }
    },
    "defaultLanguage":"en-US",
    "debug":false,
    "module":{
       "watchface":{
          "path":"watchface/index",
          "main":1,
          "editable":0,
          "lockscreen":1,
          "hightCost":1
       },
       "page":{
          "pages":[
             "pages/index"
          ],
          "window":{
             "navigationBarBackgroundColor":"#ffffff",
             "navigationBarTextStyle":"black",
             "navigationBarTitleText":"",
             "backgroundColor":"#eeeeee",
             "backgroundTextStyle":"light"
          }
       },
       "app-widget":{
          "widgets":[
             "app-widget/index"
          ]
       },
       "watch-widget":{
          "widgets":[
             
          ]
       },
       "app-side":{
          "path":"app-side/index"
       },
       "setting":{
          "path":"setting/index"
       }
    },
    "platforms":[
       {
          "name":"l66",
          "deviceSource":260
       },
       {
          "name":"l66w",
          "deviceSource":261
       },
       {
          "name":"l66_1",
          "deviceSource":262
       },
       {
          "name":"l66w_2",
          "deviceSource":263
       },
       {
          "name":"l66_3",
          "deviceSource":264
       },
       {
          "name":"l66_4",
          "deviceSource":265
       },
       {
          "name":"l66_5",
          "deviceSource":266
       }
    ],
    "designWidth":192,
    "packageInfo":{
       "mode":"production",
       "timeStamp":1648633829,
       "expiredTime":172800,
       "zpm":"2.1.49"
    }
 }`

   const appjsFile = `try {
    (() => {
    
  var __$$app$$__ = __$$hmAppManager$$__.currentApp;
  'use strict';
  
  __$$app$$__.app = DeviceRuntimeCore.App({
      globalData: {},
      onCreate(options) {
      },
      onShow(options) {
      },
      onHide(options) {
      },
      onDestory(options) {
      },
      onError(error) {
      },
      onPageNotFound(obj) {
      },
      onUnhandledRejection(obj) {
      }
  });
  /*
  * end js
  */
  
    })()
  } catch(e) {
    console.log(e)
  }`




   const zip = new JSZip()

   zip.file("app.js", appjsFile)
   zip.file("app.json", appFile)

   const watchfaceFolder = zip.folder("watchface")
   watchfaceFolder.file("index.js", indexFile)

   const imgFolder = zip.folder("assets").folder("images")
   tgaImages.forEach((img, i) => {
      imgFolder.file(getImageName(i, parameters), img)
   })

   if (addMask) {
      imgFolder.file('mask.png', maskFile, { base64: true })
   }

   return zip.generateAsync({ type: "uint8array" })
}

/**
 * Add transparent pixels left and right of image
 * @param {object} img 
 * @param {number} newWidth
 * @return {object}
 */
function changeWidthKeepRatio(img, newWidth) {
   const result = new Uint8ClampedArray(img.height * newWidth * 4);
   const paddingWidth = Math.round((newWidth - img.width) / 2)
   for (let x = 0; x < img.width * 4; x++) {
      for (let y = 0; y < img.height; y++) {
         result[((x + paddingWidth * 4) + y * newWidth * 4)] = img.pixels[(x + y * img.width * 4)]
      }
   }

   return { pixels: result, width: newWidth, height: img.height }
}

/**
 * Return the name to use for a given image
 * For animation images it will be anim{animation id}_{animation image id}.png
 * For other images it will be {id}.png
 * @param {number} id 
 * @param {object} parameters 
 */
function getImageName(id, parameters) {

   let animations = parameters.Other?.Animation
   if (animations) {
      // Pack to list if not a list
      if (!Array.isArray(animations)) {
         animations = [animations]
      }
      for (let i = 0; i < animations.length; i++) {
         let { ImageIndex, ImagesCount } = animations[i].AnimationImages;
         if (id >= ImageIndex && id < ImageIndex + ImagesCount) {
            return `anim${i}_${id - ImageIndex}.png`
         }
      }
   }

   return `${id}.png`
}