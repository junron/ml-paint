const Framework7App = new Framework7({
  // App root element
  root: '#app',
  pushState:true,
  name:"MEDIC",
  view: {
    pushState: true,
    mdSwipeBack:true
  },
  dialog:{
    title: "MEDIC",
  }
});
const mainView = Framework7App.views.create('.view-main');