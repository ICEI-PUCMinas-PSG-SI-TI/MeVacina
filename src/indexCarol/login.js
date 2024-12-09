 // URL base para comunicação com o backend
 const BASE_URL = "http://localhost:3000";

 async function checkSenha(email,senha) {

    
    try {
        // Faz um POST para a entidade `vacinasRegistradas`
        const response = await fetch(`${BASE_URL}/usuarios?senha=` + senha, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        
        if (response.ok) {
            const data = await response.json();
            if (data[0].senha)
                return true;
            else 
                return false;
        } else {
            return false;
        }
    } catch (error) {
        console.error("Erro ao conectar ao servidor:", error);
        alert("Erro ao conectar ao servidor.");
    }
 };


// Função para realizar o login
function loginUser(event) {
    // Previne o envio do formulário para tratar o login sem recarregar a página
    event.preventDefault();

    // Obtém os valores dos campos de e-mail e senha
    const email = document.getElementById("username").value;
    const senha = document.getElementById("password").value;
    
    const usuarioValido = checkSenha(email,senha);
    /*
    // Carrega os dados dos usuários cadastrados do localStorage
    const dbUsuarios = JSON.parse(localStorage.getItem("db_usuarios")) || { usuarios: [] };
    // Verifica se o e-mail e a senha correspondem a algum usuário cadastrado
    const usuarioValido = dbUsuarios.usuarios.find(
        usuario => usuario.email === email && usuario.senha === senha
    );*/

    if (usuarioValido) {
        // Se o login for bem-sucedido, redireciona para a página inicial
        alert("Login bem-sucedido!");
        window.location.href = "../indexCarol/index.html";
    } else {
        // Exibe uma mensagem de erro caso o e-mail ou senha estejam incorretos
        alert("E-mail ou senha incorretos. Tente novamente.");
    }
}

// Adiciona um ouvinte de evento ao formulário de login
document.getElementById("login-form").addEventListener("submit", loginUser);
