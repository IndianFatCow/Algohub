<script setup>
import { ref } from "vue";
import { Menu } from "@element-plus/icons-vue"; // 使用 Element Plus 的 Menu 图标

// 控制导航显示/隐藏
const isNavVisible = ref(false);

// 切换导航状态
const toggleNav = () => {
  isNavVisible.value = !isNavVisible.value;
};
</script>

<template>
  <!-- 悬浮按钮 + 导航栏 -->
  <div class="nav-container">
    <!-- 悬浮按钮（点击显示/隐藏导航） -->
    <div class="menu-icon" @click="toggleNav">
      <el-icon size="24"><Menu /></el-icon>
    </div>

    <!-- 导航菜单 -->
    <div class="nav-links" :class="{ show: isNavVisible }">
      <router-link to="/login" @click="toggleNav">注册登录</router-link>
      <router-link to="/" @click="toggleNav">用户主页</router-link>
      <router-link to="/admin" @click="toggleNav">管理主页</router-link>
    </div>
  </div>

</template>

<style scoped>
/* 🚀 悬浮按钮 + 导航栏 容器 */
.nav-container {
  position: fixed; /* 固定在右上角 */
  top: 60px;
  right: 20px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

/* 🎯 悬浮按钮 (默认显示，点击展开导航) */
.menu-icon {
  background: rgba(51, 215, 241, 0.7);
  color: white;
  padding: 10px;
  border-radius: 50%;
  cursor: pointer;
  transition: background 0.3s ease;
}

.menu-icon:hover {
  background: rgba(0, 0, 0, 0.9);
}

/* 🌟 导航菜单 (默认隐藏) */
.nav-links {
  opacity: 0;
  transform: translateY(-10px);
  transition: opacity 0.3s ease, transform 0.3s ease;
  background: rgba(0, 0, 0, 0.8);
  padding: 10px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 10px;
}

/* ✅ 当导航展开时，显示 */
.nav-links.show {
  opacity: 1;
  transform: translateY(0);
}

/* 📌 链接样式 */
.nav-links a {
  color: white;
  text-decoration: none;
  padding: 5px;
  transition: color 0.3s;
}

.nav-links a:hover {
  color: #42b983;
}
</style>