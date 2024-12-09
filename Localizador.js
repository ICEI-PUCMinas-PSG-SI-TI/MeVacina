let map = L.map('map').setView([-15.7801, -47.9292], 4);
let marker;

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);

function buscarLocalizacao() {
    const cep = document.getElementById('cep').value.replace('-', '');
    if (cep.length === 8) {
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(response => response.json())
            .then(data => {
                if (data.erro) {
                    alert('CEP não encontrado.');
                    return;
                }
                document.getElementById('estado').value = data.uf;
                document.getElementById('regiao').value = data.localidade;

                const endereco = `${data.logradouro}, ${data.localidade}, ${data.uf}, Brasil`;
                return fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(endereco)}&addressdetails=1`);
            })
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    const latitude = parseFloat(data[0].lat);
                    const longitude = parseFloat(data[0].lon);

                    if (marker) {
                        map.removeLayer(marker);
                    }
                    marker = L.marker([latitude, longitude]).addTo(map);
                    map.setView([latitude, longitude], 15);
                } else {
                    alert('Coordenadas não encontradas para o endereço.');
                }
            })
            .catch(err => {
                console.error(err);
                alert('Erro ao buscar dados do CEP.');
            });
    } else {
        alert('Por favor, insira um CEP válido.');
    }
}
