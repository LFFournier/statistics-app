import { NextRequest, NextResponse } from 'next/server';


export async function GET (
    request: NextRequest,
    { params }: { params: Promise<{ oaciId: string }> }
) {
    const { oaciId } = await params

    if (oaciId.length !== 4){
        return Response.json(
            { error: 'Bad ID' },
            { status: 400 }
        );
    }
    const searchParams = request.nextUrl.searchParams;
    const hours = searchParams.get('hours') || '2';

    try {
        const response = await fetch(
            `https://aviationweather.gov/api/data/metar?ids=${oaciId}&format=json&taf=false&hours=${hours}`,
            {
                headers: {
                    'Accept': 'application/json',
                },
            }
        );

        if (!response.ok) {
            throw new Error(`Aviation API responded with status: ${response.status}`);
        }

        if (response.status === 204) {
            return NextResponse.json({ status: 204 });
        }

        const data = await response.json();

        return NextResponse.json(data);
    } catch (error) {
        console.error('Error fetching aviation data:', error);
        return NextResponse.json(
            { error: 'Failed to fetch aviation data',
              status: 500},
        );
    }
}