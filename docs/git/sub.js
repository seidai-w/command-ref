(async function() {
  const res = await fetch('../../commands.json');
  const categories = await res.json();
  const categoryName = "git";
  const commands = categories.find(c => c.category === categoryName)?.commands || [];

  const searchBox = document.getElementById('search');
  const listContainer = document.getElementById('command-list');

  function render(filter="") {
    const f = filter.trim().toLowerCase();
    const filtered = commands.filter(c =>
      c.command.toLowerCase().includes(f) ||
      c.description.toLowerCase().includes(f)
    );

    listContainer.innerHTML = commands.map(c => `
    <div class="command">
        <code>${c.command}</code>
        <small>${c.description}</small>
        ${c.detail ? `<a href="../../${c.detail}">詳細</a>` : ""}
    </div>
    `).join('');
  }

  render();
  searchBox.addEventListener('input', () => render(searchBox.value));
})();
