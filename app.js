const inputFields = document.querySelectorAll("input");
const button = document.querySelector('button');
const errors = document.querySelectorAll(".errorSign");
const originalPlaceholders = ["First Name", "Last Name", "Email Address", "Password"];


button.addEventListener("click", doCheck);

function doCheck(e) {
    let regex = /^[a-z0-9][a-z0-9-_\.]+@([a-z]|[a-z0-9]?[a-z0-9-]+[a-z0-9])\.[a-z0-9]{2,10}(?:\.[a-z]{2,10})?$/;

    let form = document.querySelector("form");
    let errorMessages = form.querySelectorAll("p");
    if (errorMessages.length > 0) {
        for (let i = 0; i < errorMessages.length; i++) {
            errorMessages[i].parentNode.removeChild(errorMessages[i]);

            /*vagy:*/
            /*   errorMessages.forEach(errorMessage => {
                  errorMessage.remove();
                 
              }); */

        }
        for (let i = 0; i < inputFields.length; i++) {
            inputFields[i].style = "";
            inputFields[i].value = "";
            inputFields[i].placeholder = originalPlaceholders[i];
            errors[i].style = "display: none";
        }
       
    } else {

        for (let i = 0; i < inputFields.length; i++) {
            if (inputFields[i].value === "") {
                inputFields[i].style = "border: 2px solid var(--red);";
                const name = inputFields[i].name;
                let p = document.createElement("p");
                messageFormating(p);
                inputFields[i].placeholder = "";
                p.innerText = `${name} cannot be empty`;
                inputFields[i].insertAdjacentElement("afterend", p);
                errors[i].style = "display: block";
            } else if (
                inputFields[i].value !== "" &&
                inputFields[i].name === "E-mail" &&
                !regex.test(inputFields[i].value)
            ) {
                inputFields[i].style = "border: 2px solid var(--red);";
                let p = document.createElement("p");
                messageFormating(p);
                inputFields[i].style.color = "var(--red)";
                inputFields[i].placeholder = "";
                p.innerText = "Looks like this is not an email";
                inputFields[i].insertAdjacentElement("afterend", p);
                errors[i].style = "display: block";
            } 
        }
    }
    e.preventDefault();
}


function messageFormating(message) {
    message.style.fontStyle = "italic";
    message.style.textAlign = "right";
    message.style.padding = "0 0 0 40%";
    message.style.color = "var(--red)";
}

