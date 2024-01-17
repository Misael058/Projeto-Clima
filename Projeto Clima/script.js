document.getElementById("pesquisar").addEventListener('submit', async (event) => {
    event.preventDefault();
    botao = document.getElementById("botaoVerificar");
    const nomeCidade = document.getElementById("nomeCidade").value;
    if (!nomeCidade) {
        return mostreErro("Não foi possível localizar");
    }
    const chaveApi = "13fd05456dd1fc84c957c1fb316d78b5";

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(
        nomeCidade
    )}&appid=${chaveApi}&units=metric&lang=pt_br`;

    try {
        botao.classList.add("show");

        const resultado = await fetch(apiUrl);
        const json = await resultado.json();
        console.log(json);

        if (json.cod === 200) {
            return resultadoFinal({
                cidade: json.name,
                pais: json.sys.country,
                umidade: json.main.humidity, 
                temperatura: json.main.temp,
                temperaturaMax: json.main.temp_max,
                temperaturaMin: json.main.temp_min,
                descricao: json.weather[0].description,
                icone: json.weather[0].icon,
                vento: json.wind.speed,
            });
        } else {
            mostreErro("Cidade não encontrada");
        }
    } catch (deuMerda) {
        mostreErro("sucesso!");
    }
});

function mostreErro(msg) {
    document.getElementById("erro").innerHTML = msg;
}

function resultadoFinal(json) {
    mostreErro("pronto!")
       botao.classList.remove("show");

    document.getElementById("title").innerHTML = json.cidade + ', ' + json.pais;
    document.getElementById("temp_value").innerHTML = json.temperatura;
    document.getElementById("temp_description").innerHTML = json.descricao;
    document.getElementById("temp_max").innerHTML = json.temperaturaMax;
    document.getElementById("temp_min").innerHTML = json.temperaturaMin;
    document.getElementById("humidity").innerHTML = json.main.humidity;
    document.getElementById("wind").innerHTML = json.wind.speed;

}
