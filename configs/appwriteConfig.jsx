// lib/appwrite.js
import { Client, Account, Storage } from 'appwrite';

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT) // Set your Appwrite endpoint here
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID); // Set your project ID here

// Initialize Appwrite services
export const account = new Account(client);
export const storage = new Storage(client);

