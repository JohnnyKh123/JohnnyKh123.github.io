import { html,LitElement} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';
// define the component



export class HelloWorld extends LitElement {
  
  
  static properties = {
    sentid: {type: String},
  };
  
  // return a promise for contract changes.
  static getMetaConfig() {
    return {
      controlName: 'RS Plugin Disp',
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
             // "NonTechnicalTrainingPreferredLea0"
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

    
    
    
    
    
    
    
    
    async function updateitem(idd)////////////////////////UPDATE ITEM
    {
      const addurl = `${siteurl}/_api/web/lists/GetByTitle('${listname}')/items(${idd})`;
         //const addurl = `${siteurl}/_api/web/lists/GetByTitle('${listname}')/items?$filter=Reference_x0020_ID eq '${wfID}'`;
  
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
        
          
          var NTCategory="";
          tab += `<div style ="margin: 10px 70px 70px;box-shadow: 0px 35px 50px rgba( 0, 0, 0, 0.2 );">
            
          <table style =" margin-bottom: 20px; margin-left:auto;margin-right:auto;font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;border-collapse: collapse;width: 100% ;" WIDTH="600px">
            <tr><th style="color: white;background-color: #bac6c3;text-align: center;padding-bottom: 12px;border: 1px solid #bac6c3;padding: 8px;padding-top: 12px;">Field</th><th WIDTH="315px" style="color: white;background-color: #bac6c3;text-align: center;padding-bottom: 12px;border: 1px solid #bac6c3;padding: 8px;padding-top: 12px;">Value</th></tr>` 
            col_items.forEach(function (field, i)
            {
              let fieldVal = `${r[field]}`;
              if(fieldVal!=="null" && fieldVal!==""){
                let fieldId, listName, listFilter=""
                //?$filter=Reference_x0020_ID eq '${wfID}'`
              
              
                tab+=` <tr ><td style="text-align: left;border: 1px solid #bac6c3;padding: 8px;"><label for="curr${r["Id"]}${i+1}" >`+Name(field)+`</label></td><td WIDTH="315px" style="text-align: left;border: 1px solid #bac6c3;padding: 8px;"><div style=" width:90%;border:none;" id=curr${r["Id"]}${i+1} value="${r[field]}" contenteditable="false">${r[field]}</div></td></tr>`
                
              }
            
            });
            tab+=`</table>     
        </div>`; 
      
  
      }
      var obj=document.createElement("newww")
      obj.innerHTML = tab;
      
  document.getElementById("actionpanel1-group-control").appendChild(obj); 
  
      //document.getElementById ("newbtn").addEventListener ("click", addnewFunc, false);
     
  
    } 
  // Calling that async function
  getapi(api_url)
     
    }
  tableFromJson()
  
  function Name(fieldName){
    switch(fieldName){
      case "EmployeeName":
        return "Employee Name";
        break;
      case "EmployeeGrade":
        return "Employee Grade";
        break;
      case "TrainingType":
        return "Training Type";
        break;
      case "TechnicalTrainingName":
        return "Technical Training Name";
        break;
      case "TechnicalTrainingProviderName":
        return "Technical Training Provider Name";
        break;
      case "TechnicalTrainingObjective":
        return "Technical Training Objective";
        break;
      case "NonTechnicalTrainingCategory":
        return "Non Technical Training Category";
        break;
      case "NonTechnicalTrainingCategory1":
        return "Non Technical Training Category 2";
        break;
      case "NonTechnicalTrainingCompetency":
        return "Non Technical Training Competency";
        break;
      case "NonTechnicalTrainingCompetency1":
        return "Non Technical Training Competency 2";
        break;
      case "NonTechnicalTrainingCourse":
        return "Non Technical Training Course";
        break;
      case "NonTechnicalTrainingCourse1":
        return "Non Technical Training Course 2";
        break;
      case "NonTechnicalTrainingPreferredLea":
        return "Preferred Learning Type";
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
  let mc_control = "<select style='width:300px;' name="+controlname+" id="+currRandomID+">"
    let valueArray=[]
  
      // Loop to access all rows 
      for (let r of data.value) {
        let val,currentFilter=""
        
        if(listnames=="TNA- Category"){
          currentFilter=r.Title
        }else if(listnames=="TNA- Competency"){
          currentFilter=r.Competancy
        }else if(listnames=="Training Courses - TNA"){
          currentFilter=r.TrainingCourseName
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
const elementName = 'hello-worlds';
customElements.define(elementName, HelloWorld);