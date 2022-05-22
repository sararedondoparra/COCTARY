window.onload = () => {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a')
        .then(data => {
            return data.json();
        })
        .then(data => {
            console.log(data);
            let lista = document.getElementById('listacocktails');
            data.drinks.forEach((item, index) => {
                if (item.strAlcoholic == "Alcoholic") {
                    let bebida = `<div id="${item.idDrink}" class="bebida alcohol">
                <span><img src="assets/images/conalcohol.png"></span>
                <span id="${item.strDrink}"> ${item.strDrink}</span>
                <span><img class="favoritos-icono" src="assets/images/nomegusta.png" alt="assets/images/conalcohol.png"></span>
                </div>`;
                    lista.innerHTML += bebida;
                } else {
                    let bebida = `<div id="${item.idDrink}" class="bebida no-alcohol">
                <span><img src="assets/images/sinalcohol.png"></span>
                <span id="${item.strDrink}"> ${item.strDrink}</span>
                <span><img class="favoritos-icono" src="assets/images/nomegusta.png" alt="assets/images/sinalcohol.png"></span>
                </div>`;
                    lista.innerHTML += bebida;
                }

            })
        })
        .then(() => {
            let alcohol = document.querySelectorAll('.alcohol');
            let noAlcohol = document.querySelectorAll('.no-alcohol');
            let btnAlcohol = document.querySelector('#alcohol');
            let btnSinAlcohol = document.querySelector('#no-alcohol');
            btnAlcohol.addEventListener('click', () => {
                btnAlcohol.classList.toggle('active');
                noAlcohol.forEach(item => {
                    if(item.classList.contains("block")){
                        item.classList.remove("block");
                    }else{
                        item.classList.add("block")
                    };
                });
            });
            btnSinAlcohol.addEventListener('click', () => {
                btnSinAlcohol.classList.toggle('active');
                alcohol.forEach(item => {
                    if(item.classList.contains("block")){
                        item.classList.remove("block");
                    }else{
                        item.classList.add("block")
                    };
                });
            });
            let detalleBebida = document.querySelectorAll('.bebida').forEach(item => {
                item.addEventListener('dblclick', cocktail);
            });
            let btnAdd = document.querySelectorAll('.favoritos-icono');
            console.log(btnAdd);
            btnAdd.forEach(item => {
                item.addEventListener('click', addBebida);
            })
            let db = new PouchDB('bebida');

            renderBebida();
            let bebidas;
            function addBebida(e) {
                e.target.src = "assets/images/me-gusta.png";
                let nombre = e.target.parentElement.parentElement.children[1].id;
                console.log(nombre);
                let categoria = e.target.alt;
                console.log(categoria);
                let nextBebida = bebidas.length + 1;
                console.log(bebidas.length);
        
                let doc = {
                    "_id": `${nextBebida}`,
                    "name": `${nombre}`,
                    "category": `<img src="${categoria}">`
                };
                db.put(doc);
        
                nombre = "";
                categoria = "";
                renderBebida();
        
            }
            function renderBebida() {
                let listaFavoritos = document.querySelector('.lista-favoritos');

        
                db.allDocs({ include_docs: true }, function (err, docs) {
                    if (err) {
                        return console.log(err);
                    } else {
                        bebidas = docs.rows;
                        bebidas.forEach(element => {
                            let bebida = `<div class="bebida">${element.doc.name}</div>`;
                            listaFavoritos.innerHTML += bebida;
                        })
                    }
                })
            }
        })

        let cocktail = (e) => {
            window.open(`cocktail.html?id=${e.currentTarget.id}`, "_self");
        }





    



}


