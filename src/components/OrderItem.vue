<template>
  <div class="order-item">
    <table style="width: 100%; border-collapse: collapse;">
      <thead style="background-color: hsl(0, 0%, 29%)">
      <tr>
        <th class="column-width">商品名称</th>
        <th class="column-width">数量</th>
        <th class="column-width" >
          总价：
          <span style="color: red">￥{{ orderTotal }}</span>
        </th>
        <th class="column-width">时间</th>

      </tr>
      </thead>
      <tbody>
      <tr v-for="item in orderDetails" :key="item.id">
        <td class="column-width" style="font-weight: 700">{{ item.goodsName }}</td>
        <td class="column-width">{{ item.goodsNums }}</td>
        <td class="column-width" style="font-weight: 500">￥{{ item.goodsPrice }}</td>
        <td class="column-width">{{ formatOrderTime(order.orderTime) }}</td>
      </tr>
      </tbody>
    </table>
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
.order-item table {
  width: 100%;
  border-collapse: collapse; /* 合并边框 */
}

.order-item th, .order-item td {
  border: 1px solid #ddd; /* 单元格边框 */
  padding: 10px; /* 内边距 */
  text-align: left; /* 文本左对齐 */
  width: 25%; /* 设置每列宽度为相同值，确保统一 */
}

.order-item th {
  //background-color: #f2f2f2; /* 表头背景颜色 */
  color: white;
  font-weight: bold; /* 加粗表头字体 */
}

.order-item td {
  vertical-align: middle; /* 垂直居中对齐 */
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

        // 获取星期几
        const weekDays = ['日', '一', '二', '三', '四', '五', '六'];
        const weekDay = weekDays[date.getDay()]; // 获取星期几（0-6）

        // 返回格式化的日期和星期
        return `${date.toLocaleString('zh-CN', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
        })} 星期${weekDay}`;
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