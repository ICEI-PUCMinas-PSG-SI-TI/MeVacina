// Função para realizar o login
function loginUser(event) {
    // Previne o envio do formulário para tratar o login sem recarregar a página
    event.preventDefault();

    // Obtém os valores dos campos de e-mail e senha
    const email = document.getElementById("username").value;
    const senha = document.getElementById("password").value;

    // Carrega os dados dos usuários cadastrados do localStorage
    const dbUsuarios = JSON.parse(localStorage.getItem("db_usuarios")) || { usuarios: [] };

    // Verifica se o e-mail e a senha correspondem a algum usuário cadastrado
    const usuarioValido = dbUsuarios.usuarios.find(
        usuario => usuario.email === email && usuario.senha === senha
    );

    if (usuarioValido) {
        // Se o login for bem-sucedido, redireciona para a página inicial
        alert("Login bem-sucedido!");
        window.location.href = "index.html";
    } else {
        // Exibe uma mensagem de erro caso o e-mail ou senha estejam incorretos
        alert("E-mail ou senha incorretos. Tente novamente.");
    }
}

// Adiciona um ouvinte de evento ao formulário de login
document.getElementById("login-form").addEventListener("submit", loginUser);
