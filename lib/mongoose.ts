"use server";
import mongoose from "mongoose";

let isConnected = false;
export const connectToDB = async () => {
	mongoose.set("strictQuery", true);

	if (!process.env.MONGODB_URL) return console.log("MONGODB not found");
	if (isConnected) return console.log("Already connected");
	console.log(process.env.MONGODB_URL);
	try {
		await mongoose.connect(
			//fix to env var
			"mongodb+srv://qwerty:UUEF3IxdxpXhDKoK@cluster1.2vtqc4o.mongodb.net/?retryWrites=true&w=majority"
		);
		isConnected = true;
		console.log("Connected to mongoDB");
	} catch (error) {
		console.log(error);
	}
};
