/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// api key, baseUrl
const apik = '&appid=ef7e4ab14cb351dfcafc66b2029e8049&units=metric';
const url = 'https://api.openweathermap.org/data/2.5/weather?zip=';

const myServer = 'http://localhost:5000';


document.getElementById('generate').addEventListener('click', displayData = ()=> {
    const myZip = document.getElementById('zip').value;
    const myFeelings = document.getElementById('feelings').value;

    dataofWeather(myZip).then((mydata) =>{
        if (mydata) {
          let {
            main: { temp }, name: city, weather: [{ description }],} = mydata;
    
          let newdata = {
            newDate,
            city,
            temp: Math.round(temp),
            description,
            myFeelings,
          };

          showdata(myServer + '/add', newdata);
          uiupdate();
          document.getElementsByClassName('myholder');
        }  
    });
})

let dataofWeather = async (zip) =>{
    try{
        let resp = await fetch(url +zip+ apik);
        let mydata = await resp.json();

       /* if (mydata.cod != 200) {
          // display the error message on UI
          valid.innerHTML = mydata.message;
          setTimeout(()=> valid.innerHTML = '', 2000)
          throw `${mydata.message}`;
        }*/
    
        return mydata;
    } catch(error) {
        console.log(error);
    }
}; 



/* Post data */
const showdata = async (myurl='', newdata={}) => {
    let response = await fetch(myurl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/josn',},
      body: JSON.stringify(newdata),
    });
    try{
        const datanew = await response.json();
        console.log("saved", datanew);
        return datanew;
    }catch(error){
      console.log('error', error);
  }}
  
   const uiupdate = async ()=>  {
    
    const request = await fetch(myServer + '/all');
    try {
        const data = await request.json();
    
        document.getElementById("date").innerHTML = data.newDate;
        document.getElementById("city").innerHTML = data.city;
        document.getElementById("temp").innerHTML = data.temp + '&degC';
        document.getElementById("weather").innerHTML = data.description;
        document.getElementById("content").innerHTML = data.feelings;
      } catch (error) {
      console.log('error', error);
    }
  }
  