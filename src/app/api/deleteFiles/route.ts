import { Storage } from '@google-cloud/storage';
import { NextResponse } from 'next/server';

export async function POST(
    request: Request
) {
    const body = await request.json();
    const {
        file,
    } = body;

    console.log(file);
    
    const storage = new Storage({
        projectId: process.env.PROJECT_ID,
        credentials: {
          client_email: process.env.CLIENT_EMAIL,
          private_key: process.env.PRIVATE_KEY,
        },
      });

      // delete the file
    const bucket = storage.bucket(process.env.BUCKET_NAME as string);
    const file_ref = bucket.file(file as string);
    const res = await file_ref.delete();

    console.log(`gs://${bucket.name}/${file_ref.name} deleted.`);
    return NextResponse.json(res);

}