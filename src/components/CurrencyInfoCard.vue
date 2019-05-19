<template lang="pug">
    el-card.currency-info.box-card
        .clearfix(slot="header")
            span {{ info.currency_code }}
            el-button(type="text") Dismiss
        .item
            h3 {{ details.currency_code }} {{ details.currency_name }}
            h5 Rate 
            p 1 {{ details.base_currency }} = {{ details.rate }} {{ details.currency_code }}
</template>

<script>

// shared
import { CONSTANTS } from '../shared/constants';

export default {
    name: 'CurrencyInfo',
    props: ['info'],
    data: () => {
        return {
            details: {}
        }
    },
    mounted(){
        let selected_currency = CONSTANTS.CURRENCIES.LIST.find(x => x.code === this.info.currency_code);

        this.details = {
            currency_code: selected_currency.code,
            currency_name: selected_currency.name,
            base_currency: this.info.base_currency,
            rate: this.info.rate || 0
        }
    }
}
</script>

<style lang="stylus" scoped>

</style>


