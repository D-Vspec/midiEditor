'use server';
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    try {
        const body = await req.text();  // Parse request body as plain text

        // Assuming the body is just a string representing the team name
        const name = body.trim();
        
        if (!name) {
            return NextResponse.json({ success: false, error: 'Name is required' }, { status: 400 });
        }
        
        const newTeam = await prisma.team.create({
            data: {
                name,
            },
        });

        return NextResponse.json({ success: true, data: newTeam }, { status: 200 });
        
    } catch (error) {
        console.error('Error creating team:', error);
        return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
    }
}
