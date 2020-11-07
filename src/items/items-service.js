const ItemsService = {
  getAllItems(db) {
    return db
      .from('items')
      .select('*')
  },
  getItemsById(db, items_id) {
    console.log("items_id",items_id)
    return db
      .from('items')
      .select('*')
      .where({
        id: items_id
      })
      // .first()
  },
  insertItems(db, newItem) {
    return db
      .insert(newItem)
      .into('items')
      .returning('*')
      .then(rows => {
        return rows[0];
      });
  },

  deleteItemById(db, items_id) {
    return db('items')
      .where({
        id: items_id
      })
      .delete()
  },

  updateItemById(db, items_id, newItem) {
    console.log(items_id, newItem,"hi")
    return db('items')
      .update(newItem, returning = true)
      .where({
        id: items_id
      })
      .returning('*')
      .then(rows => {
        return rows[0]
      })
  },

}
module.exports = ItemsService;


