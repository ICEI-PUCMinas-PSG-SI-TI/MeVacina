const BASE_URL = "http://localhost:3000";

async function checkSenha(email, password) {
    try {
        const response = await fetch(`${BASE_URL}/usuarios?email=${email}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (response.ok) {
            const data = await response.json();
            if (data.length > 0 && data[0]?.senha === password) {
                return data;
            } else {
                return; // Usuário não encontrado ou senha incorreta
            }
        } else {
            console.error("Erro na resposta do servidor:", response.status);
        }
    } catch (error) {
        console.error("Erro ao conectar ao servidor:", error);
        alert("Erro ao conectar ao servidor.");
    }
    return; // Indica erro
}

async function loginUser(event) {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("password").value.trim();

    if (!email || !senha) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    const usuarioValido = await checkSenha(email, senha);
    debugger;
    if (usuarioValido.length > 0) {
        sessionStorage.setItem('nomeUsuarioLogado', usuarioValido[0].nome);
        sessionStorage.setItem('emailUsuarioLogado', usuarioValido[0].email);
        alert("Login bem-sucedido!");
        window.location.href = "../indexCarol/index.html";
    } else if (usuarioValido === 0) {
        alert("E-mail ou senha incorretos. Tente novamente.");
    } else {
        alert("Erro ao tentar realizar login. Tente novamente mais tarde.");
    }
}

document.getElementById("login-form").addEventListener("submit", loginUser);
