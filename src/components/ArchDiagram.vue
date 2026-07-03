<template>
  <div class="arch">
    <div class="arch__layer arch__layer--clients">
      <span class="arch__label">C 端</span>
      <div class="arch__nodes">
        <div class="arch__node">
          <strong>code-verse-uniapp</strong>
          <span>H5 / App / 小程序</span>
        </div>
        <div class="arch__node">
          <strong>code-verse-user</strong>
          <span>PC 用户站 :5667</span>
        </div>
      </div>
    </div>
    <div class="arch__arrow" aria-hidden="true">↓</div>
    <div class="arch__layer arch__layer--api">
      <span class="arch__label">API</span>
      <div class="arch__node arch__node--wide">
        <strong>code-verse-boot</strong>
        <span>/app-api/cverse/* · /admin-api/cverse/* · :48080</span>
      </div>
    </div>
    <div class="arch__arrow" aria-hidden="true">↓</div>
    <div class="arch__layer arch__layer--admin">
      <span class="arch__label">B 端</span>
      <div class="arch__node">
        <strong>code-verse-admin-vben</strong>
        <span>运营后台 :5666</span>
      </div>
    </div>
    <div class="arch__arrow" aria-hidden="true">↓</div>
    <div class="arch__layer arch__layer--data">
      <span class="arch__label">数据</span>
      <div class="arch__nodes">
        <div class="arch__node arch__node--small">MySQL cverse_*</div>
        <div class="arch__node arch__node--small">Redis</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.arch {
  display: grid;
  gap: 0.35rem;
  font-family: var(--mono);
  font-size: 0.8rem;
}

.arch__layer {
  display: grid;
  grid-template-columns: 4rem 1fr;
  gap: 0.75rem;
  align-items: start;
}

.arch__label {
  padding-top: 0.5rem;
  color: var(--accent-muted);
  letter-spacing: 0.08em;
}

.arch__nodes {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.arch__node {
  padding: 0.65rem 0.85rem;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.04);
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.arch__node strong {
  font-weight: 500;
  color: var(--paper-bright);
}

.arch__node span {
  opacity: 0.65;
  font-size: 0.72rem;
}

.arch__node--wide {
  width: 100%;
}

.arch__node--small {
  flex: 1;
  min-width: 120px;
}

.arch__arrow {
  text-align: center;
  opacity: 0.35;
  padding-left: 4rem;
  font-size: 0.9rem;
}
</style>
