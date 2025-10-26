async function loadCommands() {
  const res = await fetch('commands.json');
  const categories = await res.json();

  const searchBox = document.getElementById('search');
  const categoryList = document.getElementById('category-list');
  const commandList = document.getElementById('command-list');

  // カテゴリリンク表示
  function renderCategories() {
    categoryList.innerHTML = categories.map(c => {
      // カテゴリの詳細ページ（最初のコマンドの index.html にリンク）
      const categoryIndex = c.commands[0].detail.replace(/\/[^/]+\.html$/, '/index.html');
      return `<div class="category"><a href="${categoryIndex}">${c.category}</a></div>`;
    }).join('');
  }

  // コマンド検索表示
  function renderCommands(filter="") {
    const f = filter.trim().toLowerCase();

    if(f === "") {
      renderCategories();
      commandList.innerHTML = "";
      return;
    }

    // 全カテゴリからコマンドを取得
    const allCommands = categories.flatMap(c => 
      c.commands.map(cmd => ({...cmd, category: c.category}))
    );

    const filtered = allCommands.filter(c =>
      c.command.toLowerCase().includes(f) ||
      c.description.toLowerCase().includes(f) ||
      c.category.toLowerCase().includes(f)
    );

    categoryList.innerHTML = "";
    commandList.innerHTML = filtered.map(c => `
      <div class="command">
        <strong>${c.category}</strong><br>
        <code>${c.command}</code><br>
        <small>${c.description}</small>
        ${c.detail ? `<a href="${c.detail}">詳細</a>` : ""}
      </div>
    `).join('');
  }

  renderCategories();
  searchBox.addEventListener('input', () => renderCommands(searchBox.value));
}

loadCommands();
