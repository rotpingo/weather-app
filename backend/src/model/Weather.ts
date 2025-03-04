import mongoose, { Document } from "mongoose";

//Defining Interface for Weather Data
export interface IWeather extends Document {
  city: string,
  temperature: number,
  description: string;
  date: Date;
  humidity: number;
  wind: number;
  cloudness: number;
}

// Schema
const WeatherSchema = new mongoose.Schema({
  city: { type: String, required: true },
  tempreature: { type: Number, required: true },
  description: { type: String, required: true },
  date: { type: Date, default: Date.now },
  humidity: { type: Number, required: true },
  wind: { type: Number, required: true },
  cloudness: { type: Number, required: true }
});

//Exporting Mongoose Model
export default mongoose.model<IWeather>("Weather", WeatherSchema);
