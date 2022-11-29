// Variables
const cart = document.querySelector('#cart');
const coursesList = document.querySelector('#course-list');
const cartContainer = document.querySelector('#cart-list tbody');
const emptyCartBtn = document.querySelector('#empty-cart'); 
const card = document.querySelector('.card');
let cartItems = [];

// Listeners
loadEventListeners();
function loadEventListeners() {
     // Starts when adding to cart
     coursesList.addEventListener('click', addCourse);
     // Starts when deleting an item from the cart
     cart.addEventListener('click', deleteCourse);
     // Starts when emptying the cart
     emptyCartBtn.addEventListener('click', emptyCart);
}

// Functions
// Function to add items (courses) to the cart
function addCourse(e) {
     e.preventDefault();
     // Delegation for add-cart
     if(e.target.classList.contains('add-cart')) {
          const course = e.target.parentElement.parentElement;
          // Sending the selected course to take its details
          readCourseDetails(course);
     }
}

// Reads course details
function readCourseDetails(course) {
     const courseInfo = {
          image: course.querySelector('img').src,
          name: course.querySelector('h4').textContent,
          price: course.querySelector('.price span').textContent,
          id: course.querySelector('a').getAttribute('data-id'), 
          quantity: 1
     }
     if( cartItems.some( course => course.id === courseInfo.id ) ) { 
          const courses = cartItems.map( course => {
               if( course.id === courseInfo.id ) {
                    course.quantity++;
                     return course;
                } else {
                     return course;
             }
          })
          cartItems = [...courses];
     }  else {
          cartItems = [...cartItems, courseInfo];
     }
     // Create an alert
     const successAlert = document.createElement('P');
     successAlert.textContent = 'Added Successfully';
     successAlert.classList.add('successAlert');
     course.appendChild(successAlert);

     setTimeout(() => {
          successAlert.remove(); 
     }, 100);

     cartHTML();
}

// Deletes the course from the cart in the DOM
function deleteCourse(e) {
     e.preventDefault();
     if(e.target.classList.contains('delete-course') ) {
          const courseId = e.target.getAttribute('data-id');
          const courses = cartItems.map( course => {
               if (course.id === courseId) {
                    if( course.quantity === 1 ) {
                         cartItems = cartItems.filter(course => course.id !== courseId);
                    } else {
                         course.quantity--;
                         return course;
                    }
               }
          })
          cartHTML();
     }
}

// Shows the selected course in the cart
function cartHTML() {
     emptyCart();
     cartItems.forEach(course => {
          const row = document.createElement('tr');
          row.innerHTML = `
               <td><img src="${course.image}" width=100></td>
               <td>${course.name}</td>
               <td>${course.price}</td>
               <td>${course.quantity} </td>
               <td><a href="#" class="delete-course" data-id="${course.id}">X</a></td>
          `;
          cartContainer.appendChild(row);
     });
}

// Deletes all courses from the cart in the DOM
function emptyCart() {
     while(cartContainer.firstChild) {
          cartContainer.removeChild(cartContainer.firstChild);
     }
}