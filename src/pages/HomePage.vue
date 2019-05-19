<template lang="pug">
    .homepage
        .header
            el-form.form-conversion(ref="form-conversion" :model="form" :inline="true")
                el-row(:gutter="12")
                    el-col(:xs="24" :sm="6")
                        el-form-item
                            el-select(v-model="form.base_currency" placeholder="Select Base Currency")
                                el-option(
                                    v-for="(currency, index) in list.currencies"
                                    :key="index"
                                    :label="`${currency.code} - ${currency.name}`"
                                    :value="currency.code"
                                    )
                    el-col(:xs="24" :sm="6")
                        el-form-item
                            el-input(v-model="form.amount" placeholder="Type amount")

        .content
            .currency-info(v-for="(item, index) in list.selected_currencies")
                CurrencyInfoCard(:info="item")
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
                amount: 1
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
            { currency_code: 'SGD', base_currency: this.form.base_currency }
        ]
    }
}
</script>

<style lang="stylus" scoped>
    .homepage
        p
            text-align justify 
            text-indent 2rem

        .form
            &-conversion
                .el-form-item
                    width 100%
                    &__content
                        width 100%
                        .el-input-number
                            width 100%
</style>


