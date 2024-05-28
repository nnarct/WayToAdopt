const { db } = require("../firebaseConfig");

class PetTypeModel {
  static async getPetTypes() {
    const petTypesSnapshot = await db.collection("petType").get();
    const petTypes = [];

    petTypesSnapshot.forEach((petTypeDocs) => {
      const petTypeData = petTypeDocs.data();
      petTypes.push({ id: petTypeDocs.id, name: petTypeData.name });
    });

    return petTypes;
  }
}
module.exports = PetTypeModel;
