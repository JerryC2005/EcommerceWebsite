const form = document.getElementById("form");
const phoneRegex = /^[0-9]{10}$/g
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

//gets the products.json and displays the product 
fetch("products.json") // gets data from JSON
    .then(response => response.json()) // gets json data and converts it into array of objects
    .then(products => {
        const productGrid = document.querySelector(".product-grid");

        products.forEach(product => {
            const productCard = document.createElement("section");
            productCard.classList.add("product-card");

            const productImage = document.createElement("img");
            productImage.src = product.image;
            productImage.alt = product.name;

            const productSection = document.createElement("section");
            productSection.classList.add("product-section");

            const productName = document.createElement("h3");
            productName.classList.add("name");
            productName.textContent = product.name;

            const productDescription = document.createElement("p");
            productDescription.classList.add("description");
            productDescription.textContent = product.description;

            const productPrice = document.createElement("p");
            productPrice.classList.add("price");
            productPrice.textContent = `$${product.price.toFixed(2)}`;

            productSection.appendChild(productName);
            productSection.appendChild(productDescription);
            productSection.appendChild(productPrice);

            productCard.appendChild(productImage);
            productCard.appendChild(productSection);

            productGrid.appendChild(productCard);

        });
    })
    .catch(error => console.error("Error Loading Message", error))


// form validation    
form.addEventListener('submit', function(e) {
    e.preventDefault();// prevents form from submitting

    clearError();//clears previous error

    //validates each field w/ the designated rules
    const isValidFname = valid("fname", value => value.trim() !== "", "First Name is required.")
    const isValidLname = valid("lname", value => value.trim() !== "", "Last Name is required.")

    const isValidPhone = valid('phone', value => phoneRegex.test(value), 'Invalid phone number format')
    const isValidEmail = valid('email', value => emailRegex.test(value), 'Invalid email format')

    const isValidMsg = valid('comment', value => value.trim(value).length >= 5, 'Message must be at least 5 character long ')
    //if all fields valid it submits the form
    if(isValidFname && isValidLname && isValidPhone && isValidEmail && isValidMsg) {
        location.reload();
    }
})

//validation for individual fields
function valid(id, validate, errorMsg){
    const field = document.getElementById(id); //get the field element by id
    const errorField = document.getElementById(`${id}-error`);//gets the error message element
    const isValid = validate(field.value);// validates field using the passed function

    if (!isValid) {
        errorField.textContent = errorMsg;//displays the error message depending on the field
    }

    return isValid;// return when field is valid
}

//clears all error messages
function clearError() {
    const errorMsg = document.querySelectorAll(".error-message"); // selects all error messages
    errorMsg.forEach(error => (error.textContent = '')) //clear the text conent for each error
}


