<template lang="pug">
    .homepage
        .header
            el-form.form-conversion(ref="form-conversion" :model="form")
                el-form-item
                    el-select.base-currency(v-model="form.base_currency" placeholder="Select Base Currency")
                        el-option(
                            v-for="(currency, index) in list.currencies"
                            :key="index"
                            :label="`${currency.code} - ${currency.name}`"
                            :value="currency.code"
                            )
                el-form-item
                    el-input-number.amount(v-model="form.amount" placeholder="Type amount")

        .content
            el-row(:gutter="12")
                el-col.currency-info(:xs="24" :sm="8" :m="6" v-for="(item, index) in list.selected_currencies" :key="index")
                    CurrencyInfoCard(:amount="form.amount" :base_currency="form.base_currency" :currency_code="item.currency_code")
</template>

<script>
// components
import CurrencyInfoCard from '../components/CurrencyInfoCard.vue';

// shared
import { CONSTANTS } from '../shared/constants';

export default {
    name: 'HomePage',
    components: {
        CurrencyInfoCard
    },
    data: () => {
        return {
            form: {
                base_currency: CONSTANTS.CURRENCIES.DEFAULT_BASE,
                amount: 0,
            },
            list: {
                currencies: CONSTANTS.CURRENCIES.LIST,
                selected_currencies: [],
            }
        }
    },
    mounted(){
        this.list.selected_currencies = [
            { currency_code: 'IDR', base_currency: this.form.base_currency },
            { currency_code: 'INR', base_currency: this.form.base_currency },
            { currency_code: 'KRW', base_currency: this.form.base_currency },
            { currency_code: 'SGD', base_currency: this.form.base_currency },
            { currency_code: 'CAD', base_currency: this.form.base_currency },
            { currency_code: 'MYR', base_currency: this.form.base_currency },
        ]
    }
}
</script>

<style lang="stylus" scoped>
    .homepage
        .header
            .form-conversion
                .el-select
                    &.base-currency
                        max-width 300px
                        width 100%
                .el-input-number
                    &.amount
                        max-width 300px
                        width 100%
</style>


