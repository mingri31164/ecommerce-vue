<template>
    <div class="column is-3 is-size-3">
        <div class="box">
            <figure class="image mb-4">
                <img :src="'http://web118.vipgz6.91tunnel.com/' + good.pthumbnail">
            </figure>

            <h5 class="is-size-5">{{ good.name }}</h5>
            <h5 class="is-size-5">价格：{{ good.price1 }}</h5>
            <button id="btn_add" @click="addToCart(good)"> 添加 </button>

        </div>
    </div>
</template>

<script>
export default {
    name: 'ProductBox',
    props: {
        product: Object
    },
    data() {
        return {
            good: this.product
        }
    },
    methods: {
        addToCart(good) {
            this.$emit('addToCart', good)
            alert("添加成功")
        }
    }
}
</script>

<style scoped>
.image {
    margin-top: -1.25rem;
    margin-left: -1.25rem;
    margin-right: -1.25rem;
}

.box-operator {
    margin-left: -1.25rem;
    margin-right: -1.25rem;
}

.box-operator .button {
    /* padding: 0 8px; */
}

#btn_add {
    width: 100%;
    margin: auto 0;
    text-align: center;
    background-color: #000000;
    /* Green */
    border: none;
    color: rgb(255, 255, 255);
    padding: 16px 32px;
    text-align: center;
    text-decoration: none;
    /* display: inline-block; */
    display: block;
    font-size: 16px;
    margin: 4px auto;
    -webkit-transition-duration: 0.4s;
    /* Safari */
    transition-duration: 0.4s;
    cursor: pointer;
}
</style>