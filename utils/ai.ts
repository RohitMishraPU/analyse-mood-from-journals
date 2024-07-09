import { OpenAI } from "@langchain/openai";
import { StructuredOutputParser } from "@langchain/core/output_parsers";
import { PromptTemplate } from "@langchain/core/prompts";
import { z } from "zod";

const analysisZodSchema = z.object({
    mood: z
      .string()
      .describe('the mood of the person who wrote the journal entry.'),
    subject: z.string().describe('the subject of the journal entry.'),
    negative: z
      .boolean()
      .describe(
        'is the journal entry negative? (i.e. does it contain negative emotions?).'
      ),
    summary: z.string().describe('quick summary of the entire entry.'),
    color: z
      .string()
      .describe(
        'a hexidecimal color code that represents the mood of the entry. Example #0101fe for blue representing happiness.'
      ),
    sentimentScore: z
      .number()
      .describe(
        'sentiment of the text and rated on a scale from -10 to 10, where -10 is extremely negative, 0 is neutral, and 10 is extremely positive.'
      ),
  });
const parser = StructuredOutputParser.fromZodSchema(analysisZodSchema);
  

const getPromptTemplate =async (content : string) => {
    const formattedInstructions = parser.getFormatInstructions();

    const prompt = new PromptTemplate({
        template:
          'Analyze the following journal entry. Follow the intrusctions and format your response to match the format instructions, no matter what! \n{format_instructions}\n{entry}',
        inputVariables: ['entry'],
        partialVariables: { formattedInstructions },
      })
    
      const input = await prompt.format({
        entry: content,
      })
    
      return input
}
export const analyze = async (content:string) => {
    const input = await getPromptTemplate(content)
    const model = new OpenAI({temperature : 0, modelName:'gpt-3.5-turbo', apiKey: process.env.OPENAI_API_KEY
    })
    const output = await model.invoke(input);

    try {
        return parser.parse(output)

        // return {
        //     mood: 'Neutral',
        //     subject: 'None',
        //     negative: false,
        //     summary: 'None',
        //     sentimentScore: 0,
        //     color: '#0101fe'
        //   }
      } catch (e) {
        // handle case when parsing fails
        // const fixParser = OutputFixingParser.fromLLM(
        //   new OpenAI({ temperature: 0, modelName: 'gpt-3.5-turbo' }),
        //   parser
        // )
        // const fix = await fixParser.parse(output)
        // return fix
      }
    
    
}