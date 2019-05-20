// library
import * as request from 'superagent';

// shared
import { CONSTANTS } from '../shared/constants';

export function getExchangeRates(base, symbols){
    return request.get(`${CONSTANTS.API.EXCHANGE_RATES.ROOT}${CONSTANTS.API.EXCHANGE_RATES.QUOTE}`)
        .query({ base, symbols})
}

export function getExchangeRatesHistory(start_at, end_at, base, symbols){
    return request.get(`${CONSTANTS.API.EXCHANGE_RATES.ROOT}${CONSTANTS.API.EXCHANGE_RATES.HISTORY}?start_at=${start_at}&end_at=${end_at}&base=${base}&symbols=${symbols}`)
        .query({ base, symbols})
}