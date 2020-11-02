const path = require('path');
const express = require('express');
const xss = require('xss');
const VendorsService = require('./vendors-service');

const vendorsRouter = express.Router();
const jsonParser = express.json();

const serializeimp_vendors = (imp_vendors) => ({
  id: imp_vendors.id,
  user_id: imp_vendors.user_id,
  name: imp_vendors.name,
  description: imp_vendors.description,
  streetaddress: xss(imp_vendors.streetaddress),
  city: xss(imp_vendors.city),
  state: xss(imp_vendors.state),
  zip: xss(imp_vendors.zip),
  phone: xss(imp_vendors.phone),
  email: xss(imp_vendors.email),
  hoursofbusiness: xss(imp_vendors.hoursofbusiness),
  itemcount: xss(imp_vendors.itemcount),
  itemprice: xss(imp_vendors.itemprice),
  img: xss(imp_vendors.img),
  date_created: xss(imp_vendors.date_created),
});



vendorsRouter
  .route('/')
  .get((req, res, next) => {
    VendorsService.getAllVendors(req.app.get('db'))
      .then(vendors => {
        res.json(vendors);
      })
      .catch(next);
  })
  .post(jsonParser, (req, res, next) => {
    const {
      user_id,
      name,
      description,
      streetaddress,
      city,
      state,
      zip,
      phone,
      email,
      hoursofbusiness,
      itemcount,
      itemprice,
      img,
      date_created,
    } = req.body;

    const newVendor = {
      user_id,
      name,
      description,
      streetaddress,
      city,
      state,
      zip,
      phone,
      email,
      hoursofbusiness,
      itemcount,
      itemprice,
      img,
      date_created,
    };

    for (const [key, value] of Object.entries(newVendor))
      if (value == null)
        return res.status(400).json({
          error: {
            message: `Missing '${key}' in request body`,
          },
        });

    console.log(newVendor)


    VendorsService.insertVendors(req.app.get('db'), newVendor)
      .then(vendor => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${vendor.id}`))
          .json(vendor);
      })
      .catch(next);
  });

vendorsRouter
  .route('/:vendor_id')
  .all((req, res, next) => {
    VendorsService.getVendorsById(req.app.get('db'), req.params.vendor_id)
      .then(imp_vendors => {
        if (!imp_vendors) {
          return res.status(404).json({
            error: { message: `Vendor doesn't exist` },
          });
        }
        res.imp_vendors = imp_vendors; // save the vendor for the next middleware
        next(); // don't forget to call next so the next middleware happens!
      })
      .catch(next);
  })

  .get((req, res, next) => {
    res.json(
      serializeimp_vendors(res.imp_vendors));
  })

  .delete((req, res, next) => {
    VendorsService
      .deleteVendorById(
        req.app.get('db'),
        req.params.vendor_id)
      .then((vendorRows) => {
        res.status(204).json(vendorRows).end();
      })
      .catch(next);
  })

  .patch(jsonParser, (req, res, next) => {
    const {
      user_id,
      name,
      description,
      streetaddress,
      city,
      state,
      zip,
      phone,
      email,
      hoursofbusiness,
      itemcount,
      itemprice,
      img,
      date_created } = req.body;

    const vendorToUpdate = {
      user_id,
      name,
      description,
      streetaddress,
      city,
      state,
      zip,
      phone,
      email,
      hoursofbusiness,
      itemcount,
      itemprice,
      img,
      date_created
    };
    console.log(vendorToUpdate,"hello")

    const numberOfValues = Object.values(vendorToUpdate).filter(Boolean).length
    if (numberOfValues === 0) {
      return res.status(400).json({
        error: {
          message: `Missing 'name', 'description', 'streetaddress', 'state','zip', 'phone', 'email', 'hoursofbusiness', 'itemCount', 'itemPric, 'img', date_created'`
        }
      })
    }
    VendorsService.updateVendorById(
      req.app.get('db'),
      req.params.vendor_id,
      vendorToUpdate
    )
      .then(vendorToUpdate => {
        res
          .status(200)
          .json(serializeimp_vendors(vendorToUpdate))

      })
      .catch(next)

  })

module.exports = vendorsRouter;