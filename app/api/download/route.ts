import { NextRequest, NextResponse } from 'next/server';
import { readFileSync } from 'fs';
import { join } from 'path';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const file = searchParams.get('file');

  if (!file) {
    return NextResponse.json({ error: 'No file specified' }, { status: 400 });
  }

  // Validate file path to prevent directory traversal
  const validFiles = [
    'young-learners-lesson-plans.md',
    'beginner-lesson-plans.md',
    'intermediate-lesson-plans.md',
    'advanced-lesson-plans.md'
  ];

  if (!validFiles.includes(file)) {
    return NextResponse.json({ error: 'Invalid file' }, { status: 404 });
  }

  try {
    const filePath = join(process.cwd(), 'public', 'curriculum', file);
    const fileContent = readFileSync(filePath);

    return new NextResponse(fileContent, {
      headers: {
        'Content-Type': 'text/markdown; charset=utf-8',
        'Content-Disposition': `attachment; filename="${file}"`,
        'Content-Length': fileContent.length.toString(),
      },
    });
  } catch (error) {
    console.error('Download error:', error);
    return NextResponse.json({ error: 'File not found' }, { status: 404 });
  }
}
