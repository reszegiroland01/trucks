// let siteId = localStorage.getItem("siteId")
// let token = localStorage.getItem("token")

// console.log(token)

// document.getElementById("siteId").innerHTML=siteId
// console.log(siteId)

// function getData() {
//     fetch(`http://localhost:8000/api/user/2/site/${siteId}`)
//         .then(x => x.json())  
//         .then(y => {console.log(y.data)})
// }
// getData()

// async function getDataWithToken() {
//     try {
//       const response = await axios.get(`http://localhost:8000/api/user/2/site/${siteId}`, {
//         headers: {
//           Authorization:` Bearer ${token}`
//         }
//       });
//       console.log(response.data); // Az API válaszának megjelenítése
//       return response.data; // Az adatok visszaadása
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   }

function login() {
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value
    let credentials = {
        "email": `${email}`,
        "password": `${password}`
    }
    axios.post('http://localhost:8000/api/login', 
        credentials
    )
    .then(response => {
        // Mentés a token localStorage-be vagy sessionStorage-be
        localStorage.setItem('token', response.data.token);
        console.log("Login successful! Token:", response.data.token);
        window.location.href("./index.html")
    })
    .catch(error => {
        console.error("Login failed:", error.response ? error.response.data : error.message);
    });
    console.log("Email:", email, "Password:", password);
}

// function reset(){
//     localStorage.removeItem("token")
// }
// reset()


