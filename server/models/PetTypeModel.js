const { db } = require("../firebaseConfig");

class PetTypeModel {
  constructor(ref) {
    this.petTypeRef = ref;
  }

  async getName() {
    const petTypeDoc = await this.petTypeRef?.get();
    if (!petTypeDoc.exists) {
      throw new Error("Pet type does not exist");
    }
    const petTypeData = petTypeDoc.data();
    // console.log({petTypeData})
    return petTypeData.name;
  }

  static async getPetTypes() {
    const petTypesSnapshot = await db.collection("petType").get();
    const petTypes = [];

    petTypesSnapshot.forEach((petTypeDoc) => {
      const petTypeData = petTypeDoc.data();
      petTypes.push({ id: petTypeDoc.id, name: petTypeData.name });
    });

    return petTypes;
  }

  static async getRefById(id) {
    const pet = db.collection("petTypes").doc(id);
    const petDoc = await pet.get();
    return petDoc.ref | null;
  }
}

module.exports = PetTypeModel;
