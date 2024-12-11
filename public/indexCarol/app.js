// Função para carregar dados do usuário autenticado e atualizar o DOM
async function carregarPerfil() {
    try {
        const response = await fetch("http://localhost:3000/usuarios");
        const usuarios = await response.json();

        // Obtém o usuário autenticado (simula autenticação)
        const usuarioCorrente = usuarios[0]; // Substitua isso por lógica real de autenticação.

        // Atualiza o nome do usuário no index.html
        document.getElementById("nomeUser-principal").textContent = usuarioCorrente.nome;
        document.querySelector(".nomeUser-Sidebar").textContent = usuarioCorrente.nome;

        // Carrega dados de vacinação
        carregarDadosVacinais(usuarioCorrente.id);
    } catch (error) {
        console.error("Erro ao carregar dados do usuário:", error);
    }
}

// Função para carregar dados de vacinação e preencher a página
async function carregarDadosVacinais(userId) {
    try {
        const response = await fetch("http://localhost:3000/vacinas");
        const vacinas = await response.json();

        // Exemplo de contagem de vacinas (personalize conforme necessário)
        const vacinasTomadas = vacinas.filter(v => v.status === "tomada");
        const proximasDoses = vacinas.filter(v => v.status === "proxima");
        const vacinasSugeridas = vacinas.filter(v => v.status === "sugerida");

        // Atualiza os valores no index.html
        document.querySelector(".tituloCardVacinal:nth-of-type(1) + h4").textContent = vacinasTomadas.length;
        document.querySelector(".tituloCardVacinal:nth-of-type(2) + h4").textContent = proximasDoses.length;
        document.querySelector(".tituloCardVacinal:nth-of-type(3) + h4").textContent = vacinasSugeridas.length;
    } catch (error) {
        console.error("Erro ao carregar dados vacinais:", error);
    }
}

// Função para renderizar perfis vinculados
async function carregarPerfisVinculados() {
    try {
        const response = await fetch("http://localhost:3000/perfisVinculados");
        const perfis = await response.json();

        const listaPerfis = document.getElementById("gerenciarUsuarios");
        listaPerfis.innerHTML = ""; // Limpa a lista antes de renderizar

        perfis.forEach(perfil => {
            const li = document.createElement("li");
            li.className = "d-flex align-items-center justify-content-between mb-3";
            li.innerHTML = `
                <div class="d-flex align-items-center">
                    <img src="/img/avatar${perfil.avatar}.png" alt="Avatar Perfil Secundário" class="rounded-circle me-2 avatarPerfisSecundarios">
                    <div>
                        <p class="mb-0 fw-bold">${perfil.nome}</p>
                        <small class="text-muted">${perfil.grupo}</small>
                    </div>
                </div>
                <i class="bi bi-x-circle-fill text-danger"></i>
            `;
            listaPerfis.appendChild(li);
        });
    } catch (error) {
        console.error("Erro ao carregar perfis vinculados:", error);
    }
}

// Inicializa a página
document.addEventListener("DOMContentLoaded", () => {
    carregarPerfil();
    carregarPerfisVinculados();
});
