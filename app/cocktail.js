let informacion;
let obtenerParam = (url) => {
    let urlParam = String(url.match(/\?+.+/));
    urlParam = urlParam.replace("?id=", "");
    return urlParam;
}

let param = obtenerParam(document.URL);

window.onload = () => {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${param}`)
    .then(res =>  res.json())
    .then(res => {
        console.log(res);
        let infoCocktail = document.querySelector('.info-cocktail');
        let cocktail = res.drinks[0];
        let contenido = `<div>
        <h2>${cocktail.strDrink}</h2>
        <img src="${cocktail.strDrinkThumb}">
        </div>
        <div class="info-texto">
        <div>${cocktail.strCategory}</div>
        <div>${cocktail.strAlcoholic}</div>
        <div>${cocktail.strGlass}</div>
        <div>Ingredientes
        <ul>
        <li>${cocktail.strIngredient1}</li>
        <li>${cocktail.strIngredient2}</li>
        <li>${cocktail.strIngredient3}</li>
        <li>${cocktail.strIngredient4}</li>
        </ul>
        </div>
        <div>Medidas
        <ul>
        <li>${cocktail.strMeasure1}</li>
        <li>${cocktail.strMeasure2}</li>
        <li>${cocktail.strMeasure3}</li>
        <li>${cocktail.strMeasure4}</li>
        </ul>
        </div>
        <div>${cocktail.strInstructions}</div>
        </div>`
        infoCocktail.innerHTML = contenido;
    })
}