-- Seed National Parks data
-- This includes all 63 US National Parks with their basic information

DO $$
DECLARE
  national_parks_id uuid;
BEGIN
  -- Get the National Parks category ID
  SELECT id INTO national_parks_id FROM public.categories WHERE slug = 'national-parks';

  -- Insert National Parks
  INSERT INTO public.locations (category_id, name, description, state, latitude, longitude, image_url) VALUES
    (national_parks_id, 'Acadia National Park', 'Rocky coastline, mountains, and forests on the Atlantic coast of Maine.', 'Maine', 44.35, -68.21, 'https://images.unsplash.com/photo-1559827260-dc66d52bef19'),
    (national_parks_id, 'Arches National Park', 'Over 2,000 natural stone arches and unique rock formations in Utah.', 'Utah', 38.68, -109.57, 'https://images.unsplash.com/photo-1474044159687-1ee9f3a51722'),
    (national_parks_id, 'Badlands National Park', 'Dramatic landscapes with layered rock formations and fossil beds.', 'South Dakota', 43.75, -102.50, 'https://images.unsplash.com/photo-1484767357390-e0f8e1c77f49'),
    (national_parks_id, 'Big Bend National Park', 'Vast desert and mountain landscape along the Rio Grande in Texas.', 'Texas', 29.25, -103.25, 'https://images.unsplash.com/photo-1518098268026-4e89f1a2cd8e'),
    (national_parks_id, 'Biscayne National Park', 'Underwater coral reefs, islands, and marine wildlife near Miami.', 'Florida', 25.65, -80.08, 'https://images.unsplash.com/photo-1559827260-dc66d52bef19'),
    (national_parks_id, 'Black Canyon of the Gunnison', 'Deep, narrow canyon with dramatic vertical drops in Colorado.', 'Colorado', 38.57, -107.72, 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4'),
    (national_parks_id, 'Bryce Canyon National Park', 'Unique rock formations called hoodoos in natural amphitheaters.', 'Utah', 37.57, -112.18, 'https://images.unsplash.com/photo-1533587851505-d119e13fa0d7'),
    (national_parks_id, 'Canyonlands National Park', 'Dramatic desert landscape carved by the Colorado River.', 'Utah', 38.20, -109.93, 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800'),
    (national_parks_id, 'Capitol Reef National Park', 'Colorful cliffs, canyons, and rock formations in Utah.', 'Utah', 38.20, -111.17, 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4'),
    (national_parks_id, 'Carlsbad Caverns', 'Spectacular underground caves with massive chambers.', 'New Mexico', 32.17, -104.44, 'https://images.unsplash.com/photo-1559827260-dc66d52bef19'),
    (national_parks_id, 'Channel Islands', 'Five ecologically diverse islands off Southern California coast.', 'California', 34.01, -119.42, 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4'),
    (national_parks_id, 'Congaree National Park', 'Largest intact expanse of old growth bottomland hardwood forest.', 'South Carolina', 33.78, -80.78, 'https://images.unsplash.com/photo-1511497584788-876760111969'),
    (national_parks_id, 'Crater Lake National Park', 'Deepest lake in the US formed in a collapsed volcano.', 'Oregon', 42.94, -122.11, 'https://images.unsplash.com/photo-1559827260-dc66d52bef19'),
    (national_parks_id, 'Cuyahoga Valley', 'Ohio''s only national park with waterfalls and forests.', 'Ohio', 41.24, -81.55, 'https://images.unsplash.com/photo-1511497584788-876760111969'),
    (national_parks_id, 'Death Valley National Park', 'Hottest, driest place in North America with unique desert landscapes.', 'California', 36.24, -116.82, 'https://images.unsplash.com/photo-1485795046599-702122cd1267'),
    (national_parks_id, 'Denali National Park', 'Home to North America''s tallest mountain and vast wilderness.', 'Alaska', 63.33, -150.50, 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800'),
    (national_parks_id, 'Dry Tortugas', 'Remote islands and historic fort surrounded by crystal waters.', 'Florida', 24.63, -82.87, 'https://images.unsplash.com/photo-1559827260-dc66d52bef19'),
    (national_parks_id, 'Everglades National Park', 'Largest tropical wilderness in the US with unique wetlands.', 'Florida', 25.29, -80.93, 'https://images.unsplash.com/photo-1511497584788-876760111969'),
    (national_parks_id, 'Gates of the Arctic', 'Remote wilderness north of the Arctic Circle.', 'Alaska', 67.78, -153.30, 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800'),
    (national_parks_id, 'Gateway Arch', 'Iconic 630-foot tall monument in St. Louis.', 'Missouri', 38.62, -90.18, 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b'),
    (national_parks_id, 'Glacier National Park', 'Pristine forests, alpine meadows, and rugged mountains.', 'Montana', 48.80, -114.00, 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4'),
    (national_parks_id, 'Glacier Bay', 'Tidewater glaciers and ice-carved fjords in Alaska.', 'Alaska', 58.50, -137.00, 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800'),
    (national_parks_id, 'Grand Canyon National Park', 'Mile-deep canyon carved by the Colorado River.', 'Arizona', 36.06, -112.14, 'https://images.unsplash.com/photo-1474044159687-1ee9f3a51722'),
    (national_parks_id, 'Grand Teton National Park', 'Majestic mountain range and pristine lakes in Wyoming.', 'Wyoming', 43.79, -110.68, 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4'),
    (national_parks_id, 'Great Basin National Park', 'Ancient bristlecone pines and Lehman Caves in Nevada.', 'Nevada', 38.98, -114.30, 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800'),
    (national_parks_id, 'Great Sand Dunes', 'Tallest sand dunes in North America backed by mountains.', 'Colorado', 37.73, -105.51, 'https://images.unsplash.com/photo-1485795046599-702122cd1267'),
    (national_parks_id, 'Great Smoky Mountains', 'Most visited national park with diverse forests and wildlife.', 'Tennessee', 35.68, -83.53, 'https://images.unsplash.com/photo-1511497584788-876760111969'),
    (national_parks_id, 'Guadalupe Mountains', 'Highest peaks in Texas with ancient fossil reefs.', 'Texas', 31.92, -104.87, 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800'),
    (national_parks_id, 'Haleakalā National Park', 'Massive volcano crater on Maui with rare silversword plants.', 'Hawaii', 20.72, -156.17, 'https://images.unsplash.com/photo-1542259009477-d625272157b7'),
    (national_parks_id, 'Hawaiʻi Volcanoes', 'Active volcanoes and diverse volcanic landscapes.', 'Hawaii', 19.38, -155.20, 'https://images.unsplash.com/photo-1542259009477-d625272157b7'),
    (national_parks_id, 'Hot Springs National Park', 'Historic bathhouses and thermal springs in Arkansas.', 'Arkansas', 34.52, -93.05, 'https://images.unsplash.com/photo-1559827260-dc66d52bef19'),
    (national_parks_id, 'Indiana Dunes', 'Sandy beaches and dunes along Lake Michigan.', 'Indiana', 41.65, -87.05, 'https://images.unsplash.com/photo-1559827260-dc66d52bef19'),
    (national_parks_id, 'Isle Royale', 'Remote island wilderness in Lake Superior.', 'Michigan', 47.99, -88.55, 'https://images.unsplash.com/photo-1511497584788-876760111969'),
    (national_parks_id, 'Joshua Tree National Park', 'Unique desert landscape with distinctive Joshua trees.', 'California', 33.87, -115.90, 'https://images.unsplash.com/photo-1485795046599-702122cd1267'),
    (national_parks_id, 'Katmai National Park', 'Famous for brown bears fishing for salmon at Brooks Falls.', 'Alaska', 58.50, -155.00, 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800'),
    (national_parks_id, 'Kenai Fjords', 'Coastal fjords and tidewater glaciers in Alaska.', 'Alaska', 59.92, -149.65, 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800'),
    (national_parks_id, 'Kings Canyon National Park', 'Deep canyons and giant sequoia groves in California.', 'California', 36.80, -118.55, 'https://images.unsplash.com/photo-1511497584788-876760111969'),
    (national_parks_id, 'Kobuk Valley', 'Arctic sand dunes and caribou migration routes.', 'Alaska', 67.55, -159.28, 'https://images.unsplash.com/photo-1485795046599-702122cd1267'),
    (national_parks_id, 'Lake Clark', 'Volcanoes, glaciers, and wild coastline in Alaska.', 'Alaska', 60.97, -153.42, 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800'),
    (national_parks_id, 'Lassen Volcanic', 'All four types of volcanoes and hydrothermal features.', 'California', 40.49, -121.51, 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4'),
    (national_parks_id, 'Mammoth Cave', 'World''s longest known cave system in Kentucky.', 'Kentucky', 37.19, -86.10, 'https://images.unsplash.com/photo-1559827260-dc66d52bef19'),
    (national_parks_id, 'Mesa Verde', 'Ancient Puebloan cliff dwellings in Colorado.', 'Colorado', 37.23, -108.49, 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800'),
    (national_parks_id, 'Mount Rainier', 'Iconic stratovolcano with wildflower meadows.', 'Washington', 46.85, -121.75, 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4'),
    (national_parks_id, 'New River Gorge', 'Rugged whitewater river in West Virginia.', 'West Virginia', 37.99, -81.06, 'https://images.unsplash.com/photo-1511497584788-876760111969'),
    (national_parks_id, 'North Cascades', 'Rugged mountains and over 300 glaciers.', 'Washington', 48.70, -121.20, 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4'),
    (national_parks_id, 'Olympic National Park', 'Temperate rainforests, mountains, and Pacific coastline.', 'Washington', 47.97, -123.50, 'https://images.unsplash.com/photo-1511497584788-876760111969'),
    (national_parks_id, 'Petrified Forest', 'Ancient petrified wood and Painted Desert landscapes.', 'Arizona', 34.91, -109.78, 'https://images.unsplash.com/photo-1485795046599-702122cd1267'),
    (national_parks_id, 'Pinnacles National Park', 'Rock formations from ancient volcanic field.', 'California', 36.48, -121.16, 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800'),
    (national_parks_id, 'Redwood National Park', 'World''s tallest trees along California''s northern coast.', 'California', 41.30, -124.00, 'https://images.unsplash.com/photo-1511497584788-876760111969'),
    (national_parks_id, 'Rocky Mountain', 'High peaks, alpine lakes, and diverse wildlife in Colorado.', 'Colorado', 40.40, -105.58, 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4'),
    (national_parks_id, 'Saguaro National Park', 'Desert landscape dominated by towering saguaro cacti.', 'Arizona', 32.25, -110.50, 'https://images.unsplash.com/photo-1485795046599-702122cd1267'),
    (national_parks_id, 'Sequoia National Park', 'Giant sequoia trees including General Sherman Tree.', 'California', 36.43, -118.68, 'https://images.unsplash.com/photo-1511497584788-876760111969'),
    (national_parks_id, 'Shenandoah National Park', 'Blue Ridge Mountains with Skyline Drive in Virginia.', 'Virginia', 38.53, -78.35, 'https://images.unsplash.com/photo-1511497584788-876760111969'),
    (national_parks_id, 'Theodore Roosevelt', 'Badlands and wildlife in North Dakota.', 'North Dakota', 46.98, -103.45, 'https://images.unsplash.com/photo-1484767357390-e0f8e1c77f49'),
    (national_parks_id, 'Virgin Islands', 'Tropical beaches, coral reefs, and historic ruins.', 'U.S. Virgin Islands', 18.33, -64.73, 'https://images.unsplash.com/photo-1559827260-dc66d52bef19'),
    (national_parks_id, 'Voyageurs National Park', 'Water-based park with interconnected lakes in Minnesota.', 'Minnesota', 48.50, -92.88, 'https://images.unsplash.com/photo-1511497584788-876760111969'),
    (national_parks_id, 'White Sands', 'Vast field of white gypsum sand dunes in New Mexico.', 'New Mexico', 32.78, -106.17, 'https://images.unsplash.com/photo-1485795046599-702122cd1267'),
    (national_parks_id, 'Wind Cave', 'Complex cave system with unique boxwork formations.', 'South Dakota', 43.57, -103.48, 'https://images.unsplash.com/photo-1559827260-dc66d52bef19'),
    (national_parks_id, 'Wrangell-St. Elias', 'Largest US national park with massive glaciers and peaks.', 'Alaska', 61.00, -142.00, 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800'),
    (national_parks_id, 'Yellowstone National Park', 'First national park with geysers, hot springs, and wildlife.', 'Wyoming', 44.60, -110.50, 'https://images.unsplash.com/photo-1490107235845-d14c41a6653c'),
    (national_parks_id, 'Yosemite National Park', 'Granite cliffs, waterfalls, and giant sequoias in California.', 'California', 37.83, -119.50, 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4'),
    (national_parks_id, 'Zion National Park', 'Dramatic red rock canyons and towering sandstone cliffs.', 'Utah', 37.30, -113.05, 'https://images.unsplash.com/photo-1533587851505-d119e13fa0d7');

END $$;

