import fs from 'fs';
import { XMLParser } from 'fast-xml-parser';

// @Todo, pull recent cache ata from const TAF_URL = "https://aviationweather.gov/data/cache/tafs.cache.xml.gz";
const tafXmlPath = './data/tafs.cache.xml';
// @Todo add isntruction to pull airports from https://github.com/mwgg/Airports/tree/master
const airportsJsonPath = './data/airports.json';
const outputPath = './data/activeAirports.json';

const xmlData = fs.readFileSync(tafXmlPath, 'utf8');
const airports = JSON.parse(fs.readFileSync(airportsJsonPath, 'utf8'));
const parser = new XMLParser({ ignoreAttributes: false });
const tafs = parser.parse(xmlData);

function extractStationIds(obj: unknown, result: Set<string> = new Set()): Set<string> {
    if (typeof obj !== 'object' || obj === null) return result;

    const record = obj as Record<string, unknown>;

    if ('station_id' in record) {
        const val = record['station_id'];
        if (Array.isArray(val)) {
            val.forEach(v => typeof v === 'string' && result.add(v.trim()));
        } else if (typeof val === 'string') {
            result.add(val.trim());
        }
    }

    for (const key in record) {
        extractStationIds(record[key], result);
    }

    return result;
}

const activeStationIds = Array.from(extractStationIds(tafs));

export interface ActiveAirport {
    icao: string;
    iata: string;
    name: string;
    city: string;
    state: string;
    country: string;
};

export interface Airport extends ActiveAirport {
    lat: number;
    lon: number;
};

const activeAirports: ActiveAirport[] = Object.values(airports)
    .filter((airport: Airport) => activeStationIds.includes(airport.icao))
    .map((airport: any) => ({
        icao: airport.icao,
        iata: airport.iata,
        name: airport.name,
        city: airport.city,
        state: airport.state,
        country: airport.country,
    }))
    .sort((a: ActiveAirport, b: ActiveAirport) => a.name.localeCompare(b.name))
    .sort((a: ActiveAirport, b: ActiveAirport) => a.country.localeCompare(b.country))

fs.writeFileSync(outputPath, JSON.stringify(activeAirports, null, 2));
