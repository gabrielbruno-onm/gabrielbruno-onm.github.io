var inputEmail = window.document.querySelector("#inputEmail");
var inputBtn = window.document.querySelector("#submitButton");
var loaderBtn = window.document.querySelector(".lds-ring");

//Função para mudar a estética do form enquanto faz consulta de API
function aestheticOn() {
  inputBtn.style.background = "#0b7cac";
  inputBtn.value = "Carregando...";
  inputBtn.style.boxShadow = "none";
  loaderBtn.style.display = "inline-block";
}

//Função para voltar a estética ao normal após consulta de API
function aestheticOff() {
  inputBtn.style.background = "#dd004a";
  inputBtn.value = "Confirmar";
  inputBtn.style.boxShadow = "inherit";
  loaderBtn.style.display = "none";
}

function consultar() {
  aestheticOn();

  //Armazenando email:
  var userEmail = window.document
    .querySelector("#inputEmail")
    .value.toLowerCase();

  //Verificando se o e-mail é um e-mail válido:
  var validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (userEmail.match(validRegex)) {
    //Fazendo email virar JSON
    const payload = `{"email": "${userEmail}"}`;

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Connection: "keep-alive",
      },
      body: payload,
    };

    //Usando o e-mail para consultar na API:
    fetch("https://hook.us1.make.com/xueb5gx1yufx3v7gr6km55v47vkc4bwy", options)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        var offer_code = data.offer_code;
        var coupon_code = data.coupon_code;
        var errorMsg = data.error;
        console.log("Fetch");

        //Redirect
        if (offer_code) {
          urlHotmart = `https://pay.hotmart.com/?off=${offer_code}&offDiscount=${coupon_code}&sck=rabw2023&email=${encodeURIComponent(
            userEmail
          )}`;
          window.location.href = urlHotmart;
          aestheticOff();
        } else {
          alert(
            "Este email não está na lista de assinantes elegíveis para a oferta. Por favor, tente com outro e-mail."
          );
          console.log("Executei.");
          aestheticOff();
        }
      });
  } else {
    alert(`O texto digitado não é um e-mail. Por favor, tente novamente.`);
    aestheticOff();
  }
}
