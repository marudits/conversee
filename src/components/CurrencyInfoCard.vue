<template lang="pug">
    el-card.currency-info.box-card(shadow="hover")
        .header.clearfix(slot="header")
            span {{ currency_name }}
            el-button(type="text" @click="handleAction('dismiss')") Dismiss
        .content
            el-row
                el-col(:xs="6" :sm="4")
                    h2.currency_code {{ currency_code }} 
                el-col(:xs="18" :sm="20")
                    h2.total {{ total | cutoff | numberWithComma }}
            el-row(v-if="rate && rate_updated_at")
                el-col
                    p.rate Rate: {{ rate | numberWithComma }}&ast;
                    p.rate-updated-at &ast;Updated at: {{ rate_updated_at }}
</template>

<script>

// shared
import { CONSTANTS } from '../shared/constants';

// utils
import { cutoff, numberWithComma } from '../utils/numberFormatter';

export default {
    name: 'CurrencyInfo',
    props: ['amount', 'base_currency', 'currency_code', 'rate'],
    data: () => {
        return {
            currency_name: null,
            rate_updated_at: null,
            total: 1
        }
    },
    computed: {
        amountAndRate(){
            return `${this.amount}|${this.rate}`
        },
        currencyCode(){
            return this.currency_code;
        }
    },
    filters: {
        cutoff(value, precision){
            return cutoff(value, precision);
        },
        numberWithComma(num){
            return numberWithComma(num);
        }
    },
    mounted(){
        this.getDetails();
        this.updateTotal();
    },
    methods: {
        handleAction(type){
            switch(type){
                case 'dismiss':
                    this.$emit('dismiss');
                    break;
                default:
                    break;
            }
        },
        getDetails(){
            let selected_currency = CONSTANTS.CURRENCIES.LIST.find(x => x.code === this.currency_code);

            this.currency_code = selected_currency.code;
            this.currency_name = selected_currency.name;
        },
        updateTotal(){
            this.total = parseFloat(this.amount) * this.rate;
        },
    },
    watch: {
        amountAndRate(){
            if(this.rate){
                this.rate_updated_at = new Date().toLocaleString();
                this.updateTotal();
            }
        },
        currencyCode(){
            this.getDetails();
        }
    }
}
</script>

<style lang="stylus" scoped>
    .currency-info
        margin-bottom 12px
        .header
            font-weight  bold
            text-align left
            button 
                float right
        .content
            h2
                margin 0.25rem 0
                &.currency_code
                    text-align left
                &.total
                    text-align right
            p
                &.rate
                    font-size 0.75rem
                    font-style italic
                    margin-bottom 2rem
                    margin-top 0
                    text-align right

                    &-updated-at
                        text-align left
                        font-size 0.75rem
</style>


