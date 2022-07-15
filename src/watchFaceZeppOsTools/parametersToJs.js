
export function convertParametersToJavascript(parameters) {
    const result = []

    let updateCalls = ""

    const backgroundImage = parameters.Background?.Image
    if (backgroundImage) {
        result.push(`hmUI.createWidget(hmUI.widget.IMG, {x: ${backgroundImage.X}, y: ${backgroundImage.Y}, src: "images/${backgroundImage.ImageIndex}.png", show_level: hmUI.show_level.ONLY_NORMAL});`)
    }

    const time = parameters.Time
    if (time) {
        result.push(`timeHourTensFontArray = ${createFontArray(time.Hours.Tens)}`)
        result.push(`timeHourOnesFontArray = ${createFontArray(time.Hours.Ones)}`)
        result.push(`timeMinutesTensFontArray = ${createFontArray(time.Minutes.Tens)}`)
        result.push(`timeMinutesOnesFontArray = ${createFontArray(time.Minutes.Ones)}`)
        result.push(`timeHourTens = hmUI.createWidget(hmUI.widget.IMG, { x: ${time.Hours.Tens.X}, y: ${time.Hours.Tens.Y}, src: "images/${time.Hours.Tens.ImageIndex}.png", show_level: hmUI.show_level.ONLY_NORMAL })`)
        result.push(`timeHourOnes = hmUI.createWidget(hmUI.widget.IMG, { x: ${time.Hours.Ones.X}, y: ${time.Hours.Ones.Y}, src: "images/${time.Hours.Ones.ImageIndex}.png", show_level: hmUI.show_level.ONLY_NORMAL })`)
        result.push(`timeMinutesTens = hmUI.createWidget(hmUI.widget.IMG, { x: ${time.Minutes.Tens.X}, y: ${time.Minutes.Tens.Y}, src: "images/${time.Minutes.Tens.ImageIndex}.png", show_level: hmUI.show_level.ONLY_NORMAL })`)
        result.push(`timeMinutesOnes = hmUI.createWidget(hmUI.widget.IMG, { x: ${time.Minutes.Ones.X}, y: ${time.Minutes.Ones.Y}, src: "images/${time.Minutes.Ones.ImageIndex}.png", show_level: hmUI.show_level.ONLY_NORMAL })`)
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
            dateParams.push(`month_startX: ${month.TopLeftX}`)
            dateParams.push(`month_startY: ${month.TopLeftY}`)
            dateParams.push(`month_align: ${getAlignHAndPosition(month.Alignment).alignment}`)
            dateParams.push(`month_space: ${month.SpacingX}`)
            dateParams.push(`month_zero: ${parameters.Date.MonthAndDayAndYear.TwoDigitsMonth}`)
            dateParams.push(`month_en_array: ${createFontArray(month)}`)
        }

        const day = dateSeparate.Day
        if (day) {
            dateParams.push(`day_startX: ${day.TopLeftX}`)
            dateParams.push(`day_startY: ${day.TopLeftY}`)
            dateParams.push(`day_align: ${getAlignHAndPosition(day.Alignment).alignment}`)
            dateParams.push(`day_space: ${day.SpacingX}`)
            dateParams.push(`day_zero: ${parameters.Date.MonthAndDayAndYear.TwoDigitsDay}`)
            dateParams.push(`day_en_array: ${createFontArray(day)}`)
        }

        result.push(`hmUI.createWidget(hmUI.widget.IMG_DATE,{${dateParams.join(',')},show_level: hmUI.show_level.ONLY_NORMAL})`)
    }

    const weatherIcon = parameters.Weather?.Icon?.CustomIcon
    if (weatherIcon) {
        result.push(`hmUI.createWidget(hmUI.widget.IMG_LEVEL,{x:${weatherIcon.X},y:${weatherIcon.Y},image_array:${createWeatherArray(weatherIcon)},image_length:29,type:hmUI.data_type.WEATHER,show_level:hmUI.show_level.ONLY_NORMAL})`)
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

    if (updateCalls) {
        result.push(updateCalls)
        result.push(`hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, { resume_call: (function () {${updateCalls} }) })`)
        result.push(`timer.createTimer(0, 1000, (function (option) {${updateCalls} }))`)
    }

    return result.join("\n")
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

    return `hmUI.createWidget(hmUI.widget.TEXT_IMG, { x: ${x}, y: ${number.TopLeftY}, h_space: ${number.SpacingX}, font_array: ${createFontArray(number)}, align_h: ${alignment}${optionalParams}, show_level: hmUI.show_level.ONLY_NORMAL
})`
}

function createFontArray(font) {
    let result = []
    for (let i = 0; i < font.ImagesCount; i++) {
        result.push(`'images/${font.ImageIndex + i}.png'`)
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
        case "Left":
        case "TopLeft":
        case "CenterLeft":
        case "BottomLeft":
            return { alignment: "hmUI.align.LEFT", x: number.TopLeftX }
        case "Right":
        case "TopRight":
        case "BottomRight":
        case "CenterRight":
            return { alignment: "hmUI.align.RIGHT", x: 0, w: number.BottomRightX }
        case "HCenter":
        case "Top":
        case "Bottom":
        case "VCenter":
        case "TopCenter":
        case "BottomCenter":
        case "Center":
        default:
            // const center = (number.TopLeftX + number.BottomRightX) / 2
            // const halfWidth = Math.min(center, 152 - center)
            return { alignment: "hmUI.align.CENTER_H", x: number.TopLeftX }
    }
}