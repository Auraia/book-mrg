import { defineComponent, ref, onMounted } from 'vue';
import { book } from '@/service'
import { result, formatTimestamp } from '@/helpers/utils'
import { message } from 'ant-design-vue'
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

            },
            {
                title: '操作',
                slots: {
                    customRender: 'actions'
                }

            }
        ];


        const show = ref(false);

        var list = ref([]);
        const total = ref(0);
        const curPage = ref(1);
        const keyword = ref('');
        const isSearch = ref(false)
            //获取书籍列表
        const getList = async() => {
            const res = await book.list({
                page: curPage.value,
                size: 10,
                keyword: keyword.value,
            });
            result(res)
                .success(({ data }) => {
                    const { list: l, total: t } = data;
                    list.value = l;
                    total.value = t;
                })

        };
        onMounted(async() => {
            getList();

        });
        //设置页码
        const setPage = (page) => {
            curPage.value = page;
            getList();
        };
        const onSearch = () => {
            getList();
            //字符串非空的时候 —true
            //字符串为空的时候 -false
            isSearch.value = Boolean(keyword.value);
        };

        //返回全部列表
        const backAll = () => {
            keyword.value = '',
                isSearch.value = false;
            getList();

        };
        const remove = async({ text: record }) => {
            const { _id } = record;
            const res = await book.remove(_id);
            result(res).success(({ msg }) => {
                message.success(msg)
            })
        }

        return {
            columns,
            show,
            list,
            formatTimestamp,
            curPage,
            total,
            setPage,
            keyword,
            onSearch,
            backAll,
            isSearch,
            remove
        }
    }
})