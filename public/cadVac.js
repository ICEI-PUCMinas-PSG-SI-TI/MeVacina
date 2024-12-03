  // URL base para comunicação com o backend
  const BASE_URL = "http://localhost:3000";

  // Função para carregar dados do arquivo JSON
  async function carregarDados() {
      try {
          const response = await fetch(`${BASE_URL}/vacinas`);
          if (!response.ok) throw new Error("Erro ao carregar dados.");
          const data = await response.json();
          return data; // Retorna as vacinas do banco de dados
      } catch (error) {
          console.error(error);
          alert("Não foi possível carregar as vacinas.");
          return [];
      }
  }
  
  // Função para carregar os grupos dinamicamente
  async function carregarGruposSelect() {
      const vacinas = await carregarDados();
      const grupos = [...new Set(vacinas.map(vacina => vacina.grupo))]; // Extrai grupos únicos
  
      const selectGrupo = document.getElementById("grupo");
  
      // Limpa as opções de grupos
      selectGrupo.innerHTML = "<option value=''>Selecione um grupo</option>";
  
      // Adiciona cada grupo encontrado no select
      grupos.forEach(grupo => {
          const option = document.createElement("option");
          option.value = grupo;
          option.textContent = grupo.charAt(0).toUpperCase() + grupo.slice(1); // Capitaliza a primeira letra
          selectGrupo.appendChild(option);
      });
  }
  
  // Função para carregar vacinas no seletor
  async function carregarVacinasSelect() {
      const vacinas = await carregarDados();
      const selectVacina = document.getElementById("vacina");
  
      // Limpa as opções de vacinas
      selectVacina.innerHTML = "<option value=''>Selecione uma vacina</option>";
  
      // Adiciona cada vacina encontrada
      vacinas.forEach(vacina => {
          const option = document.createElement("option");
          option.value = vacina.vacina;
          option.textContent = `${vacina.vacina} - ${vacina.dosesRestantes || 0} doses restantes`;
          selectVacina.appendChild(option);
      });
  }
  
  // Função para filtrar vacinas por grupo
  async function filtrarVacinasPorGrupo() {
      const grupo = document.getElementById("grupo").value;
      const vacinas = await carregarDados();
      const selectVacina = document.getElementById("vacina");
  
      // Limpa as opções de vacinas
      selectVacina.innerHTML = "<option value=''>Selecione uma vacina</option>";
  
      // Filtra as vacinas de acordo com o grupo selecionado
      const vacinasFiltradas = vacinas.filter(vacina => vacina.grupo === grupo);
  
      vacinasFiltradas.forEach(vacina => {
          const option = document.createElement("option");
          option.value = vacina.vacina;
          option.textContent = `${vacina.vacina} - ${vacina.dosesRestantes || 0} doses restantes`;
          selectVacina.appendChild(option);
      });
  }
  
  // Função para cadastrar vacina
  async function enviarCadastro(event) {
      event.preventDefault();
  
      const vacina = document.getElementById("vacina").value;
      const idade = document.getElementById("idade").value;
      const dataPrimeiraDose = document.getElementById("dataPrimeiraDose").value;
      const diasProximaDose = document.getElementById("diasProximaDose").value;
      const dosesRestantes = document.getElementById("dosesRestantes").value;
  
      if (!vacina || !idade || !dataPrimeiraDose || !diasProximaDose || !dosesRestantes) {
          alert("Por favor, preencha todos os campos.");
          return;
      }
  
      const novoCadastro = {
          vacina,
          idade: parseInt(idade),
          dataPrimeiraDose,
          diasProximaDose: parseInt(diasProximaDose),
          dosesRestantes: parseInt(dosesRestantes)
      };
  
      try {
          const response = await fetch(`${BASE_URL}/vacinas`, {
              method: "POST",
              headers: {
                  "Content-Type": "application/json"
              },
              body: JSON.stringify(novoCadastro)
          });
  
          if (response.ok) {
              alert("Vacina cadastrada com sucesso!");
              document.getElementById("formCadastro").reset(); // Limpa o formulário
              carregarVacinasSelect(); // Atualiza o seletor
          } else {
              alert("Erro ao cadastrar a vacina.");
          }
      } catch (error) {
          console.error(error);
          alert("Erro ao conectar ao servidor.");
      }
  }
  
  // Função para exibir todas as vacinas
  async function mostrarVacinas() {
      const vacinas = await carregarDados();
      const resultado = document.getElementById("resultado");
  
      resultado.innerHTML = vacinas.map(vacina => `
          <p>Vacina: ${vacina.vacina} - Grupo: ${vacina.grupo || "Não especificado"} - Doses restantes: ${vacina.dosesRestantes}</p>
      `).join("");
  }
  
  // Função para exibir vacinas já tomadas
  async function mostrarVacinasTomadas() {
      const vacinas = await carregarDados();
      const vacinasTomadas = vacinas.filter(vacina => vacina.dataPrimeiraDose); // Filtro baseado no atributo dataPrimeiraDose
      const resultado = document.getElementById("resultado");
  
      resultado.innerHTML = vacinasTomadas.map(vacina => `
          <p>Vacina: ${vacina.vacina} - Data da Primeira Dose: ${vacina.dataPrimeiraDose} - Doses Restantes: ${vacina.dosesRestantes}</p>
      `).join("");
  }
  
  // Inicialização do sistema
  window.onload = async () => {
      await carregarGruposSelect();  // Carrega grupos no seletor
      await carregarVacinasSelect(); // Carrega vacinas no seletor
  };
  