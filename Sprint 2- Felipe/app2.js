// Variável para armazenar o cartão em edição
let currentCard = null;

document.querySelectorAll('.btneditar').forEach((button) => {
  button.addEventListener('click', (e) => {
    // Identifica o cartão relacionado ao botão
    currentCard = button.closest('.card');

    if (currentCard) {
      // Preenche os campos do modal
      const titleElement = currentCard.querySelector('.card-title').textContent;
      const dateElement = currentCard.querySelector('.card-text.text-muted').textContent.replace('Data: ', '');
      const statusElement = currentCard.querySelector('.card-text:nth-of-type(2)').textContent;

      document.getElementById('vaccineTitle').value = titleElement;
      document.getElementById('vaccineDate').value = dateElement.split('/').reverse().join('-'); // Formato ISO
      document.getElementById('vaccineStatus').value = statusElement;
    }
  });
});

// Ação ao clicar no botão "Salvar alterações" no modal
document.getElementById('saveChanges').addEventListener('click', () => {
  if (currentCard) {
    // Obtém os novos valores do formulário
    const newTitle = document.getElementById('vaccineTitle').value;
    const newDate = document.getElementById('vaccineDate').value.split('-').reverse().join('/'); // Formato DD/MM/AAAA
    const newStatus = document.getElementById('vaccineStatus').value;

    // Atualiza os valores do cartão
    currentCard.querySelector('.card-title').textContent = newTitle;
    currentCard.querySelector('.card-text.text-muted').textContent = `Data: ${newDate}`;
    currentCard.querySelector('.card-text:nth-of-type(2)').textContent = newStatus;

    // Fecha o modal
    const modalElement = document.getElementById('editModal');
    const modalInstance = bootstrap.Modal.getInstance(modalElement);
    modalInstance.hide();
  }
});

// Ação ao clicar no botão "Remover" no modal
document.getElementById('deleteCard').addEventListener('click', () => {
  if (currentCard) {
    // Remove o cartão atual
    currentCard.remove();
    currentCard = null;

    // Fecha o modal
    const modalElement = document.getElementById('editModal');
    const modalInstance = bootstrap.Modal.getInstance(modalElement);
    modalInstance.hide();
  }
});

// Seletores dos elementos de filtro
const yearFilterDropdown = document.querySelector('.dropdown-menu.year-filter');
const statusFilterDropdown = document.querySelector('.dropdown-menu.status-filter');

// Função para aplicar filtros
function applyFilters() {
  const selectedYear = document.querySelector('.dropdown-menu.year-filter .selected')?.textContent || 'Todos';
  const selectedStatus = document.querySelector('.dropdown-menu.status-filter .selected')?.textContent || 'Todos';

  // Seleciona todos os cartões
  const cards = document.querySelectorAll('.card');

  // Itera sobre os cartões e aplica os filtros
  cards.forEach((card) => {
    const cardDate = card.querySelector('.card-text.text-muted').textContent.replace('Data: ', '');
    const cardYear = cardDate.split('/')[2]; // Obtém o ano da data
    const cardStatus = card.querySelector('.card-text:nth-of-type(2)').textContent;

    // Verifica se o cartão deve ser exibido com base nos filtros
    const matchesYear = selectedYear === 'Todos' || cardYear === selectedYear;
    const matchesStatus = selectedStatus === 'Todos' || cardStatus === selectedStatus;

    if (matchesYear && matchesStatus) {
      card.style.display = 'block'; // Exibe o cartão
    } else {
      card.style.display = 'none'; // Oculta o cartão
    }
  });
}
// Fim do modal





// Evento para selecionar um ano no dropdown
yearFilterDropdown.addEventListener('click', (e) => {
  if (e.target.tagName === 'A') {
    // Remove a classe 'selected' de qualquer elemento previamente selecionado
    yearFilterDropdown.querySelectorAll('a').forEach((item) => item.classList.remove('selected'));

    // Adiciona a classe 'selected' ao item clicado
    e.target.classList.add('selected');

    // Aplica os filtros
    applyFilters();
  }
});

// Evento para selecionar um status no dropdown
statusFilterDropdown.addEventListener('click', (e) => {
  if (e.target.tagName === 'A') {
    // Remove a classe 'selected' de qualquer elemento previamente selecionado
    statusFilterDropdown.querySelectorAll('a').forEach((item) => item.classList.remove('selected'));

    // Adiciona a classe 'selected' ao item clicado
    e.target.classList.add('selected');

    // Aplica os filtros
    applyFilters();
  }
});





