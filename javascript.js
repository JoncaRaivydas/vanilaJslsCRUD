let body=document.querySelector("body");
body.setAttribute("id", "bodis");

let produktoKodas=document.createElement("input");
produktoKodas.setAttribute("placeholder", "Produkto kodas(id)");
produktoKodas.setAttribute("class", "irasymai");
produktoKodas.setAttribute("id", "id");
body.appendChild(produktoKodas);

let pavadinimas=document.createElement("input");
pavadinimas.setAttribute("placeholder", "Pavadinimas");
pavadinimas.setAttribute("class", "irasymai");
pavadinimas.setAttribute("id", "name");
body.appendChild(pavadinimas);

let kiekis=document.createElement("input");
kiekis.setAttribute("placeholder", "Kiekis");
kiekis.setAttribute("class", "irasymai");
kiekis.setAttribute("id", "quantity");
body.appendChild(kiekis);

let patvirtintiMygtukas=document.createElement("button");
patvirtintiMygtukas.innerText=("Irasyti");
body.append(patvirtintiMygtukas);


document.addEventListener('DOMContentLoaded', function () {//uzkrauna puslapi tada tikrina local storage
    if (localStorage.getItem("pirkiniai")) {
      const pirkiniai = JSON.parse(localStorage.getItem("pirkiniai"));//parsitraukia verte is localstorage
    }
    if(pirkiniai===null){//jei verte yra null tada localstorage sukuria tuscia masyva
      const pirkiniai = [];
      localStorage.setItem("pirkiniai", JSON.stringify(pirkiniai));
    }
  });
  
  const pirkiniai = JSON.parse(localStorage.getItem("pirkiniai"));//priskiria localstorage verte masyvui

  localStorage.setItem("pirkiniai", JSON.stringify(pirkiniai));
  lentelesIrasymas(pirkiniai);//sukuria lentele is local storage duomenu

function patikrinti(input){//tikrina ar ivesti duomenys yra tinkamo tipo
    let i=0;
    if(Number.isNaN(parseInt(input.value))){
        let i=0;
                alert(`neteisingai ivesti duomenys i ${input.placeholder} eilute`);
                return i
            }
        i=1;
        return i
}
function isvalytiLaukus(){//isvalo input laukus
    document.querySelectorAll("input.irasymai").forEach(x=>{
        x.value=("");
    })
}
function irasymasILS(masyvasIsLS, tikrinamasMasyvas){//iraso i masyva vertes jei juos nesikartoja localstorage(pagal id)
    let k=1;
    for (let i=0; i<masyvasIsLS.length; i++){
        if(masyvasIsLS[i].id==tikrinamasMasyvas.id){
            k=0;
            console.log("break");
            break;
        }}
    if(k==1){
        masyvasIsLS[(masyvasIsLS.length)]=tikrinamasMasyvas;
    }
    }
function lentelesIrasymas(masyvasIsLS){//iraso lentele
    const element=document.getElementById("lentele");//paziuri ar lentele pagal id jau egzistuoja kaip elementas, jei taip ja istrina, kad galetu irasyti nauja lentele
    if(element!=null){
        element.remove();
    } 
    if(masyvasIsLS!=null){//patikritna ar yra is ko irasyti lentele, jei pradine verte nera null tada vykdo lenteles irasyma
    let lentele=document.createElement("table");//sukuria lentele
    lentele.setAttribute("id", "lentele");//prideda irasytai lentelei id
    body.append(lentele);

    for(let i=0; i<masyvasIsLS.length; i++){//suka pirma cikla pagal eiluciu skaiciu
        let formosEilute=document.createElement("tr");
        lentele.append(formosEilute);

        for(let j=0; j<(document.querySelectorAll("input.irasymai").length); j++){//suka antra cikla kiek eiluteje bus stulpeliu
            let formosStulpelis=document.createElement("td");
            formosStulpelis.innerText=(Object.values(masyvasIsLS[i])[j]);//iveda i cell vertes is input
            formosStulpelis.style.border="1px solid black";//stilizuoja cell
            formosStulpelis.style.width="100px";
            formosStulpelis.style.height= "40px";
            formosStulpelis.style.textAlign="center";
            formosEilute.append(formosStulpelis);
            
        }
    }}
}



patvirtintiMygtukas.addEventListener("click", ()=>{//funkcija atlikti kai paspaudzia "irasyti"
    const sarasas={};//sukuria objekta
    const duomenysKuriuosIrasysime=Object.create(sarasas);//sukurta objekta ideda i masyva
    
    if (patikrinti(document.querySelector("#id"))==1 && patikrinti(document.querySelector("#quantity"))==1){//tikrina ar visos ivestos reiksmes i input yra galimos
        duomenysKuriuosIrasysime.id=document.querySelector("#id").value;//sukuria objekto "id" dali ir priskiria reiksmes
        duomenysKuriuosIrasysime.name=document.querySelector("#name").value;//sukuria objekto "name" dali ir priskiria reiksmes
        duomenysKuriuosIrasysime.quantity=document.querySelector("#quantity").value;//sukuria objekto "quantity" dali ir priskiria reiksmes
        isvalytiLaukus();//isvalo input
        irasymasILS(pirkiniai, duomenysKuriuosIrasysime);//patikrina ar duomenys nesikartoja ir juos prideda i masyva
        lentelesIrasymas(pirkiniai);//sukuria lentele 
        localStorage.setItem("pirkiniai", JSON.stringify(pirkiniai));//ikelia masyva i localstorage
        console.log(localStorage.getItem("pirkiniai"));
    }
})