import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
    try {
        const clientsDirectory = path.join(process.cwd(), 'public/clients');

        // Check if directory exists
        if (!fs.existsSync(clientsDirectory)) {
            return NextResponse.json({ clients: [] });
        }

        const files = fs.readdirSync(clientsDirectory);

        // Filter for image files only
        const imageFiles = files.filter(file =>
            /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(file)
        ).map(file => ({
            name: file.split('.')[0].replace(/[-_]/g, ' '), // Readable name from filename
            src: `/clients/${file}`
        }));

        return NextResponse.json({ clients: imageFiles });
    } catch (error) {
        console.error('Error reading clients directory:', error);
        return NextResponse.json({ error: 'Failed to load clients' }, { status: 500 });
    }
}
