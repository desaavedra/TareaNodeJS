    const http = require ("http");
    const fs = require("fs");
function iniciar ( callback){
    http.createServer((req, res)=>{
        callback(res);
    }).listen("8080")
}

    const axios = require ("axios");
    const url = "https://gist.githubusercontent.com/josejbocanegra/c6c2c82a091b880d0f6062b0a90cce88/raw/9ed13fd53a144528568d1187c1d34073b36101fd/categories.json";
    axios.get(url).then(response=>{
        
        fs.readFile("index.html", (err, data)=>{
            let respuesta = response.data
            let aPegar = `<div class="accordion" id="accordionExample">`
            let i =1; 
            respuesta.forEach(element => {
                let abierta = "true"
                let abierta2 = ""
                let abierta3 = "show"
                if( i != 1)
                {
                    abierta = "false"
                    abierta2 = "collapsed"
                    abierta3=""
                }
                aPegar+=`
                <div class="card">
                <div class="card-header" id="heading${i}">
                  <h2 class="mb-0">
                    <button class="btn btn-link ${abierta2}" type="button" data-toggle="collapse" data-target="#collapse${i}" aria-expanded="${abierta}" aria-controls="collapse${i}">
                    ${element.name}
                    </button>
                  </h2>
                </div>
                <div id="collapse${i}" class="collapse ${abierta3}" aria-labelledby="heading${i}" data-parent="#accordionExample">
                    <div class="containter p-1 pl-3"> 
                        <div class="row">`
                element.products.forEach(producto =>{
                    aPegar+=`
                            <div class="col-3 my-1">
                                <div class="card" style="width: 20rem;">
                                    <img src="${producto.image}" class="card-img-top" alt="...">
                                    <div class="card-body">
                                    <h5 class="card-title">${producto.name}</h5>
                                    <p class="card-text">${producto.description}</p>
                                    
                                    <h5>${producto.price}</h5>
                                    <a href="#" class="btn btn-primary">Add to car</a>
                                    </div>
                                </div>
                            </div>`
                });
                aPegar+=`
                        </div>
                    </div>
                </div>    
                `
                i++;
            });
            aPegar+=`</div></div></div>`
            iniciar(res =>{
                res.write(data.toString().replace("<!--hola-->",aPegar));
                res.end();
            })
        } );
        
    });   
    


