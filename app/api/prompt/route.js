import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const GET = async (request) => {
  try {
    await connectToDB()

    const prompts = await Prompt.find({}).populate('creator')

    // Convert the array of prompts to an object with keys as IDs
    const promptsObject = prompts.reduce((acc, prompt) => {
      acc[prompt._id.toString()] = prompt;
      return acc;
    }, {});

    return new Response(JSON.stringify(promptsObject), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
};
