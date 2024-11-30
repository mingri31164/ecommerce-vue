<template>
    <div class="order-item">
        <div class="order-header">
            <span>商品名称</span>
            <span>时间</span>
            <span>数量</span>
            <span style="color: red">总价：￥{{ orderTotal }}</span>
        </div>

        <div class="order-detail" v-for="item in orderDetails" v-bind:key="item.id">
            <span>{{ item.goodsName }}</span>
            <span>{{ formatOrderTime(order.orderTime) }}</span>
            <span>{{ item.goodsNums }}</span>
            <span>￥{{ item.goodsPrice }}</span>
        </div>
    </div>
</template>

<style lang="scss">
.order-item {
    box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);


    .order-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px;
        background-color: #363636;
        margin: 10px 0;
        color: #fff;
        font-size: large;
        font-weight: bold;
    }

    .order-detail {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px;
        background-color: #fff;

        img {
            width: 6rem;
            height: 6rem;
            margin-left: 1rem;
        }
    }
}
</style>

<script>
export default {
    props: {
        initialOrder: Object
    },
    data() {
        return {
            order: this.initialOrder,
            orderDetails: [],
        }
    },
    mounted() {
        this.orderDetails = this.order.orderDetail

        for (let i = 0; i < this.orderDetails.length; i++) {
            let numsStrs = this.orderDetails[i].nums.split(',')

            this.orderDetails[i].thumbnail = this.getImgByGoodsId(this.orderDetails[i].goodsId)
            this.orderDetails[i].goodsNums = numsStrs[0]
            let price = numsStrs[1].trim().split('=')
            this.orderDetails[i].goodsPrice = price[1]
        }

    },
    methods: {
      formatOrderTime(orderTime) {
        const date = new Date(orderTime);
        return date.toLocaleString('zh-CN', { // 根据需要选择语言
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          // hour: '2-digit',
          // minute: '2-digit',
          // second: '2-digit',
          // hour12: true // 24小时制
        });
      },
        getImgByGoodsId(goodsId) {
            let goods = this.$store.state.goods
            let img = ''
            goods.forEach(item => {
                if (item.id == goodsId) {
                    img = item.pthumbnail
                }
            })
            return img
        },
    },
    computed: {
        orderTotal() {
            return this.orderDetails.reduce((acc, curVal) => {
                return acc += curVal.goodsPrice * curVal.goodsNums
            }, 0)
        }
    }
}
</script>