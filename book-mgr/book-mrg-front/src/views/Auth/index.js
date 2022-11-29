 import { defineComponent, reactive } from 'vue';
 import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons-vue';
 import { auth } from '@/service';
 import { result } from '@/helpers/utils/index'
 import { message } from 'ant-design-vue'


 export default defineComponent({
     components: {
         UserOutlined,
         LockOutlined,
         MailOutlined,

     },
     setup() {
         //注册相关的逻辑
         const regForm = reactive({
                 account: '',
                 password: '',
                 inviteCode: '',
             })
             //注册逻辑
         const register = async() => {
             if (regForm.account === '') {
                 message.info('请输入账户')
                 return;
             }
             if (regForm.password === '') {
                 message.info('请输入密码')
                 return;
             }
             if (regForm.inviteCode === '') {
                 message.info('请输入邀请码')
                 return;
             }
             const res = await auth.register(
                 regForm.account,
                 regForm.password,
                 regForm.inviteCode
             )

             result(res)
                 .success((data) => {
                     message.success(data.msg)
                 })

         }




         //登录相关的逻辑
         const loginForm = reactive({
             account: '',
             password: '',
         });
         //登录逻辑
         const login = async() => {

             if (loginForm.account === '') {
                 message.info('请输入账户')
                 return;
             }
             if (loginForm.password === '') {
                 message.info('请输入密码')
                 return;
             }

             const res = await auth.login(loginForm.account, loginForm.password)
             result(res)
                 .success((data) => {
                     message.success(data.msg)
                 })

         }


         return {
             //注册相关的数据
             register,
             regForm,
             //登录相关的数据
             login,
             loginForm,
         }
     }

 });