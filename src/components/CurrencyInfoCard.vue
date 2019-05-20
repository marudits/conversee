<template lang="pug">
    .currency-info
        el-card.box-card(shadow="hover")
            .header.clearfix(slot="header")
                span {{ currency_name }}
                el-button(type="text" @click="handleAction('dismiss')")
                    .el-icon-remove-outline
                    .el-icon-circle-close
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
                el-row.history(:gutter="12")
                    el-col.history-item(v-for="(item, index) in history" :key="index" :span="8" v-if="item.status") 
                        span.date {{ item.date | dateMonthFormatter }} 
                        span.percentage(:class="item.status") 
                            i.el-icon-caret-top(v-if="item.status === 'up'")
                            i.el-icon-caret-bottom(v-else-if="item.status === 'down'")
                            i.el-icon-d-caret(v-if="item.status === 'equal'")
                            | {{ item.percentage ? `${item.percentage}%` : '' }}
            
</template>

<script>

// shared
import { CONSTANTS } from '../shared/constants';

// utils
import { cutoff, numberWithComma } from '../utils/numberFormatter';

export default {
    name: 'CurrencyInfo',
    props: ['amount', 'base_currency', 'currency_code', 'rate', 'rates_history', 'rate_updated_at'],
    data: () => {
        return {
            currency_name: null,
            history: [],
            total: 1,
        }
    },
    computed: {
        amountAndRate(){
            return `${this.amount}|${this.rate}`
        },
        currencyCode(){
            return this.currency_code;
        },
        ratesHistory(){
            return this.rates_history;
        }
    },
    filters: {
        cutoff(value, precision){
            return cutoff(value, precision);
        },
        dateMonthFormatter(value){
            let date = new Date(value);
            return `${date.getDate()}/${date.getMonth() + 1}`
        },
        numberWithComma(num){
            return numberWithComma(num);
        }
    },
    mounted(){
        this.getDetails();
        this.updateTotal();

        // console.log('rates_history: ', this.rates_history);
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
                this.updateTotal();
            }
        },
        currencyCode(){
            this.getDetails();
        },
        ratesHistory(){
            // re-structure data
            this.history = [];
            for(let index in this.rates_history){
                this.history.push(Object.assign({}, { 
                    date: index,
                    rate: this.rates_history[index]
                }))
            }

            // sort data
            this.history.sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime());

            // set status
            for(let index in this.history){
                if(index == 0){
                    this.history[index] = Object.assign({}, this.history[index], { percentage: null, status: null });
                } else {
                    let diff = this.history[index].rate - this.history[index - 1].rate,
                        status = diff == 0 ? 'equal' : (diff > 0 ? 'up' : 'down'),
                        percentage = (Math.abs(diff) / this.history[index - 1].rate) * 100;
                    this.history[index] = Object.assign({}, this.history[index], { percentage: parseFloat(percentage).toFixed(2), status });
                }
            }            
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
                color gray
                font-size 1rem
                float right
                .el-icon-circle-close
                    display none
                &:hover
                    .el-icon-circle-close
                        display block
                    .el-icon-remove-outline
                        display none
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
            .history
                font-size 0.75rem
                text-align left
                &-item
                    border 1px solid lightgray 
                    border-radius 3px
                    padding 0.25rem
                    text-align center
                .date
                    font-weight bolder
                .percentage
                    font-style italic
                    font-weight bold
                    &.up
                        color green
                    &.down
                        color red
                    &.equal
                        color yellow
</style>


