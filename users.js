const nom=document.querySelector('#nom');
const prenom=document.querySelector('#prenom');
const status=document.querySelector('#status');
const poste=document.querySelector('#poste');
const numero=document.querySelector('#numero');
const email=document.querySelector('#email');
const pays=document.querySelector('#pays');
const identifiant=document.querySelector('#id')
const boutonA=document.querySelector('#boutonAjouter');
const boutonM=document.querySelector('#boutonModifier');

const erreurnom=document.querySelector('#erreurnom');
const erreurprenom=document.querySelector('#erreurprenom');
const erreurnumero=document.querySelector('#erreurnumero');
const erreurmail=document.querySelector('#erreurmail');
let tbody=document.querySelector("tbody"); 

let tabId=[];
let id;

do{
  id =  Math.floor(Math.random() * Math.floor(1000000))
} while(tabId.includes(id))
tabId.push(id);


affichageTable();


 function ClearTable(){
  tbody.textContent="";
  erreurnom.textContent="";
  erreurprenom.textContent="";
  erreurmail.textContent="";
  erreurnumero.textContent="";
  boutonM.style.display="none";
}


function initialiserInput(){
  nom.value="";
  prenom.value="";
  email.value="";
  numero.value="";
}
 
function affichageTable(){
  identifiant.style.display='none';  
  ClearTable();

  axios.get('http://167.71.45.243:4000/api/employes?api_key=uezhmgc')
.then((employers)=>{
  for(let employer of employers.data){
    let tr= document.createElement("tr");
    tr.setAttribute("id",employer.id);   

    let tdNom=document.createElement("td");
    tdNom.textContent=employer.nom;

    let tdPrenom=document.createElement("td");
    tdPrenom.textContent=employer.prenom;

    let tdStatus=document.createElement("td");
    tdStatus.textContent=employer.estMarie;

    let tdPoste=document.createElement("td");
    tdPoste.textContent=employer.poste;

    let tdTelephone=document.createElement("td");
    tdTelephone.textContent=employer.numeroTelephone;

    let tdEmail=document.createElement("td");
    tdEmail.textContent=employer.email;

    let tdPays=document.createElement("td");
    tdPays.textContent=employer.pays;
   
    let btnupdate=document.createElement("button");
    btnupdate.setAttribute("type","button");
    btnupdate.setAttribute("class","btn btn-primary");
    btnupdate.setAttribute("data-target",employer._id);
    btnupdate.addEventListener('click',onboutonModifier);
    btnupdate.textContent="modifier";
    let tdModifier=document.createElement("td").appendChild(btnupdate);
    
    let btndelete=document.createElement("button");
    btndelete.setAttribute("type","button");
    btndelete.setAttribute("class","btn btn-danger");
    btndelete.setAttribute("data-target",employer._id);
    btndelete.setAttribute("id",employer._id);
    btndelete.textContent="supprimer";
    btndelete.addEventListener('click',(e)=>{
    const message=confirm("êtes-vous sûr de vouloir supprimer");
        if(message){
          axios.delete(`http://167.71.45.243:4000/api/employes/${employer._id}?api_key=uezhmgc`)
                .then(function(reponse){
                    affichageTable();
                }).catch(function(erreur){
                    console.log(erreur.response)
                }) 
        }else{
            return;
        }
    })
    
    let tdDelete=document.createElement("td").appendChild(btndelete);
    tr.appendChild(tdNom);
    tr.appendChild(tdPrenom);
    tr.appendChild(tdStatus);
    tr.appendChild(tdPoste);
    tr.appendChild(tdTelephone);
    tr.appendChild(tdEmail);
    tr.appendChild(tdPays);
    tr.appendChild(tdModifier);
    tr.appendChild(tdDelete);
    tbody.appendChild(tr);
     }

})
}


boutonA.addEventListener('click',(e) => {

  tbody.innerHTML = '';
  e.preventDefault()

  let regex_text = /^[A-Z][a-z]+/;
  // let regex_entier = /^[0-9][0-9]/;
  let regex_email = /@|com/;
  let regex_numero = /^\+[0-9]/;
  
  
  if(!nom.value.length){
      erreurnom.innerText='le nom ne doit pas etre vide'
  }else if(regex_text.test(nom.value) == false){
      erreurnom.textContent = "Format nom incorrect";
    } else{
      erreurnom.textContent = "";
    }
  if(!prenom.value.length){
      erreurprenom.innerText='le nom ne doit pas etre vide'
  }else if(regex_text.test(prenom.value) == false){
      erreurprenom.textContent = "Format prénom incorrect";
    } else{
      erreurprenom.textContent = "";
    }
  if(!email.value.length){
      erreurmail.innerText='le mail ne doit pas etre vide'
  }else if(regex_email.test(email.value) == false){
      erreurmail.textContent = "Format email incorrect";
    } else{
      erreurmail.textContent = "";
    }
  if(!numero.value.length){
      erreurnumero.innerText='le numero ne doit pas etre vide'
  }else if(numero.value.length > 14 || regex_numero.test(numero.value) == false){
      erreurnumero.textContent = "Numero incorret";
    } else{
      erreurnumero.textContent = '';
    }
  if(nom.value.length || prenom.value.length || email.value.length || numero.value.length){
     axios.post('http://167.71.45.243:4000/api/employes?api_key=uezhmgc',{
      nom:nom.value,
      prenom:prenom.value,
      email:email.value,
      poste:poste.value,
      numeroTelephone:phone.value,
      estMarie: status.value,
      pays:pays.value
     })
      .then((response)=>{
          affichageTable();
          console.log(response);
      }).catch((err)=>{
          console.log(err.response.data)
      })
 initialiserInput();
  }
 },false);


 function onboutonModifier(e){
  let cle=e.target.dataset.target;
  axios.get(`http://167.71.45.243:4000/api/employes/${cle}?api_key=uezhmgc`)
        .then(function(response){
          boutonA.style.display="none";
          boutonM.style.display="inherit";
          identifiant.style.display="inherit";
          identifiant.value=response.data._id;
          nom.value=response.data.nom;
          prenom.value=response.data.prenom,
          email.value=response.data.email,
          poste.value=response.data.poste,
          numero.value=response.data.numeroTelenumero,
          status.value=response.data.estMarie,
          pays.value=response.data.pays
console.log(response.data)

        }).catch((error)=>{
          console.log(error);  
        })
}

  boutonM.addEventListener('click',(e)=>{
       let cle=identifiant.value;
       axios.put(`http://167.71.45.243:4000/api/employes/${cle}?api_key=uezhmgc`, {
        nom:nom.value,
        prenom:prenom.value,
        email:email.value,
        poste:poste.value,
        numeroTelenumero:numero.value,
        estMarie: status.value,
        pays:pays.value
      }).then(response => {
        console.log(response.data);
        affichageTable();  
        manipulateurForm.hideOverlay();
      }).catch(error => {
          console.log(error);
      });
       boutonA.style.display="none";
       boutonM.style.display="inherit";
       initialiserInput();
  })

