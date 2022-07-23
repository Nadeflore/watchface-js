import { getAvailableModels } from '../watchFaceBinTools/watchFaceBinParser'

export default function listModels() {
    const models = getAvailableModels()

    models.forEach(model => console.log(`- ${model.id}: ${model.name}`))
}