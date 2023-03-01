import { html,LitElement} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';
// define the component



export class HelloWorld extends LitElement {
  
  
  static properties = {
    sentid: {type: String},
  };
  
  // return a promise for contract changes.
  static getMetaConfig() {
    return {
      controlName: 'Test SP LIST',
      fallbackDisableSubmit: false,
      version: '1.2',
      properties: {
        sentid: {
          type: 'string',
          title: 'sentid',
          description: ''
        },
        tokenArg: {
          type: 'string',
          title: 'tokenArg',
          description: ''
        },
        siteurlArg: {
          type: 'string',
          title: 'siteurlArg',
          description: ''
        },
        listnameArg: {
          type: 'string',
          title: 'listnameArg',
          description: ''
        }
      }
    };
  }
  



  constructor() {
    super();
    this.sentid = 'World';
  }
  



  render() {

    let bearertoken=this.tokenArg;
    let siteurl=this.siteurlArg;
    let listname=this.listnameArg;
    
    let col_items=[
              "Title",
              "EmployeeName",
              "EmployeeID",
              "EmployeeEmail",
              "EmployeeDepartment",
              "EmployeeDivision",
              "EmployeeGrade",
              "TrainingType",
              "TechnicalTrainingName",
              "TechnicalTrainingProviderName",
              "TechnicalTrainingObjective",
              "NonTechnicalTrainingCategory",
              "NonTechnicalTrainingCompetency",             
              "NonTechnicalTrainingCourse",
              "NonTechnicalTrainingCategory1",
              "NonTechnicalTrainingCompetency1",
              "NonTechnicalTrainingCourse1",
              "NonTechnicalTrainingPreferredLea",
              "NonTechnicalTrainingPreferredLea0"
    ]
    
    
    async function addnewFunc() ////////////////////////////////////////ADD NEW ITEM
    {
   //alert(document.getElementById("new1").value)

   const addurl = `${siteurl}/_api/web/lists/GetByTitle('${listname}')/items`;

  
   // Defining async function
   
       
       // Storing response
       let bodyy=`{  "__metadata": {
       "type": "SP.ListItem"
     },`
     col_items.forEach(function (field, i)
     
     {
       if (col_items.length!=i+1)
       {bodyy+=`"${field}": "${document.getElementById("new"+(i+1)).value}",`}
   else
   {bodyy+=`"${field}": "${document.getElementById("new"+(i+1)).value}"`}
   }
   );
     
             bodyy+="}"
   
         //console.log(bodyy)
       const response = await fetch(addurl, {
     method: "POST",
   
   
   
   
     headers: {
      // "Content-Type": "application/json"    --> option 1 (not working)
       "Authorization": `Bearer ${bearertoken}` ,
       "Accept":"application/json;odata=verbose",
       "Content-Type": "application/json;odata=verbose",
   
   
      // "Content-Type": "multipart/form-data"  
      // "Content-Type": "text/plain"    --> option 4
     },
   
    body:bodyy
   
   
   });
       
   location.reload();
    }

    
    
    
    
    
    
    
    
    async function updateitem(idd)////////////////////////UPDATE ITEM
    {
      const addurl = `${siteurl}/_api/web/lists/GetByTitle('${listname}')/items(${idd})`;
  
      // Defining async function
      
          
          // Storing response
      
              // Storing response
             let bodyy=`{  "__metadata": {
          "type": "SP.ListItem"
        },`
        col_items.forEach(function (field, i)
        
        {
          if (col_items.length!=i+1)
          {bodyy+=`"${field}": "${document.getElementById("curr"+idd+(i+1)).value}",`}
      else
      {bodyy+=`"${field}": "${document.getElementById("curr"+idd+(i+1)).value}"`}
      }
      );
        
                bodyy+="}"
          const response = await fetch(addurl, {
        method: "POST",
      
        headers: {
         // "Content-Type": "application/json"    --> option 1 (not working)
          "Authorization": `Bearer ${bearertoken}` ,
          "Accept":"application/json;odata=verbose",
          "Content-Type": "application/json;odata=verbose",
          "If-Match": "*",
          "X-HTTP-Method": "MERGE"
      
      
         // "Content-Type": "multipart/form-data"  
         // "Content-Type": "text/plain"    --> option 4
        },
      
       body:bodyy
      
      
      });
          
      location.reload();

    }
    
    
    
    
    
    
    
    async function deleteitem(idd)//////////////////DELETE ITEM
    {
      const delurl = `${siteurl}/_api/web/lists/GetByTitle('${listname}')/items(${idd})`;
      
    // Defining async function
    
        
        // Storing response
        const response = await fetch(delurl, {
      method: "POST",
    
      headers: {
       // "Content-Type": "application/json"    --> option 1 (not working)
        "Authorization": `Bearer ${bearertoken}`  ,
        "Accept":"application/json;odata=verbose",
        "Content-Type": "application/json",
        "If-Match": "*",
        "X-HTTP-Method": "DELETE"
       // "Content-Type": "multipart/form-data"  
       // "Content-Type": "text/plain"    --> option 4
      },
    
     
    
    });
        
    location.reload();
    }
    
    
  

    const api_url = 
    `${siteurl}/_api/web/lists/GetByTitle('${listname}')/items`;

// Defining async function
async function getapi(url) {
  
  // Storing response
  const response = await fetch(url, {
method: "GET",

headers: {
 // "Content-Type": "application/json"    --> option 1 (not working)
  "Authorization": `Bearer ${bearertoken}`,
  "Accept":"application/json"
 // "Content-Type": "multipart/form-data"  
 // "Content-Type": "text/plain"    --> option 4
},



});
  
  // Storing data in form of JSON
  var data = await response.json();
  console.log(data.value);

let tab="";

/*
  let tab = 
  `<table><tr>`
         for (let col of col_items){
          tab+=`<th>${col}</th>`
         } 

   tab+=`</tr>`;*/


// Loop to access all rows 
for (let r of data.value) {
  let datevar=null
  try{
    datevar=r.expirydate.split('T')[0]
  }catch{
    datevar=null
  }
    tab += `<div style ="border:1px solid black;">` 
      col_items.forEach(function (field, i)
      {

        tab+=` <label for="curr${r["Id"]}${i+1}" style="text-align: right; display: inline-block;width: 290px;">${field}</label><input style="padding-left:50px;" id=curr${r["Id"]}${i+1} value="${r[field]}"><br>`
      });

tab+=`<button id = "currdel${r.Id}"">DELETE</a>
<button id = "currupdate${r.Id}" ">UPDATE</a>        
</div><br><br><br>`;
}


/*
for (let r of data.value) {
  let datevar=null
  try{
    datevar=r.expirydate.split('T')[0]
  }catch{
    datevar=null
  }
    tab += `<tr>` 
      col_items.forEach(function (field, i)
      {

        tab+=`<td><input id=curr${r["Id"]}${i+1} value="${r[field]}"> </td>`
      });

tab+=`<td><button id = "currdel${r.Id}"">DELETE</a></td>
<td><button id = "currupdate${r.Id}" ">UPDATE</a></td>          
</tr>`;
}*/
// Setting innerHTML as tab variable
    // Setting innerHTML as tab variable
    /*
    tab += `<tr> `
      col_items.forEach(function (field, i)
          {

            tab+=`<td><input  id ="new${i+1}"  value=""></td>`
          });
    tab+=`<td><button id="newbtn">+</a></td>    </tr>`
    */

  // Setting innerHTML as tab variable



  var htmlObject = document.createElement('table');
  htmlObject.innerHTML=tab
  document.getElementById("actionpanel1-group-control").appendChild(htmlObject); 

  //document.getElementById ("newbtn").addEventListener ("click", addnewFunc, false);
  for (let r of data.value) {
  document.getElementById (`currdel${r.Id}`).addEventListener ("click", function(){ deleteitem(r.Id); });
  }

  for (let r of data.value) {
  document.getElementById (`currupdate${r.Id}`).addEventListener ("click", function(){ updateitem(r.Id); });
  }

    return htmlObject;
  }
  let res=getapi(api_url)
  return( "")
}

}
// registering the web component
const elementName = 'hello-world';
customElements.define(elementName, HelloWorld);



