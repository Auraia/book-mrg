<template>
    <div>
        <a-card>
            <h2>图书列表</h2>
            <a-divider />
            <space-between>
                <div class="search">
                    <a-input-search
                  
                     placeholder="根据书名搜索" 
                     enter-button
                     v-model:value="keyword"
                    @search="onSearch"
                     />
                     <a v-if="isSearch" href="javascript:;" @click="backAll">返回</a>
                </div>
                <a-button @click="show=true">添加一条</a-button>
            </space-between>
            <a-divider />
            <a-table 
            :data-source="list" 
            :columns="columns"
            :pagination="false"
             >
        <template #publishDate="data">
        {{formatTimestamp(data.record.publishDate)}}
        </template>
        <template #actions="record">
      <a href="javascript:;" @click="remove(record)">删除</a>
        </template>
        </a-table>
        <space-between style="margin-top:23px">
            <div/>
            <a-pagination 
            v-model:current="curPage" 
            :total="total"
            :page-size="10"
            @change="setPage"
            />
        </space-between>
   
        </a-card>
        <add-one v-model:show="show" />
    </div>
</template>
<script src="./index.js">

</script>
<style lang="scss" scoped>
    @import './index.scss'
</style>