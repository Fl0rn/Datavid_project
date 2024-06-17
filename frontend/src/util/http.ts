import { BACKEND_LINK } from "./constants";

export async function handleSubmitValues<T>(valuesToSend: T, route: string): Promise<T | string> {
 
  try {
    const response = await fetch(BACKEND_LINK + route, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(valuesToSend),
    });

    if (!response.ok) {
      return response.text();
    }

    const data: T = await response.json();
    return data;
  } catch (error: any) {
    console.error("Error:", error.message);
    return "An error occurred"; 
  }
}
export async function getAllValues<T>(route: string): Promise<T> {
    try {
      const response = await fetch(BACKEND_LINK + route, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.statusText}`);
      }
  
      const data: T = await response.json();
      return data;
    } catch (error :any) {
      console.error("Error fetching values:", error.message);
      throw error;
    }
   
  }