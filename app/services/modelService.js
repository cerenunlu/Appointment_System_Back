module.exports = {

    // get all data
    findAll: async function (model, options) {
      return await model.findAll(options);
    },
  
    // find a specific data based on ID
    findOne: async function (model, options) {
      return await model.findOne(options);
    },
  
    // created a data
    create: async function (model, options) {
      return await model.create(options);
    },
  
    // find or created a data
    findOrCreate: async function (model, options) {
      const [data, created] = await model.findOrCreate(options);
      if(created == true) {
        return data;
      }
    },
  
    // destroy a data
    destroy: async function (model, options) {
      return await model.destroy(options);
    },
  };