<template>
  <div class="login_contaniner">
    <div class="login_box">
      <el-form
        :model="loginForm"
        :rules="loginRule"
        ref="loginRef"
        label-width="0px"
        class="login_form"
      >
        <span>用户登录</span>
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <!-- 验证规则prop(在data里面的rule)加给itme而不是input -->
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            placeholder="请输入密码"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item class="btn">
          <el-button type="primary" plain @click="submitlogin">登录</el-button>
          <el-button type="info" plain @click="resetlogin">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loginForm: {
        username: "admin",
        password: "123456",
      },
      loginRule: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 20,
            message: "长度在 6 到 20 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    // 表单重置
    resetlogin() {
      this.$refs.loginRef.resetFields();
    },
    // 表单预校验
    submitlogin() {
      this.$refs.loginRef.validate(async (valid) => {
        if (valid) {
          const { data: res } = await this.$http.post("login", this.loginForm);
          console.log(res);
          if (res.meta.status !== 200) return this.$message.error("登录失败");
          this.$message.success("登录成功");
          //  1．将登录成功之后的token，保存到客户端的sessionStorage中
          //    1.1项目中出了登录之外的其他API接口，必须在登录之后才能访问
          //    1.2 token只应在当前网站打开期间生效，所以将 token保存在sessionStorage中
          //2．通过编程式导航跳转到后台主页，路由地址是/home
          window.sessionStorage.setItem("token", res.data.token);
          this.$router.push("/home");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>
<style lang="less" scoped>
.login_contaniner {
  background-color: rgb(243, 245, 251);
  height: 100%;
}
span {
  display: block;
  width: 100px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  margin-left: 50%;
  margin-top: 30px;
  margin-bottom: 15px;
  transform: translate(-50%);
}
.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 10px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 15px;
}
.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 30px;
  box-sizing: border-box;
}
.btn {
  display: flex;
  justify-content: flex-end;
}
</style>
