# watchface-js
A javascript library and tools for huami watchfaces

## Supported watch models

- Xiaomi Mi Band 7 (Only for converting from miband 6)
- Xiaomi Mi Band 6
- Xiaomi Mi Band 5
- Xiaomi Mi Band 4
- Amazfit X (Untested)
- Amazfit T-Rex Pro (Untested)
- Amazfit T-Rex / Verge Lite (Untested)
- Amazfit GTS 2 mini (Untested)
- Amazfit GTS 2 (Untested)
- Amazfit GTS (Untested)
- Amazfit GTR 2 (Untested)
- Amazfit GTR 42mm (Untested)
- Amazfit GTR 47mm (Untested)
- Amazfit Bip (Untested)
- Amazfit Bip S (Untested)
- Amazfit Bip U (Untested)

## Using command line tools

### Installation

```bash
npm i -g watchface-js
```

### Extracting watchface

```bash
wfjs readBin -i mywatchface.bin -m miband5
```

### Packing watchface

```bash
wfjs writeBin -i watchfacefolder -m miband5
```

### Converting mi band 6 watchface to mi band 7

```bash
wfjs convertBand6To7 -i mywatchface.bin
```

### For more details on how to use command line tools

```bash
wfjs -h
```

## Using javascript library

### Installation

```bash
npm i --save watchface-js
```

### Reading watchface

```js
import { getAvailableModels, parseWatchFaceBin } from "watchface-js/watchFaceBinParser";

function readWatchFaceFile(buffer) {
    const models = getAvailableModels()
    
    const { parameters: parsedParameters, images: parsedImages } =
        parseWatchFaceBin(
            buffer,
            models[0].fileType // First model is miband6
        );
    
    console.log(parsedParameters)
}
```
