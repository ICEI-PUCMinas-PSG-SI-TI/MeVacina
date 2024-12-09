const BASE_URL = "http://localhost:3000"; // URL base para comunicação com o JSON Server

// Função para cadastrar uma vacina na entidade `vacinasRegistradas`
async function cadastrarVacina(event) {
    event.preventDefault();

    // Obtém os valores dos campos do formulário
    const vacina = document.getElementById("vacina").value;
    const idade = document.getElementById("idade").value;
    const dataPrimeiraDose = document.getElementById("dataPrimeiraDose").value;
    const diasProximaDose = document.getElementById("diasProximaDose").value;
    const dosesRestantes = document.getElementById("dosesRestantes").value;

    // Valida se todos os campos estão preenchidos
    if (!vacina || !idade || !dataPrimeiraDose || !diasProximaDose || !dosesRestantes) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    // Cria o objeto da nova vacina
    const novaVacina = {
        vacina,
        idade: parseInt(idade),
        dataPrimeiraDose,
        diasProximaDose: parseInt(diasProximaDose),
        dosesRestantes: parseInt(dosesRestantes)
    };

    try {
        // Faz um POST para a entidade `vacinasRegistradas`
        const response = await fetch(`${BASE_URL}/vacinasCadastradas`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(novaVacina)
        });

        if (response.ok) {
            alert("Vacina cadastrada com sucesso!");
            document.getElementById("formCadastro").reset(); // Limpa o formulário
        } else {
            alert("Erro ao cadastrar a vacina.");
        }
    } catch (error) {
        console.error("Erro ao conectar ao servidor:", error);
        alert("Erro ao conectar ao servidor.");
    }
}

// Inicialização do sistema: associa o evento de envio do formulário
window.onload = () => {
    const form = document.getElementById("formCadastro");
    form.addEventListener("submit", cadastrarVacina);
};
