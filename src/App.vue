<template>
  <div class="app-shell">
    <header class="site-header">
      <div class="shell-container header-inner">
        <RouterLink class="brand" to="/">
          <span class="brand-mark">MITI</span>
          <span class="brand-copy">
            <strong>miHoYo Type Indicator</strong>
            <small>米游角色人格测试</small>
          </span>
        </RouterLink>
        <nav class="site-nav">
          <RouterLink to="/">首页</RouterLink>
          <RouterLink to="/quiz">开始测试</RouterLink>
          <RouterLink to="/characters">角色图鉴</RouterLink>
          <RouterLink to="/about">关于</RouterLink>
        </nav>
      </div>
    </header>

    <main class="site-main">
      <RouterView />
    </main>

    <footer class="site-footer">
      <div class="shell-container footer-inner">
        <div>
          <p class="footer-title">MITI</p>
          <p class="footer-copy">
            娱乐向人格测试。所有判定都在本地浏览器完成，不上传答题数据。
          </p>
        </div>
        <div class="footer-links">
          <RouterLink to="/quiz">重新测一次</RouterLink>
          <RouterLink to="/characters">浏览角色</RouterLink>
          <RouterLink to="/about">查看说明</RouterLink>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.app-shell {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.site-header {
  position: sticky;
  top: 0;
  z-index: 30;
  backdrop-filter: blur(14px);
  background: rgba(9, 15, 28, 0.78);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.shell-container {
  width: min(1180px, calc(100% - 2rem));
  margin: 0 auto;
}

.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  min-height: 74px;
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 0.9rem;
}

.brand-mark {
  display: grid;
  place-items: center;
  width: 52px;
  height: 52px;
  border-radius: 18px;
  background: linear-gradient(145deg, #ffbf6b, #ff7d7d 48%, #6ea8ff);
  color: #09101d;
  font-size: 1rem;
  font-weight: 900;
  letter-spacing: 0.08em;
}

.brand-copy {
  display: flex;
  flex-direction: column;
  line-height: 1.1;
}

.brand-copy strong {
  font-size: 1rem;
  color: #f5f7fb;
}

.brand-copy small {
  color: #b3bdd5;
  margin-top: 0.25rem;
}

.site-nav {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.site-nav a {
  color: #c8d0e6;
  font-weight: 700;
  padding: 0.5rem 0.85rem;
  border-radius: 999px;
  transition: background-color 0.2s ease, color 0.2s ease;
}

.site-nav a.router-link-active {
  color: #09101d;
  background: #f6d78f;
}

.site-main {
  flex: 1;
}

.site-footer {
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  background: #09101d;
}

.footer-inner {
  display: flex;
  justify-content: space-between;
  gap: 1.5rem;
  padding: 2rem 0 2.5rem;
}

.footer-title {
  margin: 0;
  font-size: 1.05rem;
  font-weight: 900;
  color: #f2f5fb;
}

.footer-copy {
  max-width: 520px;
  margin: 0.6rem 0 0;
  color: #a4adbf;
  line-height: 1.7;
}

.footer-links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  align-content: flex-start;
}

.footer-links a {
  color: #f6d78f;
  font-weight: 700;
}

@media (max-width: 900px) {
  .header-inner,
  .footer-inner {
    flex-direction: column;
    align-items: flex-start;
  }

  .site-nav {
    width: 100%;
  }
}
</style>
