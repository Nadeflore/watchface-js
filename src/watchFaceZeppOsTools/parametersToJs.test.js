
import { convertParametersToJavascript } from './parametersToJs'

describe('convertParametersToJavascript()', () => {
    it('convert background parameter', () => {
        expect(convertParametersToJavascript(
            { Background: { Image: { X: 10, Y: 20, ImageIndex: 43 } } }
        )).toStrictEqual(
            `hmUI.createWidget(hmUI.widget.IMG, {x: 10, y: 20, src: 'images/43.png', show_level: hmUI.show_level.ONLY_NORMAL});`
        )
    })
    it('convert specific parameters', () => {
        expect(convertParametersToJavascript(
            {
                Date: {
                    MonthAndDayAndYear: {
                        Separate: {
                            MonthsEN: {
                                X: 44,
                                Y: 190,
                                ImageIndex: 110,
                                ImagesCount: 12
                            },
                            MonthsCN: {
                                X: 44,
                                Y: 190,
                                ImageIndex: 110,
                                ImagesCount: 12
                            }
                        },
                        OneLine: {
                            Number: {
                                TopLeftX: 6,
                                TopLeftY: 142,
                                BottomRightX: 146,
                                BottomRightY: 161,
                                Alignment: "Center",
                                SpacingX: 0,
                                SpacingY: 0,
                                ImageIndex: 12,
                                ImagesCount: 10
                            },
                            DelimiterImageIndex: 22
                        },
                        TwoDigitsMonth: false,
                        TwoDigitsDay: false
                    }
                },
                Other: {
                    Animation: [
                        {
                            AnimationImages: {
                                X: 73,
                                Y: 112,
                                ImageIndex: 12,
                                ImagesCount: 4
                            },
                            Speed: 250,
                            RepeatCount: 999,
                            UnknownV4: 0
                        },
                        {
                            AnimationImages: {
                                X: 39,
                                Y: 218,
                                ImageIndex: 16,
                                ImagesCount: 8
                            },
                            Speed: 150,
                            RepeatCount: 999,
                            UnknownV4: 0
                        }
                    ]
                }
            }
        )).toStrictEqual(
            `hmUI.createWidget(hmUI.widget.IMG_ANIM, { x: 73, y: 112, anim_path: 'images', anim_prefix: 'anim0', anim_ext: 'png',anim_fps: 4, anim_size: 4, repeat_count: 999, anim_repeat: true, anim_status: hmUI.anim_status.START, show_level: hmUI.show_level.ONLY_NORMAL })
hmUI.createWidget(hmUI.widget.IMG_ANIM, { x: 39, y: 218, anim_path: 'images', anim_prefix: 'anim1', anim_ext: 'png',anim_fps: 7, anim_size: 8, repeat_count: 999, anim_repeat: true, anim_status: hmUI.anim_status.START, show_level: hmUI.show_level.ONLY_NORMAL })
hmUI.createWidget(hmUI.widget.IMG_DATE,{month_startX: 44,month_startY: 190,month_en_array: ['images/110.png', 'images/111.png', 'images/112.png', 'images/113.png', 'images/114.png', 'images/115.png', 'images/116.png', 'images/117.png', 'images/118.png', 'images/119.png', 'images/120.png', 'images/121.png'],month_sc_array: ['images/110.png', 'images/111.png', 'images/112.png', 'images/113.png', 'images/114.png', 'images/115.png', 'images/116.png', 'images/117.png', 'images/118.png', 'images/119.png', 'images/120.png', 'images/121.png'],month_tc_array: ['images/110.png', 'images/111.png', 'images/112.png', 'images/113.png', 'images/114.png', 'images/115.png', 'images/116.png', 'images/117.png', 'images/118.png', 'images/119.png', 'images/120.png', 'images/121.png'],month_is_character: true,show_level: hmUI.show_level.ONLY_NORMAL})
hmUI.createWidget(hmUI.widget.IMG_DATE,{month_startX: 6,month_startY: 142,month_align: hmUI.align.CENTER_H,month_space: 0,month_zero: false,month_unit_en:'images/22.png',month_unit_sc:'images/22.png',month_unit_tc:'images/22.png',month_en_array: ['images/12.png', 'images/13.png', 'images/14.png', 'images/15.png', 'images/16.png', 'images/17.png', 'images/18.png', 'images/19.png', 'images/20.png', 'images/21.png'],month_sc_array: ['images/12.png', 'images/13.png', 'images/14.png', 'images/15.png', 'images/16.png', 'images/17.png', 'images/18.png', 'images/19.png', 'images/20.png', 'images/21.png'],month_tc_array: ['images/12.png', 'images/13.png', 'images/14.png', 'images/15.png', 'images/16.png', 'images/17.png', 'images/18.png', 'images/19.png', 'images/20.png', 'images/21.png'],day_follow: true,day_align: hmUI.align.CENTER_H,day_space: 0,day_zero: false,day_en_array: ['images/12.png', 'images/13.png', 'images/14.png', 'images/15.png', 'images/16.png', 'images/17.png', 'images/18.png', 'images/19.png', 'images/20.png', 'images/21.png'],day_sc_array: ['images/12.png', 'images/13.png', 'images/14.png', 'images/15.png', 'images/16.png', 'images/17.png', 'images/18.png', 'images/19.png', 'images/20.png', 'images/21.png'],day_tc_array: ['images/12.png', 'images/13.png', 'images/14.png', 'images/15.png', 'images/16.png', 'images/17.png', 'images/18.png', 'images/19.png', 'images/20.png', 'images/21.png'],show_level: hmUI.show_level.ONLY_NORMAL})`
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
                    DelimiterImage: {
                        X: 70,
                        Y: 105,
                        ImageIndex: 12
                    },
                    SunsetTimeNumber: {
                        TopLeftX: 32,
                        TopLeftY: 185,
                        BottomRightX: 148,
                        BottomRightY: 301,
                        Alignment: "TopRight",
                        SpacingX: 0,
                        SpacingY: 0,
                        ImageIndex: 120,
                        ImagesCount: 10
                    },
                    SunsetTimeDelimiterImageIndex: 130,
                    SunriseTimeNumber: {
                        TopLeftX: 0,
                        TopLeftY: 155,
                        BottomRightX: 148,
                        BottomRightY: 301,
                        Alignment: "TopRight",
                        SpacingX: 0,
                        SpacingY: 0,
                        ImageIndex: 120,
                        ImagesCount: 10
                    },
                    SunriseTimeDelimiterImageIndex: 130,
                    DrawingOrder: false,
                    SunsetTimeNoDataImage: {
                        X: 113,
                        Y: 281,
                        ImageIndex: 133
                    },
                    SunriseTimeNoDataImage: {
                        X: 0,
                        Y: 150,
                        ImageIndex: 133
                    }
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
                        OneLineWithYear: {
                            Number: {
                                TopLeftX: 6,
                                TopLeftY: 142,
                                BottomRightX: 146,
                                BottomRightY: 161,
                                Alignment: "Center",
                                SpacingX: 0,
                                SpacingY: 0,
                                ImageIndex: 12,
                                ImagesCount: 10
                            },
                            DelimiterImageIndex: 22
                        },
                        TwoDigitsMonth: true,
                        TwoDigitsDay: true
                    },
                    DayAmPm: {
                        X: 52,
                        Y: 142,
                        ImageIndexAMCN: 61,
                        ImageIndexPMCN: 62,
                        ImageIndexAMEN: 63,
                        ImageIndexPMEN: 64
                    },
                    ENWeekDays: {
                        X: 105,
                        Y: 118,
                        ImageIndex: 92,
                        ImagesCount: 7
                    },
                    CNWeekDays: {
                        X: 105,
                        Y: 190,
                        ImageIndex: 34,
                        ImagesCount: 7
                    },
                    CN2WeekDays: {
                        X: 105,
                        Y: 190,
                        ImageIndex: 44,
                        ImagesCount: 7
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
                            },
                            Separate: {
                                Day: {
                                    Number: {
                                        TopLeftX: 13,
                                        TopLeftY: 419,
                                        BottomRightX: 51,
                                        BottomRightY: 432,
                                        Alignment: "Center",
                                        SpacingX: 1,
                                        SpacingY: 0,
                                        ImageIndex: 68,
                                        ImagesCount: 10
                                    },
                                    MinusImageIndex: 78,
                                    SuffixImageIndex: 79
                                },
                                Night: {
                                    Number: {
                                        TopLeftX: 13,
                                        TopLeftY: 436,
                                        BottomRightX: 51,
                                        BottomRightY: 449,
                                        Alignment: "Center",
                                        SpacingX: 1,
                                        SpacingY: 0,
                                        ImageIndex: 68,
                                        ImagesCount: 10
                                    },
                                    MinusImageIndex: 78,
                                    SuffixImageIndex: 79
                                }
                            }
                        }
                    },
                    AirQuality: {
                        Icon: {
                            X: 8,
                            Y: 120,
                            ImageIndex: 127,
                            ImagesCount: 5
                        }
                    },
                    Humidity: {
                        Number: {
                            TopLeftX: 118,
                            TopLeftY: 419,
                            BottomRightX: 144,
                            BottomRightY: 432,
                            Alignment: "TopLeft",
                            SpacingX: 1,
                            SpacingY: 0,
                            ImageIndex: 132,
                            ImagesCount: 10
                        }
                    },
                    Wind: {
                        Number: {
                            TopLeftX: 118,
                            TopLeftY: 436,
                            BottomRightX: 144,
                            BottomRightY: 449,
                            Alignment: "TopLeft",
                            SpacingX: 1,
                            SpacingY: 0,
                            ImageIndex: 132,
                            ImagesCount: 10
                        }
                    },
                    UVIndex: {
                        UV: {
                            Number: {
                                TopLeftX: 108,
                                TopLeftY: 126,
                                BottomRightX: 142,
                                BottomRightY: 137,
                                Alignment: "TopLeft",
                                SpacingX: 0,
                                SpacingY: 0,
                                ImageIndex: 94,
                                ImagesCount: 10
                            },
                            SuffixImageIndex: 77
                        },
                        UVCN: {
                            X: 108,
                            Y: 126,
                            ImageIndex: 72,
                            ImagesCount: 5
                        },
                        UVCN2: {
                            X: 108,
                            Y: 126,
                            ImageIndex: 72,
                            ImagesCount: 5
                        }
                    }
                },
                StepsProgress: {
                    LineScale: {
                        X: 34,
                        Y: 348,
                        ImageIndex: 64,
                        ImagesCount: 8
                    },
                    CircleScale: {
                        CenterX: 76,
                        CenterY: 387,
                        RadiusX: 50,
                        RadiusY: 50,
                        StartAngle: 335,
                        EndAngle: 25,
                        Width: 5,
                        Color: "0x2D92D2"
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
                Other: {
                    Animation: {
                        AnimationImages: {
                            X: 11,
                            Y: 186,
                            ImageIndex: 95,
                            ImagesCount: 10
                        },
                        Speed: 150,
                        RepeatCount: 255,
                        UnknownV4: 1
                    }
                },
                Alarm: {
                    Number: {
                        TopLeftX: 83,
                        TopLeftY: 67,
                        BottomRightX: 0,
                        BottomRightY: 0,
                        Alignment: "TopLeft",
                        SpacingX: 1,
                        SpacingY: 0,
                        ImageIndex: 45,
                        ImagesCount: 10
                    },
                    DelimiterImageIndex: 44,
                    NoDataImage: {
                        X: 83,
                        Y: 70,
                        ImageIndex: 43
                    },
                    OnImage: {
                        X: 124,
                        Y: 3,
                        ImageIndex: 101
                    }
                },
                HeartProgress: {
                    LineScale: {
                        X: 34,
                        Y: 320,
                        ImageIndex: 72,
                        ImagesCount: 8
                    },
                    Linear: {
                        StartImageIndex: 134,
                        Segments: [
                            {
                                X: 8,
                                Y: 414
                            },
                            {
                                X: 8,
                                Y: 408
                            },
                            {
                                X: 8,
                                Y: 402
                            },
                            {
                                X: 8,
                                Y: 396
                            },
                            {
                                X: 8,
                                Y: 390
                            },
                            {
                                X: 8,
                                Y: 384
                            },
                            {
                                X: 8,
                                Y: 378
                            },
                            {
                                X: 8,
                                Y: 372
                            },
                            {
                                X: 8,
                                Y: 366
                            },
                            {
                                X: 8,
                                Y: 360
                            }
                        ]
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
            `hmUI.createWidget(hmUI.widget.IMG, {x: 0, y: 0, src: 'images/0.png', show_level: hmUI.show_level.ONLY_NORMAL});
hmUI.createWidget(hmUI.widget.IMG_ANIM, { x: 11, y: 186, anim_path: 'images', anim_prefix: 'anim0', anim_ext: 'png',anim_fps: 7, anim_size: 10, repeat_count: 255, anim_repeat: true, anim_status: hmUI.anim_status.START, show_level: hmUI.show_level.ONLY_NORMAL })
timeHourTensFontArray = ['images/1.png', 'images/2.png', 'images/3.png', 'images/4.png', 'images/5.png', 'images/6.png', 'images/7.png', 'images/8.png', 'images/9.png', 'images/10.png']
timeHourOnesFontArray = ['images/1.png', 'images/2.png', 'images/3.png', 'images/4.png', 'images/5.png', 'images/6.png', 'images/7.png', 'images/8.png', 'images/9.png', 'images/10.png']
timeMinutesTensFontArray = ['images/1.png', 'images/2.png', 'images/3.png', 'images/4.png', 'images/5.png', 'images/6.png', 'images/7.png', 'images/8.png', 'images/9.png', 'images/10.png']
timeMinutesOnesFontArray = ['images/1.png', 'images/2.png', 'images/3.png', 'images/4.png', 'images/5.png', 'images/6.png', 'images/7.png', 'images/8.png', 'images/9.png', 'images/10.png']
timeHourTens = hmUI.createWidget(hmUI.widget.IMG, { x: 2, y: 88, src: 'images/1.png', show_level: hmUI.show_level.ONLY_NORMAL })
timeHourOnes = hmUI.createWidget(hmUI.widget.IMG, { x: 61, y: 88, src: 'images/1.png', show_level: hmUI.show_level.ONLY_NORMAL })
timeMinutesTens = hmUI.createWidget(hmUI.widget.IMG, { x: 2, y: 180, src: 'images/1.png', show_level: hmUI.show_level.ONLY_NORMAL })
timeMinutesOnes = hmUI.createWidget(hmUI.widget.IMG, { x: 61, y: 180, src: 'images/1.png', show_level: hmUI.show_level.ONLY_NORMAL })
hmUI.createWidget(hmUI.widget.IMG, {x: 70, y: 105, src: 'images/12.png', show_level: hmUI.show_level.ONLY_NORMAL});
hmUI.createWidget(hmUI.widget.TEXT_IMG, { x: 0, y: 155, h_space: 0, font_array: ['images/120.png', 'images/121.png', 'images/122.png', 'images/123.png', 'images/124.png', 'images/125.png', 'images/126.png', 'images/127.png', 'images/128.png', 'images/129.png'], align_h: hmUI.align.RIGHT, type: hmUI.data_type.SUN_RISE, invalid_image: 'images/133.png', dot_image: 'images/130.png', w: 148, show_level: hmUI.show_level.ONLY_NORMAL})
hmUI.createWidget(hmUI.widget.TEXT_IMG, { x: 0, y: 185, h_space: 0, font_array: ['images/120.png', 'images/121.png', 'images/122.png', 'images/123.png', 'images/124.png', 'images/125.png', 'images/126.png', 'images/127.png', 'images/128.png', 'images/129.png'], align_h: hmUI.align.RIGHT, type: hmUI.data_type.SUN_SET, invalid_image: 'images/133.png', dot_image: 'images/130.png', w: 148, show_level: hmUI.show_level.ONLY_NORMAL})
hmUI.createWidget(hmUI.widget.TEXT_IMG, { x: 34, y: 328, h_space: 1, font_array: ['images/11.png', 'images/12.png', 'images/13.png', 'images/14.png', 'images/15.png', 'images/16.png', 'images/17.png', 'images/18.png', 'images/19.png', 'images/20.png'], align_h: hmUI.align.LEFT, type: hmUI.data_type.STEP, show_level: hmUI.show_level.ONLY_NORMAL})
hmUI.createWidget(hmUI.widget.TEXT_IMG, { x: 34, y: 356, h_space: 1, font_array: ['images/11.png', 'images/12.png', 'images/13.png', 'images/14.png', 'images/15.png', 'images/16.png', 'images/17.png', 'images/18.png', 'images/19.png', 'images/20.png'], align_h: hmUI.align.LEFT, type: hmUI.data_type.CAL, unit_en: 'images/59.png', unit_sc: 'images/59.png', unit_tc: 'images/59.png', show_level: hmUI.show_level.ONLY_NORMAL})
hmUI.createWidget(hmUI.widget.TEXT_IMG, { x: 34, y: 300, h_space: 1, font_array: ['images/11.png', 'images/12.png', 'images/13.png', 'images/14.png', 'images/15.png', 'images/16.png', 'images/17.png', 'images/18.png', 'images/19.png', 'images/20.png'], align_h: hmUI.align.LEFT, type: hmUI.data_type.HEART, invalid_image: 'images/21.png', show_level: hmUI.show_level.ONLY_NORMAL})
hmUI.createWidget(hmUI.widget.TEXT_IMG, { x: 34, y: 389, h_space: 1, font_array: ['images/11.png', 'images/12.png', 'images/13.png', 'images/14.png', 'images/15.png', 'images/16.png', 'images/17.png', 'images/18.png', 'images/19.png', 'images/20.png'], align_h: hmUI.align.LEFT, type: hmUI.data_type.DISTANCE, unit_en: 'images/62.png', unit_sc: 'images/62.png', unit_tc: 'images/62.png', dot_image: 'images/60.png', show_level: hmUI.show_level.ONLY_NORMAL})
hmUI.createWidget(hmUI.widget.TEXT_IMG, { x: 107, y: 327, h_space: 0, font_array: ['images/11.png', 'images/12.png', 'images/13.png', 'images/14.png', 'images/15.png', 'images/16.png', 'images/17.png', 'images/18.png', 'images/19.png', 'images/20.png'], align_h: hmUI.align.LEFT, type: hmUI.data_type.PAI_WEEKLY, show_level: hmUI.show_level.ONLY_NORMAL})
hmUI.createWidget(hmUI.widget.IMG_DATE,{month_startX: 128,month_startY: 119,month_align: hmUI.align.CENTER_H,month_space: 0,month_zero: true,month_en_array: ['images/102.png', 'images/103.png', 'images/104.png', 'images/105.png', 'images/106.png', 'images/107.png', 'images/108.png', 'images/109.png', 'images/110.png', 'images/111.png'],month_sc_array: ['images/102.png', 'images/103.png', 'images/104.png', 'images/105.png', 'images/106.png', 'images/107.png', 'images/108.png', 'images/109.png', 'images/110.png', 'images/111.png'],month_tc_array: ['images/102.png', 'images/103.png', 'images/104.png', 'images/105.png', 'images/106.png', 'images/107.png', 'images/108.png', 'images/109.png', 'images/110.png', 'images/111.png'],day_startX: 127,day_startY: 92,day_align: hmUI.align.CENTER_H,day_space: 0,day_zero: true,day_en_array: ['images/102.png', 'images/103.png', 'images/104.png', 'images/105.png', 'images/106.png', 'images/107.png', 'images/108.png', 'images/109.png', 'images/110.png', 'images/111.png'],day_sc_array: ['images/102.png', 'images/103.png', 'images/104.png', 'images/105.png', 'images/106.png', 'images/107.png', 'images/108.png', 'images/109.png', 'images/110.png', 'images/111.png'],day_tc_array: ['images/102.png', 'images/103.png', 'images/104.png', 'images/105.png', 'images/106.png', 'images/107.png', 'images/108.png', 'images/109.png', 'images/110.png', 'images/111.png'],show_level: hmUI.show_level.ONLY_NORMAL})
hmUI.createWidget(hmUI.widget.IMG_DATE,{year_startX: 6,year_startY: 142,year_align: hmUI.align.CENTER_H,year_space: 0,year_unit_en:'images/22.png',year_unit_sc:'images/22.png',year_unit_tc:'images/22.png',year_en_array: ['images/12.png', 'images/13.png', 'images/14.png', 'images/15.png', 'images/16.png', 'images/17.png', 'images/18.png', 'images/19.png', 'images/20.png', 'images/21.png'],year_sc_array: ['images/12.png', 'images/13.png', 'images/14.png', 'images/15.png', 'images/16.png', 'images/17.png', 'images/18.png', 'images/19.png', 'images/20.png', 'images/21.png'],year_tc_array: ['images/12.png', 'images/13.png', 'images/14.png', 'images/15.png', 'images/16.png', 'images/17.png', 'images/18.png', 'images/19.png', 'images/20.png', 'images/21.png'],year_zero: true,month_follow: true,month_align: hmUI.align.CENTER_H,month_space: 0,month_zero: true,month_unit_en:'images/22.png',month_unit_sc:'images/22.png',month_unit_tc:'images/22.png',month_en_array: ['images/12.png', 'images/13.png', 'images/14.png', 'images/15.png', 'images/16.png', 'images/17.png', 'images/18.png', 'images/19.png', 'images/20.png', 'images/21.png'],month_sc_array: ['images/12.png', 'images/13.png', 'images/14.png', 'images/15.png', 'images/16.png', 'images/17.png', 'images/18.png', 'images/19.png', 'images/20.png', 'images/21.png'],month_tc_array: ['images/12.png', 'images/13.png', 'images/14.png', 'images/15.png', 'images/16.png', 'images/17.png', 'images/18.png', 'images/19.png', 'images/20.png', 'images/21.png'],day_follow: true,day_align: hmUI.align.CENTER_H,day_space: 0,day_zero: true,day_en_array: ['images/12.png', 'images/13.png', 'images/14.png', 'images/15.png', 'images/16.png', 'images/17.png', 'images/18.png', 'images/19.png', 'images/20.png', 'images/21.png'],day_sc_array: ['images/12.png', 'images/13.png', 'images/14.png', 'images/15.png', 'images/16.png', 'images/17.png', 'images/18.png', 'images/19.png', 'images/20.png', 'images/21.png'],day_tc_array: ['images/12.png', 'images/13.png', 'images/14.png', 'images/15.png', 'images/16.png', 'images/17.png', 'images/18.png', 'images/19.png', 'images/20.png', 'images/21.png'],show_level: hmUI.show_level.ONLY_NORMAL})
hmUI.createWidget(hmUI.widget.IMG_TIME, {am_x:52,am_y:142,pm_x:52,pm_y:142,am_en_path:'images/63.png',pm_en_path:'images/64.png',am_sc_path:'images/61.png',pm_sc_path:'images/62.png',show_level: hmUI.show_level.ONLY_NORMAL})
hmUI.createWidget(hmUI.widget.IMG_WEEK, {x:105,y:118,week_en:['images/92.png', 'images/93.png', 'images/94.png', 'images/95.png', 'images/96.png', 'images/97.png', 'images/98.png'],week_sc:['images/44.png', 'images/45.png', 'images/46.png', 'images/47.png', 'images/48.png', 'images/49.png', 'images/50.png'],week_tc:['images/34.png', 'images/35.png', 'images/36.png', 'images/37.png', 'images/38.png', 'images/39.png', 'images/40.png'],show_level: hmUI.show_level.ONLY_NORMAL})
hmUI.createWidget(hmUI.widget.IMG_LEVEL,{x:23,y:420,image_array:['images/34.png', 'images/35.png', 'images/36.png', 'images/37.png', 'images/38.png', 'images/39.png', 'images/40.png', 'images/41.png', 'images/42.png', 'images/43.png', 'images/44.png', 'images/45.png', 'images/46.png', 'images/47.png', 'images/48.png', 'images/49.png', 'images/50.png', 'images/51.png', 'images/52.png', 'images/53.png', 'images/54.png', 'images/55.png', 'images/56.png', 'images/57.png', 'images/58.png', 'images/59.png', 'images/38.png', 'images/34.png', 'images/39.png', 'images/37.png'],image_length:29,type:hmUI.data_type.WEATHER,show_level:hmUI.show_level.ONLY_NORMAL})
hmUI.createWidget(hmUI.widget.TEXT_IMG, { x: 35, y: 445, h_space: 1, font_array: ['images/11.png', 'images/12.png', 'images/13.png', 'images/14.png', 'images/15.png', 'images/16.png', 'images/17.png', 'images/18.png', 'images/19.png', 'images/20.png'], align_h: hmUI.align.CENTER_H, type: hmUI.data_type.WEATHER_CURRENT, unit_en: 'images/63.png', unit_sc: 'images/63.png', unit_tc: 'images/63.png', negative_image: 'images/61.png', w: 117, show_level: hmUI.show_level.ONLY_NORMAL})
weatherWidget = hmUI.createWidget(hmUI.widget.TEXT_IMG, { x: 47, y: 424, h_space: 0, font_array: ['images/88.png', 'images/89.png', 'images/90.png', 'images/91.png', 'images/92.png', 'images/93.png', 'images/94.png', 'images/95.png', 'images/96.png', 'images/97.png'], align_h: hmUI.align.CENTER_H, unit_en: 'images/99.png', unit_sc: 'images/99.png', unit_tc: 'images/99.png', negative_image: 'images/98.png', dot_image: 'images/100.png', w: 105, show_level: hmUI.show_level.ONLY_NORMAL})
hmUI.createWidget(hmUI.widget.TEXT_IMG, { x: 0, y: 419, h_space: 1, font_array: ['images/68.png', 'images/69.png', 'images/70.png', 'images/71.png', 'images/72.png', 'images/73.png', 'images/74.png', 'images/75.png', 'images/76.png', 'images/77.png'], align_h: hmUI.align.CENTER_H, type: hmUI.data_type.WEATHER_HIGH, unit_en: 'images/79.png', unit_sc: 'images/79.png', unit_tc: 'images/79.png', negative_image: 'images/78.png', w: 64, show_level: hmUI.show_level.ONLY_NORMAL})
hmUI.createWidget(hmUI.widget.TEXT_IMG, { x: 0, y: 436, h_space: 1, font_array: ['images/68.png', 'images/69.png', 'images/70.png', 'images/71.png', 'images/72.png', 'images/73.png', 'images/74.png', 'images/75.png', 'images/76.png', 'images/77.png'], align_h: hmUI.align.CENTER_H, type: hmUI.data_type.WEATHER_LOW, unit_en: 'images/79.png', unit_sc: 'images/79.png', unit_tc: 'images/79.png', negative_image: 'images/78.png', w: 64, show_level: hmUI.show_level.ONLY_NORMAL})
hmUI.createWidget(hmUI.widget.IMG_LEVEL,{x:8,y:120,image_array:['images/128.png', 'images/129.png', 'images/130.png', 'images/131.png', 'images/132.png', 'images/132.png', 'images/128.png', 'images/133.png', 'images/131.png'],image_length:5,type:hmUI.data_type.AQI,show_level:hmUI.show_level.ONLY_NORMAL})
hmUI.createWidget(hmUI.widget.TEXT_IMG, { x: 118, y: 419, h_space: 1, font_array: ['images/132.png', 'images/133.png', 'images/134.png', 'images/135.png', 'images/136.png', 'images/137.png', 'images/138.png', 'images/139.png', 'images/140.png', 'images/141.png'], align_h: hmUI.align.LEFT, type: hmUI.data_type.HUMIDITY, show_level: hmUI.show_level.ONLY_NORMAL})
hmUI.createWidget(hmUI.widget.TEXT_IMG, { x: 118, y: 436, h_space: 1, font_array: ['images/132.png', 'images/133.png', 'images/134.png', 'images/135.png', 'images/136.png', 'images/137.png', 'images/138.png', 'images/139.png', 'images/140.png', 'images/141.png'], align_h: hmUI.align.LEFT, type: hmUI.data_type.WIND, show_level: hmUI.show_level.ONLY_NORMAL})
hmUI.createWidget(hmUI.widget.TEXT_IMG, { x: 108, y: 126, h_space: 0, font_array: ['images/94.png', 'images/95.png', 'images/96.png', 'images/97.png', 'images/98.png', 'images/99.png', 'images/100.png', 'images/101.png', 'images/102.png', 'images/103.png'], align_h: hmUI.align.LEFT, type: hmUI.data_type.UVI, unit_en: 'images/77.png', unit_sc: 'images/77.png', unit_tc: 'images/77.png', show_level: hmUI.show_level.ONLY_NORMAL})
hmUI.createWidget(hmUI.widget.IMG_LEVEL,{x:34,y:348,image_array:['images/64.png', 'images/65.png', 'images/66.png', 'images/67.png', 'images/68.png', 'images/69.png', 'images/70.png', 'images/71.png'],image_length:8,type:hmUI.data_type.STEP,show_level:hmUI.show_level.ONLY_NORMAL})
hmUI.createWidget(hmUI.widget.ARC_PROGRESS,{center_x:76,center_y:387,radius:50,start_angle:335,end_angle:25,line_width:5,color:0x2D92D2,type:hmUI.data_type.STEP,show_level:hmUI.show_level.ONLY_NORMAL})
hmUI.createWidget(hmUI.widget.IMG_PROGRESS,{x:[8,8,8,8,8,8,8,8,8,8],y:[414,408,402,396,390,384,378,372,366,360],image_array:['images/134.png', 'images/135.png', 'images/136.png', 'images/137.png', 'images/138.png', 'images/139.png', 'images/140.png', 'images/141.png', 'images/142.png', 'images/143.png'],image_length:10,type:hmUI.data_type.HEART,show_level:hmUI.show_level.ONLY_NORMAL})
hmUI.createWidget(hmUI.widget.IMG_LEVEL,{x:34,y:320,image_array:['images/72.png', 'images/73.png', 'images/74.png', 'images/75.png', 'images/76.png', 'images/77.png', 'images/78.png', 'images/79.png'],image_length:8,type:hmUI.data_type.HEART,show_level:hmUI.show_level.ONLY_NORMAL})
hmUI.createWidget(hmUI.widget.IMG_LEVEL,{x:34,y:376,image_array:['images/80.png', 'images/81.png', 'images/82.png', 'images/83.png', 'images/84.png', 'images/85.png', 'images/86.png', 'images/87.png'],image_length:8,type:hmUI.data_type.CAL,show_level:hmUI.show_level.ONLY_NORMAL})
hmUI.createWidget(hmUI.widget.IMG_STATUS,{x:90,y:30,src: 'images/22.png',type:hmUI.system_status.DISTURB,show_level:hmUI.show_level.ONLY_NORMAL})
hmUI.createWidget(hmUI.widget.IMG_STATUS,{x:54,y:30,src: 'images/23.png',type:hmUI.system_status.LOCK,show_level:hmUI.show_level.ONLY_NORMAL})
hmUI.createWidget(hmUI.widget.IMG_STATUS,{x:71,y:30,src: 'images/24.png',type:hmUI.system_status.DISCONNECT,show_level:hmUI.show_level.ONLY_NORMAL})
hmUI.createWidget(hmUI.widget.IMG_STATUS,{x:124,y:3,src:'images/101.png',type:hmUI.system_status.CLOCK,show_level:hmUI.show_level.ONLY_NORMAL})
hmUI.createWidget(hmUI.widget.TEXT_IMG, { x: 83, y: 67, h_space: 1, font_array: ['images/45.png', 'images/46.png', 'images/47.png', 'images/48.png', 'images/49.png', 'images/50.png', 'images/51.png', 'images/52.png', 'images/53.png', 'images/54.png'], align_h: hmUI.align.LEFT, type: hmUI.data_type.ALARM_CLOCK, invalid_image: 'images/43.png', dot_image: 'images/44.png', padding: true, show_level: hmUI.show_level.ONLY_NORMAL})
hmUI.createWidget(hmUI.widget.TEXT_IMG, { x: 77, y: 8, h_space: 0, font_array: ['images/88.png', 'images/89.png', 'images/90.png', 'images/91.png', 'images/92.png', 'images/93.png', 'images/94.png', 'images/95.png', 'images/96.png', 'images/97.png'], align_h: hmUI.align.LEFT, type: hmUI.data_type.BATTERY, show_level: hmUI.show_level.ONLY_NORMAL})
hmUI.createWidget(hmUI.widget.IMG_LEVEL,{x:55,y:10,image_array:['images/25.png', 'images/26.png', 'images/27.png', 'images/28.png', 'images/29.png', 'images/30.png', 'images/31.png', 'images/32.png'],image_length:8,type:hmUI.data_type.BATTERY,show_level:hmUI.show_level.ONLY_NORMAL})
updateTime();updateWeather();
hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, { resume_call: (function () {updateTime();updateWeather(); }) })
timer.createTimer(0, 1000, (function (option) {updateTime();updateWeather(); }))`
        )
    })
})