# get san francisco data

san-francisco.osm.pbf:
	curl -o san-francisco.osm.pbf http://osm-extracted-metros.s3.amazonaws.com/san-francisco.osm.pbf

#coastlines:
#	curl http://osm-extracted-metros.s3.amazonaws.com/processed_p-merc.tar.bz2

# The coastline shapefile.
# i made this somehow by dissolving processed_p-merc.shp in QGIS
simple_sf_coastline.geojson:
	ogr2ogr -simplify 10 -t_srs "EPSG:4326" -f GeoJSON simple_sf_coastline.geojson coastline/san-francisco.shp

# just for fun: let's try snapping it to a grid to stylize it
# I don't know if this is part of GDAL but I know PostGIS has ST_SnapToGrid
# so let's do it the complicated way
8bit_sf_coastline.geojson:
	createdb temp_visfest
	psql -d temp_visfest -f /usr/local/Cellar/postgis/2.0.3/share/postgis/postgis.sql
	psql -d temp_visfest -f /usr/local/Cellar/postgis/2.0.3/share/postgis/spatial_ref_sys.sql
	ogr2ogr -f "PostgreSQL" PG:"dbname=temp_visfest" simple_sf_coastline.geojson
	psql temp_visfest -c  "copy (select st_asgeojson(st_SnapToGrid(wkb_geometry, 0.003)) from ogrgeojson) to stdout" > 8bit_sf_coastline.geojson

