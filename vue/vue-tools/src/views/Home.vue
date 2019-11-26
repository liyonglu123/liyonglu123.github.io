<template>
    <div class="home">
        <!-- <auto-form :formList="formList" :formData="formData"></auto-form> -->
        <!-- <i-button type="primary" @click="submit">提交</i-button> -->
        <!-- <slide-tab></slide-tab> -->
        <!-- <span>{{ ceshi }}</span>
     <span v-html="ceshi"></span> -->
        姓名: <input type="text" v-model="useInfo.userName">
        性别: <input type="text" v-model="useInfo.sex">
        年龄: <input type="number" v-model="useInfo.age">
        <button @click="submit">添加</button>
        <!-- <button @click="update">修改</button> -->
        <Table border :columns="columns1" :data="list">
            <template slot-scope="{ row, index }" slot="action">
                <Button type="primary" size="small" style="margin-right: 5px" @click="view(row, index)">查看</Button>
                <Button type="error" size="small" style="margin-right: 5px" @click="update(row, index)">修改</Button>
                <Button type="error" size="small" @click="del(row, index)">删除</Button>

            </template>
        </Table>

        <!-- 新增和编辑弹框 -->
        <Modal v-model="editFlag" title="修改" @on-ok="asyncOK">
            <Form :model="editForm" :label-width="80">
                <FormItem label="Input">
                    <Input v-model="editForm.userName" placeholder="用户名"></Input>
                </FormItem>
                <FormItem label="Input">
                    <Input v-model="editForm.sex" placeholder="性别"></Input>
                </FormItem>
                <FormItem label="Input">
                    <Input v-model="editForm.age" placeholder="年龄"></Input>
                </FormItem>
            </Form>
        </Modal>

    </div>
</template>

<script>
    // @ is an alias to /src
    // import autoForm from '@/components/autoForm/form.vue'
    // import slideTab from '@/components/slideTab/index.vue'
    import axios from "axios"

    export default {
        name: 'home',
        data() {
            return {
                ceshi: "",
                useInfo: {
                    userName: "",
                    sex: "",
                    age: ""
                },
                formList: [
                {
                    type: 'input',
                    label: '姓名',
                    key: 'name',
                    placeholder: '请输入姓名'
                },
                {
                    type: 'input',
                    label: '性别',
                    key: 'sex',
                    placeholder: '请输入姓名'
                },
                {
                    type: 'input',
                    label: '地址',
                    key: 'adderss',
                    placeholder: '请输入姓名'
                },
                {
                    type: 'select',
                    label: '城市',
                    key: 'city',
                    options: [{
                        title: "北京",
                        value: 'beijing'
                    },
                    {
                        title: "上海",
                        value: 'shanghai'
                    }],
                    placeholder: '请选择城市'
                }],
                formData: {
                    name: '',
                    adderss: '',
                    sex: '',
                    city: ''
                },
                columns1: [
                {
                    title: '姓名',
                    key: 'userName'
                },
                {
                    title: '性别',
                    key: 'sex'
                },
                {
                    title: '年龄',
                    key: 'age'
                },
                {
                    title: '操作',
                    fixed: 'right',
                    width: 300,
                    align: 'center',
                    slot: 'action'
                }],
                list: [],
                editFlag: false,
                editForm: {
                    userName: "",
                    sex: "",
                    age: ""
                },

            }
        },
        //   components: {
        //     // autoForm,
        //     slideTab
        //   },
        created() {
            // 不识别 \n 换成<br/>, 同时 使用 v-html绑定到dom
            this.ceshi = "ddd<br/>666"
            // 查询所有数据

            this.getAll();

        },
        methods: {
            getAll() {
                var that = this;
                axios.get('/person/selectAll')
                    .then(function (response) {
                        that.list = response.data.data;
                        console.log(response);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            submit() {
                var that = this;
                axios.post('/person/add', this.useInfo)
                    .then(function (response) {
                        console.log(response);
                        that.getAll();
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            view(row, index) {
                var that = this;
                this.editFlag = true;
                this.editForm = JSON.parse(JSON.stringify(row));

            },
            asyncOK() {
                var that = this;
                axios.post('/person/update', this.editForm)
                    .then(function (response) {
                        that.getAll();
                        console.log(response);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            update(row, index) {
                var that = this;
                this.editFlag = true;
                // this.editForm = row;
                this.editForm = JSON.parse(JSON.stringify(row));
            },
            del(row, index) {
                var that = this;
                axios.get('/person/delete', { params: {id: row.id}})
                    .then(function (response) {
                        // that.list = response.data.data;
                        that.getAll();
                        console.log(response);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
        }
    }
</script>