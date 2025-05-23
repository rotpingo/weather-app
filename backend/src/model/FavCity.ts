import mongoose from "mongoose";

export interface ISavedCities extends Document {
  name: string;
  country: string;
}

const savedSchema = new mongoose.Schema({
  name: { type: String, required: true },
  country: { type: String, required: true }
});

export default mongoose.model<ISavedCities>("SavedCities", savedSchema);
