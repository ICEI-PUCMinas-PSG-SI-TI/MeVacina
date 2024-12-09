const gerenciarUsuarios = document.getElementById("gerenciarUsuarios");
const addContaLink = document.querySelector(".addConta-Sidebar");
const botaoGerenciarContas = document.querySelector(".botaoGerenciarContas");

//Adicionando um perfil
function adicionarPerfil(nome, idade) {
    const grupo = definirGrupoVacinal(idade);
    const novoPerfilHTML = `
        <li class="d-flex align-items-center justify-content-between mb-3">
            <div class="d-flex align-items-center">
                <img src="./img/avatar2.png" alt="Avatar Perfil" class="rounded-circle me-2 avatarPerfisSecundarios">
                <div>
                    <p class="mb-0 fw-bold" contenteditable="false">${nome}</p>
                    <small class="text-muted">Grupo Vacinal: ${grupo} - ${idade} anos</small>
                </div>
            </div>
            <i class="bi bi-x-circle-fill text-danger delete-icon" onclick="removerPerfil(this)" style="display: none;"></i>
        </li>`;
    gerenciarUsuarios.insertAdjacentHTML('beforeend', novoPerfilHTML);
}

// Função para definir grupo de vacinação com base na idade
function definirGrupoVacinal(idade) {
    if (idade < 2) return "Bebês";
    if (idade < 18) return "Infantil";
    if (idade < 60) return "Adultos";
    return "Idosos";
}

// Função para remover perfil
window.removerPerfil = function(elemento) {
    elemento.parentElement.remove();
}

// Evento para adicionar conta
// addContaLink.addEventListener("click", function(event) {
//     event.preventDefault();
//     const nome = prompt("Digite o nome do novo perfil:");
//     const idade = prompt("Digite a idade do novo perfil:");
//     if (nome && idade) {
//         adicionarPerfil(nome, parseInt(idade, 10));
//     }
// });

// Função para gerenciar perfis (editar e reorganizar)
botaoGerenciarContas.addEventListener("click", function() {
    const perfis = gerenciarUsuarios.querySelectorAll("li");
    const deleteIcons = gerenciarUsuarios.querySelectorAll(".delete-icon");

    // Alterna a visibilidade dos ícones de deletar
    deleteIcons.forEach(icon => {
        icon.style.display = (icon.style.display === 'none' || icon.style.display === '') ? 'inline' : 'none';
    });

    // Alterna entre o modo "Gerenciar" e "Confirmar"
    if (botaoGerenciarContas.textContent === "Gerenciar Contas") {
        perfis.forEach(perfil => {
            const nomeElemento = perfil.querySelector("p");
            nomeElemento.setAttribute("contenteditable", "true");
            
            // Adiciona botões de mover perfil
            perfil.insertAdjacentHTML('beforeend', `
                <i class="px-2 bi bi-arrow-up-circle-fill text-primary me-2" onclick="moverPerfil(this, 'up')"></i>
                <i class="bi bi-arrow-down-circle-fill text-primary" onclick="moverPerfil(this, 'down')"></i>
            `);
        });

        botaoGerenciarContas.textContent = "Confirmar";
    } else {
        perfis.forEach(perfil => {
            const nomeElemento = perfil.querySelector("p");
            nomeElemento.setAttribute("contenteditable", "false");
            
            // Remove ícones de mover
            perfil.querySelectorAll(".bi-arrow-up-circle-fill, .bi-arrow-down-circle-fill").forEach(icon => {
                icon.remove();
            });
        });

        botaoGerenciarContas.textContent = "Gerenciar Contas";
    }
});

// Função para mover o perfil para cima ou para baixo
window.moverPerfil = function(elemento, direcao) {
    const perfil = elemento.parentElement;
    if (direcao === "up" && perfil.previousElementSibling) {
        perfil.parentNode.insertBefore(perfil, perfil.previousElementSibling);
    } else if (direcao === "down" && perfil.nextElementSibling) {
        perfil.parentNode.insertBefore(perfil.nextElementSibling, perfil);
    }
};

function procurarUsuario(login, senha) {
    db_usuarios = JSON.parse(localStorage.getItem("db_usuarios")); 

    for (var i = 0; i < db_usuarios.usuarios.length; i++) {
        var usuario = db_usuarios.usuarios[i];
        if (login == usuario.login && senha == usuario.senha) {
            let usuarioEncontrado = {}
            usuarioEncontrado.id = usuario.id;
            usuarioEncontrado.login = usuario.login;
            usuarioEncontrado.nome = usuario.nome;

            // Retorna true para usuário encontrado
            return usuarioEncontrado;
        }
    }

    // Se chegou até aqui é por que não encontrou o usuário e retorna falso
    return false;
}

function adicionarPerfil2(){
    nome = document.getElementById("username").value
    senha = document.getElementById("password").value
    idade = document.getElementById("age").value

    usuario = procurarUsuario(nome, senha)

    if(usuario){
        adicionarPerfil(nome, idade)
        alert("usuário adicionado com sucesso")
        return
    }

    alert("usuário ou senha incorretos!")
    return
}

function apresentarDadosUsuario(){
    usuarioCorrente = sessionStorage.getItem("usuarioCorrente")
    usuarioCorrente = JSON.parse(usuarioCorrente)
    
    document.getElementById("nomeUser-principal").innerHTML = `${usuarioCorrente["nome"]}`
    document.getElementById("nomeUser-Sidebar").innerHTML = usuarioCorrente["nome"]
}

apresentarDadosUsuario()

function selecionarAvatar(avatarPath) {
    // Obter o usuário atual da sessão
    let usuarioCorrente = sessionStorage.getItem("usuarioCorrente");
    usuarioCorrente = JSON.parse(usuarioCorrente);

    if (!usuarioCorrente) {
        alert("Nenhum usuário logado. Não foi possível salvar o avatar.");
        return;
    }

    // Atualizar o avatar na interface
    document.getElementById("avatar-boasVindas").src = avatarPath;
    document.querySelector(".avatarSidebar").src = avatarPath;

    // Recuperar ou inicializar os dados de avatares no localStorage
    let avataresUsuarios = JSON.parse(localStorage.getItem("avataresUsuarios")) || {};

    // Associar o avatar ao login do usuário
    avataresUsuarios[usuarioCorrente.login] = avatarPath;
    localStorage.setItem("avataresUsuarios", JSON.stringify(avataresUsuarios));

    // Fechar o modal
    const modal = bootstrap.Modal.getInstance(document.getElementById("avatarModal"));
    modal.hide();
}

function carregarAvatar() {
    // Obter o usuário atual da sessão
    let usuarioCorrente = sessionStorage.getItem("usuarioCorrente");
    usuarioCorrente = JSON.parse(usuarioCorrente);

    if (!usuarioCorrente) {
        console.error("Nenhum usuário logado. Não é possível carregar avatar.");
        return;
    }

    // Recuperar os dados de avatares salvos
    let avataresUsuarios = JSON.parse(localStorage.getItem("avataresUsuarios")) || {};

    // Buscar o avatar para o usuário corrente ou usar o padrão - MUDAR PADRÃO FUTURAMENTE DEPENDENDO DO SEXO
    const avatarPath = avataresUsuarios[usuarioCorrente.login] || "./img/avatar25.png";

    // Atualizar o avatar na interface
    document.getElementById("avatar-boasVindas").src = avatarPath;
    document.querySelector(".avatarSidebar").src = avatarPath;
}

document.addEventListener("DOMContentLoaded", carregarAvatar);

document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.querySelector('.menu-toggle');
    const menuMobile = document.querySelector('.menu-mobile');

    // Alterna a visibilidade do menu mobile
    menuToggle.addEventListener('click', () => {
        // menuMobile.classList.toggle('active');
    });
});
// Página inicial de Login
const LOGIN_URL = "login.html";

// Objeto para o banco de dados de usuários baseado em JSON
var db_usuarios = {};

// Objeto para o usuário corrente
var usuarioCorrente = {};

// função para gerar códigos randômicos a serem utilizados como código de usuário
// Fonte: https://stackoverflow.com/questions/105034/how-to-create-guid-uuid
function generateUUID() { // Public Domain/MIT
    var d = new Date().getTime();//Timestamp
    var d2 = (performance && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16;//random number between 0 and 16
        if(d > 0){//Use timestamp until depleted
            r = (d + r)%16 | 0;
            d = Math.floor(d/16);
        } else {//Use microseconds since page-load if supported
            r = (d2 + r)%16 | 0;
            d2 = Math.floor(d2/16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}


// Dados de usuários para serem utilizados como carga inicial
const dadosIniciais = {
    usuarios: [
        { "id": generateUUID (), "login": "admin", "senha": "123", "nome": "Administrador do Sistema", "email": "admin@abc.com"},
        { "id": generateUUID (), "login": "user", "senha": "123", "nome": "Usuario Comum", "email": "user@abc.com"},
        { "id": generateUUID (), "login": "user2", "senha": "456", "nome": "Usuario Incomum", "email": "user@def.com"},
    ]
};


// Inicializa o usuarioCorrente e banco de dados de usuários da aplicação de Login
function initLoginApp () {
    // PARTE 1 - INICIALIZA USUARIOCORRENTE A PARTIR DE DADOS NO LOCAL STORAGE, CASO EXISTA
    usuarioCorrenteJSON = sessionStorage.getItem('usuarioCorrente');
    if (usuarioCorrenteJSON) {
        usuarioCorrente = JSON.parse (usuarioCorrenteJSON);
    }
    
    // PARTE 2 - INICIALIZA BANCO DE DADOS DE USUÁRIOS
    // Obtem a string JSON com os dados de usuários a partir do localStorage
    var usuariosJSON = localStorage.getItem('db_usuarios');

    // Verifica se existem dados já armazenados no localStorage
    if (!usuariosJSON) {  // Se NÃO há dados no localStorage
        
        // Informa sobre localStorage vazio e e que serão carregados os dados iniciais
        alert('Dados de usuários não encontrados no localStorage. \n -----> Fazendo carga inicial.');

        // Copia os dados iniciais para o banco de dados 
        db_usuarios = dadosIniciais;

        // Salva os dados iniciais no local Storage convertendo-os para string antes
        localStorage.setItem('db_usuarios', JSON.stringify (dadosIniciais));
    }
    else  {  // Se há dados no localStorage
        
        // Converte a string JSON em objeto colocando no banco de dados baseado em JSON
        db_usuarios = JSON.parse(usuariosJSON);    
    }
};


// Verifica se o login do usuário está ok e, se positivo, direciona para a página inicial
function loginUser (login, senha) {
    
    // Verifica todos os itens do banco de dados de usuarios 
    // para localizar o usuário informado no formulario de login
    for (var i = 0; i < db_usuarios.usuarios.length; i++) {
        var usuario = db_usuarios.usuarios[i];
        
        // Se encontrou login, carrega usuário corrente e salva no Session Storage
        if (login == usuario.login && senha == usuario.senha) {
            usuarioCorrente.id = usuario.id;
            usuarioCorrente.login = usuario.login;
            usuarioCorrente.email = usuario.email;
            usuarioCorrente.nome = usuario.nome;
            
            // Salva os dados do usuário corrente no Session Storage, mas antes converte para string
            sessionStorage.setItem ('usuarioCorrente', JSON.stringify (usuarioCorrente));

            // Retorna true para usuário encontrado
            return true;
        }
    }

    // Se chegou até aqui é por que não encontrou o usuário e retorna falso
    return false;
}

// Apaga os dados do usuário corrente no sessionStorage
function logoutUser () {
    usuarioCorrente = {};
    sessionStorage.setItem ('usuarioCorrente', JSON.stringify (usuarioCorrente));
    window.location = LOGIN_URL;
}

function addUser (nome, login, senha, email) {
    
    // Cria um objeto de usuario para o novo usuario 
    let newId = generateUUID ();
    let usuario = { "id": newId, "login": login, "senha": senha, "nome": nome, "email": email };
    
    // Inclui o novo usuario no banco de dados baseado em JSON
    db_usuarios.usuarios.push (usuario);

    // Salva o novo banco de dados com o novo usuário no localStorage
    localStorage.setItem('db_usuarios', JSON.stringify (db_usuarios));
}

function setUserPass () {
 
}


// Inicializa as estruturas utilizadas pelo LoginApp
initLoginApp ();