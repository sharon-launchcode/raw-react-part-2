/*
 * Constants
 */
var apiKey = “the_API_KEY”
var myDB = “The secret data base name”
var myCollection = “contacts”
/* Above not safe for production environment Authentication needed to provide security */

var CONTACT_TEMPLATE = {name: "", email: "", description: "", errors: null}



/*
 * Model
 */


// The app's complete current state
var state = {};

// Make the given changes to the state and perform any required housekeeping
function setState(changes) {
  Object.assign(state, changes);
  
  ReactDOM.render(
    React.createElement(ContactsView, Object.assign({}, state, {
      onNewContactChange: updateNewContact,
      onNewContactSubmit: submitNewContact,
    })),
    document.getElementById('react-app')
  );
}

// Set initial data

$.ajax({
   url: “https://api.mlab.com/api/1/databases/" + myDB + “/collections/” + myCollection + “?apiKey=” + apiKey,
   success: function(data) {
     setState({
       contacts: data.map(function(o) {
         return {
           id: o.email,
           name: o.name,
           email: o.email,
           description: o.description
         };
       }),
       newContact: Object.assign({}, CONTACT_TEMPLATE),
     });
   },
});





setState({
  contacts: [
    {key: 1, name: "James K Nelson", email: "james@jamesknelson.com", description: "Front-end Unicorn"},
    {key: 2, name: "Jim", email: "jim@example.com"},
  ],
  newContact: Object.assign({}, CONTACT_TEMPLATE),
});



/*
 * Actions
 */


function updateNewContact(contact) {
  setState({ newContact: contact });
}


function submitNewContact() {
  var contact = Object.assign({}, state.newContact, {key: state.contacts.length + 1, errors: {}});
 /* packaging fields into a single object of the database */
  
     let contactDocument = { 
     name: contact.name, 
     email: contact.email, 
     description: contact.description, 
     _id: contact.email 
   };
  
// TODO: Insert Document API Call
  
$.ajax( { 
 url:“https://api.mlab.com/api/1/databases/"+myDB+"/collections/"+myCollection+"?apiKey="+apiKey,
 data: JSON.stringify( [ contactDocument ] ),
 type: “POST”,
 contentType: “application/json”
} )  
  
 // TODO: Inserting Document API Call Done 
  
  
},
  
  if (!contact.name) {
    contact.errors.name = ["Please enter your new contact's name"]
  }
  if (!/.+@.+\..+/.test(contact.email)) {
    contact.errors.email = ["Please enter your new contact's email"]
  }

  setState(
    Object.keys(contact.errors).length === 0
    ? {
        newContact: Object.assign({}, CONTACT_TEMPLATE),
        contacts: state.contacts.slice(0).concat(contact),
      }
    : { newContact: contact }
  )
}
