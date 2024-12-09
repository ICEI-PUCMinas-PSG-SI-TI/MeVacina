function loadVaccines(vacinas) {

  vacinas.map(vac => console.log(vac))
  const cardsContainer = document.getElementById('cardsContainer'); // Elemento onde os cartões serão adicionados
  cardsContainer.innerHTML = ''; // Limpa o container antes de adicionar novos cartões
  
 
  vacinas.map((vacina) => {

    const formattedDate = new Date(vacina.dataPrimeiraDose).toLocaleDateString('pt-BR');

    const cardHTML = `
    <div class="col-md-4 mb-4">
        <div class="card shadow-sm">
            <div class="card-body">
                <h5 class="card-title">${vacina.vacina}</h5>
                <p class="card-text text-muted">Data: ${formattedDate}</p>
                <p class="card-text">${vacina.dosesRestantes > 0 ? 'Próxima Dose' : 'Vacina Tomada'}</p>
                <a href="#" data-bs-toggle="modal" data-bs-target="#editModal" class="btneditar">
                    <img src="/img/editar.png" class="icon-editar">
                </a>
            </div>
        </div>
    </div>
    `;

    cardsContainer.innerHTML += cardHTML;
  })
}

// Função para carregar as vacinas do db.json
async function fazFetch() {
  try {
      const response = await fetch('../../fixtures/db.json')
      const data = await response.json()

      loadVaccines(data.vacinasCadastradas)
 
  } catch (error) {
      console.error('Erro ao carregar as vacinas:', error);
  }
}

// Chamada inicial para carregar as vacinas
fazFetch();

// Função para adicionar os eventos de edição aos novos botões
function attachEditEventListeners() {
  document.querySelectorAll('.btneditar').forEach((button) => {
      button.addEventListener('click', () => {
          const currentCard = button.closest('.card');

          if (currentCard) {
              const title = currentCard.querySelector('.card-title').textContent;
              const date = currentCard.querySelector('.card-text.text-muted').textContent.replace('Data: ', '');
              const status = currentCard.querySelector('.card-text:nth-of-type(2)').textContent;

              document.getElementById('vaccineTitle').value = title;
              document.getElementById('vaccineDate').value = date.split('/').reverse().join('-'); // Formato ISO
              document.getElementById('vaccineStatus').value = status;
          }
      });
  });
}





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







