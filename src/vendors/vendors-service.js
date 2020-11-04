const VendorsService = {
  getAllVendors(db) {
    return db
      .from('imp_vendors')
      .select('*')
  },
  getVendorsById(db, imp_vendors_id) {
    console.log("imp_vendors_id",imp_vendors_id)
    return db
      .from('imp_vendors')
      .select('*')
      .where({
        id: imp_vendors_id
      })
      // .first()
  },
  insertVendors(db, newVendor) {
    return db
      .insert(newVendor)
      .into('imp_vendors')
      .returning('*')
      .then(rows => {
        return rows[0];
      });
  },

  deleteVendorById(db, imp_vendors_id) {
    return db('imp_vendors')
      .where({
        id: imp_vendors_id
      })
      .delete()
  },

  updateVendorById(db, imp_vendors_id, newVendor) {
    console.log(imp_vendors_id, newVendor,"hi")
    return db('imp_vendors')
      .update(newVendor, returning = true)
      .where({
        id: imp_vendors_id
      })
      .returning('*')
      .then(rows => {
        return rows[0]
      })
  },

}
module.exports = VendorsService;


