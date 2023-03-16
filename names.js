let form = document.getElementById("form");
    form.addEventListener("submit", (event) => {
    event.preventDefault();
    let name = document.getElementById("name").value;
    try {
        if (name === "") {
            throw new Error("Name cannot be blank!");
        }
    console.log("Hello, " + name + "!");
    } 
        catch (error) {
            console.log("An error occurred:", error.message);
        }
})
