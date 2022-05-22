
window.onload = () => {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a')
    .then(data => {
        return data.json();
    })
    .then(data => {
        console.log(data);
        let lista = document.getElementById('listacocktails');
        data.drinks.forEach((item, index) => {
            if(item.strAlcoholic == "Alcoholic"){
                let bebida = `<div id="${item.idDrink}" class="bebida">
                <span><img src="assets/images/conalcohol.png" alt="icono-alcohol"></span>
                <span class="nombre-bebida">${item.strDrink}</span>
                <span><img class="favoritos-icono" src="assets/images/nomegusta.png" alt="icono-no-fav"></span>
                </div>`;
                lista.innerHTML += bebida;
            }else{
                let bebida = `<div id="${item.idDrink}" class="bebida">
                <span><img src="assets/images/sinalcohol.png" alt="icono-no-alcohol"></span>
                <span class="nombre-bebida">${item.strDrink}</span>
                <span><img class="favoritos-icono" src="assets/images/nomegusta.png" alt="icono-no-fav"></span>
                </div>`;
                lista.innerHTML += bebida;
            }
        })
    })
    .then(() => {
        let detalleBebida = document.querySelectorAll('.bebida').forEach(item => {
            item.addEventListener('click', cocktail);
        });
    })

    let cocktail = (e) => {
        window.open(`cocktail.html?id=${e.currentTarget.id}`);
    }
    let bebidas;

    let db = new PouchDB('bebidas');

    renderBebidas();

    let btnAdd = document.querySelectorAll('.favoritos-icono').forEach(item => {
        item.addEventListener("click", addBebida, false)

    });

    function addBebida(){
        e.target.src = "assets/images/me.gusta.png";
        let nombre = e.target.previousSibling;
        let categoria = nombre.previousSibling;
        let nextBebida = bebidas.lenght + 1;

        let doc = {
            "_id": `bebida${nextBebida}`,
            "name": nombre.value,
            "category": `${categoria}`
        };
        db.put(doc);

        nombre.value="";
        categoria.value="";
        renderBebidas();

    }
    function renderBebidas(){
        let listaFavoritos = document.querySelector('.lista-favoritos');
        listaFavoritos.innerHTML = "<h2>Cócteles favoritos</h2>";
    
        db.allDocs({include_docs: true}, function(err, docs) {
            if (err) {
                return console.log(err);
            } else {
                bebidas = docs.rows;
                bebidas.forEach(element => {
                    let bebida = `<div class="bebida">${element.doc.name}</div>`;
                    listaFavoritos.innerHTML += bebida;
                });
            }
        });
    }
}




