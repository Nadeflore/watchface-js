
let xOffset

export function convertParametersToJavascript(parameters, xOffsetParam = 0) {
    xOffset = xOffsetParam
    const result = []

    let updateCalls = ""

    const backgroundImage = parameters.Background?.Image
    if (backgroundImage) {
        result.push(`hmUI.createWidget(hmUI.widget.IMG, {x: ${backgroundImage.X + xOffset}, y: ${backgroundImage.Y}, src: "images/${backgroundImage.ImageIndex}.png", show_level: hmUI.show_level.ONLY_NORMAL});`)
    }

    const animation = parameters.Other?.Animation
    if (animation) {
        const animationImages = animation.AnimationImages
        result.push(`hmUI.createWidget(hmUI.widget.IMG_ANIM, { x: ${animationImages.X + xOffset}, y: ${animationImages.Y}, anim_path: "images", anim_prefix: 'anim', anim_ext: "png",anim_fps: ${Math.round(1000 / animation.Speed)}, anim_size: ${animationImages.ImagesCount}, repeat_count: ${animation.RepeatCount}, anim_repeat: ${animation.RepeatCount > 0}, anim_status: hmUI.anim_status.START, show_level: hmUI.show_level.ONLY_NORMAL })`)
    }

    const time = parameters.Time
    if (time) {
        result.push(`timeHourTensFontArray = ${createImageArray(time.Hours.Tens)}`)
        result.push(`timeHourOnesFontArray = ${createImageArray(time.Hours.Ones)}`)
        result.push(`timeMinutesTensFontArray = ${createImageArray(time.Minutes.Tens)}`)
        result.push(`timeMinutesOnesFontArray = ${createImageArray(time.Minutes.Ones)}`)
        result.push(`timeHourTens = hmUI.createWidget(hmUI.widget.IMG, { x: ${time.Hours.Tens.X + xOffset}, y: ${time.Hours.Tens.Y}, src: "images/${time.Hours.Tens.ImageIndex}.png", show_level: hmUI.show_level.ONLY_NORMAL })`)
        result.push(`timeHourOnes = hmUI.createWidget(hmUI.widget.IMG, { x: ${time.Hours.Ones.X + xOffset}, y: ${time.Hours.Ones.Y}, src: "images/${time.Hours.Ones.ImageIndex}.png", show_level: hmUI.show_level.ONLY_NORMAL })`)
        result.push(`timeMinutesTens = hmUI.createWidget(hmUI.widget.IMG, { x: ${time.Minutes.Tens.X + xOffset}, y: ${time.Minutes.Tens.Y}, src: "images/${time.Minutes.Tens.ImageIndex}.png", show_level: hmUI.show_level.ONLY_NORMAL })`)
        result.push(`timeMinutesOnes = hmUI.createWidget(hmUI.widget.IMG, { x: ${time.Minutes.Ones.X + xOffset}, y: ${time.Minutes.Ones.Y}, src: "images/${time.Minutes.Ones.ImageIndex}.png", show_level: hmUI.show_level.ONLY_NORMAL })`)
        updateCalls += `updateTime();`
    }

    const steps = parameters.Activity?.Steps
    if (steps) {
        result.push(createNumber(steps, "STEP"))
    }

    const calories = parameters.Activity?.Calories
    if (calories) {
        result.push(createNumber(calories, "CAL"))
    }

    const pulse = parameters.Activity?.Pulse
    if (pulse) {
        result.push(createNumber(pulse, "HEART"))
    }

    const distance = parameters.Activity?.Distance
    if (distance) {
        result.push(createNumber(distance, "DISTANCE"))
    }

    const pai = parameters.Activity?.PAI
    if (pai) {
        result.push(createNumber(pai, "PAI_WEEKLY"))
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
        result.push(createNumber(weatherTemperatureCurrent, "WEATHER_CURRENT"))
    }

    const weatherTemperatureTodayOneLine = parameters.Weather?.Temperature?.Today?.OneLine
    if (weatherTemperatureTodayOneLine) {
        result.push(`weatherWidget = ${createNumber(weatherTemperatureTodayOneLine)}`)
        updateCalls += "updateWeather();"
    }

    const stepsProgressLine = parameters.StepsProgress?.LineScale
    if (stepsProgressLine) {
        result.push(createProgress(stepsProgressLine, "STEP"))
    }

    const heartProgressLine = parameters.HeartProgress?.LineScale
    if (heartProgressLine) {
        result.push(createProgress(heartProgressLine, "HEART"))
    }

    const caloriesProgressLine = parameters.CaloriesProgress?.LineScale
    if (caloriesProgressLine) {
        result.push(createProgress(caloriesProgressLine, "CAL"))
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

    const alarm = parameters.Alarm?.OnImage
    if (alarm) {
        result.push(`hmUI.createWidget(hmUI.widget.IMG_STATUS,{x:${alarm.X + xOffset},y:${alarm.Y},src:'images/${alarm.ImageIndex}.png',type:hmUI.system_status.CLOCK,show_level:hmUI.show_level.ONLY_NORMAL})`)
    }

    const batteryText = parameters.Battery?.BatteryText
    if (batteryText) {
        result.push(createNumber(batteryText, "BATTERY"))
    }

    const batteryIcon = parameters.Battery?.BatteryIcon
    if (batteryIcon) {
        result.push(createProgress(batteryIcon, "BATTERY"))
    }


    if (updateCalls) {
        result.push(updateCalls)
        result.push(`hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, { resume_call: (function () {${updateCalls} }) })`)
        result.push(`timer.createTimer(0, 1000, (function (option) {${updateCalls} }))`)
    }

    return result.join("\n")
}

function createProgress(progress, type) {
    return `hmUI.createWidget(hmUI.widget.IMG_LEVEL,{x:${progress.X + xOffset},y:${progress.Y},image_array:${createImageArray(progress)},image_length:${progress.ImagesCount},type:hmUI.data_type.${type},show_level:hmUI.show_level.ONLY_NORMAL})`
}

function createNumber(param, type) {
    const number = param.Number
    let optionalParams = ""
    if (type) {
        optionalParams += `, type: hmUI.data_type.${type}`
    }
    if (param.SuffixImageIndex) {
        optionalParams += `, unit_en: 'images/${param.SuffixImageIndex}.png'`
    }
    if (param.NoDataImageIndex) {
        optionalParams += `, invalid_image: 'images/${param.NoDataImageIndex}.png'`
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
    if (param.DelimiterImageIndex) {
        optionalParams += `, dot_image: 'images/${param.DelimiterImageIndex}.png'`
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
    const alignment = number.Alignment
    switch (alignment) {
        case "Right":
        case "TopRight":
        case "BottomRight":
        case "CenterRight":
            return { alignment: "hmUI.align.RIGHT", x: 0, w: number.BottomRightX }
        case "HCenter":
        case "TopCenter":
        case "BottomCenter":
        case "Center":
            const center = (number.TopLeftX + number.BottomRightX) / 2
            const halfWidth = Math.min(center, 152 - center)
            return { alignment: "hmUI.align.CENTER_H", x: center - halfWidth, w: 2 * halfWidth }

        case "Left":
        case "TopLeft":
        case "CenterLeft":
        case "BottomLeft":
        case "Top":
        case "Bottom":
        case "VCenter":
        default:
            return { alignment: "hmUI.align.LEFT", x: number.TopLeftX }
    }
}