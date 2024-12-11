 // URL base para comunicação com o backend
 const BASE_URL = "http://localhost:3000";

 
// Função para gerar UUID para o ID do usuário
function generateUUID() {
    var d = new Date().getTime();
    var d2 = (performance && performance.now && (performance.now() * 1000)) || 0;
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16;
        if (d > 0) {
            r = (d + r) % 16 | 0;
            d = Math.floor(d / 16);
        } else {
            r = (d2 + r) % 16 | 0;
            d2 = Math.floor(d2 / 16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}


// Função de cadastro do usuário
function cadastroUsuario() {
    const nome = document.getElementById('nome').value;
    const sobrenome = document.getElementById('sobrenome').value;
    const senha = document.getElementById('senha').value;
    const confirmaSenha = document.getElementById('confirmaSenha').value;
    const email = document.getElementById('email').value;
    const cep = document.getElementById('cep').value;
    const cpf = document.getElementById('cpf').value;
    const dataNascimento = document.getElementById('dataNascimento').value;
    const grupoRisco = document.querySelector('input[name="grupoRisco"]:checked').value;
    const grupoRiscoSelect = document.getElementById('grupoRiscoSelect').value;

    // Verifica se as senhas coincidem
    if (senha !== confirmaSenha) {
        alert("As senhas não coincidem. Por favor, verifique.");
        return;
    }

    // Gera um ID para o novo usuário
    const usuarioId = generateUUID();

    // Cria o objeto do usuário com os dados do formulário
    const usuario = {
        id: usuarioId,
        nome: nome,
        sobrenome: sobrenome,
        senha: senha,
        email: email,
        cep: cep,
        cpf: cpf,
        dataNascimento: dataNascimento,
        grupoRisco: grupoRisco === "sim" ? grupoRiscoSelect : "Não pertence a grupo de risco"
    };

    // Obtém o banco de dados de usuários do localStorage ou inicializa uma lista vazia
    let dbUsuarios = JSON.parse(localStorage.getItem("db_usuarios")) || { usuarios: [] };

    // Adiciona o novo usuário ao banco de dados
    dbUsuarios.usuarios.push(usuario);

    // Salva o banco de dados atualizado no localStorage
    localStorage.setItem("db_usuarios", JSON.stringify(dbUsuarios));

    alert("Cadastro realizado com sucesso!");

    cadUsuario(usuario);

    
    // Redireciona para a página de login
    window.location.href = "login.html";
}

 async function cadUsuario(usuario){
    try {
        // Faz um POST para a entidade `vacinasRegistradas`
        const response = await fetch(`${BASE_URL}/usuarios`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(usuario)
        });

        
        if (response.ok) {
            alert("Usuario Cadastrado em db.json!");
                  } else {
            alert("Erro ao cadastrar o Usuario em db.json.");
        }
    } catch (error) {
        console.error("Erro ao conectar ao servidor:", error);
        alert("Erro ao conectar ao servidor.");
    }
    
}
// Ativa o campo de grupo de risco somente se o usuário marcar "Sim"
document.getElementById("grupoRiscoSim").addEventListener("change", function () {
    document.getElementById("grupoRiscoSelect").disabled = false;
});
document.getElementById("grupoRiscoNao").addEventListener("change", function () {
    document.getElementById("grupoRiscoSelect").disabled = true;
    document.getElementById("grupoRiscoSelect").value = "Escolha..."; // Reset do campo de seleção
});

// Evento do botão de cadastro
document.getElementById("concluirCadastro").addEventListener("click", cadastroUsuario);



