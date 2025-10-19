import {NextRequest, NextResponse} from 'next/server';

export async function GET(
    request: NextRequest,
    {params}: { params: { oaciId: string } }
) {
    const {oaciId} = await params;

    if (!oaciId || oaciId.length !== 4) {
        return NextResponse.json({error: 'Bad ID', status: 400});
    }

    const searchParams = request.nextUrl.searchParams;
    const includeMetar = searchParams.get('metar') === 'true';
    const includeTaf = searchParams.get('taf') === 'true';
    const hours = searchParams.get('hours') || '2';

    // Default: fetch both if no params provided
    const fetchMetar = includeMetar || (!includeMetar && !includeTaf);
    const fetchTaf = includeTaf || (!includeMetar && !includeTaf);

    const fetchJson = async (url: string) => {
        const res = await fetch(url, {headers: {Accept: 'application/json'}});
        if (!res.ok) throw new Error(`Failed request: ${res.status}`);
        if (res.status === 204) return null;
        return res.json();
    };

    try {
        const metarPromise = fetchMetar
            ? fetchJson(
                `https://aviationweather.gov/api/data/metar?ids=${oaciId}&format=json&hours=${hours}`
            )
            : Promise.resolve(null);

        const tafPromise = fetchTaf
            ? fetchJson(
                `https://aviationweather.gov/api/data/taf?ids=${oaciId}&format=json&hours=${hours}`
            )
            : Promise.resolve(null);

        const [metar, taf] = await Promise.all([metarPromise, tafPromise]);

        if (!metar && !taf) {
            return NextResponse.json({status: 204});
        }

        return NextResponse.json({
            icao: oaciId,
            ...(metar && {metar}),
            ...(taf && {taf}),
        });
    } catch (error) {
        console.error('Error fetching aviation data:', error);
        return NextResponse.json(
            {
                error: 'Failed to fetch aviation data',
                status: 500
            }
        );
    }
}
