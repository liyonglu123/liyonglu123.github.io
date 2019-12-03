<template>
    <div class="login-container">
        <Form class="login-form" ref="loginForm" :model="loginForm" :rules="loginRules">
            <FormItem prop="user">
                <Input type="text" v-model="loginForm.userName" placeholder="请输入用户名">
                <Icon type="ios-person-outline" slot="prepend"></Icon>
                </Input>
            </FormItem>
            <FormItem prop="password">
                <Input type="password" v-model="loginForm.password" placeholder="请输入密码">
                <Icon type="ios-lock-outline" slot="prepend"></Icon>
                </Input>
            </FormItem>
            <FormItem>
                <Button class="login-btn" type="primary" @click="logginSubmit">登 录</Button>
            </FormItem>
        </Form>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                loginForm: {
                    userName: "",
                    password: ""
                },
                loginRules: {

                }
            }
        },
        methods: {
            // 登录
            logginSubmit() {
                console.log("login");
            }
        }
    }
</script>
<style lang="less" scoped>
    .login-container {
        position: fixed;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        background-color: #5cadff;
        .login-form {
            position: absolute;
            width: 240px;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            .login-btn {
                width: 100%;
            }
        }
    }
</style>