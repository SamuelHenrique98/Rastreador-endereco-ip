//variveis DOM
const inputPesquisa = document.querySelector('input#txtpesquisa');
const botaoPesquisa = document.querySelector('button.botao__pesquisa');
const camposResposta = document.querySelectorAll("p.lista__resposta")
var larguraTela = window.screen.width;

//Url + chave api
var chaveApi = 'https://geo.ipify.org/api/v2/country,city,vpn?apiKey=at_zAdI2Jqpd6RccxRRkmreiyMKUDXzZ&ipAddress=';

//variaveis padrões
var ipPadrao = '192.212.174.101';
var dataPadrao = montarUrl(ipPadrao);
var cordenadasPadrao = localizacao(dataPadrao);
var latitudePadrao = cordenadasPadrao[0];
var longitudePadrao = cordenadasPadrao[1];

//Chamada de funções padrões
placeholder();
informacoes(camposResposta, dataPadrao);
mapa(latitudePadrao, longitudePadrao);

//Evento Dom
botaoPesquisa.addEventListener('click', function() {
    let data = montarUrl(String(inputPesquisa.value));
    let cordenadas = localizacao(data);
    let lat = cordenadas[0];
    let lng = cordenadas[1];

    informacoes(camposResposta, data);
    mapa(lat, lng);
});

//Funções
function placeholder() {
    if (larguraTela >= 769) {
        inputPesquisa.setAttribute('placeholder', 'Search for any IP address')

        return;
    } 
    inputPesquisa.setAttribute('placeholder', '192.212.174.101')

    return;
}

function montarUrl(ip) {
    const url = chaveApi + ip;
    let request = fazGet(url);
    let data = JSON.parse(request);

    return data
}

function fazGet(url) {
    let request = new XMLHttpRequest();
    request.open("GET", url, false);
    request.send();

    return request.response
}

function localizacao(data) {
    let distancias = [];
    distancias.push(data.location.lat);
    distancias.push(data.location.lng);

    return distancias;
}


function informacoes(campos, data){
    campos.forEach( campo => {
        switch (campo.id) {
            case 'ip':
                campo.innerHTML = `${data.ip}`
                break;
                
            case 'localtion':
                campo.innerHTML = `${data.location.city}, ${data.location.region}, ${data.location.country}`
                break;
                
            case 'timezone':
                campo.innerHTML = `${data.location.timezone}`
                break;
                
            case 'isp':
                campo.innerHTML = `${data.isp}`
                break;
            
            default:
                break;
        }
    });
}

function mapa(latitude, longitude) {
    var mapaInicializado = L.DomUtil.get('map');
    if(mapaInicializado != null){
        mapaInicializado._leaflet_id = null;
    }

    var map = L.map('map').setView([latitude, longitude], 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
}