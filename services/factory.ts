export async function fetchData<T>({
  endpoint,
  method,
  payload,
  header,
}: {
  endpoint: string;
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  payload?: Record<string, any>;
  header?: Record<string, any>;
}): Promise<T> {
  try {
    const requestOptions: RequestInit = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (payload) {
      requestOptions.body = JSON.stringify(payload);
    }
    if (header) {
      requestOptions.headers = {
        ...requestOptions.headers,
        ...header,
      };
    }

    const res = await fetch(`${endpoint}`, requestOptions);

    if (!res.ok) {
      const error = await res.json();
      throw new Error(`${error.message}`);
    }

    const data: T = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
}
