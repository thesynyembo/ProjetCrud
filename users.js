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
let employer=[
  {
  id:id,  
  nom:"Nyembo",
  prenom:"Thesy",
  email:"nyembothesy@gmail.com",
  poste:"big_Développeuse",
  numeroTelephone:"+243823010561",
  estMarie: "false",
  pays:"RDC"
}
]
 
affichageTable(employer);
  
 function ClearTable(){
  tbody.textContent="";
  erreurnom.textContent="";
  erreurprenom.textContent="";
  erreurmail.textContent="";
  erreurnumero.textContent="";
  boutonModifier.style.display="none";
}


function initialiserInput(){
 nom.value="";
 prenom.value="";
 email.value="";
 numero.value="";
}


function affichageTable(employers){
  identifiant.style.display='none';  
  ClearTable();
  for(let employer of employers){
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
 btnupdate.setAttribute("class","bbtn btn-primary");
 btnupdate.setAttribute("data-target",employer.id);
 btnupdate.addEventListener('click',onUpdate);
 btnupdate.textContent="modifier";
 let tdModifier=document.createElement("td").appendChild(btnupdate);
 
 let btndelete=document.createElement("button");
 btndelete.setAttribute("type","button");
 btndelete.setAttribute("class","bbtn btn-danger");
 btndelete.setAttribute("data-target",employer.id);
 btndelete.setAttribute("id",employer.id);
 btndelete.textContent="supprimer";
 btndelete.addEventListener('click',(e)=>{
 const message=confirm("Accepte-vous de supprimer cet enregistrement");
     if(message){
  const tr=document.getElementById(e.target.attributes.id.nodeValue);
  tr.parentNode.removeChild(tr); 
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
}
 
boutonA.addEventListener('click', function(e){
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
      if(nom.value.length || prenom.value.length || email.value.length || numero.value.length ){
        employer.push({
          id:id,  
          nom:nom.value,
          prenom:prenom.value,
          email:email.value,
          poste:poste.value,
          numeroTelephone:numero.value,
          estMarie: status.value,
          pays:pays.value
         });
         affichageTable(employer);
         initialiserInput();
          }
         },false);
        


         function onUpdate(e){
          boutonA.style.display="none";
          boutonM.style.display="inherit";
          identifiant.style.display="inherit";
        
          let selechamp=employer.find(employers => employers.id == e.target.dataset.target);
          identifiant.value=selechamp.id;
          nom.value=selechamp.nom;
          prenom.value=selechamp.prenom,
          email.value=selechamp.email,
          poste.value=selechamp.poste,
          numero.value=selechamp.numeroTelephone,
          status.value=selechamp.estMarie,
          pays.value=selechamp.pays
        }
        
  boutonM.addEventListener('click',(e)=>{
    let index= employer.findIndex(employers => employers.id === identifiant.value);
     employer.splice(index,1,{
      id:id,  
      nom:nom.value,
      prenom:prenom.value,
      email:email.value,
      poste:poste.value,
      numeroTelephone:numero.value,
      estMarie: status.value,
      pays:pays.value
     })
     affichageTablee(employer);
     boutonM.style.display="none";
     boutonA.style.display="inherit";
     initialiserInput();
})