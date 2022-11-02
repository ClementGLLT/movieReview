var mongoose = require('mongoose');

var options = {
    connectTimeoutMS: 5000,
    useNewUrlParser: true,
    useUnifiedTopology : true
   


   }
   mongoose.connect('mongodb+srv://toto:hpJBbmVcn21vGDfV@cluster0.l4jsx.mongodb.net/?retryWrites=true&w=majority',
      options,        
      function(err) {
       console.log(err);
      }
   );