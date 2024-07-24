'use server';

const API_URL = process.env.API;

export default async function apiRequestHandler<ReturnType>(method: 'GET' | 'POST' | 'PUT' | 'DELETE', endpoint: string, body?: Record<string, unknown>) {
  if (!API_URL) {
    throw new Error('API ENV is not defined');
  }

  const request = await fetch(`${API_URL}${endpoint}`, {
    headers: { 'content-type': 'application/json' },
    method,
    body: JSON.stringify(body)
  });

  if (request.ok) {
    const data = await request.json() as ReturnType;
    return data;
  } else {
    throw new Error('Request failed');
  }
}