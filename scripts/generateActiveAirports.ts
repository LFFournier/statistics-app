import fs from 'fs';
import {XMLParser} from 'fast-xml-parser';

// @Todo, pull recent cache ata from const TAF_URL = "https://aviationweather.gov/data/cache/tafs.cache.xml.gz";
const tafXmlPath = './data/tafs.cache.xml';
const metarsXmlPath = './data/metars.cache.xml';
// @Todo add isntruction to pull airports from https://github.com/mwgg/Airports/tree/master
const airportsJsonPath = './data/airports.json';
const outputPath = './data/activeAirports.json';

const metarsXmlData = fs.readFileSync(metarsXmlPath, 'utf8');
const tafXmlData = fs.readFileSync(tafXmlPath, 'utf8');
const airports = JSON.parse(fs.readFileSync(airportsJsonPath, 'utf8'));
const parser = new XMLParser({ignoreAttributes: false});
const tafs = parser.parse(tafXmlData);
const metars = parser.parse(metarsXmlData);

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

export interface ActiveAirport {
    icao: string;
    iata: string;
    name: string;
    city: string;
    state: string;
    country: string;
    "elevation": number,
    "lat": number,
    "lon": number,
    "reports": {
        "taf": boolean,
        "metar": boolean
    }
}

const activeTafStationIds = Array.from(extractStationIds(tafs));
const activeMetarStationIds = Array.from(extractStationIds(metars));

const activeTafSet = new Set(activeTafStationIds);
const activeMetarSet = new Set(activeMetarStationIds);

const activeAirports: ActiveAirport[] = Object.values(airports)
    .reduce<ActiveAirport[]>((acc, airport: any) => {
        const hasTaf = activeTafSet.has(airport.icao);
        const hasMetar = activeMetarSet.has(airport.icao);

        if (!hasTaf && !hasMetar) return acc;

        acc.push({
            icao: airport.icao,
            iata: airport.iata,
            name: airport.name,
            city: airport.city,
            state: airport.state,
            country: airport.country,
            elevation: airport.elevation,
            lat: airport.lat,
            lon: airport.lon,
            reports: {taf: hasTaf, metar: hasMetar}
        });

        return acc;
    }, [])
    .sort((a, b) => {
        const countryCmp = a.country.localeCompare(b.country);
        return countryCmp !== 0 ? countryCmp : a.name.localeCompare(b.name);
    });
fs.writeFileSync(outputPath, JSON.stringify(activeAirports, null, 2));
