import * as dotenv from "dotenv";
dotenv.config();

import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/dream", async (req, res) => {

    try {
      const prompt = req.body.prompt;
      console.log("Received prompt:", prompt);
      const aiResponse = await openai.images.generate({
        prompt,
        n: 1,
        size: "1024x1024",
      });
    //   console.log(aiResponse?.data?.data?.[0]?.url);

      console.log("AI Response:", JSON.stringify(aiResponse, null, 2));


      const image = aiResponse.data[0].url;
      
      if (image) {
        res.send({ image });
      } else {
        res.status(500).send(error?.response.data.error.message || "Image URL is undefined");
      }


    } catch (error) {
      console.error("An error occurred:", error);
      res.status(500).send({ error: error.message });
    }

});

app.listen(8080, () => console.log("make art on http://localhost:8080/dream"));
