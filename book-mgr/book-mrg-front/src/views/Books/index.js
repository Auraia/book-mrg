import { defineComponent, ref, onMounted } from 'vue';
import { book } from '@/service'
import { result, formatTimestamp } from '@/helpers/utils'

import AddOne from './AddOne/index.vue';
export default defineComponent({
    components: {
        AddOne,
    },
    setup() {
        const columns = [{
                title: '书名',
                dataIndex: 'name',
            },
            {
                title: '价格',
                dataIndex: 'price',

            },
            {
                title: '作者',
                dataIndex: 'author',

            },

            {
                title: '出版日期',
                dataIndex: 'publishDate',
                slots: {
                    customRender: 'publishDate'
                }

            },
            {
                title: '分类',
                dataIndex: 'classify',

            }
        ];


        const show = ref(false);

        var list = ref(list);
        onMounted(async() => {
            const res = await book.list();
            result(res)
                .success(({ data }) => {
                    list.value = data;

                })
        });


        return {
            columns,
            show,
            list,
            formatTimestamp,

        }
    }
})