import JSZip from 'jszip'
import { convertMiBand6to7 } from './binToZeppOsConverter'

const expectedWatchfaceIndexFile = `try {
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
            hmUI.createWidget(hmUI.widget.IMG, {x: 20, y: 0, src: "images/0.png", show_level: hmUI.show_level.ONLY_NORMAL});
            hmUI.createWidget(hmUI.widget.IMG, {x: 20, y: 0, src: "images/mask.png", show_level: hmUI.show_level.ONLY_NORMAL});
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

describe('convertMiBand6to7()', () => {
  it('converts basic file', () => {
    expect.assertions(1)
    return convertMiBand6to7(new Uint8Array(
      [
        0x55, 0x49, 0x48, 0x48, // Signature
        // header
        0x01, 0x00, 0xff, 0xff, 0xff, 0xff, 0xff, 0x01, 0xb5, 0xe5, 0x3d, 0x00, 0x3d, 0x00, 0x30, 0x27,
        0x00, 0x00, 0xab, 0x86, 0x09, 0x00, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0x00, 0xff, 0xff, 0xff,
        0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff,
        0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff,
        0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff,
        0x08, 0x00, 0x00, 0x00, // Size of biggest param
        0x0C, 0x00, 0x00, 0x00, // Size of params info: 13
        0x0a, 0x04, 0x08, 0x08, 0x10, 0x01, // First param info, size of params: 8, imagesCount: 1
        0x12, 0x04, 0x08, 0x00, 0x10, 0x08, // Background param info, offset 0, size 8
        0x0a, 0x06, 0x08, 0x00, 0x10, 0x00, 0x18, 0x00, // Background param x: 0, y: 0, imgid: 0
        0x00, 0x00, 0x00, 0x00, // Offset of 1st image: 0
        // Image
        0x42, 0x4D, 0x10, 0x00, 0x02, 0x00, 0x01, 0x00, 0x08, 0x00, 0x20, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x11, 0x21, 0x31, 0x41, 0x12, 0x22, 0x32, 0x42
      ]).buffer).then(zipData => JSZip.loadAsync(zipData)).then(zip => zip.file("watchface/index.js").async("string")).then(file => expect(file).toEqual(expectedWatchfaceIndexFile))
  })
})