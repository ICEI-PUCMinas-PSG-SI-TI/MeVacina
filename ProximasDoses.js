// Função para carregar os dados da vacina selecionada e preencher o modal
function carregarDadosVacina(vacinaId) {
    // Dados das vacinas (simulação de um JSON)
    fetch('ProximasDoses.json')
      .then(response => response.json())
      .then(data => {
        const vacinas = data.vacinas;
  
        // Encontrar a vacina selecionada
        const vacina = vacinas.find(v => v.id === vacinaId);
  
        if (vacina) {
          // Preencher os campos do modal com os dados da vacina
          document.getElementById('vacinaNome').value = vacina.nome;
          document.getElementById('dataCampanha').value = vacina.data_campanha;
          document.getElementById('locaisDisponiveis').value = vacina.locais.join('\n');
        }
      })
      .catch(error => console.log("Erro ao carregar os dados: ", error));
  }
  
  // Escutando a mudança no seletor para carregar a vacina correta
  document.getElementById('vacinaSelect').addEventListener('change', function() {
    const vacinaId = parseInt(this.value, 10); 
    carregarDadosVacina(vacinaId); 
  });
  
  // Carregar os dados da vacina inicial (Febre Amarela) ao abrir o modal
  document.querySelector('[data-bs-toggle="modal"]').addEventListener('click', function() {
    const vacinaId = document.getElementById('vacinaSelect').value; 
    carregarDadosVacina(parseInt(vacinaId, 10)); 
  });
  