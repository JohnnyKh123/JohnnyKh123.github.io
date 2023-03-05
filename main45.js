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
      //$filter=ProjectNo eq '123'
  
      // Defining async function
      
          
          // Storing response
      
              // Storing response
             let bodyy=`{  "__metadata": {
          "type": "SP.ListItem"
        },`
        col_items.forEach(function (field, i)
        
        {
          if (col_items.length!=i+1)
          {bodyy+=`"${field}": "${document.getElementById("curr"+idd+(i+1)).value}",`;
          }
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
  tab += `<div style ="margin: 10px 70px 70px;box-shadow: 0px 35px 50px rgba( 0, 0, 0, 0.2 );">
  <table style ="border-radius: 5px;font-size: 12px;font-weight: normal;border: none;border-collapse: collapse;white-space: nowrap;background-color: white;">
    <tr><th style="width:300px;color: #ffffff;background: #4FC3A1;text-align: center;">Field</th><th style="width:300px;color: #ffffff;background: #4FC3A1;text-align: center;">Value</th></tr>` 
  col_items.forEach(function (field, i)
  {

    tab+=` <tr><td style="text-align: center;border-right: 1px solid #f8f8f8;font-size: 12px;"><label for="curr${r["Id"]}${i+1}" >${field}</label></td><td style="border-right: 1px solid #f8f8f8;font-size: 12px;text-align: center;"><input style=" width:90%;border:none;" id=curr${r["Id"]}${i+1} value="${r[field]}"></td></tr>`
  });

tab+=`<tr><td style="border-right: 1px solid #f8f8f8;font-size: 12px;text-align: center;"><button id = "currdel${r.Id}"">DELETE</a></td>
<td style="border-right: 1px solid #f8f8f8;font-size: 12px;text-align: center;"><button id = "currupdate${r.Id}" ">UPDATE</a>   </td></tr></table>     
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



