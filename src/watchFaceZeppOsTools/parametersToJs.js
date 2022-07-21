
let xOffset

export function convertParametersToJavascript(parameters, xOffsetParam = 0) {
    xOffset = xOffsetParam
    const result = []

    let updateCalls = ''

    const backgroundImage = parameters.Background?.Image
    if (backgroundImage) {
        result.push(`hmUI.createWidget(hmUI.widget.IMG, {x: ${backgroundImage.X + xOffset}, y: ${backgroundImage.Y}, src: 'images/${backgroundImage.ImageIndex}.png', show_level: hmUI.show_level.ONLY_NORMAL});`)
    }

    let animations = parameters.Other?.Animation
    if (animations) {
        // Pack to list if not a list
        if (!Array.isArray(animations)) {
            animations = [animations]
        }

        animations.forEach((animation, i) => {
            const animationImages = animation.AnimationImages
            result.push(`hmUI.createWidget(hmUI.widget.IMG_ANIM, { x: ${animationImages.X + xOffset}, y: ${animationImages.Y}, anim_path: 'images', anim_prefix: 'anim${i}', anim_ext: 'png',anim_fps: ${Math.round(1000 / animation.Speed)}, anim_size: ${animationImages.ImagesCount}, repeat_count: ${animation.RepeatCount}, anim_repeat: ${animation.RepeatCount > 0}, anim_status: hmUI.anim_status.START, show_level: hmUI.show_level.ONLY_NORMAL })`)
        })
    }

    const time = parameters.Time
    if (time) {
        result.push(`timeHourTensFontArray = ${createImageArray(time.Hours.Tens)}`)
        result.push(`timeHourOnesFontArray = ${createImageArray(time.Hours.Ones)}`)
        result.push(`timeMinutesTensFontArray = ${createImageArray(time.Minutes.Tens)}`)
        result.push(`timeMinutesOnesFontArray = ${createImageArray(time.Minutes.Ones)}`)
        result.push(`timeHourTens = hmUI.createWidget(hmUI.widget.IMG, { x: ${time.Hours.Tens.X + xOffset}, y: ${time.Hours.Tens.Y}, src: 'images/${time.Hours.Tens.ImageIndex}.png', show_level: hmUI.show_level.ONLY_NORMAL })`)
        result.push(`timeHourOnes = hmUI.createWidget(hmUI.widget.IMG, { x: ${time.Hours.Ones.X + xOffset}, y: ${time.Hours.Ones.Y}, src: 'images/${time.Hours.Ones.ImageIndex}.png', show_level: hmUI.show_level.ONLY_NORMAL })`)
        result.push(`timeMinutesTens = hmUI.createWidget(hmUI.widget.IMG, { x: ${time.Minutes.Tens.X + xOffset}, y: ${time.Minutes.Tens.Y}, src: 'images/${time.Minutes.Tens.ImageIndex}.png', show_level: hmUI.show_level.ONLY_NORMAL })`)
        result.push(`timeMinutesOnes = hmUI.createWidget(hmUI.widget.IMG, { x: ${time.Minutes.Ones.X + xOffset}, y: ${time.Minutes.Ones.Y}, src: 'images/${time.Minutes.Ones.ImageIndex}.png', show_level: hmUI.show_level.ONLY_NORMAL })`)
        updateCalls += `updateTime();`

        const delimiterImage = time.DelimiterImage || time.TimeDelimiterImage
        if (delimiterImage) {
            result.push(`hmUI.createWidget(hmUI.widget.IMG, {x: ${delimiterImage.X + xOffset}, y: ${delimiterImage.Y}, src: 'images/${delimiterImage.ImageIndex}.png', show_level: hmUI.show_level.ONLY_NORMAL});`)
        }
    }

    const sunriseTime = parameters.Time?.SunriseTimeNumber
    if (sunriseTime) {
        result.push(createNumber(time, 'SUN_RISE', "SunriseTime"))
    }

    const sunsetTime = parameters.Time?.SunsetTimeNumber
    if (sunsetTime) {
        result.push(createNumber(time, 'SUN_SET', "SunsetTime"))
    }

    const steps = parameters.Activity?.Steps
    if (steps) {
        result.push(createNumber(steps, 'STEP'))
    }

    const calories = parameters.Activity?.Calories
    if (calories) {
        result.push(createNumber(calories, 'CAL'))
    }

    const pulse = parameters.Activity?.Pulse
    if (pulse) {
        result.push(createNumber(pulse, 'HEART'))
    }

    const distance = parameters.Activity?.Distance
    if (distance) {
        result.push(createNumber(distance, 'DISTANCE'))
    }

    const pai = parameters.Activity?.PAI
    if (pai) {
        result.push(createNumber(pai, 'PAI_WEEKLY'))
    }

    const dateSeparate = parameters.Date?.MonthAndDayAndYear?.Separate
    if (dateSeparate) {
        let dateParams = []
        const month = dateSeparate.Month
        if (month) {
            dateParams.push(`month_startX: ${month.TopLeftX + xOffset}`)
            dateParams.push(`month_startY: ${month.TopLeftY}`)
            dateParams.push(`month_align: ${getAlignHAndPosition(month).alignment}`)
            dateParams.push(`month_space: ${month.SpacingX}`)
            dateParams.push(`month_zero: ${parameters.Date.MonthAndDayAndYear.TwoDigitsMonth}`)
            dateParams.push(`month_en_array: ${createImageArray(month)}`)
        } else {
            const monthsEn = dateSeparate.MonthsEN
            if (monthsEn) {
                dateParams.push(`month_startX: ${monthsEn.X + xOffset}`)
                dateParams.push(`month_startY: ${monthsEn.Y}`)
                dateParams.push(`month_en_array: ${createImageArray(monthsEn)}`)
                dateParams.push(`month_is_character: true`)
            }
        }

        const day = dateSeparate.Day
        if (day) {
            dateParams.push(`day_startX: ${day.TopLeftX + xOffset}`)
            dateParams.push(`day_startY: ${day.TopLeftY}`)
            dateParams.push(`day_align: ${getAlignHAndPosition(day).alignment}`)
            dateParams.push(`day_space: ${day.SpacingX}`)
            dateParams.push(`day_zero: ${parameters.Date.MonthAndDayAndYear.TwoDigitsDay}`)
            dateParams.push(`day_en_array: ${createImageArray(day)}`)
        }

        result.push(`hmUI.createWidget(hmUI.widget.IMG_DATE,{${dateParams.join(',')},show_level: hmUI.show_level.ONLY_NORMAL})`)
    }

    const dateOneLineWithYear = parameters.Date?.MonthAndDayAndYear?.OneLineWithYear
    const dateOneLine = dateOneLineWithYear || parameters.Date?.MonthAndDayAndYear?.OneLine

    if (dateOneLine) {
        let dateParams = []
        const number = dateOneLine.Number

        if (dateOneLineWithYear) {
            dateParams.push(`year_startX: ${number.TopLeftX + xOffset}`)
            dateParams.push(`year_startY: ${number.TopLeftY}`)
            dateParams.push(`year_align: ${getAlignHAndPosition(number).alignment}`)
            dateParams.push(`year_space: ${number.SpacingX}`)
            dateParams.push(`year_unit_en:'images/${dateOneLine.DelimiterImageIndex}.png'`)
            dateParams.push(`year_en_array: ${createImageArray(number)}`)
            dateParams.push(`year_zero: true`)
            dateParams.push(`month_follow: true`)
        } else {
            dateParams.push(`month_startX: ${number.TopLeftX + xOffset}`)
            dateParams.push(`month_startY: ${number.TopLeftY}`)
        }

        dateParams.push(`month_align: ${getAlignHAndPosition(number).alignment}`)
        dateParams.push(`month_space: ${number.SpacingX}`)
        dateParams.push(`month_zero: ${parameters.Date.MonthAndDayAndYear.TwoDigitsMonth}`)
        dateParams.push(`month_unit_en:'images/${dateOneLine.DelimiterImageIndex}.png'`)
        dateParams.push(`month_en_array: ${createImageArray(number)}`)

        dateParams.push(`day_follow: true`)
        dateParams.push(`day_align: ${getAlignHAndPosition(number).alignment}`)
        dateParams.push(`day_space: ${number.SpacingX}`)
        dateParams.push(`day_zero: ${parameters.Date.MonthAndDayAndYear.TwoDigitsDay}`)
        dateParams.push(`day_en_array: ${createImageArray(number)}`)

        result.push(`hmUI.createWidget(hmUI.widget.IMG_DATE,{${dateParams.join(',')},show_level: hmUI.show_level.ONLY_NORMAL})`)
    }

    const dayAmPm = parameters.Date?.DayAmPm
    if (dayAmPm) {
        result.push(`hmUI.createWidget(hmUI.widget.IMG_TIME, {am_x:${dayAmPm.X + xOffset},am_y:${dayAmPm.Y},pm_x:${dayAmPm.X + xOffset},pm_y:${dayAmPm.Y},am_en_path:'images/${dayAmPm.ImageIndexAMEN}.png',pm_en_path:'images/${dayAmPm.ImageIndexPMEN}.png',show_level: hmUI.show_level.ONLY_NORMAL})`)
    }

    const enWeekDays = parameters.Date?.ENWeekDays
    if (enWeekDays) {
        result.push(`hmUI.createWidget(hmUI.widget.IMG_WEEK, {x:${enWeekDays.X + xOffset},y:${enWeekDays.Y},week_en:${createImageArray(enWeekDays)},show_level: hmUI.show_level.ONLY_NORMAL})`)
    }

    const weatherIcon = parameters.Weather?.Icon?.CustomIcon
    if (weatherIcon) {
        result.push(`hmUI.createWidget(hmUI.widget.IMG_LEVEL,{x:${weatherIcon.X + xOffset},y:${weatherIcon.Y},image_array:${createWeatherArray(weatherIcon)},image_length:29,type:hmUI.data_type.WEATHER,show_level:hmUI.show_level.ONLY_NORMAL})`)
    }

    const weatherTemperatureCurrent = parameters.Weather?.Temperature?.Current
    if (weatherTemperatureCurrent) {
        result.push(createNumber(weatherTemperatureCurrent, 'WEATHER_CURRENT'))
    }

    const weatherTemperatureTodayOneLine = parameters.Weather?.Temperature?.Today?.OneLine
    if (weatherTemperatureTodayOneLine) {
        result.push(`weatherWidget = ${createNumber(weatherTemperatureTodayOneLine)}`)
        updateCalls += 'updateWeather();'
    }

    const weatherTemperatureTodaySeparate = parameters.Weather?.Temperature?.Today?.Separate
    if (weatherTemperatureTodaySeparate) {
        const day = weatherTemperatureTodaySeparate.Day
        if (day) {
            result.push(createNumber(day, 'WEATHER_HIGH'))
        }
        const night = weatherTemperatureTodaySeparate.Night
        if (night) {
            result.push(createNumber(night, 'WEATHER_LOW'))
        }
    }

    const humidity = parameters.Weather?.Humidity
    if (humidity) {
        result.push(createNumber(humidity, 'HUMIDITY'))
    }

    const wind = parameters.Weather?.Wind
    if (wind) {
        result.push(createNumber(wind, 'WIND'))
    }

    const uv = parameters.Weather?.UVIndex?.UV
    if (uv) {
        result.push(createNumber(uv, 'UVI'))
    }

    const stepsProgressLine = parameters.StepsProgress?.LineScale
    if (stepsProgressLine) {
        result.push(createProgressLine(stepsProgressLine, 'STEP'))
    }

    const stepsProgressCircle = parameters.StepsProgress?.CircleScale
    if (stepsProgressCircle) {
        result.push(createProgressCircle(stepsProgressCircle, 'STEP'))
    }

    const heartProgressLinear = parameters.HeartProgress?.Linear
    if (heartProgressLinear) {
        result.push(createProgressLinear(heartProgressLinear, 'HEART'))
    }

    const heartProgressLine = parameters.HeartProgress?.LineScale
    if (heartProgressLine) {
        result.push(createProgressLine(heartProgressLine, 'HEART'))
    }

    const caloriesProgressLine = parameters.CaloriesProgress?.LineScale
    if (caloriesProgressLine) {
        result.push(createProgressLine(caloriesProgressLine, 'CAL'))
    }

    const caloriesProgressLinear = parameters.CaloriesProgress?.Linear
    if (caloriesProgressLinear) {
        result.push(createProgressLinear(caloriesProgressLinear, 'CAL'))
    }

    const doNotDisturb = parameters.Status?.DoNotDisturb
    if (doNotDisturb) {
        const coordinates = doNotDisturb.Coordinates
        result.push(`hmUI.createWidget(hmUI.widget.IMG_STATUS,{x:${coordinates.X + xOffset},y:${coordinates.Y},src: 'images/${doNotDisturb.OnImageIndex}.png',type:hmUI.system_status.DISTURB,show_level:hmUI.show_level.ONLY_NORMAL})`)
    }

    const lock = parameters.Status?.Lock
    if (lock) {
        const coordinates = lock.Coordinates
        result.push(`hmUI.createWidget(hmUI.widget.IMG_STATUS,{x:${coordinates.X + xOffset},y:${coordinates.Y},src: 'images/${lock.OffImageIndex}.png',type:hmUI.system_status.LOCK,show_level:hmUI.show_level.ONLY_NORMAL})`)
    }

    const bluetooth = parameters.Status?.Bluetooth
    if (bluetooth) {
        const coordinates = bluetooth.Coordinates
        result.push(`hmUI.createWidget(hmUI.widget.IMG_STATUS,{x:${coordinates.X + xOffset},y:${coordinates.Y},src: 'images/${bluetooth.OffImageIndex}.png',type:hmUI.system_status.DISCONNECT,show_level:hmUI.show_level.ONLY_NORMAL})`)
    }

    const alarm = parameters.Alarm
    if (alarm) {
        const alarmIcon = alarm.OnImage
        if (alarmIcon) {
            result.push(`hmUI.createWidget(hmUI.widget.IMG_STATUS,{x:${alarmIcon.X + xOffset},y:${alarmIcon.Y},src:'images/${alarmIcon.ImageIndex}.png',type:hmUI.system_status.CLOCK,show_level:hmUI.show_level.ONLY_NORMAL})`)
        }

        const alarmNumber = alarm.Number
        if (alarmNumber) {
            result.push(createNumber(alarm, 'ALARM_CLOCK'))
        }
    }

    const batteryText = parameters.Battery?.BatteryText
    if (batteryText) {
        result.push(createNumber(batteryText, 'BATTERY'))
    }

    const batteryIcon = parameters.Battery?.BatteryIcon
    if (batteryIcon) {
        result.push(createProgressLine(batteryIcon, 'BATTERY'))
    }

    const batteryLinear = parameters.Battery?.Linear
    if (batteryLinear) {
        result.push(createProgressLinear(batteryLinear, 'BATTERY'))
    }

    if (updateCalls) {
        result.push(updateCalls)
        result.push(`hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, { resume_call: (function () {${updateCalls} }) })`)
        result.push(`timer.createTimer(0, 1000, (function (option) {${updateCalls} }))`)
    }

    return result.join('\n')
}

function createProgressLine(progress, type) {
    return `hmUI.createWidget(hmUI.widget.IMG_LEVEL,{x:${progress.X + xOffset},y:${progress.Y},image_array:${createImageArray(progress)},image_length:${progress.ImagesCount},type:hmUI.data_type.${type},show_level:hmUI.show_level.ONLY_NORMAL})`
}

function createProgressLinear(progress, type) {
    const { StartImageIndex, Segments } = progress
    return `hmUI.createWidget(hmUI.widget.IMG_PROGRESS,{x:[${Segments.map(c => c.X + xOffset).join(',')}],y:[${Segments.map(c => c.Y).join(',')}],image_array:${createImageArray({ ImageIndex: StartImageIndex, ImagesCount: Segments.length })},image_length:${Segments.length},type:hmUI.data_type.${type},show_level:hmUI.show_level.ONLY_NORMAL})`
}

function createProgressCircle(progress, type) {
    return `hmUI.createWidget(hmUI.widget.ARC_PROGRESS,{center_x:${progress.CenterX + xOffset},center_y:${progress.CenterY},radius:${progress.RadiusX},start_angle:${progress.StartAngle},end_angle:${progress.EndAngle},line_width:${progress.Width},color:${progress.Color},type:hmUI.data_type.${type},show_level:hmUI.show_level.ONLY_NORMAL})`
}

function createNumber(param, type = null, prefix = "") {
    const number = param[`${prefix}Number`]
    let optionalParams = ''
    if (type) {
        optionalParams += `, type: hmUI.data_type.${type}`
    }
    if (param.SuffixImageIndex) {
        optionalParams += `, unit_en: 'images/${param.SuffixImageIndex}.png'`
    }
    if (param.SuffixImageIndexEN) {
        optionalParams += `, unit_en: 'images/${param.SuffixImageIndexEN}.png'`
    }
    if (param.NoDataImageIndex) {
        optionalParams += `, invalid_image: 'images/${param.NoDataImageIndex}.png'`
    }
    const noDataImage = param[`${prefix}NoDataImage`]
    if (noDataImage) {
        optionalParams += `, invalid_image: 'images/${noDataImage.ImageIndex}.png'`
    }
    if (param.KmSuffixImageIndex) {
        optionalParams += `, unit_en: 'images/${param.KmSuffixImageIndex}.png'`
    }
    if (param.MilesSuffixImageIndex) {
        optionalParams += `, imperial_unit_en: 'images/${param.MilesSuffixImageIndex}.png'`
    }
    if (param.DecimalPointImageIndex) {
        optionalParams += `, dot_image: 'images/${param.DecimalPointImageIndex}.png'`
    }
    if (param.MinusImageIndex) {
        optionalParams += `, negative_image: 'images/${param.MinusImageIndex}.png'`
    }

    const delimiterImageIndex = param[`${prefix}DelimiterImageIndex`]
    if (delimiterImageIndex) {
        optionalParams += `, dot_image: 'images/${delimiterImageIndex}.png'`
    }

    if (type == "ALARM_CLOCK") {
        optionalParams += `, padding: true`
    }

    // Compute position
    const { alignment, x, w } = getAlignHAndPosition(number)

    if (w != undefined) {
        optionalParams += `, w: ${w}`
    }

    return `hmUI.createWidget(hmUI.widget.TEXT_IMG, { x: ${x + xOffset}, y: ${number.TopLeftY}, h_space: ${number.SpacingX}, font_array: ${createImageArray(number)}, align_h: ${alignment}${optionalParams}, show_level: hmUI.show_level.ONLY_NORMAL})`
}

function createImageArray(arrayInfo) {
    let result = []
    for (let i = 0; i < arrayInfo.ImagesCount; i++) {
        result.push(`'images/${arrayInfo.ImageIndex + i}.png'`)
    }

    return `[${result.join(', ')}]`
}

function createWeatherArray(weather) {
    let result = []
    for (let i = 1; i <= weather.ImagesCount; i++) {
        result.push(`'images/${weather.ImageIndex + i}.png'`)
    }
    result.push(`'images/${weather.ImageIndex + 5}.png'`)
    result.push(`'images/${weather.ImageIndex + 1}.png'`)
    result.push(`'images/${weather.ImageIndex + 6}.png'`)
    result.push(`'images/${weather.ImageIndex + 4}.png'`)

    return `[${result.join(', ')}]`
}

function getAlignHAndPosition(number) {
    let alignment = number.Alignment

    // Fix alignment
    if (number.BottomRightX - number.TopLeftX < 20) {
        alignment = 'Left'
    }

    switch (alignment) {
        case 'Right':
        case 'TopRight':
        case 'BottomRight':
        case 'CenterRight':
            return { alignment: 'hmUI.align.RIGHT', x: 0, w: number.BottomRightX }
        case 'HCenter':
        case 'TopCenter':
        case 'BottomCenter':
        case 'Center':
            const center = (number.TopLeftX + number.BottomRightX) / 2
            const halfWidth = Math.min(center, 152 - center)
            return { alignment: 'hmUI.align.CENTER_H', x: center - halfWidth, w: 2 * halfWidth }

        case 'Left':
        case 'TopLeft':
        case 'CenterLeft':
        case 'BottomLeft':
        case 'Top':
        case 'Bottom':
        case 'VCenter':
        default:
            return { alignment: 'hmUI.align.LEFT', x: number.TopLeftX }
    }
}