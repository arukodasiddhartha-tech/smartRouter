/**
 * Demo Graph Dataset for RouteOpt Engine
 * Real-world geographic road network modeling the San Francisco Bay Area & Silicon Valley corridors.
 * Includes major highways, toll bridges, scenic routes, surface arterials, realistic speeds,
 * congestion factors, tolls, and waypoint coordinates for smooth polyline rendering.
 */

export const DEMO_NODES = {
  HYDERABAD: {
    id: 'HYDERABAD',
    name: 'Hyderabad (Uppal / MGBS Hub)',
    shortName: 'Hyderabad',
    category: 'City Hub',
    lat: 17.3984,
    lng: 78.5583,
    description: 'Starting commercial hub connected to NH 163 and Outer Ring Road.'
  },
  GHATKESAR: {
    id: 'GHATKESAR',
    name: 'Ghatkesar (ORR Junction)',
    shortName: 'Ghatkesar',
    category: 'Suburban Junction',
    lat: 17.4526,
    lng: 78.6836,
    description: 'Key junction between Outer Ring Road and Warangal National Highway.'
  },
  BHONGIR: {
    id: 'BHONGIR',
    name: 'Bhongir (Fort Town / NH 163)',
    shortName: 'Bhongir',
    category: 'Transit Town',
    lat: 17.5113,
    lng: 78.8889,
    description: 'Historic fort town featuring NH 163 bypass and commercial transit.'
  },
  YADADRI: {
    id: 'YADADRI',
    name: 'Yadadri (Temple Corridor)',
    shortName: 'Yadadri',
    category: 'Heritage Corridor',
    lat: 17.5878,
    lng: 78.9482,
    description: 'Cultural temple corridor connecting Bhuvanagiri and Aler via scenic state routes.'
  },
  ALER: {
    id: 'ALER',
    name: 'Aler (Rural Arterial / State Highway)',
    shortName: 'Aler',
    category: 'Highway Junction',
    lat: 17.6534,
    lng: 79.0537,
    description: 'Arterial intersection between state highway bypasses and railway line.'
  },
  JANGAON: {
    id: 'JANGAON',
    name: 'Jangaon (District Junction)',
    shortName: 'Jangaon',
    category: 'Commercial Center',
    lat: 17.7265,
    lng: 79.1672,
    description: 'Major midway commercial hub linking Hyderabad to Warangal.'
  },
  GHANPUR: {
    id: 'GHANPUR',
    name: 'Station Ghanpur',
    shortName: 'Ghanpur',
    category: 'Transit Node',
    lat: 17.8488,
    lng: 79.3755,
    description: 'Intermediate transit corridor along NH 163.'
  },
  KAZIPET: {
    id: 'KAZIPET',
    name: 'Kazipet (Railway Hub)',
    shortName: 'Kazipet',
    category: 'Transit Hub',
    lat: 17.9785,
    lng: 79.5226,
    description: 'Major railway junction leading into the tri-city urban area.'
  },
  WARANGAL: {
    id: 'WARANGAL',
    name: 'Warangal (City Center / Hanamkonda)',
    shortName: 'Warangal',
    category: 'Destination City',
    lat: 17.9689,
    lng: 79.5941,
    description: 'Historic heritage city and educational hub of Kakatiya region.'
  },
  SF_DOWNTOWN: {
    id: 'SF_DOWNTOWN',
    name: 'San Francisco (Downtown / Financial District)',
    shortName: 'SF Downtown',
    category: 'City Center',
    lat: 37.7879,
    lng: -122.4075,
    description: 'Urban core with transit hubs and dense commercial offices.'
  },
  SF_FISHERMAN: {
    id: 'SF_FISHERMAN',
    name: "San Francisco (Fisherman's Wharf)",
    shortName: "Fisherman's Wharf",
    category: 'Tourist / Coastal',
    lat: 37.8080,
    lng: -122.4177,
    description: 'Historic northern waterfront and tourist landmark.'
  },
  SF_SUNSET: {
    id: 'SF_SUNSET',
    name: 'San Francisco (Sunset / Ocean Beach)',
    shortName: 'SF Ocean Beach',
    category: 'Coastal / Residential',
    lat: 37.7535,
    lng: -122.4850,
    description: 'Western coastal district adjacent to Highway 1 and Golden Gate Park.'
  },
  MARIN_SAUSALITO: {
    id: 'MARIN_SAUSALITO',
    name: 'Marin (Sausalito / Golden Gate Vista)',
    shortName: 'Marin Sausalito',
    category: 'Scenic / North Bay',
    lat: 37.8590,
    lng: -122.4853,
    description: 'North Bay gateway across the iconic Golden Gate Bridge.'
  },
  OAKLAND_DT: {
    id: 'OAKLAND_DT',
    name: 'Oakland (Downtown / City Center)',
    shortName: 'Oakland Downtown',
    category: 'City Center',
    lat: 37.8044,
    lng: -122.2712,
    description: 'Major East Bay urban center and I-880/I-980 junction.'
  },
  BERKELEY: {
    id: 'BERKELEY',
    name: 'Berkeley (UC Berkeley Campus)',
    shortName: 'Berkeley Campus',
    category: 'University / Tech',
    lat: 37.8715,
    lng: -122.2730,
    description: 'Academic and research center near I-80 corridor.'
  },
  EMERYVILLE: {
    id: 'EMERYVILLE',
    name: 'Emeryville (Bay Tech Hub)',
    shortName: 'Emeryville',
    category: 'Commercial',
    lat: 37.8313,
    lng: -122.2852,
    description: 'Biotech and animation studio hub near Bay Bridge touchdown.'
  },
  SFO_AIRPORT: {
    id: 'SFO_AIRPORT',
    name: 'San Francisco International Airport (SFO)',
    shortName: 'SFO Airport',
    category: 'Airport',
    lat: 37.6213,
    lng: -122.3790,
    description: 'International air terminal off US-101.'
  },
  PACIFICA: {
    id: 'PACIFICA',
    name: 'Pacifica (Pacific Coast Highway)',
    shortName: 'Pacifica Coast',
    category: 'Coastal',
    lat: 37.6138,
    lng: -122.4869,
    description: 'Scenic seaside town on Coastal Highway 1.'
  },
  SAN_MATEO: {
    id: 'SAN_MATEO',
    name: 'San Mateo (Bridge Junction)',
    shortName: 'San Mateo',
    category: 'Suburban Hub',
    lat: 37.5630,
    lng: -122.3255,
    description: 'Peninsula hub intersecting US-101 and CA-92 San Mateo Bridge.'
  },
  HALF_MOON_BAY: {
    id: 'HALF_MOON_BAY',
    name: 'Half Moon Bay (Coast & Marina)',
    shortName: 'Half Moon Bay',
    category: 'Coastal / Scenic',
    lat: 37.4636,
    lng: -122.4286,
    description: 'Historic coastal harbor town connected via CA-92.'
  },
  REDWOOD_CITY: {
    id: 'REDWOOD_CITY',
    name: 'Redwood City (Sequoia Station)',
    shortName: 'Redwood City',
    category: 'Suburban Hub',
    lat: 37.4852,
    lng: -122.2364,
    description: 'Mid-peninsula government and commercial center.'
  },
  PALO_ALTO: {
    id: 'PALO_ALTO',
    name: 'Palo Alto (Stanford University / Univ Ave)',
    shortName: 'Palo Alto',
    category: 'University / Tech',
    lat: 37.4419,
    lng: -122.1430,
    description: 'Heart of Silicon Valley venture and research corridor.'
  },
  MOUNTAIN_VIEW: {
    id: 'MOUNTAIN_VIEW',
    name: 'Mountain View (Googleplex / Shoreline)',
    shortName: 'Mountain View',
    category: 'Tech Campus',
    lat: 37.3861,
    lng: -122.0839,
    description: 'Global tech campus zone along US-101 and CA-85.'
  },
  SUNNYVALE: {
    id: 'SUNNYVALE',
    name: 'Sunnyvale (Silicon Tech Corridor)',
    shortName: 'Sunnyvale',
    category: 'Commercial',
    lat: 37.3688,
    lng: -122.0363,
    description: 'Semiconductor and cloud computing hub.'
  },
  CUPERTINO: {
    id: 'CUPERTINO',
    name: 'Cupertino (Apple Park / Foothills)',
    shortName: 'Cupertino',
    category: 'Tech Campus',
    lat: 37.3230,
    lng: -122.0322,
    description: 'South Bay tech campus along I-280 and CA-85.'
  },
  HAYWARD: {
    id: 'HAYWARD',
    name: 'Hayward (East Bay South)',
    shortName: 'Hayward',
    category: 'Industrial / Logistics',
    lat: 37.6688,
    lng: -122.0808,
    description: 'East Bay logistics crossroads connecting to San Mateo Bridge.'
  },
  FREMONT: {
    id: 'FREMONT',
    name: 'Fremont (Tesla Factory / Warm Springs)',
    shortName: 'Fremont',
    category: 'Industrial / Tech',
    lat: 37.5485,
    lng: -121.9886,
    description: 'Clean energy manufacturing center and Dumbarton Bridge terminus.'
  },
  MILPITAS: {
    id: 'MILPITAS',
    name: 'Milpitas (Great Mall / Transit Center)',
    shortName: 'Milpitas',
    category: 'Suburban Hub',
    lat: 37.4323,
    lng: -121.8996,
    description: 'Silicon Valley northern gateway along I-880 and I-680.'
  },
  SAN_JOSE_AIRPORT: {
    id: 'SAN_JOSE_AIRPORT',
    name: 'San Jose Mineta Intl Airport (SJC)',
    shortName: 'SJC Airport',
    category: 'Airport',
    lat: 37.3639,
    lng: -121.9289,
    description: 'Silicon Valley commercial aviation airport.'
  },
  SAN_JOSE_DT: {
    id: 'SAN_JOSE_DT',
    name: 'San Jose (Downtown / Tech Museum)',
    shortName: 'San Jose Downtown',
    category: 'City Center',
    lat: 37.3382,
    lng: -121.8863,
    description: 'Capital of Silicon Valley and major regional junction.'
  },
  LOS_GATOS: {
    id: 'LOS_GATOS',
    name: 'Los Gatos (Santa Cruz Mountains Foothills)',
    shortName: 'Los Gatos',
    category: 'Foothills',
    lat: 37.2358,
    lng: -121.9624,
    description: 'Foothills enclave and CA-17 mountain highway entrance.'
  },
  SANTA_CRUZ: {
    id: 'SANTA_CRUZ',
    name: 'Santa Cruz (Beach Boardwalk / Wharf)',
    shortName: 'Santa Cruz Boardwalk',
    category: 'Coastal / Tourist',
    lat: 36.9741,
    lng: -122.0308,
    description: 'Coastal surfing and tourism destination south of the mountains.'
  }
};

/**
 * Raw Edges definitions:
 * Each edge contains:
 * - u, v (node IDs)
 * - name (Roadway identifier)
 * - distance_km
 * - base_speed_kmh (Free-flow speed limit)
 * - congestion_factor (multiplier on time due to rush hour/density, 1.0 = clear, 1.5 = heavy)
 * - toll_usd (Toll in dollars, if any)
 * - road_type: 'freeway' | 'expressway' | 'arterial' | 'bridge' | 'scenic'
 * - bidirectional: boolean
 * - waypoints: array of [lat, lng] for accurate geographic curve rendering
 */
export const DEMO_EDGES = [
  // --- TELANGANA CORRIDOR: HYDERABAD ➔ WARANGAL ---
  // Corridor 1: NH-163 4-Lane Expressway (Uppal -> Ghatkesar -> Bhongir -> Jangaon -> Kazipet -> Warangal)
  {
    u: 'HYDERABAD',
    v: 'GHATKESAR',
    name: 'NH-163 Uppal-Ghatkesar Express Corridor',
    distance_km: 18.0,
    base_speed_kmh: 65,
    congestion_factor: 1.15,
    toll_usd: 0,
    road_type: 'expressway',
    bidirectional: true,
    waypoints: [
      [17.3984, 78.5583],
      [17.4120, 78.6050],
      [17.4350, 78.6500],
      [17.4526, 78.6836]
    ]
  },
  {
    u: 'GHATKESAR',
    v: 'BHONGIR',
    name: 'NH-163 Ghatkesar-Bhongir 4-Lane (Toll Plaza)',
    distance_km: 28.0,
    base_speed_kmh: 85,
    congestion_factor: 1.05,
    toll_usd: 60,
    road_type: 'highway',
    bidirectional: true,
    waypoints: [
      [17.4526, 78.6836],
      [17.4780, 78.7500],
      [17.4950, 78.8200],
      [17.5113, 78.8889]
    ]
  },
  {
    u: 'BHONGIR',
    v: 'JANGAON',
    name: 'NH-163 Central Highway',
    distance_km: 48.0,
    base_speed_kmh: 80,
    congestion_factor: 1.05,
    toll_usd: 30,
    road_type: 'highway',
    bidirectional: true,
    waypoints: [
      [17.5113, 78.8889],
      [17.5800, 79.0100],
      [17.6500, 79.1000],
      [17.7265, 79.1672]
    ]
  },
  {
    u: 'JANGAON',
    v: 'GHANPUR',
    name: 'NH-163 Jangaon-Ghanpur Highway',
    distance_km: 27.0,
    base_speed_kmh: 80,
    congestion_factor: 1.05,
    toll_usd: 0,
    road_type: 'highway',
    bidirectional: true,
    waypoints: [
      [17.7265, 79.1672],
      [17.7850, 79.2700],
      [17.8488, 79.3755]
    ]
  },
  {
    u: 'GHANPUR',
    v: 'KAZIPET',
    name: 'NH-163 Kazipet Approach (Toll Plaza)',
    distance_km: 17.0,
    base_speed_kmh: 75,
    congestion_factor: 1.10,
    toll_usd: 30,
    road_type: 'highway',
    bidirectional: true,
    waypoints: [
      [17.8488, 79.3755],
      [17.9100, 79.4500],
      [17.9785, 79.5226]
    ]
  },
  {
    u: 'KAZIPET',
    v: 'WARANGAL',
    name: 'Tri-City Arterial (Kazipet - Hanamkonda)',
    distance_km: 7.0,
    base_speed_kmh: 50,
    congestion_factor: 1.25,
    toll_usd: 0,
    road_type: 'arterial',
    bidirectional: true,
    waypoints: [
      [17.9785, 79.5226],
      [17.9750, 79.5550],
      [17.9689, 79.5941]
    ]
  },

  // Corridor 2: SH-15 / SH-19 North Expressway Bypass (Fastest Corridor)
  {
    u: 'GHATKESAR',
    v: 'ALER',
    name: 'SH-15 North Expressway Bypass',
    distance_km: 58.0,
    base_speed_kmh: 95,
    congestion_factor: 1.02,
    toll_usd: 90,
    road_type: 'expressway',
    bidirectional: true,
    waypoints: [
      [17.4526, 78.6836],
      [17.5200, 78.7800],
      [17.6000, 78.9200],
      [17.6534, 79.0537]
    ]
  },
  {
    u: 'ALER',
    v: 'KAZIPET',
    name: 'SH-19 High-Speed Bypass',
    distance_km: 75.0,
    base_speed_kmh: 92,
    congestion_factor: 1.02,
    toll_usd: 90,
    road_type: 'expressway',
    bidirectional: true,
    waypoints: [
      [17.6534, 79.0537],
      [17.7500, 79.2200],
      [17.8800, 79.3800],
      [17.9785, 79.5226]
    ]
  },

  // Corridor 3: Yadadri Heritage & Rural Highway (Cheapest / Scenic Corridor)
  {
    u: 'HYDERABAD',
    v: 'YADADRI',
    name: 'Keesara-Yadadri Heritage Highway',
    distance_km: 44.0,
    base_speed_kmh: 65,
    congestion_factor: 1.05,
    toll_usd: 20,
    road_type: 'scenic',
    bidirectional: true,
    waypoints: [
      [17.3984, 78.5583],
      [17.4800, 78.6800],
      [17.5400, 78.8200],
      [17.5878, 78.9482]
    ]
  },
  {
    u: 'YADADRI',
    v: 'ALER',
    name: 'Yadadri-Aler Temple Link',
    distance_km: 22.0,
    base_speed_kmh: 60,
    congestion_factor: 1.05,
    toll_usd: 0,
    road_type: 'arterial',
    bidirectional: true,
    waypoints: [
      [17.5878, 78.9482],
      [17.6200, 79.0000],
      [17.6534, 79.0537]
    ]
  },
  {
    u: 'ALER',
    v: 'JANGAON',
    name: 'Aler-Jangaon Rural Arterial',
    distance_km: 28.0,
    base_speed_kmh: 65,
    congestion_factor: 1.08,
    toll_usd: 0,
    road_type: 'arterial',
    bidirectional: true,
    waypoints: [
      [17.6534, 79.0537],
      [17.6900, 79.1100],
      [17.7265, 79.1672]
    ]
  },
  {
    u: 'GHANPUR',
    v: 'WARANGAL',
    name: 'Hanamkonda Outer Ring Link',
    distance_km: 51.0,
    base_speed_kmh: 70,
    congestion_factor: 1.05,
    toll_usd: 30,
    road_type: 'arterial',
    bidirectional: true,
    waypoints: [
      [17.8488, 79.3755],
      [17.9100, 79.4800],
      [17.9500, 79.5600],
      [17.9689, 79.5941]
    ]
  },

  // Cross-connecting edges
  {
    u: 'BHONGIR',
    v: 'YADADRI',
    name: 'Bhuvanagiri-Yadadri Temple Road',
    distance_km: 14.0,
    base_speed_kmh: 60,
    congestion_factor: 1.05,
    toll_usd: 0,
    road_type: 'scenic',
    bidirectional: true,
    waypoints: [
      [17.5113, 78.8889],
      [17.5500, 78.9200],
      [17.5878, 78.9482]
    ]
  },
  {
    u: 'GHATKESAR',
    v: 'YADADRI',
    name: 'Ghatkesar-Yadadri Direct Link',
    distance_km: 32.0,
    base_speed_kmh: 65,
    congestion_factor: 1.05,
    toll_usd: 10,
    road_type: 'highway',
    bidirectional: true,
    waypoints: [
      [17.4526, 78.6836],
      [17.5200, 78.8100],
      [17.5878, 78.9482]
    ]
  },

  // SF Downtown <-> SF Fisherman's Wharf (Surface Arterial)
  {
    u: 'SF_DOWNTOWN',
    v: 'SF_FISHERMAN',
    name: 'The Embarcadero Promenade',
    distance_km: 3.2,
    base_speed_kmh: 35,
    congestion_factor: 1.35,
    toll_usd: 0,
    road_type: 'arterial',
    bidirectional: true,
    waypoints: [
      [37.7879, -122.4075],
      [37.7955, -122.3937],
      [37.8041, -122.4012],
      [37.8080, -122.4177]
    ]
  },

  // SF Fisherman <-> Marin Sausalito (Golden Gate Bridge US-101)
  {
    u: 'SF_FISHERMAN',
    v: 'MARIN_SAUSALITO',
    name: 'US-101 N / Golden Gate Bridge',
    distance_km: 11.5,
    base_speed_kmh: 75,
    congestion_factor: 1.25,
    toll_usd: 8.75, // Southbound toll, simplified as fixed bridge toll
    road_type: 'bridge',
    bidirectional: true,
    waypoints: [
      [37.8080, -122.4177],
      [37.8021, -122.4485],
      [37.8199, -122.4783], // Golden Gate Mid-span
      [37.8324, -122.4795],
      [37.8590, -122.4853]
    ]
  },

  // SF Downtown <-> SF Sunset (Geary Blvd / Lincoln Way)
  {
    u: 'SF_DOWNTOWN',
    v: 'SF_SUNSET',
    name: 'Geary Blvd & Lincoln Way Corridor',
    distance_km: 9.8,
    base_speed_kmh: 45,
    congestion_factor: 1.4,
    toll_usd: 0,
    road_type: 'arterial',
    bidirectional: true,
    waypoints: [
      [37.7879, -122.4075],
      [37.7812, -122.4410],
      [37.7698, -122.4665],
      [37.7535, -122.4850]
    ]
  },

  // SF Downtown <-> Oakland Downtown (San Francisco - Oakland Bay Bridge I-80)
  {
    u: 'SF_DOWNTOWN',
    v: 'OAKLAND_DT',
    name: 'I-80 E / SF-Oakland Bay Bridge',
    distance_km: 13.8,
    base_speed_kmh: 80,
    congestion_factor: 1.6,
    toll_usd: 7.00,
    road_type: 'bridge',
    bidirectional: true,
    waypoints: [
      [37.7879, -122.4075],
      [37.7915, -122.3850],
      [37.8180, -122.3550], // Yerba Buena Island
      [37.8220, -122.3150], // Toll plaza
      [37.8044, -122.2712]
    ]
  },

  // Oakland <-> Berkeley (I-80 / University Ave)
  {
    u: 'OAKLAND_DT',
    v: 'BERKELEY',
    name: 'I-80 E / Eastshore Fwy',
    distance_km: 8.5,
    base_speed_kmh: 85,
    congestion_factor: 1.3,
    toll_usd: 0,
    road_type: 'freeway',
    bidirectional: true,
    waypoints: [
      [37.8044, -122.2712],
      [37.8313, -122.2852],
      [37.8540, -122.2980],
      [37.8715, -122.2730]
    ]
  },

  // Oakland <-> Emeryville
  {
    u: 'OAKLAND_DT',
    v: 'EMERYVILLE',
    name: 'I-580 W MacArthur Corridor',
    distance_km: 4.2,
    base_speed_kmh: 65,
    congestion_factor: 1.25,
    toll_usd: 0,
    road_type: 'freeway',
    bidirectional: true,
    waypoints: [
      [37.8044, -122.2712],
      [37.8190, -122.2790],
      [37.8313, -122.2852]
    ]
  },

  // SF Downtown <-> SFO Airport (US-101 S Bayshore Freeway - Major Express)
  {
    u: 'SF_DOWNTOWN',
    v: 'SFO_AIRPORT',
    name: 'US-101 S Bayshore Fwy',
    distance_km: 21.0,
    base_speed_kmh: 100,
    congestion_factor: 1.5, // Busy commuter artery
    toll_usd: 0,
    road_type: 'freeway',
    bidirectional: true,
    waypoints: [
      [37.7879, -122.4075],
      [37.7500, -122.4050],
      [37.7120, -122.3980],
      [37.6620, -122.3990],
      [37.6213, -122.3790]
    ]
  },

  // SF Sunset <-> SFO Airport via I-280 S (Scenic Foothill Freeway)
  {
    u: 'SF_SUNSET',
    v: 'SFO_AIRPORT',
    name: 'I-280 S Junípero Serra Fwy to I-380',
    distance_km: 22.5,
    base_speed_kmh: 105,
    congestion_factor: 1.15, // Smoother flow than 101
    toll_usd: 0,
    road_type: 'freeway',
    bidirectional: true,
    waypoints: [
      [37.7535, -122.4850],
      [37.7180, -122.4680],
      [37.6740, -122.4530],
      [37.6320, -122.4210],
      [37.6213, -122.3790]
    ]
  },

  // SF Sunset <-> Pacifica (CA-1 S Coastal Route)
  {
    u: 'SF_SUNSET',
    v: 'PACIFICA',
    name: 'CA-1 S Pacific Coast Highway',
    distance_km: 17.2,
    base_speed_kmh: 75,
    congestion_factor: 1.1,
    toll_usd: 0,
    road_type: 'scenic',
    bidirectional: true,
    waypoints: [
      [37.7535, -122.4850],
      [37.7080, -122.4950],
      [37.6650, -122.4910],
      [37.6138, -122.4869]
    ]
  },

  // Pacifica <-> Half Moon Bay (CA-1 S Scenic Ocean Route)
  {
    u: 'PACIFICA',
    v: 'HALF_MOON_BAY',
    name: 'CA-1 S Coastal Scenic Byway (Devil’s Slide)',
    distance_km: 19.8,
    base_speed_kmh: 70,
    congestion_factor: 1.15,
    toll_usd: 0,
    road_type: 'scenic',
    bidirectional: true,
    waypoints: [
      [37.6138, -122.4869],
      [37.5850, -122.5110], // Devil's Slide Tunnel
      [37.5320, -122.5020],
      [37.4980, -122.4650],
      [37.4636, -122.4286]
    ]
  },

  // SFO Airport <-> San Mateo (US-101 S)
  {
    u: 'SFO_AIRPORT',
    v: 'SAN_MATEO',
    name: 'US-101 S Bayshore Corridor',
    distance_km: 11.2,
    base_speed_kmh: 100,
    congestion_factor: 1.45,
    toll_usd: 0,
    road_type: 'freeway',
    bidirectional: true,
    waypoints: [
      [37.6213, -122.3790],
      [37.5920, -122.3520],
      [37.5630, -122.3255]
    ]
  },

  // San Mateo <-> Half Moon Bay (CA-92 W Cross-Peninsula Highway)
  {
    u: 'SAN_MATEO',
    v: 'HALF_MOON_BAY',
    name: 'CA-92 W Half Moon Bay Pass',
    distance_km: 18.5,
    base_speed_kmh: 75,
    congestion_factor: 1.25,
    toll_usd: 0,
    road_type: 'scenic',
    bidirectional: true,
    waypoints: [
      [37.5630, -122.3255],
      [37.5250, -122.3680],
      [37.4920, -122.4050],
      [37.4636, -122.4286]
    ]
  },

  // San Mateo <-> Hayward (CA-92 San Mateo-Hayward Bridge)
  {
    u: 'SAN_MATEO',
    v: 'HAYWARD',
    name: 'CA-92 E / San Mateo Bridge',
    distance_km: 19.5,
    base_speed_kmh: 95,
    congestion_factor: 1.35,
    toll_usd: 7.00,
    road_type: 'bridge',
    bidirectional: true,
    waypoints: [
      [37.5630, -122.3255],
      [37.5850, -122.2650], // Mid-bay span
      [37.6210, -122.1850], // East toll plaza
      [37.6688, -122.0808]
    ]
  },

  // Oakland <-> Hayward (I-880 S Nimitz Freeway)
  {
    u: 'OAKLAND_DT',
    v: 'HAYWARD',
    name: 'I-880 S Nimitz Fwy',
    distance_km: 23.4,
    base_speed_kmh: 100,
    congestion_factor: 1.5,
    toll_usd: 0,
    road_type: 'freeway',
    bidirectional: true,
    waypoints: [
      [37.8044, -122.2712],
      [37.7550, -122.2050],
      [37.7120, -122.1450],
      [37.6688, -122.0808]
    ]
  },

  // Hayward <-> Fremont (I-880 S)
  {
    u: 'HAYWARD',
    v: 'FREMONT',
    name: 'I-880 S / Nimitz Corridor',
    distance_km: 17.8,
    base_speed_kmh: 105,
    congestion_factor: 1.35,
    toll_usd: 0,
    road_type: 'freeway',
    bidirectional: true,
    waypoints: [
      [37.6688, -122.0808],
      [37.6150, -122.0350],
      [37.5485, -121.9886]
    ]
  },

  // San Mateo <-> Redwood City (US-101 S)
  {
    u: 'SAN_MATEO',
    v: 'REDWOOD_CITY',
    name: 'US-101 S Bayshore Fwy',
    distance_km: 12.0,
    base_speed_kmh: 100,
    congestion_factor: 1.45,
    toll_usd: 0,
    road_type: 'freeway',
    bidirectional: true,
    waypoints: [
      [37.5630, -122.3255],
      [37.5250, -122.2850],
      [37.4852, -122.2364]
    ]
  },

  // Redwood City <-> Palo Alto (US-101 S)
  {
    u: 'REDWOOD_CITY',
    v: 'PALO_ALTO',
    name: 'US-101 S Bayshore Fwy',
    distance_km: 9.6,
    base_speed_kmh: 100,
    congestion_factor: 1.4,
    toll_usd: 0,
    road_type: 'freeway',
    bidirectional: true,
    waypoints: [
      [37.4852, -122.2364],
      [37.4620, -122.1850],
      [37.4419, -122.1430]
    ]
  },

  // Redwood City <-> Palo Alto via I-280 S (Scenic Interstate)
  {
    u: 'REDWOOD_CITY',
    v: 'PALO_ALTO',
    name: 'I-280 S / Sand Hill Rd Express',
    distance_km: 12.8,
    base_speed_kmh: 110,
    congestion_factor: 1.1,
    toll_usd: 0,
    road_type: 'freeway',
    bidirectional: true,
    waypoints: [
      [37.4852, -122.2364],
      [37.4650, -122.2550], // Farm Hill / I-280
      [37.4280, -122.2050], // Sand Hill Rd
      [37.4419, -122.1430]
    ]
  },

  // Palo Alto <-> Fremont (CA-84 Dumbarton Bridge)
  {
    u: 'PALO_ALTO',
    v: 'FREMONT',
    name: 'CA-84 E Dumbarton Bridge',
    distance_km: 17.5,
    base_speed_kmh: 90,
    congestion_factor: 1.3,
    toll_usd: 7.00,
    road_type: 'bridge',
    bidirectional: true,
    waypoints: [
      [37.4419, -122.1430],
      [37.4850, -122.1250], // Ravenswood approach
      [37.5050, -122.0850], // Mid-span
      [37.5485, -121.9886]
    ]
  },

  // Palo Alto <-> Mountain View (US-101 S)
  {
    u: 'PALO_ALTO',
    v: 'MOUNTAIN_VIEW',
    name: 'US-101 S Silicon Valley Expy',
    distance_km: 8.5,
    base_speed_kmh: 100,
    congestion_factor: 1.45,
    toll_usd: 0,
    road_type: 'freeway',
    bidirectional: true,
    waypoints: [
      [37.4419, -122.1430],
      [37.4120, -122.1080],
      [37.3861, -122.0839]
    ]
  },

  // Mountain View <-> Sunnyvale (US-101 & CA-237)
  {
    u: 'MOUNTAIN_VIEW',
    v: 'SUNNYVALE',
    name: 'Mathilda & Central Expressway Corridor',
    distance_km: 6.8,
    base_speed_kmh: 80,
    congestion_factor: 1.3,
    toll_usd: 0,
    road_type: 'expressway',
    bidirectional: true,
    waypoints: [
      [37.3861, -122.0839],
      [37.3790, -122.0550],
      [37.3688, -122.0363]
    ]
  },

  // Mountain View <-> Cupertino via CA-85 S (High-speed Outer Arc)
  {
    u: 'MOUNTAIN_VIEW',
    v: 'CUPERTINO',
    name: 'CA-85 S West Valley Fwy',
    distance_km: 9.8,
    base_speed_kmh: 105,
    congestion_factor: 1.2,
    toll_usd: 0,
    road_type: 'freeway',
    bidirectional: true,
    waypoints: [
      [37.3861, -122.0839],
      [37.3550, -122.0620],
      [37.3230, -122.0322]
    ]
  },

  // Palo Alto <-> Cupertino via I-280 S (Scenic Highway)
  {
    u: 'PALO_ALTO',
    v: 'CUPERTINO',
    name: 'I-280 S Junípero Serra Fwy',
    distance_km: 17.5,
    base_speed_kmh: 115,
    congestion_factor: 1.1,
    toll_usd: 0,
    road_type: 'freeway',
    bidirectional: true,
    waypoints: [
      [37.4419, -122.1430],
      [37.4050, -122.1380], // Foothill Expressway junction
      [37.3620, -122.0880],
      [37.3230, -122.0322]
    ]
  },

  // Sunnyvale <-> Cupertino (Wolfe Rd / Lawrence Expy)
  {
    u: 'SUNNYVALE',
    v: 'CUPERTINO',
    name: 'Lawrence Expressway & Wolfe Rd',
    distance_km: 6.2,
    base_speed_kmh: 70,
    congestion_factor: 1.35,
    toll_usd: 0,
    road_type: 'expressway',
    bidirectional: true,
    waypoints: [
      [37.3688, -122.0363],
      [37.3450, -122.0340],
      [37.3230, -122.0322]
    ]
  },

  // Fremont <-> Milpitas (I-880 S)
  {
    u: 'FREMONT',
    v: 'MILPITAS',
    name: 'I-880 S Nimitz Fwy',
    distance_km: 15.2,
    base_speed_kmh: 105,
    congestion_factor: 1.4,
    toll_usd: 0,
    road_type: 'freeway',
    bidirectional: true,
    waypoints: [
      [37.5485, -121.9886],
      [37.4920, -121.9450],
      [37.4323, -121.8996]
    ]
  },

  // Milpitas <-> San Jose Airport (CA-237 W to US-101 S)
  {
    u: 'MILPITAS',
    v: 'SAN_JOSE_AIRPORT',
    name: 'CA-237 W to US-101 S Interchange',
    distance_km: 11.5,
    base_speed_kmh: 95,
    congestion_factor: 1.35,
    toll_usd: 0,
    road_type: 'freeway',
    bidirectional: true,
    waypoints: [
      [37.4323, -121.8996],
      [37.4080, -121.9280],
      [37.3639, -121.9289]
    ]
  },

  // Sunnyvale <-> San Jose Airport (US-101 S)
  {
    u: 'SUNNYVALE',
    v: 'SAN_JOSE_AIRPORT',
    name: 'US-101 S Bayshore Fwy',
    distance_km: 12.4,
    base_speed_kmh: 100,
    congestion_factor: 1.5,
    toll_usd: 0,
    road_type: 'freeway',
    bidirectional: true,
    waypoints: [
      [37.3688, -122.0363],
      [37.3750, -121.9850],
      [37.3639, -121.9289]
    ]
  },

  // San Jose Airport <-> San Jose Downtown (CA-87 S Guadalupe Pkwy)
  {
    u: 'SAN_JOSE_AIRPORT',
    v: 'SAN_JOSE_DT',
    name: 'CA-87 S Guadalupe Pkwy',
    distance_km: 6.2,
    base_speed_kmh: 85,
    congestion_factor: 1.3,
    toll_usd: 0,
    road_type: 'expressway',
    bidirectional: true,
    waypoints: [
      [37.3639, -121.9289],
      [37.3520, -121.9050],
      [37.3382, -121.8863]
    ]
  },

  // Cupertino <-> San Jose Downtown (I-280 S)
  {
    u: 'CUPERTINO',
    v: 'SAN_JOSE_DT',
    name: 'I-280 S Sinclair Fwy',
    distance_km: 16.2,
    base_speed_kmh: 105,
    congestion_factor: 1.25,
    toll_usd: 0,
    road_type: 'freeway',
    bidirectional: true,
    waypoints: [
      [37.3230, -122.0322],
      [37.3250, -121.9820],
      [37.3280, -121.9320],
      [37.3382, -121.8863]
    ]
  },

  // Milpitas <-> San Jose Downtown (I-880 S to N 1st St)
  {
    u: 'MILPITAS',
    v: 'SAN_JOSE_DT',
    name: 'I-880 S to First St Corridor',
    distance_km: 13.8,
    base_speed_kmh: 90,
    congestion_factor: 1.45,
    toll_usd: 0,
    road_type: 'freeway',
    bidirectional: true,
    waypoints: [
      [37.4323, -121.8996],
      [37.3820, -121.8950],
      [37.3382, -121.8863]
    ]
  },

  // Cupertino <-> Los Gatos (CA-85 S)
  {
    u: 'CUPERTINO',
    v: 'LOS_GATOS',
    name: 'CA-85 S West Valley Corridor',
    distance_km: 13.2,
    base_speed_kmh: 105,
    congestion_factor: 1.2,
    toll_usd: 0,
    road_type: 'freeway',
    bidirectional: true,
    waypoints: [
      [37.3230, -122.0322],
      [37.2850, -122.0120],
      [37.2358, -121.9624]
    ]
  },

  // San Jose Downtown <-> Los Gatos (CA-17 S / CA-85)
  {
    u: 'SAN_JOSE_DT',
    v: 'LOS_GATOS',
    name: 'CA-17 S / Los Gatos Expy',
    distance_km: 15.5,
    base_speed_kmh: 95,
    congestion_factor: 1.3,
    toll_usd: 0,
    road_type: 'expressway',
    bidirectional: true,
    waypoints: [
      [37.3382, -121.8863],
      [37.2850, -121.9350],
      [37.2358, -121.9624]
    ]
  },

  // Los Gatos <-> Santa Cruz (CA-17 S Mountain Pass)
  {
    u: 'LOS_GATOS',
    v: 'SANTA_CRUZ',
    name: 'CA-17 S Santa Cruz Mountain Pass',
    distance_km: 34.5,
    base_speed_kmh: 80,
    congestion_factor: 1.35,
    toll_usd: 0,
    road_type: 'scenic',
    bidirectional: true,
    waypoints: [
      [37.2358, -121.9624],
      [37.1550, -121.9780], // Summit
      [37.0650, -121.9950], // Scotts Valley
      [36.9741, -122.0308]
    ]
  },

  // Half Moon Bay <-> Santa Cruz (CA-1 S Coastal Scenic Highway)
  {
    u: 'HALF_MOON_BAY',
    v: 'SANTA_CRUZ',
    name: 'CA-1 S Cabrillo Scenic Highway',
    distance_km: 78.5,
    base_speed_kmh: 80,
    congestion_factor: 1.05,
    toll_usd: 0,
    road_type: 'scenic',
    bidirectional: true,
    waypoints: [
      [37.4636, -122.4286],
      [37.3200, -122.4000], // Pescadero
      [37.1150, -122.3300], // Año Nuevo
      [37.0150, -122.1800], // Davenport
      [36.9741, -122.0308]
    ]
  }
];

/**
 * Pre-curated demo journeys for instant one-click demonstration
 */
export const DEMO_PRESETS = [
  {
    id: 'hyd-to-wgl',
    title: 'Hyderabad ➔ Warangal',
    description: 'Flagship Corridor: NH-163 Expressway vs SH-15 North Bypass vs Yadadri Heritage',
    origin: 'HYDERABAD',
    destination: 'WARANGAL'
  },
  {
    id: 'hyd-to-jangaon',
    title: 'Hyderabad ➔ Jangaon',
    description: 'Midway transit comparison: NH-163 vs Keesara-Yadadri Scenic Route',
    origin: 'HYDERABAD',
    destination: 'JANGAON'
  },
  {
    id: 'bhongir-to-wgl',
    title: 'Bhongir ➔ Warangal',
    description: 'Regional corridor via Jangaon & Ghanpur',
    origin: 'BHONGIR',
    destination: 'WARANGAL'
  },
  {
    id: 'sf-to-sj',
    title: 'San Francisco Downtown ➔ San Jose Downtown',
    description: 'Classic Bay Area tech corridor: Compare US-101 vs I-280 vs East Bay I-880',
    origin: 'SF_DOWNTOWN',
    destination: 'SAN_JOSE_DT'
  },
  {
    id: 'marin-to-sfo',
    title: 'Marin Sausalito ➔ SFO Airport',
    description: 'Bridges & highway choice: Golden Gate Bridge + 101 vs 280 bypass',
    origin: 'MARIN_SAUSALITO',
    destination: 'SFO_AIRPORT'
  },
  {
    id: 'oakland-to-paloalto',
    title: 'Oakland Downtown ➔ Palo Alto',
    description: 'Cross-Bay options: San Mateo Bridge (CA-92) vs Dumbarton Bridge (CA-84)',
    origin: 'OAKLAND_DT',
    destination: 'PALO_ALTO'
  },
  {
    id: 'sf-to-santacruz',
    title: 'San Francisco Sunset ➔ Santa Cruz Boardwalk',
    description: 'Scenic Coastal Highway 1 vs Fast Mountain Pass (I-280 + CA-17)',
    origin: 'SF_SUNSET',
    destination: 'SANTA_CRUZ'
  },
  {
    id: 'berkeley-to-cupertino',
    title: 'Berkeley Campus ➔ Cupertino Apple Park',
    description: 'East Bay I-880 + CA-237 vs West Bay I-80 + I-280',
    origin: 'BERKELEY',
    destination: 'CUPERTINO'
  }
];
