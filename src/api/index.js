import { getAPI } from './base'
import { sampleUrl } from './urls'
export const getSamples = () => {
    return getAPI(sampleUrl, {}, { params: { id: 1 } })
}
/*
try {
    const response = await getSamples()
} catch (error) { }
*/

