<template>
  <el-container class="home_container">
    <el-header>
      <div>
        <span>电商后台管理系统</span>
      </div>
      <el-button type="primary" plain @click="loginout" class="loginout"
        >退出</el-button
      >
    </el-header>
    <el-container>
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="button_aside" @click="toggleCollapse">|||</div>
        <el-menu
          unique-opened
          :collapse="isCollapse"
          :collapse-transition="false"
          :router="true"
          :default-active="activePath"
        >
          <!-- 一级菜单 -->
          <el-submenu
            :index="item.id + ''"
            v-for="item in menulist"
            :key="item.id"
          >
            <!-- 一级菜单模板区域 -->
            <template slot="title">
              <!-- 图标  需要自定义-->
              <i :class="iconObj[item.id]"></i>
              <!-- 文本 -->
              <span>{{ item.authName }}</span>
            </template>
            <!--二级菜单  -->
            <el-menu-item
              :index="'/' + subitem.path + ''"
              v-for="subitem in item.children"
              :key="subitem.id"
              @click="saveNavState('/' + subitem.path + '')"
            >
              <!-- 图标 -->
              <i class="el-icon-menu"></i>
              <!-- 文本 -->
              <span>{{ subitem.authName }}</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      // 左侧菜单
      menulist: [],
      iconObj: {
        125: 'el-icon-user',
        103: 'el-icon-box',
        101: 'el-icon-goods',
        102: 'el-icon-tickets',
        145: 'el-icon-data-line',
      },
      isCollapse: false,
      activePath: '',
    }
  },
  // 定义生命周期函数,一加载就获取左侧信息
  created() {
    this.getMenuList()
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  methods: {
    loginout() {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    // 获取所有菜单(get 是promise  所以用await简化操作){data:res}//获取data重命名为res
    async getMenuList() {
      const { data: res } = await this.$http.get('menus')
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg) //失败
      // 成功
      this.menulist = res.data
      console.log(res)
    },
    // 菜单折叠
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
    },
    saveNavState(activePath) {
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
    },
  },
}
</script>
<style lang="less" scoped>
.home_container {
  height: 100%;
}
.el-header {
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: rgb(2, 0, 0);
  font-weight: bold;
}
.el-aside {
  background-color: #fff;
}
.el-main {
  background-color: rgb(242, 243, 247);
}
.button_aside {
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
  line-height: 24px;
  font-size: 10px;
}
.button_aside:hover {
  background-color: rgb(237, 245, 255);
}
</style>
