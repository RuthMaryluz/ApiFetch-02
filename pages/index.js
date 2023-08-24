/**
Ejercicio:
Hacer uso de la api Fetch para recuperar los datos del siguiente link:
https://reqres.in/api/users?delay=3
Mostrar los datos recuperados en la interfaz de usuario, en una tabla o en otro componente para visuzalizarlo.
 La visualizacion debe ser responsiva.
 Las imagenes de los avatares debe mostrarse con un diseño (redondo).
 Los datos recuperados deben almacenarse localmente con un tiempo de vida, para que la proxima recuperacion de datos no tarde(mientras esté en el tiempo de vida.)
 
 Usa la API DOM para actualizar el resultado.
 Usa estilos bootstrap.
**/

/** El evento "DOMContentLoaded" se dispara cuando el HTML y todos los recursos asociados (como CSS y scripts) 
han sido cargados y analizados en el DOM. El código dentro de esta función de retrollamada se ejecutará una vez que se haya cargado el contenido de la página.
**/
document.addEventListener("DOMContentLoaded", () => {

    /** Aquí se están obteniendo referencias a los elementos HTML en la página. 
    userTableBody hace referencia al <tbody> en el cual se mostrarán los datos de los usuarios, 
    y loadUsersButton hace referencia al botón "Cargar Usuarios" en la página. **/
      const userTableBody = document.getElementById("userTableBody");
      const loadUsersButton = document.getElementById("loadUsersButton");

      
      
      //Esta variable apiUrl almacena la URL de la API desde donde obtendremos los datos de los usuarios.
      const apiUrl = "https://reqres.in/api/users?delay=3";
    
      // Función para buscar y mostrar datos del usuario
      async function fetchUserData() {
        try {
            
            /** Dentro del bloque try, se utiliza await fetch(apiUrl) para hacer la solicitud a la API y esperar la respuesta. 
            Luego, se usa await response.json() para convertir la respuesta en un objeto JavaScript. 
            La variable users almacena la matriz de usuarios extraída de los datos.**/
            const response = await fetch(apiUrl);
            console.log(response);
            const data = await response.json();
            console.log(data);
            const users = data.data;
            console.log(users);
          userTableBody.innerHTML = ""; // Borrar datos existentes
        
        /** Aquí, estamos iterando sobre cada usuario en la matriz users y creando una fila <tr> 
        para cada uno en la tabla. Los datos del usuario se llenan en cada celda de la fila. **/
    
          
          for (let i = 0; i < users.length; i++) {
            const user = users[i];
            const row = document.createElement("tr");
            row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.first_name}</td>
            <td>${user.last_name}</td>
            <td>${user.email}</td>
            <td><img src="${user.avatar}" alt="Avatar" class="rounded-circle" width="50"></td>
            `;
            userTableBody.appendChild(row);
          
        }
    
          // Almacene datos localmente con un tiempo de vida de 1 minuto (en milisegundos)
          /** Se están almacenando los datos de usuario y el tiempo de expiración en el almacenamiento local (localStorage). 
          Esto permitirá el acceso a los datos en caché durante 1 min (60000 milisegundos) antes de que necesiten ser actualizados.**/
          const currentTime = new Date().getTime();
          const expirationTime = currentTime + 60000; // 1 min
          localStorage.setItem("userData", JSON.stringify({ users, expirationTime }));}
          catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    
      // Function to load users on button click
      /** Aquí, se agrega un evento de clic al botón "Cargar Usuarios". 
      Cuando se hace clic en el botón, la función fetchUserData se ejecutará para buscar y mostrar los datos de los usuarios. **/
      loadUsersButton.addEventListener("click", () => {
        fetchUserData();

        //accediendo a la variable loadUsersButton y agregadole el disable a true para deshabilitar botón.
      loadUsersButton.disabled = true;
      
      });
    
     /*    // Compruebe si los datos almacenados en caché están disponibles y no han caducado
      const cachedData = JSON.parse(localStorage.getItem("userData"));
      if (cachedData && cachedData.expirationTime > new Date().getTime()) {
        // Utiliza datos almacenados en caché si están disponibles y no han caducado
        cachedData.users.forEach(user => {
          const row = document.createElement("tr");
          row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.first_name}</td>
            <td>${user.last_name}</td>
            <td>${user.email}</td>
            <td><img src="${user.avatar}" alt="Avatar" class="rounded-circle" width="50"></td>
          `;
          userTableBody.appendChild(row);
          userTableBody.preventDefault();
         
        });
      } else {
        // Recuperar datos si los datos almacenados en caché no están disponibles o han caducado
        fetchUserData();
      } */
    });