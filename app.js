var express=require("express"),
        app=express(),
        bodyparser=require("body-parser"),
        mongoose=require("mongoose"),
        methodOverride=require("method-override"),
        ExpressSanitizer=require("express-sanitizer")
        //passport
        passport = require("passport"),
        LocalStrategy = require("passport-local").Strategy;
  //models
var bank = require("./models/bank");
var User =require("./models/user")
var foodie = require("./models/foodie.js");
//passport config
app.use(require("express-session")({
    secret:"about the food",
    resave:false,
    saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
//app config
        mongoose.connect("mongodb://localhost/foodiebank");
        app.set("view engine", "ejs");
        app.use(express.static("public"));
        app.use(bodyparser.urlencoded({ extended: true }));
        app.use(ExpressSanitizer());
        app.use(methodOverride("_method"));
//this helps to hide the login and sign up button AND ALSO DISPLAY THE INFO INSIDE USER
app.use(function (req, res, next) {
    res.locals.currentuser = req.user;
    next();
})
 //index route
app.get("/", function (req, res) {
    res.redirect("/foodie")
})
app.get("/foodie",function(req,res){
    foodie.find({},function(err,allfoodies){
        if (err) {
            console.log(err)
        } else {
    res.render("index", { foodies: allfoodies });
        // res.send("work")
    } 
});
});

//new route
app.get("/foodie/new",isLoggedIn,function(req,res){
    foodie.find({},function(err,newfoodies){
        if(err){
            console.log(err);
        }else{
            res.render("new",{foodies:newfoodies})
        }
    })
})
//create route
app.post("/foodie",isLoggedIn,function(req,res){
      //  blog.create(req.body.blog, function (err, newBlog) {
          foodie.create(req.body.foodie,function(err,newFood){
              if(err){
                  console.log();
              }
              else{
                  res.redirect("/foodie")
              }
          })
})
//show route
app.get("/foodie/:id",function(req,res){
    foodie.findById(req.params.id,function(err,foundfoodie){
        if(err){
            res.redirect("/foodie")
        }else{
            res.render("show",{foodie:foundfoodie});
        }
    })
    // res.render("show");
})
app.post("/foodie/:id",function(req,res){
    foodie.create(req.body.foodie,function(err,newComment1){
        if(err){
            res.redirect("/foodie")
        }else{
            res.render("show",{foodie:newComment1})
        }
    })
})
//edit route
app.get("/foodie/:id/edit",isLoggedIn,function(req,res){
    //res.render("edit")
    foodie.findById(req.params.id,function(err,foundfoodie){
        if(err){
            console.log(err)
        }else{
            res.render("edit",{foodie:foundfoodie});
        }
    })
})
//update
app.put("/foodie/:id",function(req,res){
    foodie.findByIdAndUpdate(req.params.id,req.body.foodie,function(err,updatedfoodie){
        if(err){
            console.log(err)
        }
        else{
            res.redirect("/foodie");
        }
    })
})
app.delete("/foodie/:id",function(req,res){
    foodie.findByIdAndRemove(req.params.id,req.body.foodie,function(err){
        if(err){
            console.log(err)
        }
        else{
            res.redirect("/foodie")
        }
    })
})
app.get("/foodiebank", isLoggedIn,function(req,res){  
    var balance = {
        id:req.user.id,
        balance:req.user.balance,
    }
    var name = req.user.username;
    var newbank = { name: name, balance: balance } 
    // console.log(newbank)
    bank.find({newbank}, function (err, foundbank) { 
        if (err) {
            res.redirect(err)
        } else {
        //    console.log("this is the name"+req.user);

            res.render("foodiebank", { banks:foundbank}) 
        }      
        
})
});
//middleware to check if balance is less or more


app.post("/foodiebank",function(req,res){
    bank.find({},function(err,bank){
        if (err){
            console.log(err)
        }
        else{
           var balance=req.user.balance;
           var price=req.body.price;
            // console.log(req.user.username)
         console.log(req.body.price)
                if(balance<price){
                    console.log("Theres little balance on your acct")
                }else{
                    console.log("The balance is "+balance+' in '+req.user.username+'s account ')
                   console.log (balance-=price)
                }
         res.redirect("/foodiebank")
        }
    })
    
    
})
//auth routes

app.get("/signup",function(req,res){
    res.render("signup")
});
app.post("/signup", function (req, res) {
    var newuser = new User({ username: req.body.username })
    User.register(newuser, req.body.password, function (err, user) {
        if (err) {
            console.log(err);
            return res.render("signup")
        }
        passport.authenticate("local")(req, res, function () {
            res.redirect("/foodiebank");
        })
    })
});
app.get("/login", function (req, res) {
    res.render("login")
});
app.post("/login",passport.authenticate("local",
{
    successRedirect: "/foodiebank",
    failureRedirect: "/login"}),
    function (req, res) {
});
function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}
app.get("/logout",function(req,res){
    req.logout();
    res.redirect("/foodie")
})
app.listen(3000,function(){
    console.log("CONNECTED");
})