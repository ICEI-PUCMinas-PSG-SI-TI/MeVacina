// Simulando o banco de dados JSON com as vacinas
const vacinasDB = {
  "vacinas": [
    {
      "id": 1,
      "nome": "Febre Amarela",
      "aplicacoes": [
        { "data": "2024-12-01", "local": "Clínica Central" },
        { "data": "2024-12-15", "local": "Posto de Saúde da Vila" }
      ]
    },
    {
      "id": 2,
      "nome": "Gripe",
      "aplicacoes": [
        { "data": "2024-11-20", "local": "Hospital Municipal" }
      ]
    },
    {
      "id": 3,
      "nome": "Sarampo",
      "aplicacoes": [
        { "data": "2024-11-30", "local": "Posto de Saúde do Centro" }
      ]
    }
  ]
};

// Função para preencher o dropdown com as vacinas
function carregarVacinas() {
  const selectVacina = document.getElementById("vacinaSelect");

  // Limpar o dropdown
  selectVacina.innerHTML = '<option value="" selected>Selecione uma vacina</option>';

  // Adicionar as vacinas ao dropdown
  vacinasDB.vacinas.forEach(vacina => {
    const option = document.createElement("option");
    option.value = vacina.id;
    option.textContent = vacina.nome;
    selectVacina.appendChild(option);
  });
}

// Função para exibir as informações de todas as aplicações da vacina selecionada
function exibirInformacoesVacina(vacinaId) {
  const vacina = vacinasDB.vacinas.find(v => v.id === vacinaId);
  
  const infoContainer = document.getElementById("vacinaInfo");
  const aplicacoesList = document.getElementById("aplicacoesList");

  if (vacina) {
    // Atualizar o nome da vacina
    document.getElementById("vacinaNome").textContent = vacina.nome;

    // Limpar a lista de aplicações
    aplicacoesList.innerHTML = "";

    // Exibir todas as aplicações
    vacina.aplicacoes.forEach(aplicacao => {
      const item = document.createElement("li");
      item.textContent = `Data: ${aplicacao.data}, Local: ${aplicacao.local}`;
      aplicacoesList.appendChild(item);
    });

    // Mostrar o container de informações
    infoContainer.style.display = "block";
  }
}

// Função para remover uma vacina e todas as suas aplicações
function removerVacina(vacinaId) {
  const index = vacinasDB.vacinas.findIndex(v => v.id === vacinaId);
  
  if (index !== -1) {
    vacinasDB.vacinas.splice(index, 1);
    carregarVacinas(); // Recarrega as vacinas no dropdown
    document.getElementById("vacinaInfo").style.display = "none"; // Oculta as informações
  }
}

// Evento que dispara quando o modal é mostrado
document.getElementById('exampleModal').addEventListener('shown.bs.modal', function () {
  carregarVacinas();
});

// Evento que dispara quando uma vacina é selecionada
document.getElementById('vacinaSelect').addEventListener('change', function () {
  const vacinaId = parseInt(this.value);
  if (vacinaId) {
    exibirInformacoesVacina(vacinaId);
  } else {
    document.getElementById("vacinaInfo").style.display = "none";
  }
});

// Evento para remover a vacina
document.getElementById("removerButton").addEventListener("click", function () {
  const vacinaId = parseInt(document.getElementById("vacinaSelect").value);
  if (vacinaId) {
    removerVacina(vacinaId);
  }
});

