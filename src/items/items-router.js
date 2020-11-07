const path = require('path');
const express = require('express');
const xss = require('xss');
const itemsService = require('./items-service');

const itemsRouter = express.Router();
const jsonParser = express.json();

const serializeItems = (items) => ({
  id: items.id,
  imp_vendors_id: items.imp_vendors_id,
  name: xss(items.name),
  description: xss(items.description),
  itemcount: xss(items.itemcount),
  itemprice: xss(items.itemprice),
  img: xss(items.img),
  date_created: xss(items.date_created)
});



itemsRouter
  .route('/')
  .get((req, res, next) => {
    itemsService.getAllItems(req.app.get('db'))
      .then(items => {
        res.json(items);
      })
      .catch(next);
  })

  .post(jsonParser, (req, res, next) => {
    const {
      imp_vendors_id,
      name,
      description,
      itemcount,
      itemprice,
      img,
      date_created
    } = req.body;

    const newItem = {
      imp_vendors_id,
      name,
      description,
      itemcount,
      itemprice,
      img,
      date_created
    };

    for (const [key, value] of Object.entries(newItem))
      if (value == null)
        return res.status(400).json({
          error: {
            message: `Missing '${key}' in request body`,
          },
        });

    console.log(newItem)


    itemsService.insertItems(req.app.get('db'), newItem)
      .then(item => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${item.id}`))
          .json(item);
      })
      .catch(next);
  });

itemsRouter
  .route('/:item_id')
  .all((req, res, next) => {
    itemsService.getItemsById(req.app.get('db'), req.params.item_id)
      .then(items => {
        if (!items) {
          return res.status(404).json({
            error: { message: `Item doesn't exist` },
          });
        }
        res.items = items; // save the item for the next middleware
        next(); // don't forget to call next so the next middleware happens!
      })
      .catch(next);
  })

  .get((req, res, next) => {
    res.json(
      serializeimp_items(res.items));
  })

  .delete((req, res, next) => {
    itemsService
      .deleteItemById(
        req.app.get('db'),
        req.params.item_id)
      .then((itemRows) => {
        res.status(204).json(itemRows).end();
      })
      .catch(next);
  })

  .patch(jsonParser, (req, res, next) => {
    const {
      imp_vendors_id,
      name,
      description,
      itemcount,
      itemprice,
      img,
      date_created } = req.body;

    const itemToUpdate = {
      imp_vendors_id,
      name,
      description,
      itemcount,
      itemprice,
      img,
      date_created
    };
    console.log(itemToUpdate,"hello")

    const numberOfValues = Object.values(itemToUpdate).filter(Boolean).length
    if (numberOfValues === 0) {
      return res.status(400).json({
        error: {
          message: `Missing 'name', 'description',  'itemCount', 'itemPric, 'img', date_created'`
        }
      })
    }
    itemsService.updateItemById(
      req.app.get('db'),
      req.params.item_id,
      itemToUpdate
    )
      .then(itemToUpdate => {
        res
          .status(200)
          .json(serializeItems(itemToUpdate))

      })
      .catch(next)

  })

module.exports = itemsRouter;