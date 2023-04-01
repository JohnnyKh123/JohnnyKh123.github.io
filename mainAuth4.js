import { html,LitElement} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';
// define the component



export class HelloWorld extends LitElement {
  
  
  static properties = {
    sentid: {type: String},
  };
  
  // return a promise for contract changes.
  static getMetaConfig() {
    return {
      controlName: 'RS Plugin with Token',
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
        },
        wfIDArg: {
          type: 'string',
          title: 'wfIDArg',
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
    var spToken="";
    let bearertoken=this.tokenArg;
    let siteurl=this.siteurlArg;
    let listname=this.listnameArg;
    let wfID=this.wfIDArg;
    
    let col_items=[
              //"Title",
              "EmployeeName",
              //"EmployeeID",
              //"EmployeeEmail",
              //"EmployeeDepartment",
              //"EmployeeDivision",
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
              //"NonTechnicalTrainingPreferredLea0"
    ]
    
    
    async function addnewFunc() ////////////////////////////////////////ADD NEW ITEM
    {
   //alert(document.getElementById("new1").value)

   const addurl = `${siteurl}/_api/web/lists/GetByTitle('${listname}')/items`;
   //const addurl = `${siteurl}/_api/web/lists/GetByTitle('${listname}')/items?$filter=Reference_x0020_ID eq '${wfID}'`;

  
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
       "Authorization": `Bearer ${spToken}` ,
       "Accept":"application/json;odata=verbose",
       "Content-Type": "application/json;odata=verbose",
   
   
      // "Content-Type": "multipart/form-data"  
      // "Content-Type": "text/plain"    --> option 4
     },
   
    body:bodyy
   
   
   });
       
   location.reload();
    }

    
    
    
    
    
    
    
    
    async function updateitem(idd,mydata)////////////////////////UPDATE ITEM
    {
      const addurl = `${siteurl}/_api/web/lists/GetByTitle('${listname}')/items(${idd})`;
         //const addurl = `${siteurl}/_api/web/lists/GetByTitle('${listname}')/items?$filter=Reference_x0020_ID eq '${wfID}'`;

      
              // Storing response
             let bodyy=`{  "__metadata": {
          "type": "SP.ListItem"
        },`
  for (let r of mydata.value) {

    if(r.Id==idd){

      col_items.forEach(function (field, i)
  
  {

    if (col_items.length!=i+1)
    {
      let fieldvalue=document.getElementById("curr"+idd+(i+1));


      if(fieldvalue!=null && fieldvalue!="" && fieldvalue!=undefined && fieldvalue!=="null" && fieldvalue!=="" && fieldvalue!=="undefined"){

      console.log(document.getElementById("curr"+idd+(i+1)).innerHTML);
      bodyy+=`"${field}": "${document.getElementById("curr"+idd+(i+1)).innerHTML}",`}
    
     if(field=="NonTechnicalTrainingCategory" && document.getElementById(`NonTechnicalTrainingCategory${r["Id"]}${i+1}2`)!=null)   {
      bodyy+=`"${field}": "${document.getElementById(`NonTechnicalTrainingCategory${r["Id"]}${i+1}2`).value}",`
    }else if(field=="NonTechnicalTrainingCategory1" && document.getElementById(`NonTechnicalTrainingCategory1${r["Id"]}${i+1}2`)!=null)   {
      bodyy+=`"${field}": "${document.getElementById(`NonTechnicalTrainingCategory1${r["Id"]}${i+1}2`).value}",`
    }else if(field=="NonTechnicalTrainingCompetency" && document.getElementById(`NonTechnicalTrainingCompetency${r["Id"]}${i+1}2`)!=null)   {
      bodyy+=`"${field}": "${document.getElementById(`NonTechnicalTrainingCompetency${r["Id"]}${i+1}2`).value}",`
    }else if(field=="NonTechnicalTrainingCompetency1" && document.getElementById(`NonTechnicalTrainingCompetency1${r["Id"]}${i+1}2`)!=null)   {
      bodyy+=`"${field}": "${document.getElementById(`NonTechnicalTrainingCompetency1${r["Id"]}${i+1}2`).value}",`
    }else if(field=="NonTechnicalTrainingCourse" && document.getElementById(`NonTechnicalTrainingCourse${r["Id"]}${i+1}2`)!=null)   {
      bodyy+=`"${field}": "${document.getElementById(`NonTechnicalTrainingCourse${r["Id"]}${i+1}2`).value}",`
    }else if(field=="NonTechnicalTrainingCourse1" && document.getElementById(`NonTechnicalTrainingCourse1${r["Id"]}${i+1}2`)!=null)   {
      bodyy+=`"${field}": "${document.getElementById(`NonTechnicalTrainingCourse1${r["Id"]}${i+1}2`).value}",`
    }

    }
else
{
  let fieldvalue=document.getElementById("curr"+idd+(i+1));
  if(fieldvalue.innerHTML!=null && fieldvalue.innerHTML!="" && fieldvalue.innerHTML!="undefined"){
    console.log("else");;bodyy+=`"${field}": "${document.getElementById("curr"+idd+(i+1)).innerHTML}"`}}
}
);

    }

} 
        
                bodyy+="}"
          const response = await fetch(addurl, {
        method: "POST",
      
        headers: {
         // "Content-Type": "application/json"    --> option 1 (not working)
          "Authorization": `Bearer ${spToken}` ,
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
        "Authorization": `Bearer ${spToken}`  ,
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
    
    
  
  
    let tableFromJson = () => {

      const api_url = 
        `${siteurl}/_api/web/lists/GetByTitle('${listname}')/items?$filter=Reference_x0020_ID eq '${wfID}'`;
    
  // Defining async function
  async function getapi(url) {
      
  const get_token_url="https://eu.nintex.io/authentication/v1/token";
  const response1 = await fetch(get_token_url, {
  method: "POST",

  headers: {
    "Content-Type": "application/json" ,
    "Accept":"application/json"

  },

 body:JSON.stringify(
 {
            "client_id": "5e6ff929-99d8-452b-9b21-98d3b277ab70",
            "client_secret": "tRsOIItTRVsJtVsIKJtRsPMtVsQQtT2JtWUsOOtUsMPtRsNJPtPSsQMMtSsRtRSsFNtS2HsFMRMOFtRsKNIFPOtVsMNLOQJtS3D",
            "grant_type": "client_credentials"
    })

});

var data = await response1.json();
console.log(1);
    console.log(data["access_token"]);
var nwc_token=data["access_token"];

  const start_instance_url=`https://eu.nintex.io/workflows/v1/designs/ddec146a-9cef-4d20-87c8-a48fe8deda9e/instances`;
  const initiateresponse = await fetch(start_instance_url, {
  method: "POST",

  headers: {
    "Content-Type": "application/json" ,
    "Accept":"application/json",
    "Authorization":`Bearer ${nwc_token}` 

  },

});

var data = await initiateresponse.json();
console.log("2");
    console.log(data["id"]);
    var instance_id=data["id"];

  var token_available=false;
    do{
    const instance_details_url=`https://eu.nintex.io/workflows/v2/instances/${instance_id}`;
  const instance_details_response = await fetch(instance_details_url, {
  method: "GET",

  headers: {
    "Content-Type": "application/json" ,
    "Accept":"application/json",
    "Authorization":`Bearer ${nwc_token}` 

  },

});
var data = await instance_details_response.json();
console.log("3")
console.log(instance_details_response.status)  

try{  
  
console.log(data["actions"][3]["logMessage"]);
token_available=true
}
catch
{token_available=false}
var statuscode = instance_details_response.status
const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date <1200);
}while(token_available==false||statuscode==404)

    
spToken=data["actions"][3]["logMessage"];
      // Storing response
      const response = await fetch(url, {
    method: "GET",
  
    headers: {
     // "Content-Type": "application/json"    --> option 1 (not working)
      "Authorization": `Bearer ${spToken}`  ,
      "Accept":"application/json"
     // "Content-Type": "multipart/form-data"  
     // "Content-Type": "text/plain"    --> option 4
    },
  
   
  
  });
      
      // Storing data in form of JSON
      var data = await response.json();
      console.log(data.value);
  
      let tab=""
  
     
  //     for (let r of data.value) {
  //       let datevar=null
  //       try{
  //         datevar=r.expirydate.split('T')[0]
  //       }catch{
  //         datevar=null
  //       }
  //         tab += `<div style ="margin: 10px 70px 70px;box-shadow: 0px 35px 50px rgba( 0, 0, 0, 0.2 );">
  //           <table style ="border-radius: 5px;font-size: 12px;font-weight: normal;border: none;border-collapse: collapse;white-space: nowrap;background-color: white;">
  //             <tr><th style="width:300px;color: #ffffff;background: #4FC3A1;text-align: center;">Field</th><th style="width:300px;color: #ffffff;background: #4FC3A1;text-align: center;">Value</th></tr>` 
  //           col_items.forEach(function (field, i)
  //           {
  
  //             tab+=` <tr><td style="text-align: center;border-right: 1px solid #f8f8f8;font-size: 12px;"><label for="curr${r["Id"]}${i+1}" >${field}</label></td><td style="border-right: 1px solid #f8f8f8;font-size: 12px;text-align: center;"><input style=" width:90%;border:none;" id=curr${r["Id"]}${i+1} value="${r[field]}"></td></tr>`
  //           });
      
  //     tab+=`<tr><td style="border-right: 1px solid #f8f8f8;font-size: 12px;text-align: center;"><button id = "currdel${r.Id}"">DELETE</a></td>
  //     <td style="border-right: 1px solid #f8f8f8;font-size: 12px;text-align: center;"><button id = "currupdate${r.Id}" ">UPDATE</a>   </td></tr></table>     
  // </div><br><br><br>`;
  //     }

  
  for (let r of data.value) {
  console.log(r);
        let datevar=null
        try{
          datevar=r.expirydate.split('T')[0]
        }catch{
          datevar=null
        }
          let currentGrade = r.EmployeeGrade;
          let currentCategory = r.NonTechnicalTrainingCategory;
          let currentCompetency = r.NonTechnicalTrainingCompetency;
          
        var NTCategory="";
        tab += `<div style ="margin: 20px 70px 70px;padding: 20px;box-shadow: 0px 35px 50px rgba( 0, 0, 0, 0.2 );">
          
          <table style ="margin-left:auto;margin-right:auto;font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;border-collapse: collapse;width: 100% ;" WIDTH="600px">
            <tr><th style="color: white;background-color: #bac6c3;text-align: center;padding-bottom: 12px;border: 1px solid #bac6c3;padding: 8px;padding-top: 12px;">Field</th><th WIDTH="315px" style="color: white;background-color: #bac6c3;text-align: center;padding-bottom: 12px;border: 1px solid #bac6c3;padding: 8px;padding-top: 12px;">Value</th></tr>` 
          col_items.forEach(function (field, i)
          {
            let fieldVal = `${r[field]}`;
            if(fieldVal!=="null" && fieldVal!=="" && fieldVal!=="undefined"){
              let fieldId, listName, listFilter=""
              //?$filter=Reference_x0020_ID eq '${wfID}'`
            
            if(field=="NonTechnicalTrainingCategory"){
             
              tab+=` <tr><td style="text-align: left;border: 1px solid #bac6c3;padding: 8px;"><label for="curr${r["Id"]}${i+1}" >Non Technical Training Category</label></td><td WIDTH="315px" id="NonTechnicalTrainingCategory${r["Id"]}${i+1}" style="text-align: left;border: 1px solid #bac6c3;padding: 8px;"></td></tr>`
              fieldId=`NonTechnicalTrainingCategory${r["Id"]}${i+1}`;
              listName="TNA- Category";
              listFilter=`?$filter=Grade eq '${currentGrade}'`
             
            }else if(field=="NonTechnicalTrainingCategory1"){
              tab+=` <tr><td style="text-align: left;border: 1px solid #bac6c3;padding: 8px;"><label for="curr${r["Id"]}${i+1}" >Non Technical Training Category 2</label></td><td WIDTH="315px" id="NonTechnicalTrainingCategory1${r["Id"]}${i+1}" style="text-align: left;border: 1px solid #bac6c3;padding: 8px;"></td></tr>`
              fieldId=`NonTechnicalTrainingCategory1${r["Id"]}${i+1}`;
              listName="TNA- Category";
              listFilter=`?$filter=Grade eq '${currentGrade}'`
              
            }else if(field=="NonTechnicalTrainingCompetency"){
              tab+=` <tr><td style="text-align: left;border: 1px solid #bac6c3;padding: 8px;"><label for="curr${r["Id"]}${i+1}" >Non Technical Training Competency</label></td><td WIDTH="315px" id="NonTechnicalTrainingCompetency${r["Id"]}${i+1}" style="text-align: left;border: 1px solid #bac6c3;padding: 8px;"></td></tr>`
              fieldId=`NonTechnicalTrainingCompetency${r["Id"]}${i+1}`;
              listName="TNA- Competency";    
              listFilter=`?$filter=(Category eq '${currentCategory}')and(Title eq ${currentGrade})`
              
            }else if(field=="NonTechnicalTrainingCompetency1"){
              tab+=` <tr><td style="text-align: left;border: 1px solid #bac6c3;padding: 8px;"><label for="curr${r["Id"]}${i+1}" >Non Technical Training Competency 2</label></td><td WIDTH="315px" id="NonTechnicalTrainingCompetency1${r["Id"]}${i+1}" style="text-align: left;border: 1px solid #bac6c3;padding: 8px;"></td></tr>`
              fieldId=`NonTechnicalTrainingCompetency1${r["Id"]}${i+1}`;
              listName="TNA- Competency";    
              listFilter=`?$filter=(Category eq '${currentCategory}')and(Title eq ${currentGrade})`
              
            }else if(field=="NonTechnicalTrainingCourse"){
              tab+=` <tr><td style="text-align: left;border: 1px solid #bac6c3;padding: 8px;"><label for="curr${r["Id"]}${i+1}" >Non Technical Training Course</label></td><td WIDTH="315px" id="NonTechnicalTrainingCourse${r["Id"]}${i+1}" style="text-align: left;border: 1px solid #bac6c3;padding: 8px;"></td></tr>`
              fieldId=`NonTechnicalTrainingCourse${r["Id"]}${i+1}`;
              listName="Training Library Split";    
              listFilter=`?$filter=(Title eq '${currentCategory}')and(Competancy eq'${currentCompetency}')and(Grade eq ${currentGrade})`
              
            }else if(field=="NonTechnicalTrainingCourse1"){
              tab+=` <tr><td style="text-align: left;border: 1px solid #bac6c3;padding: 8px;"><label for="curr${r["Id"]}${i+1}" >Non Technical Training Course 2</label></td><td WIDTH="315px" id="NonTechnicalTrainingCourse1${r["Id"]}${i+1}" style="text-align: left;border: 1px solid #bac6c3;padding: 8px;"></td></tr>`
              fieldId=`NonTechnicalTrainingCourse1${r["Id"]}${i+1}`;
              listName="Training Library Split";    
              listFilter=`?$filter=(Title eq '${currentCategory}')and(Competancy eq'${currentCompetency}')and(Grade eq ${currentGrade})`
              
            }else if(field=="TechnicalTrainingName" || field=="TechnicalTrainingProviderName" || field=="TechnicalTrainingObjective"){
              let name = field;
              if(field=="TechnicalTrainingName"){name="Technical Training Name"}else if(field=="TechnicalTrainingProviderName"){name="Technical Training Provider Name"}else if(field=="TechnicalTrainingObjective"){name="Technical Training Objective"};
              tab+=` <tr ><td style="text-align: left;border: 1px solid #bac6c3;padding: 8px;"><label for="curr${r["Id"]}${i+1}" >${name}</label></td><td style="text-align: left;border: 1px solid #bac6c3;padding: 8px;"><div style=" width:90%;border:none;" id=curr${r["Id"]}${i+1} value="${r[field]}" contenteditable="true">${r[field]}</div></td></tr>`
              listName="TNA- Category";
              
            }else{
              let name = field;
              if(field=="NonTechnicalTrainingPreferredLea"){name = "Preferred Learning Type"}
              tab+=` <tr ><td style="text-align: left;border: 1px solid #bac6c3;padding: 8px;"><label for="curr${r["Id"]}${i+1}" >${name}</label></td><td style="text-align: left;border: 1px solid #bac6c3;padding: 8px;"><div style=" width:90%;border:none;" id=curr${r["Id"]}${i+1} value="${r[field]}" contenteditable="false">${r[field]}</div></td></tr>`
              listName="TNA- Category";
              
            }
            populatedropdown(fieldId,field,fieldVal,listName,listFilter);

          
}
          });
    
    tab+=`<tr><td style="border: 1px solid #bac6c3;padding: 8px;"><button id = "currdel${r.Id}"">DELETE</a></td>
    <td style="border: 1px solid #bac6c3;padding: 8px;"><button id = "currupdate${r.Id}" ">UPDATE</a>   </td></tr></table>     
</div>`;


    }
      var obj=document.createElement("newww")
      obj.innerHTML = tab;
      
  document.getElementById("actionpanel1-group-control").appendChild(obj); 


 for (let r of data.value) {
      col_items.forEach(function (field, i)
          {
            let fieldVal = `${r[field]}`;
            let currentGrade = r.EmployeeGrade;
        let currentCategory = r.NonTechnicalTrainingCategory;
        let currentCompetency = r.NonTechnicalTrainingCompetency;
        
        let myEleID=document.getElementById(`NonTechnicalTrainingCategory${r["Id"]}${i+1}`);
        let myEleID1=document.getElementById(`NonTechnicalTrainingCategory1${r["Id"]}${i+1}`);

        if(myEleID!=null){

          document.getElementById(`NonTechnicalTrainingCategory${r["Id"]}${i+1}`).addEventListener ("change", function(){

            
            let currValue=document.getElementById(`NonTechnicalTrainingCategory${r["Id"]}${i+1}2`).value;

            let test = document.getElementById(`NonTechnicalTrainingCompetency${r["Id"]}${i+2}2`).value;

            document.getElementById(`NonTechnicalTrainingCompetency${r["Id"]}${i+2}2`).remove();
            document.getElementById(`NonTechnicalTrainingCourse${r["Id"]}${i+3}2`).remove();
          
        populatedropdown(`NonTechnicalTrainingCompetency${r["Id"]}${i+2}`,"NonTechnicalTrainingCompetency","","TNA- Competency",`?$filter=(Category eq '${currValue}')and(Title eq ${currentGrade})`);
        populatedropdown(`NonTechnicalTrainingCourse${r["Id"]}${i+3}`,"NonTechnicalTrainingCourse","","Training Library Split",`?$filter=(Title eq '${currValue}')and(Competancy eq '${test}')and(Grade eq ${currentGrade})`);

      });

      document.getElementById(`NonTechnicalTrainingCompetency${r["Id"]}${i+2}`).addEventListener ("change", function(){

            
            let currValue=document.getElementById(`NonTechnicalTrainingCategory${r["Id"]}${i+1}2`).value;
             console.log(currValue);
             console.log(currentGrade);
            let test = document.getElementById(`NonTechnicalTrainingCompetency${r["Id"]}${i+2}2`).value;

            document.getElementById(`NonTechnicalTrainingCourse${r["Id"]}${i+3}2`).remove();
          
       populatedropdown(`NonTechnicalTrainingCourse${r["Id"]}${i+3}`,"NonTechnicalTrainingCourse","","Training Library Split",`?$filter=(Grade eq ${currentGrade})and(Competancy eq '${test}')and(Title eq '${currValue}')`);
     
      });
      
        }
        if(myEleID1!=null){
          document.getElementById(`NonTechnicalTrainingCategory1${r["Id"]}${i+1}`).addEventListener ("change", function(){

            
let currValue=document.getElementById(`NonTechnicalTrainingCategory1${r["Id"]}${i+1}2`).value;

let test = document.getElementById(`NonTechnicalTrainingCompetency1${r["Id"]}${i+2}2`).value;

document.getElementById(`NonTechnicalTrainingCompetency1${r["Id"]}${i+2}2`).remove();
document.getElementById(`NonTechnicalTrainingCourse1${r["Id"]}${i+3}2`).remove();

populatedropdown(`NonTechnicalTrainingCompetency1${r["Id"]}${i+2}`,"NonTechnicalTrainingCompetency","","TNA- Competency",`?$filter=(Category eq '${currValue}')and(Title eq ${currentGrade})`);
populatedropdown(`NonTechnicalTrainingCourse1${r["Id"]}${i+3}`,"NonTechnicalTrainingCourse1","","Training Library Split",`?$filter=(Title eq '${currValue}')and(Competancy eq '${test}')and(Grade eq ${currentGrade})`);

});

document.getElementById(`NonTechnicalTrainingCompetency1${r["Id"]}${i+2}`).addEventListener ("change", function(){


let currValue=document.getElementById(`NonTechnicalTrainingCategory1${r["Id"]}${i+1}2`).value;
 console.log(currValue);
 console.log(currentGrade);
let test = document.getElementById(`NonTechnicalTrainingCompetency1${r["Id"]}${i+2}2`).value;

document.getElementById(`NonTechnicalTrainingCourse1${r["Id"]}${i+3}2`).remove();

populatedropdown(`NonTechnicalTrainingCourse1${r["Id"]}${i+3}`,"NonTechnicalTrainingCourse1","","Training Library Split",`?$filter=(Grade eq ${currentGrade})and(Competancy eq '${test}')and(Title eq '${currValue}')`);

});
      
        }
        
     
      });
  }


      //document.getElementById ("newbtn").addEventListener ("click", addnewFunc, false);
      for (let r of data.value) {
      document.getElementById (`currdel${r.Id}`).addEventListener ("click", function(){ deleteitem(r.Id); });
      }
  
      for (let r of data.value) {
      document.getElementById (`currupdate${r.Id}`).addEventListener ("click", function(){ updateitem(r.Id,data); });
      }
      return(tab)
  
    } 
  // Calling that async function
  getapi(api_url)
     
    }



//setTimeout(tableFromJson,11000);
tableFromJson()
  
  function empGrade(num){
    switch(num){
      case "1":
        return "1234";
        break;
      case "2":
        return "1234";
        break;
      case "3":
        return "1234";
        break;
      case "4":
        return "1234";
        break;
      case "5":
        return "56";
        break;
      case "6":
        return "56";
        break;
      case "7":
        return "789";
        break;
      case "8":
        return "789";
        break;
      case "9":
        return "789";
        break;
      case "10":
        return "10";
        break;
      case "11":
        return "11";
        break;
      case "12":
        return "12";
        break;
      case "13":
        return "13";
        break;
      case "14":
        return "14";
        break;
    }
  }
  function populatedropdown(id,controlname,value,list,filter) {
  
  let listnames = list;
    const api_url = 
    `${siteurl}/_api/web/lists/GetByTitle('${listnames}')/items${filter}`;
    console.log(api_url);
    
  // Defining async function
  async function getapi(url) {
      
      // Storing response
      const response = await fetch(url, {
    method: "GET",
  
    headers: {
     // "Content-Type": "application/json"    --> option 1 (not working)
      "Authorization": `Bearer ${spToken}`  ,
      "Accept":"application/json"
     // "Content-Type": "multipart/form-data"  
     // "Content-Type": "text/plain"    --> option 4
    },
  
   
  
  });
      
      // Storing data in form of JSON
      var data = await response.json();
  
  
      //let mc_control = "<select name="+controlname+" id="+controlid+">"
  let currRandomID=Math.random();  
  let curr =  id+"2";     
  let mc_control = "<select style='width:300px;' name="+controlname+" id="+curr+">"
    let valueArray=[]
  
      // Loop to access all rows 
      for (let r of data.value) {
        let val,currentFilter=""
        
        if(listnames=="TNA- Category"){
          currentFilter=r.Title
        }else if(listnames=="TNA- Competency"){
          currentFilter=r.Competancy
        }else if(listnames=="Training Library Split"){
          currentFilter=r.Competency
        }

  
        if(valueArray.includes(currentFilter)==false){
        if(value==currentFilter){

          mc_control+=`<option value="${currentFilter}" selected>${currentFilter}</option>`
          valueArray.push(currentFilter);
        }else{
          mc_control+=`<option value="${currentFilter}" >${currentFilter}</option>`
          valueArray.push(currentFilter);
        }
      }
      }
      valueArray=[]
  //     const options = []
  
  // document.querySelectorAll('.dropds > option').forEach((option) => {
  //     if (options.includes(option.value) ) option.remove()
  //     else options.push(option.value)
  // })
  
  
  var obj=document.createElement("mccontrol")
  obj.innerHTML = mc_control;
  document.getElementById(id).appendChild(obj);


          }//async
  
          getapi(api_url)
 
  }//populate
  return( "")
}//render
}
  

  
// registering the web component
const elementName = 'hello-world';
customElements.define(elementName, HelloWorld);