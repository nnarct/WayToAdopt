const PetTypeModel = require("../models/PetTypeModel");
class PetTypeController {
  static async getPetTypes(req, res) {
    try {
      const petTypes = await PetTypeModel.getPetTypes();
      if (petTypes.length === 0) {
        return res.status(500).send({ message: "Pet type data not found" });
      }
      return res.status(201).json(petTypes);
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  }
}

module.exports = PetTypeController