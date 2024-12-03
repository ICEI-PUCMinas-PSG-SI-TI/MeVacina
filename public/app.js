function loginUser(login, senha) {

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
            sessionStorage.setItem('usuarioCorrente', JSON.stringify(usuarioCorrente));

            // Retorna true para usuário encontrado
            return true;
        }
    }

    // Se chegou até aqui é por que não encontrou o usuário e retorna falso
    return false;
}

function gerarPerfilHTML(nome) {

    var novo = <li class="d-flex align-items-center justify-content-between mb-3"> +
        <div class="d-flex align-items-center"> +
            <img src="/img/avatar4.png" alt="Avatar Perfil Secundário" class="rounded-circle me-2 avatarPerfisSecundarios"></img> +
            <div> +
                <p class="mb-0 fw-bold">${nome}</p> +
                <small class="text-muted">Grupo Vacinal: 4 meses</small> +
            </div> +
        </div> +
        <i class="bi bi-x-circle-fill text-danger"></i> +
    </li>
        
        return novo;
}

