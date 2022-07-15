
import { convertParametersToJavascript } from './parametersToJs'

describe('convertParametersToJavascript()', () => {
    it('convert background parameter', () => {
        expect(convertParametersToJavascript(
            { "Background": { "Image": { "X": 10, "Y": 20, "ImageIndex": 43 } } }
        )).toStrictEqual(
            `hmUI.createWidget(hmUI.widget.IMG, {x: 10, y: 20, src: "images/43.png", show_level: hmUI.show_level.ONLY_NORMAL});`
        )
    })
    it('convert parameters', () => {
        expect(convertParametersToJavascript(
            {
                Background: {
                    Image: {
                        X: 0,
                        Y: 0,
                        ImageIndex: 0
                    },
                    PreviewEN: {
                        X: 21,
                        Y: 30,
                        ImageIndex: 101
                    },
                    PreviewCN: {
                        X: 21,
                        Y: 30,
                        ImageIndex: 101
                    },
                    PreviewCN2: {
                        X: 21,
                        Y: 30,
                        ImageIndex: 101
                    }
                },
                Time: {
                    Hours: {
                        Tens: {
                            X: 2,
                            Y: 88,
                            ImageIndex: 1,
                            ImagesCount: 10
                        },
                        Ones: {
                            X: 61,
                            Y: 88,
                            ImageIndex: 1,
                            ImagesCount: 10
                        }
                    },
                    Minutes: {
                        Tens: {
                            X: 2,
                            Y: 180,
                            ImageIndex: 1,
                            ImagesCount: 10
                        },
                        Ones: {
                            X: 61,
                            Y: 180,
                            ImageIndex: 1,
                            ImagesCount: 10
                        }
                    },
                    DrawingOrder: false
                },
                Activity: {
                    Steps: {
                        Number: {
                            TopLeftX: 34,
                            TopLeftY: 328,
                            BottomRightX: 94,
                            BottomRightY: 344,
                            Alignment: "BottomLeft",
                            SpacingX: 1,
                            SpacingY: 0,
                            ImageIndex: 11,
                            ImagesCount: 10
                        }
                    },
                    Calories: {
                        Number: {
                            TopLeftX: 34,
                            TopLeftY: 356,
                            BottomRightX: 101,
                            BottomRightY: 370,
                            Alignment: "BottomLeft",
                            SpacingX: 1,
                            SpacingY: 0,
                            ImageIndex: 11,
                            ImagesCount: 10
                        },
                        SuffixImageIndex: 59
                    },
                    Pulse: {
                        Number: {
                            TopLeftX: 34,
                            TopLeftY: 300,
                            BottomRightX: 95,
                            BottomRightY: 315,
                            Alignment: "Left",
                            SpacingX: 1,
                            SpacingY: 0,
                            ImageIndex: 11,
                            ImagesCount: 10
                        },
                        NoDataImageIndex: 21
                    },
                    Distance: {
                        Number: {
                            TopLeftX: 34,
                            TopLeftY: 389,
                            BottomRightX: 100,
                            BottomRightY: 405,
                            Alignment: "BottomLeft",
                            SpacingX: 1,
                            SpacingY: 0,
                            ImageIndex: 11,
                            ImagesCount: 10
                        },
                        KmSuffixImageIndex: 62,
                        DecimalPointImageIndex: 60
                    },
                    PAI: {
                        Number: {
                            TopLeftX: 107,
                            TopLeftY: 327,
                            BottomRightX: 144,
                            BottomRightY: 345,
                            Alignment: "TopLeft",
                            SpacingX: 0,
                            SpacingY: 1,
                            ImageIndex: 11,
                            ImagesCount: 10
                        }
                    },
                    UnknownV7: 0
                },
                Date: {
                    MonthAndDayAndYear: {
                        Separate: {
                            Month: {
                                TopLeftX: 128,
                                TopLeftY: 119,
                                BottomRightX: 148,
                                BottomRightY: 134,
                                Alignment: "Center",
                                SpacingX: 0,
                                SpacingY: 0,
                                ImageIndex: 102,
                                ImagesCount: 10
                            },
                            Day: {
                                TopLeftX: 127,
                                TopLeftY: 92,
                                BottomRightX: 147,
                                BottomRightY: 107,
                                Alignment: "Center",
                                SpacingX: 0,
                                SpacingY: 0,
                                ImageIndex: 102,
                                ImagesCount: 10
                            }
                        },
                        TwoDigitsMonth: true,
                        TwoDigitsDay: true
                    }
                },
                Weather: {
                    Icon: {
                        CustomIcon: {
                            X: 23,
                            Y: 420,
                            ImageIndex: 33,
                            ImagesCount: 26
                        },
                        Position1: {
                            X: 23,
                            Y: 420
                        },
                        Position2: {
                            X: 23,
                            Y: 420
                        }
                    },
                    Temperature: {
                        Current: {
                            Number: {
                                TopLeftX: 72,
                                TopLeftY: 445,
                                BottomRightX: 115,
                                BottomRightY: 462,
                                Alignment: "Center",
                                SpacingX: 1,
                                SpacingY: 0,
                                ImageIndex: 11,
                                ImagesCount: 10
                            },
                            MinusImageIndex: 61,
                            SuffixImageIndex: 63
                        },
                        Today: {
                            OneLine: {
                                Number: {
                                    TopLeftX: 72,
                                    TopLeftY: 424,
                                    BottomRightX: 127,
                                    BottomRightY: 437,
                                    Alignment: "Center",
                                    SpacingX: 0,
                                    SpacingY: 0,
                                    ImageIndex: 88,
                                    ImagesCount: 10
                                },
                                MinusImageIndex: 98,
                                DelimiterImageIndex: 100,
                                AppendSuffixToAll: true,
                                SuffixImageIndex: 99
                            }
                        }
                    }
                },
                StepsProgress: {
                    LineScale: {
                        X: 34,
                        Y: 348,
                        ImageIndex: 64,
                        ImagesCount: 8
                    }
                },
                Status: {
                    DoNotDisturb: {
                        Coordinates: {
                            X: 90,
                            Y: 30
                        },
                        OnImageIndex: 22
                    },
                    Lock: {
                        Coordinates: {
                            X: 54,
                            Y: 30
                        },
                        OffImageIndex: 23
                    },
                    Bluetooth: {
                        Coordinates: {
                            X: 71,
                            Y: 30
                        },
                        OffImageIndex: 24
                    }
                },
                Battery: {
                    BatteryText: {
                        Number: {
                            TopLeftX: 77,
                            TopLeftY: 8,
                            BottomRightX: 77,
                            BottomRightY: 8,
                            Alignment: "Left",
                            SpacingX: 0,
                            SpacingY: 0,
                            ImageIndex: 88,
                            ImagesCount: 10
                        }
                    },
                    BatteryIcon: {
                        X: 55,
                        Y: 10,
                        ImageIndex: 25,
                        ImagesCount: 8
                    }
                },
                HeartProgress: {
                    LineScale: {
                        X: 34,
                        Y: 320,
                        ImageIndex: 72,
                        ImagesCount: 8
                    }
                },
                CaloriesProgress: {
                    LineScale: {
                        X: 34,
                        Y: 376,
                        ImageIndex: 80,
                        ImagesCount: 8
                    }
                }
            }
        )).toStrictEqual(
            `hmUI.createWidget(hmUI.widget.IMG, {x: 0, y: 0, src: \"images/0.png\", show_level: hmUI.show_level.ONLY_NORMAL});
timeHourTensFontArray = ['images/1.png', 'images/2.png', 'images/3.png', 'images/4.png', 'images/5.png', 'images/6.png', 'images/7.png', 'images/8.png', 'images/9.png', 'images/10.png']
timeHourOnesFontArray = ['images/1.png', 'images/2.png', 'images/3.png', 'images/4.png', 'images/5.png', 'images/6.png', 'images/7.png', 'images/8.png', 'images/9.png', 'images/10.png']
timeMinutesTensFontArray = ['images/1.png', 'images/2.png', 'images/3.png', 'images/4.png', 'images/5.png', 'images/6.png', 'images/7.png', 'images/8.png', 'images/9.png', 'images/10.png']
timeMinutesOnesFontArray = ['images/1.png', 'images/2.png', 'images/3.png', 'images/4.png', 'images/5.png', 'images/6.png', 'images/7.png', 'images/8.png', 'images/9.png', 'images/10.png']
timeHourTens = hmUI.createWidget(hmUI.widget.IMG, { x: 2, y: 88, src: \"images/1.png\", show_level: hmUI.show_level.ONLY_NORMAL })
timeHourOnes = hmUI.createWidget(hmUI.widget.IMG, { x: 61, y: 88, src: \"images/1.png\", show_level: hmUI.show_level.ONLY_NORMAL })
timeMinutesTens = hmUI.createWidget(hmUI.widget.IMG, { x: 2, y: 180, src: \"images/1.png\", show_level: hmUI.show_level.ONLY_NORMAL })
timeMinutesOnes = hmUI.createWidget(hmUI.widget.IMG, { x: 61, y: 180, src: \"images/1.png\", show_level: hmUI.show_level.ONLY_NORMAL })
hmUI.createWidget(hmUI.widget.TEXT_IMG, { x: 34, y: 328, h_space: 1, font_array: ['images/11.png', 'images/12.png', 'images/13.png', 'images/14.png', 'images/15.png', 'images/16.png', 'images/17.png', 'images/18.png', 'images/19.png', 'images/20.png'], align_h: hmUI.align.LEFT, type: hmUI.data_type.STEP, show_level: hmUI.show_level.ONLY_NORMAL})
hmUI.createWidget(hmUI.widget.TEXT_IMG, { x: 34, y: 356, h_space: 1, font_array: ['images/11.png', 'images/12.png', 'images/13.png', 'images/14.png', 'images/15.png', 'images/16.png', 'images/17.png', 'images/18.png', 'images/19.png', 'images/20.png'], align_h: hmUI.align.LEFT, type: hmUI.data_type.CAL, unit_en: 'images/59.png', show_level: hmUI.show_level.ONLY_NORMAL})
hmUI.createWidget(hmUI.widget.TEXT_IMG, { x: 34, y: 300, h_space: 1, font_array: ['images/11.png', 'images/12.png', 'images/13.png', 'images/14.png', 'images/15.png', 'images/16.png', 'images/17.png', 'images/18.png', 'images/19.png', 'images/20.png'], align_h: hmUI.align.LEFT, type: hmUI.data_type.HEART, invalid_image: 'images/21.png', show_level: hmUI.show_level.ONLY_NORMAL})
hmUI.createWidget(hmUI.widget.TEXT_IMG, { x: 34, y: 389, h_space: 1, font_array: ['images/11.png', 'images/12.png', 'images/13.png', 'images/14.png', 'images/15.png', 'images/16.png', 'images/17.png', 'images/18.png', 'images/19.png', 'images/20.png'], align_h: hmUI.align.LEFT, type: hmUI.data_type.DISTANCE, unit_en: 'images/62.png', dot_image: 'images/60.png', show_level: hmUI.show_level.ONLY_NORMAL})
hmUI.createWidget(hmUI.widget.TEXT_IMG, { x: 107, y: 327, h_space: 0, font_array: ['images/11.png', 'images/12.png', 'images/13.png', 'images/14.png', 'images/15.png', 'images/16.png', 'images/17.png', 'images/18.png', 'images/19.png', 'images/20.png'], align_h: hmUI.align.LEFT, type: hmUI.data_type.PAI_WEEKLY, show_level: hmUI.show_level.ONLY_NORMAL})
hmUI.createWidget(hmUI.widget.IMG_DATE,{month_startX: 128,month_startY: 119,month_align: hmUI.align.CENTER_H,month_space: 0,month_zero: true,month_en_array: ['images/102.png', 'images/103.png', 'images/104.png', 'images/105.png', 'images/106.png', 'images/107.png', 'images/108.png', 'images/109.png', 'images/110.png', 'images/111.png'],day_startX: 127,day_startY: 92,day_align: hmUI.align.CENTER_H,day_space: 0,day_zero: true,day_en_array: ['images/102.png', 'images/103.png', 'images/104.png', 'images/105.png', 'images/106.png', 'images/107.png', 'images/108.png', 'images/109.png', 'images/110.png', 'images/111.png'],show_level: hmUI.show_level.ONLY_NORMAL})
hmUI.createWidget(hmUI.widget.IMG_LEVEL,{x:23,y:420,image_array:['images/34.png', 'images/35.png', 'images/36.png', 'images/37.png', 'images/38.png', 'images/39.png', 'images/40.png', 'images/41.png', 'images/42.png', 'images/43.png', 'images/44.png', 'images/45.png', 'images/46.png', 'images/47.png', 'images/48.png', 'images/49.png', 'images/50.png', 'images/51.png', 'images/52.png', 'images/53.png', 'images/54.png', 'images/55.png', 'images/56.png', 'images/57.png', 'images/58.png', 'images/59.png', 'images/38.png', 'images/34.png', 'images/39.png', 'images/37.png'],image_length:29,type:hmUI.data_type.WEATHER,show_level:hmUI.show_level.ONLY_NORMAL})
hmUI.createWidget(hmUI.widget.TEXT_IMG, { x: 35, y: 445, h_space: 1, font_array: ['images/11.png', 'images/12.png', 'images/13.png', 'images/14.png', 'images/15.png', 'images/16.png', 'images/17.png', 'images/18.png', 'images/19.png', 'images/20.png'], align_h: hmUI.align.CENTER_H, type: hmUI.data_type.WEATHER_CURRENT, unit_en: 'images/63.png', negative_image: 'images/61.png', w: 152, show_level: hmUI.show_level.ONLY_NORMAL})
weatherWidget = hmUI.createWidget(hmUI.widget.TEXT_IMG, { x: 47, y: 424, h_space: 0, font_array: ['images/88.png', 'images/89.png', 'images/90.png', 'images/91.png', 'images/92.png', 'images/93.png', 'images/94.png', 'images/95.png', 'images/96.png', 'images/97.png'], align_h: hmUI.align.CENTER_H, unit_en: 'images/99.png', negative_image: 'images/98.png', dot_image: 'images/100.png', w: 152, show_level: hmUI.show_level.ONLY_NORMAL})
hmUI.createWidget(hmUI.widget.IMG_LEVEL,{x:34,y:348,image_array:['images/64.png', 'images/65.png', 'images/66.png', 'images/67.png', 'images/68.png', 'images/69.png', 'images/70.png', 'images/71.png'],image_length:8,type:hmUI.data_type.STEP,show_level:hmUI.show_level.ONLY_NORMAL})
hmUI.createWidget(hmUI.widget.IMG_LEVEL,{x:34,y:320,image_array:['images/72.png', 'images/73.png', 'images/74.png', 'images/75.png', 'images/76.png', 'images/77.png', 'images/78.png', 'images/79.png'],image_length:8,type:hmUI.data_type.HEART,show_level:hmUI.show_level.ONLY_NORMAL})
hmUI.createWidget(hmUI.widget.IMG_LEVEL,{x:34,y:376,image_array:['images/80.png', 'images/81.png', 'images/82.png', 'images/83.png', 'images/84.png', 'images/85.png', 'images/86.png', 'images/87.png'],image_length:8,type:hmUI.data_type.CAL,show_level:hmUI.show_level.ONLY_NORMAL})
hmUI.createWidget(hmUI.widget.IMG_STATUS,{x:90,y:30,src: 'images/22.png',type:hmUI.system_status.DISTURB,show_level:hmUI.show_level.ONLY_NORMAL})
hmUI.createWidget(hmUI.widget.IMG_STATUS,{x:54,y:30,src: 'images/23.png',type:hmUI.system_status.LOCK,show_level:hmUI.show_level.ONLY_NORMAL})
hmUI.createWidget(hmUI.widget.IMG_STATUS,{x:71,y:30,src: 'images/24.png',type:hmUI.system_status.DISCONNECT,show_level:hmUI.show_level.ONLY_NORMAL})
hmUI.createWidget(hmUI.widget.TEXT_IMG, { x: 77, y: 8, h_space: 0, font_array: ['images/88.png', 'images/89.png', 'images/90.png', 'images/91.png', 'images/92.png', 'images/93.png', 'images/94.png', 'images/95.png', 'images/96.png', 'images/97.png'], align_h: hmUI.align.LEFT, type: hmUI.data_type.BATTERY, show_level: hmUI.show_level.ONLY_NORMAL})
hmUI.createWidget(hmUI.widget.IMG_LEVEL,{x:55,y:10,image_array:['images/25.png', 'images/26.png', 'images/27.png', 'images/28.png', 'images/29.png', 'images/30.png', 'images/31.png', 'images/32.png'],image_length:8,type:hmUI.data_type.BATTERY,show_level:hmUI.show_level.ONLY_NORMAL})
updateTime();updateWeather();
hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, { resume_call: (function () {updateTime();updateWeather(); }) })
timer.createTimer(0, 1000, (function (option) {updateTime();updateWeather(); }))`
        )
    })
})