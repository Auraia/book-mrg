import { defineComponent, ref, onMounted} from 'vue';
import { book } from '@/service'
import { message, Modal ,Input} from 'ant-design-vue'

import { result, formatTimestamp } from '@/helpers/utils'
import AddOne from './AddOne/index.vue';
import Update from './Update/index.vue';
export default defineComponent({
    components: {
        AddOne,
        Update
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
                title: '库存',
                slots: {
                    customRender: 'count'
                }
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
        const showUpdateModal=ref(false);
        const total = ref(0);
        const curPage = ref(1);
        const keyword = ref('');
        const isSearch = ref(false);
        const curEditBook=ref({})
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
        //删除一本书籍
        const remove = async({ text: record }) => {
            const { _id } = record;

            const res = await book.remove(_id);

            result(res).success(({ msg }) => {
                message.success(msg);
                getList();
                // const idx = list.value.findIndex((item) => {
                //     return item._id === _id;
                // });
                // list.value.splice(idx, 1);


            })
        };
        const updateCount = (type,record) => {
            let word='增加';
            if(type==="OUT_COUNT"){
                word="减少";
            }
            Modal.confirm({
                title: `要${word}多少库存`,
                content: (
                <div>
                    <Input class="_book_input_count"/>
                </div>),
                onOk:async()=>{
                    const el=document.querySelector('._book_input_count');
                    let num=el.value;

                    const res=await book.updateCount({
                        id:record._id,
                        num,
                        type,

                       });
                       result(res)
                       .success((data) => {
                        // console.log(data)
                         //找到了书
              if (type === type) {
        //入库操作 
            num = Math.abs(num);
       } else {
        //出库操作
        num = -Math.abs(num);
    }
                       const one=list.value.find((item) => {
                        return item._id===record._id;

                       });
                       if(one){
                        one.count=one.count+num; 
                        message.success(`成功${word} ${Math.abs(num)}本书`);

                       }
                   
               
            })
        }
    })
};
const update=({record})=>{
    showUpdateModal.value=true;
    curEditBook.value=record;
};

const updateCurrentBook=(newBook)=>{
    Object.assign(curEditBook.value,newBook);

};
        

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
            remove,
            update,
            updateCount,
            showUpdateModal,
            curEditBook,
            updateCurrentBook

        }
    }
})