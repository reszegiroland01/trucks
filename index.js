function getData() {
    fetch("http://localhost:8000/api/user/2/site")
        .then(x => x.json())  
        .then(y => {renderUsers(y.data),check(y.data,"CA"),getPostalCode(y.data)})

}

let filter = null

let postalCodes = []

function renderUsers(users) {
    let container = document.getElementById("data-container");
    console.log(users)
    users.forEach(user => {
        let userDiv = document.createElement('div');
        userDiv.classList.add('userDataDiv');  
        
        let userHTML = '<h1>Felhasználók listája</h1>'
        userHTML  += `
            <p onclick="navigateTo(${user.id})"><strong>Felhasználó ID:</strong> ${user.id}</p>
            <p><strong>Neve:</strong> ${user.name}</p>
            <p><strong>Cím:</strong> ${user.address}</p>
            <p><strong>Telefonszám:</strong> ${user.phone_number}</p>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>Nyitási idő:</strong> ${user.open_time}</p>
            <p><strong>Zárási idő:</strong> ${user.close_time}</p>
            <p><strong>Kapacitás:</strong> ${user.capacity}</p>
            <p><strong>Menedzser neve:</strong> ${user.manager_name}</p>
        `;

        userDiv.innerHTML = userHTML
        container.appendChild(userDiv);

        // Kamionok vizsgálata
        if (user.trucks.length > 0) {
            let trucksDiv = document.createElement('div');
            trucksDiv.classList.add('trucksData');  

            let trucksHTML = '<h3>Kamionok:</h3>';
            user.trucks.forEach(trucksData => {
                trucksHTML += `
                    <p><strong>ID:</strong> ${trucksData.id}</p>
                    <p><strong>Rendszám:</strong> ${trucksData.license_plate}</p>
                    <p><strong>Szín:</strong> ${trucksData.color}</p>
                    <p><strong>Motor Lóerő:</strong> ${trucksData.engine_power}</p>
                    <p><strong>Súly:</strong> ${trucksData.weight}</p>
                    <p><strong>Mérföld:</strong> ${trucksData.mileage}</p>
                    <p><strong>Sofőr:</strong> ${trucksData.driver_name}</p>
                `;
            });

            trucksDiv.innerHTML = trucksHTML;  // Beállítjuk a belső HTML-t a kamion adatokhoz
            userDiv.appendChild(trucksDiv);  // Hozzáadjuk a trucksDiv-et a userDiv-hez
        } 
        else {
            let noTrucksDiv = document.createElement('div');
            noTrucksDiv.innerHTML = '<p><strong>Kamionok:</strong> Nincs adat</p>';
            userDiv.appendChild(noTrucksDiv);  // Hozzáadjuk a "nincs adat" üzenetet, ha nincs kamion       
        }   


        // Havi összesítők vizsgálata
        if (user.monthly_summarys && user.monthly_summarys.length > 0) {
            let summaryDiv = document.createElement('div');
            summaryDiv.classList.add('summaryData');  // CSS osztály hozzáadása a styling miatt

            let summaryHTML = '<h3>Havi összesítők:</h3>';
            user.monthly_summarys.forEach(summary => {
                summaryHTML += `
                    <p><strong>ID:</strong> ${summary.id}</p>
                    <p><strong>Hónap:</strong> ${summary.month}</p>
                    <p><strong>Bevétel:</strong> ${summary.income}</p>
                    <p><strong>Kiadás:</strong> ${summary.expenses}</p>
                    <hr>`;
            });

            userDiv.appendChild(summaryDiv);  
        } else {
            let noSummaryDiv = document.createElement('div');
            noSummaryDiv.innerHTML = '<p><strong>Havi összesítők:</strong> Nincs adat</p>';
            userDiv.appendChild(noSummaryDiv);  
        }
    });
}

getData();

function check(sites,filterOption){
    let db = 0
    sites.forEach((site) =>{
        if(site.address.includes(filterOption) ){
            db ++
            
        }
    })

    console.log(db)
}

function getPostalCode(sites)
{
    
    sites.forEach((site)=>{
       let postalCode = site.address.split(",")
       let postalCodeSecond = postalCode[postalCode.length-1]
       let address = postalCodeSecond.split(" ")
       if(address[1] !== undefined &&!postalCodes.includes(address[1] ))
       {
        postalCodes.push(address[1])
       }
       
    })
    console.log(postalCodes)
    fillOptions()
}

function fillOptions(){
    let target = document.getElementById("postalCodes")
    let item = ""
    postalCodes.forEach((code)=>{
        item += '<option value="'+code+'">'+code+'</option> '
    })
    target.innerHTML=item
}

function select(){
    filter = document.getElementById("postalCodes").value 
    fetch("http://localhost:8000/api/user/2/site")
        .then(x => x.json())  
        .then(y => {filterStates(y.data)})
    //alert(filter)

}

function filterStates(data){
    let result = []
    if(filter !== null)
    {
        
        data.forEach((site)=>{
            let postalCode = site.address.split(",")
            let postalCodeSecond = postalCode[postalCode.length-1]
            let address = postalCodeSecond.split(" ")
            if(address[1] === filter){
                result.push(site)
            }
        })
        let container = document.getElementById("data-container");
        container.innerHTML = "";  
        renderUsers(result)
        
    }
    else{
        return
    }
}

function navigateTo(siteId){
    localStorage.setItem("siteId", `${siteId}`);
    window.location.href = `../userSites/index.html`
    

}


