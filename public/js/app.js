const form = document.querySelector("form");
const errorPara = document.getElementById("errorMsg");
const forecast = document.getElementById("forecast");

errorPara.style.color = "red";

form.addEventListener("submit",(e) => {
    e.preventDefault();
    let addr = document.querySelector("input").value;
    fetch("http://localhost:3000/weather?address=" + addr)
    .then((response, error) => {
        if( error ) {
            console.log( error );
        } else {
            response.json()
            .then( ( data ) => {
                if( data.error ) {
                    errorPara.textContent = data.error;
                    forecast.textContent = "";
                } else {
                    errorPara.textContent = "";
                    forecast.textContent = `${data.location}\n
                    ${data.r}`
                }
            })
        }
        
    })
})