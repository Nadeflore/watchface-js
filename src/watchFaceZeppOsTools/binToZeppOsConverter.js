import JSZip from 'jszip'
import { parseWatchFaceBin } from '../watchFaceBinTools/watchFaceBinParser'
import mibandFileStructure from '../watchFaceBinTools/models/fileTypes/UIHH_MIBAND.json'
import { convertParametersToJavascript } from './parametersToJs'
import { writeImageAutoDetectBestFormat } from './tgaWriter'

/**
 * Convert a mi band 6 watchface bin file to a band 7 zip file
 * @param {Uint8Array} buffer An arrayBuffer of mi band a watchface bin file
 * @returns {Promise} A promise which resolves to an Uint8Array of a band 7 zip file
 */
export function convertMiBand6to7(buffer) {
   const { parameters, images } = parseWatchFaceBin(buffer, mibandFileStructure)

   const tgaImages = images.map(img => writeImageAutoDetectBestFormat(img.pixels, img.width, img.height))

   const indexFile =
      `try {
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
            ${convertParametersToJavascript(parameters)}
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
       "appId":25960012,
       "appName":"test watchface",
       "appType":"watchface",
       "version":{
          "code":1,
          "name":"1.0"
       },
       "vender":"zepp",
       "description":"Test",
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
      imgFolder.file(`${i}.png`, img)
   })

   return zip.generateAsync({ type: "uint8array" })
}