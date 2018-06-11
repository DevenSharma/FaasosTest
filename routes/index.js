var express = require('express');
var router = express.Router();
var app = express();

var RawMaterial = require('../models/rawmaterial');
var RawPrediction = require('../models/rawtocreatedpredictmapping');
var Orders = require('../models/orders');
var Display = require('../models/display');
var Report = require('../models/reports');





/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/order', function (req, res, next) {
    Orders.getAll(function (err, response) {
        res.send(response);
      
    })
});

router.post('/order', function (req, res, next) {
    var result={};
    var currentdate = new Date();
    var datetime = currentdate.getDate() + "/"
        + (currentdate.getMonth()+1)  + "/"
        + currentdate.getFullYear();
    var predict_id = 0;
    RawPrediction.findOne({'pid': req.body.pid, 'created_date': datetime }, function (err, respData) {
        if(err) throw err;
        if(respData == null)
        {
            result.orderStatus=0;
            result.message="Prediction not found for this product";
            res.send(result)
            //res.render('success', {success_resp: 'Daily Prediction value not set for product.'});
        } else {
            var data = {'pid': req.body.pid, 'quantity': req.body.quantity, 'predict_id': respData['_id'] };
            Orders.create(data, function (err, newData) {
                if(err) throw err;
                 result.orderStatus=1;
                 result.message="Order Placed Successfully";
            res.send(result)
               // res.render('success', {success_resp: 'Order Placed Successfully!!'});
            });
        }
        //var data = {'pid': req.body.pid, 'quantity': req.body.quantity, 'predict_id': respData['_id'] };

    });
});

router.get('/getAllProducts', function (req, res, next) {

    RawMaterial.getAll(function (err, response) {           
        res.send(response);
    })
});

router.post('/add', function (req, res, next) {
    console.log(req.body)
    var result={};
    var data = {'name': req.body.name };
    RawMaterial.findOrCreate(data, function (err, newData) {
        if(err) throw err;        
        res.send(newData)
     
    })
});

router.get('/predict', function (req, res, next) {
    RawMaterial.getAll(function (err, response) {
        res.send(response);
    })
});

router.post('/predict', function (req, res, next) {
    var currentdate = new Date();
    var datetime = currentdate.getDate() + "/"
        + (currentdate.getMonth()+1)  + "/"
        + currentdate.getFullYear();
    var data = {'pid': req.body.pid, 'predicted': req.body.predicted};
    RawPrediction.findOrCreate(data, function (err, newData) {
        if(err) throw err;
        if(newData['created_date'] == datetime)
            res.send(newData)
            //res.redirect('/predict');
        else
            RawPrediction.create(data, function (err, newRes) {
                //res.render('success', {success_resp: 'Prediction set successfully!!'} );
                res.send(newRes)
                //res.redirect('/predict');
            })
        

    })
});



router.post('/done', function (req, res, next) {
    var data = {'_id': req.body._id };
    Display.findOneAndUpdate(data, function (err, response) {
        if(err) throw err;
        RawPrediction.findOneAndUpdate({"_id": response['predict_id']}, response['quantity'], function (err, update_resp) {
            if(err) throw err;
        });       
        res.send(response)
    })
});

router.get('/display', function (req, res, next) {
    var data = {'status': false};
    var jsonResult = {};
    Display.display(data).exec(function(err, bikes){
        if(err) throw err;
        res.send(bikes)

    });
    
});

router.get('/report', function (req, res, next) {
    Report.gen_report_agg({}).exec(function (err, bikes) {
        if (err) throw err;
        console.log(bikes);
        res.send(bikes);
        ///res.render('report', {report_data: bikes});
        //console.log(bikes);
    });
});

module.exports = router;
