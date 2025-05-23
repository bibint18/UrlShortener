// import { nanoid } from "nanoid";

// export async function generateShortId():Promise<string> {
//   const short = nanoid(8)
//   console.log(short)
//   return short
// }


// export async function generateShortId(): Promise<string> {
//   console.log("reached here")
//   const { nanoid } = await import('nanoid');
//   const short = nanoid(7);
//   console.log(short)
//   return short
// }




// export async function generateShortId(): Promise<string> {
//   console.log('generateShortId: Starting');
//   try {
//     console.log('generateShortId: Attempting to import nanoid');
//     const { nanoid } = await import('nanoid');
//     console.log('generateShortId: nanoid imported successfully');
//     const short = nanoid(7);
//     console.log('generateShortId: Generated short ID:', short);
//     return short;
//   } catch (error) {
//     console.error('generateShortId: Error generating short ID:', error);
//     throw new Error(`Failed to generate short ID: ${error instanceof Error ? error.message : String(error)}`);
//   }
// }


import { nanoid } from 'nanoid';

export function generateShortId(): string {
  console.log('generateShortId: Starting');
  try {
    const short = nanoid(7);
    console.log('generateShortId: Generated short ID:', short);
    return short;
  } catch (error) {
    console.error('generateShortId: Error generating short ID:', error);
    throw new Error(`Failed to generate short ID: ${error instanceof Error ? error.message : String(error)}`);
  }
}