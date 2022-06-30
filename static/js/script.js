


let stars = document.getElementById("stars");
      let ghost = document.getElementById("ghost");
      let mountains_front = document.getElementById("mountains_front");
      let mountains_behind = document.getElementById("mountains_behind");
      let text = document.getElementById("text");
      let btn = document.getElementById("btn");
      let header = document.querySelector("header");

      window.addEventListener("scroll", function () {
        let value = window.scrollY;

        stars.style.left = value * 0.25 + "px";
        ghost.style.top = value * 1.05 + "px";

        mountains_behind.style.top = value * 0.5 + "px";
        mountains_front.style.top = value * 0 + "px";

        text.style.marginRight = value * 4 + "px";
        text.style.marginTop = value * 1.5 + "px";
        btn.style.marginTop = value * 1.5 + "px";

        header.style.top = value * 0.5 + "px";
      });



      function showDiv() {
        var x = document.getElementById("form-box");
        var y = document.getElementById("form-box2");
        var i = document.getElementById("form-box3");
        var z = document.getElementById("buttons2");
        var w1 = document.getElementById("agregar");
        var w2 = document.getElementById("eliminar");
        var w3 = document.getElementById("actualizar");
        var k = document.getElementById("admin")
        if (x.style.display && y.style.display && z.style.display && w1.style.display && w2.style.display && w3.style.display === "none") {
          x.style.display = "flex";
          y.style.display = "none";
          z.style.display = "flex";
          i.style.display = "none";
          w1.style.display = "flex";
          w2.style.display = "flex";
          w3.style.display = "flex";
          k.className = "active";
        } else {
          x.style.display = "none";
          y.style.display = "none";
          z.style.display = "none";
          i.style.display = "none";
          w1.style.display = "none";
          w2.style.display = "none";
          w3.style.display = "none";
          k.className = "administrar";
        }
        
      }

      function showAgregar() {
        var x = document.getElementById("form-box");
        var y = document.getElementById("form-box2");
        var i = document.getElementById("form-box3");

        if (x.style.display === "none") {

          x.style.display = "flex";
          y.style.display = "none";
          i.style.display = "none";


        } else {

          x.style.display = "flex";
          y.style.display = "none";
          i.style.display = "none";

 
        }
        
      }


      function showActualizar() {
        var x = document.getElementById("form-box");
        var y = document.getElementById("form-box2");
        var i = document.getElementById("form-box3");

        if (y.style.display === "none") {

          x.style.display = "none";
          y.style.display = "flex";
          i.style.display = "none";

        } else {

          x.style.display = "none";
          y.style.display = "flex";
          i.style.display = "none";
 
        }
        
      }

      function showEliminar() {
        var x = document.getElementById("form-box");
        var y = document.getElementById("form-box2");
        var i = document.getElementById("form-box3");

        if (i.style.display === "none") {

          x.style.display = "none";
          y.style.display = "none";
          i.style.display = "flex";

        } else {

          x.style.display = "none";
          y.style.display = "none";
          i.style.display = "flex";
 
        }
        
      }
      
    
     


//----------------------------api---------------------------------------

const productCardTemplate = document.querySelector("[data-product-template]")
const productCardContainer = document.querySelector("[data-product-cards-container]")

let products = []

const input = document.querySelector(".finder__input");
const finder = document.querySelector(".finder");
const form = document.querySelector("form");



input.addEventListener("focus", () => {
  finder.classList.add("active");
});

input.addEventListener("blur", () => {
  if (input.value.length === 0) {
    finder.classList.remove("active");
  }
});

form.addEventListener("submit", (ev) => {
  ev.preventDefault();
  finder.classList.add("processing");
  finder.classList.remove("active");
  input.disabled = true;
  setTimeout(() => {
    finder.classList.remove("processing");
    input.disabled = false;
    if (input.value.length > 0) {
      finder.classList.add("active");
    }
  }, 1000);
});

input.addEventListener("input", e => {
  const value = e.target.value.toLowerCase()
  products.forEach(product => {
    const isVisible =
      product.name.toLowerCase().includes(value)
    product.element.classList.toggle("hide", !isVisible)
    console.log(value)
  })
})

/*categoria*/

function filterProduct(value) {

  let buttons = document.querySelectorAll(".button-value");
  buttons.forEach((button) => {

    if (String(value).toLowerCase() == button.innerText.toLowerCase()) {
      button.classList.add("active");
    } else {
      button.classList.remove("active");
    }
  });

  products.forEach((product) => {
    if (value == "all") {
      product.element.classList.remove("hide");
    } else {
      if (String(product.category).toLowerCase() == value) {
        product.element.classList.remove("hide");
      } else {
        product.element.classList.add("hide");
      }
    }
  });
}



function GetSortOrder(prop) {    
  return function(a, b) {    
      if (a[prop] > b[prop]) {    
          return 1;    
      } else if (a[prop] < b[prop]) {    
          return -1;    
      }    
      return 0;    
  }    
}    



fetch("http://44.196.171.132/api/products")
  .then(res => res.json())
  .then(data => {
    products = data['products'].sort(function(a, b) {
      return parseFloat(a.quantity) - parseFloat(b.quantity);
  }).map(product => {
      const card = productCardTemplate.content.cloneNode(true).children[0]
      const img = card.querySelector("[data-img]")
      const id = card.querySelector("[data-id]")
      const header = card.querySelector("[data-header]")
      const body = card.querySelector("[data-body]")
      const body2 = card.querySelector("[data-body2]")
      const body3 = card.querySelector("[data-body3]")
      id.textContent = "ID: "+product.id
      header.textContent = product.name
      body.textContent = product.description
	    body2.textContent = "$"+product.price
      body3.textContent = String(product.subcategory_id)
      img.textContent = "Stock: "+product.quantity
      productCardContainer.append(card)
      return { name: product.name, category: product.subcategory_id, element: card }
    })
  });






function adquisicionProducto() {

  const name2 = document.getElementById('x1').value;
  const slug2 = name2.replace(/\s+/, '-');
  const description2 = document.getElementById('x2').value;
  const price2 = document.getElementById('x3').value;
  const quantity2 = document.getElementById('x4').value;
  const subcategory_id2 = document.getElementById('x5').value;



  const data = 
    {
      name: name2,
      slug: slug2,
      description: description2,
      subcategory_id: subcategory_id2,
      quantity: quantity2,
      price: price2       
    }
  ;

  let url = "http://44.196.171.132/api/products";
  let headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
  };
  
  async function makePostRequest(url, requestType, headers){
      await fetch(
          url,
          {
              method: requestType,
              headers: headers,
              body: JSON.stringify(data)
          },
      ).then(async rawResponse =>{
          var content = await rawResponse.json()
          console.log(content);
      });
  }
  
  makePostRequest(url, "POST", headers);


  console.log(data)

  fetch("http://44.196.171.132/api/products")
  .then(res => res.json())
  .then(data => {
    products = data['products'].sort(function(a, b) {
      return parseFloat(a.quantity) - parseFloat(b.quantity);
  }).map(product => {
      const card = productCardTemplate.content.cloneNode(true).children[0]
      const img = card.querySelector("[data-img]")
      const id = card.querySelector("[data-id]")
      const header = card.querySelector("[data-header]")
      const body = card.querySelector("[data-body]")
      const body2 = card.querySelector("[data-body2]")
      const body3 = card.querySelector("[data-body3]")
      id.textContent = "ID: "+product.id
      header.textContent = product.name
      body.textContent = product.description
	    body2.textContent = "$"+product.price
      body3.textContent = String(product.subcategory_id)
      img.textContent = "Stock: "+product.quantity
      productCardContainer.append(card)
      return { name: product.name, category: product.subcategory_id, element: card }
    })
  });

};



  
function actualizarProducto() {

  const id3 = document.getElementById('y0').value;
  const name3 = document.getElementById('y1').value;
  const slug3 = name3.replace(/\s+/, '-');
  const description3 = document.getElementById('y2').value;
  const price3 = document.getElementById('y3').value;
  const quantity3 = document.getElementById('y4').value;

  let data =
      {
        name: name3,
        slug: slug3,
        description: description3,
        quantity: quantity3,
        price: price3       
      };
 


  let url = "http://44.196.171.132/api/products/"+id3;
  let headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
  };
  
  async function makePostRequest(url, requestType, headers){
      await fetch(
          url,
          {
              method: requestType,
              headers: headers,
              body: JSON.stringify(data)
          },
      ).then(async rawResponse =>{
          var content = await rawResponse.json()
          console.log(content);
      });
  }
  
  makePostRequest(url, "PUT", headers);

  console.log(data)

  

};

function eliminarProducto() {

  const id4 = document.getElementById('i0').value;

  let url = "http://44.196.171.132/api/products/"+id4;
  let headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
  };
  
  async function makePostRequest(url, requestType, headers){
      await fetch(
          url,
          {
              method: requestType,
              headers: headers
          },
      ).then(async rawResponse =>{
          var content = await rawResponse.json()
          console.log(content);
      });
  }
  
  makePostRequest(url, "DELETE", headers);

  console.log(value)


};




