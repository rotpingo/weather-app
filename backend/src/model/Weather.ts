import mongoose, { Document } from "mongoose";

//Defining Interface for Weather Data
export interface IWeather extends Document {
  name: string,
  temperature: number,
  description: string;
  humidity: number;
  wind: number;
  cloudiness: number;
}

// Schema
const WeatherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  temperature: { type: Number, required: true },
  description: { type: String, required: true },
  humidity: { type: Number, required: true },
  wind: { type: Number, required: true },
  cloudiness: { type: Number, required: true }
});

//Exporting Mongoose Model
export default mongoose.model<IWeather>("Weather", WeatherSchema);
