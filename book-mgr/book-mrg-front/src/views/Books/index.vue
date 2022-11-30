<template>
    <div>
        <a-card>
            <h2>图书列表</h2>
            <a-divider />
            <space-between>
                <div class="search">
                    <a-input-search placeholder="根据书名搜索" enter-button />
                </div>
                <a-button @click="show=true">添加一条</a-button>
            </space-between>
            <a-divider />
            <a-table :data-source="list" :columns="columns" >
        <template #publishDate="data">
        {{formatTimestamp(data.record.publishDate)}}
        </template>
        </a-table>
        </a-card>
        <add-one v-model:show="show" />
    </div>
</template>
<script src="./index.js">

</script>
<style lang="scss" scoped>
    @import './index.scss'
</style>