

// agregar en la ruta routes/vuelos o nombre decidio por programaodor
var express = require('express');
var router = express.Router();
 var bodyParser      = require("body-parser") ; 

// server routes ===========================================================
// handle things like api calls
// authentication routes
// router.use(bodyParser.json());
//router.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
// router.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded
//tomando el modelo
var Vuelo = require('../models/vuelo');

router.get('/',function (req, res){
    Vuelo.find(function (err, vuelos) {
        if (err)
            res.status(500).send('Error en la base de datos');
        else
      var id = req.query.id; 
          res.status(200).json(vuelos);
  //        res.status(200).send('se envio el id '+ id);
  
    });
});

// consulta de fechas de salida desde hasta 
// gte >0 lte <=
router.get('/vfechassal',function(req,res){

    Vuelo.find({fechsalida: {$gte:req.query.desde, $lte:req.query.hasta} },function(err, vuelos) {
        if (err)
            res.status(500).send('Error en la base de datos' + err);
        else{
            if (vuelos != null) {
                res.status(200).json(vuelos);
            }
            else
                res.status(404).send('No se encontro ese vuelo');
        }
    });
});


router.get('/vfechaslle',function(req,res){

    Vuelo.find({fechllegada: {$gte:req.query.desde, $lte:req.query.hasta} },function(err, vuelos) {
        if (err)
            res.status(500).send('Error en la base de datos' + err);
        else{
            if (vuelos != null) {
                res.status(200).json(vuelos);
            }
            else
                res.status(404).send('No se encontro ese vuelo');
        }
    });
});




router.get('/rfechas',function(req,res){
            // { $or: [ { quantity: { $lt: 20 } }, { price: 10 } ] } 
             Vuelo.find({ $or: [ {  fechsalida: { $gte: req.body.salida } }, { fechllegada:{$gte: req.body.llegada} } ] } ,function(err, vuelos) {
   // Vuelo.find({fechsalid:req.query.salida , fechllegada:req.query.llegada },function(err, vuelos) {
        if (err)
            res.status(500).send('Error en la base de datos' + err);
        else{
            if (vuelos != null) {
                res.status(200).json(vuelos);
            }
            else
                res.status(404).send('No se encontro ese vuelo');
        }
    });
});

/*
router.get('/rfechas',function(req,res){
            // { $or: [ { quantity: { $lt: 20 } }, { price: 10 } ] } 
        //    { $or : [ { precio : { $lt : 60 } }, { precio : { $gt : 80 } } ] }
       //  {$or:[{ciudad:/^M/},{ciudad:/^Z/}]}
         //   Vuelo.find({ $or: [ { fechsalida: { $lte :req.body.salida } }  ] } ,function(err, vuelos) {
        //     Vuelo.find({ $or: [ { fechsalida: req.body.salida }, { fechllegada: req.body.llegada } ] } ,function(err, vuelos) {
   // Vuelo.find({fechsalid:req.query.salida , fechllegada:req.query.llegada },function(err, vuelos) {
    Vuelo.find( {$or: [ {fechllegada: {$gte:  req.query.desde} } ,{ fechllegada:{ $lte:req.query.hasta }  } ] } ,function(err, vuelos) {
        if (err)
            res.status(500).send('Error en la base de datos' + e rr);
        else{
            if (vuelos != null) {
                res.status(200).json(vuelos);
            }
            else
                res.status(404).send('No se encontro ese vuelo');
        }
    });
});
*/


router.get('/fecha',function (req, res){
    var aerolinea = req.query.aerolina;
    Vuelo.find( {aerolina: /req.query.aerolina/} , function (err, vuelos) {
        if (err)
            res.status(500).send('Error en la base de datos');
        else
            var id = req.query.id;
     //  db.Vuelo.find({"aerolina": /spir/})       
          res.status(200).json(vuelos );
   //      res.status(200).json( ) ; 
  //       res.status(200).send('se envio el id '+ id);
  
    });
});




router.get('/:id',function(req,res){
    Vuelo.findById(req.params.id,function(err, vuelos) {
        if (err)
            res.status(500).send('Error en la base de datos');
        else{
            if (vuelos!= null) {
                res.status(200).json(vuelos);
            }
            else
                res.status(404).send('No se encontro ese vuelo');
        }
    });
});



router.post('/',function(req,res){

    var persona1 = new Vuelo({
        _id: req.body._id ,
        aerolina: req.body.aerolina , 
        ciudad_origen: req.body.ciudad_origen, 
        ciudad_destino: req.body.ciudad_destino,
        fechsalida: req.body.fechsalida,
        fechllegada: req.body.fechllegada
	  //	nombres: {nombre: req.body.nombres.nombre, apellido: req.body.nombres.apellido},
	//	edad: req.body.edad,
//		ciudad: req.body.ciudad,
//		fechan: req.body.fechan,
	//	intereses: req.body.intereses
	});

    //guarda una persona en la base de datos
    persona1.save(function (error, persona1) {
        if (error) {
            res.status(500).send('No se ha podido agregar.');
        }
        else {
            res.status(200).send('se agrego encontro esa persona');
         //   res.status(200).json({_id: persona1._id}); //envía al cliente el id generado
        }
    });
});


router.put('/:id',function(req,res){

    //Modificar con Find ID
    Vuelo.findById(req.params.id,function(err, vuelos) {
        if (err)
            res.status(500).send('Error en la base de datos');
        else{
            if (vuelos != null){

           
				vuelos.aerolina = req.body.aerolina;
				vuelos.ciudad_origen = req.body.ciudad_origen;
				vuelos.ciudad_destino = req.body.ciudad_destino;
				vuelos.fechsalida = req.body.fechsalida;
				vuelos.fechllegada = req.body.fechllegada;

                vuelos.save(function (error, persona1) {
                    if (error)
                        res.status(500).send('Error en la base de datos');
                    else {
                        res.status(200).send('Modificado exitosamente');
                    }
                });
            }
            else
                res.status(404).send('No se encontro esa persona');
        }
    });
});


router.delete('/:id',function(req,res){
    //Eliminar con Find ID
    Vuelo.findById(req.params.id,function(err, vuelos) {
        if (err)
            res.status(500).send('Error en la base de datos');
        else{
            if (vuelos != null) {
                vuelos.remove(function (error, result) {
                    if (error)
                        res.status(500).send('Error en la base de datos');
                    else {
                        res.status(200).send('Eliminado exitosamente');
                    }
                });
            }
            else
                res.status(404).send('No se encontro ese vuelo');
        }
    });
});



module.exports = router;