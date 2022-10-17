import { IRecordAdaptorRecordData } from "../db-utils/adaptor-record"

// TODO: this can be more optimized and it should!! and shuold be moved to generateCleanRecords
export default (data: IRecordAdaptorRecordData) => Object.entries(data).reduce((acc, [chain, volume]) => {
    const entries = Object.entries(volume)
    if (entries.length === 1 && entries[0][0] === 'error' || chain === 'eventTimestamp') return acc
    const cleanChainData = entries.reduce((pacc, [prot, value]) => {
        if (prot !== 'error' && typeof value === 'number' && value >= 0)
            pacc[prot] = value
        return pacc
    }, {} as {
        [protocolVersion: string]: number,
    })
    if (Object.keys(cleanChainData).length > 0)
        acc[chain] = cleanChainData
    return acc
}, {} as IRecordAdaptorRecordData)