<template lang="pug">
    .homepage
        .header
            .info
                p Get the fast, reliable, and latest foreign exchange reference rates.
            el-form.form-conversion(ref="form-conversion" :model="form")
                el-row(:gutter="12")
                    el-col(:xs="24" :sm="8")
                        el-form-item
                            el-select.base-currency(v-model="form.base_currency" placeholder="Select Base Currency")
                                el-option(
                                    v-for="(currency, index) in list.currencies"
                                    :key="index"
                                    :label="`${currency.code} - ${currency.name}`"
                                    :value="currency.code"
                                    )
                    el-col(:xs="24" :sm="8")
                        el-form-item
                            el-input.amount(
                                v-bind:value="form.amount" placeholder="Type amount" :min="0"
                                v-on:input="(e) => debounceAmount(e)"
                                )
                    el-col(:xs="24" :sm="8")
                        el-select.selected-currencies(v-model="form.selected_currencies" multiple collapse-tags placeholder="Select Quote Currencies")
                            el-option(
                                v-for="(currency, index) in list.currencies"
                                :key="index"
                                :label="`${currency.code} - ${currency.name}`"
                                :value="currency.code"
                                )
        .content
            el-row(:gutter="12" v-if="list.selected_currencies.length > 0")
                el-col.currency-info( :xs="24" :sm="8" :m="6" v-for="(item, index) in list.selected_currencies" :key="index")
                    CurrencyInfoCard(
                        :amount="form.amount" :base_currency="form.base_currency" 
                        :currency_code="item.currency_code" :rate="list.rates[item.currency_code] || 0" 
                        :rates_history="list.rates_history[item.currency_code]" :rate_updated_at="info.rates_updated_at"
                        @dismiss="handleAction('remove-quote-currency', item.currency_code)"
                        )
            el-row.currency-info.no-data(v-else)
                h4 
                    i.el-icon-search 
                    | &nbsp;No Quote Currencies Selected
        .footer
            h4 Notes
            ul
                li Rates informations are taken from 
                    a(href="https://exchangeratesapi.io/" target="_blank") https://exchangeratesapi.io/
                li Please contact developer to request another currency
                li 
                    b Coming Soon! 
                    | We will provide exchange rates for crypto currency!
</template>

<script>
// components
import CurrencyInfoCard from '../components/CurrencyInfoCard.vue';

// services
import { getExchangeRates, getExchangeRatesHistory } from '../services/exchangeRate';

// shared
import { CONSTANTS } from '../shared/constants';

export default {
    name: 'HomePage',
    components: {
        CurrencyInfoCard
    },
    computed: {
        baseCurrency(){
            return this.form.base_currency;
        },
        selectedCurrencies(){
            return this.form.selected_currencies;
        }
    },
    data: () => {
        return {
            form: {
                base_currency: CONSTANTS.CURRENCIES.DEFAULT_BASE,
                amount: 0,
                selected_currencies: [],
                debounce_amount: null,
            },
            info: {
                rates_updated_at: null
            },
            list: {
                currencies: CONSTANTS.CURRENCIES.LIST,
                rates: {},
                rates_history: {},
                selected_currencies: [],
            },
        }
    },
    mounted(){
    },
    methods: {
        debounceAmount(val){
            if(this.form.debounce_amount){
                clearTimeout(this.form.debounce_amount);
            }
            let that = this;
            let amount = val.replace(CONSTANTS.VALIDATION.AMOUNT.RULE, '');
            this.form.amount = amount;
            
            this.form.debounce_amount = setTimeout(() => {
                this.form.amount = parseFloat(amount);
                that.updateRate();
            }, 500)
        },
        getHistory(){
            let end_at = new Date().toISOString().slice(0, 10),
                start_at = new Date(new Date().getTime() - (1000 * 60 * 60 * 24 * 5)).toISOString().slice(0, 10);

            getExchangeRatesHistory(start_at, end_at, this.form.base_currency, this.form.selected_currencies.join(','))
                .then(res => {
                    if(res.body && res.body.rates){
                        this.list.rates_history = {};
                        for(let date of Object.keys(res.body.rates)){
                            for(let currency of Object.keys(res.body.rates[date])){
                                if(!this.list.rates_history[currency]){
                                    this.list.rates_history[currency] = {};
                                }
                                this.list.rates_history[currency][date] = res.body.rates[date][currency];
                            }
                        }
                    }
                })
                .catch((err) => {
                    // console.error('err: ', err);
                    this.showMessage('Failed on get rates history info. ' + (err.error || ''), 'error');
                })
        },
        handleAction(type, param){
            switch(type){
                case 'remove-quote-currency':
                    this.form.selected_currencies.splice(this.form.selected_currencies.indexOf(param), 1);
                    break;
                default:
                    break;
            }
        },
        showMessage(message = 'Lorem ipsum dolor sit amet', type = 'message',){
            this.$message({ type, message })
        },
        updateRate(){
            getExchangeRates(this.form.base_currency, this.form.selected_currencies.join(','))
                .then(res => {
                    this.list.rates = res.body.rates;
                    this.info.rates_updated_at = new Date().toLocaleString();

                    this.getHistory();
                })
                .catch(err => {
                    this.showMessage('Failed on udpating rate info. ' + (err.error || ''), 'error');
                })
        },
    },
    watch: {
        baseCurrency(){
            this.updateRate();
        },
        selectedCurrencies(){
            this.list.selected_currencies = [];
            for(let item of this.form.selected_currencies){
                this.list.selected_currencies.push({ currency_code: item, base_currency: this.form.base_currency });
            }
            if(this.list.selected_currencies.length > 0){
                this.updateRate();
            }
        }
    }
}
</script>

<style lang="stylus" scoped>
    .homepage
        .header
            margin-bottom 2rem
            .form-conversion
                .el-select
                    &.base-currency, &.selected-currencies
                        max-width 300px
                        width 100%
                .el-input
                    &.amount
                        max-width 300px
                        width 100%
        .footer
            text-align left
            h4
                margin-bottom 0
                text-decoration underline
            ul
                margin-top 0
                padding-left 1.5rem
                li
                    font-size 0.9em
</style>


