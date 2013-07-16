#
#
#

.PHONY: all                                 \
		distdir                             \
		box                                 \
		bullet                              \
		chernoff                            \
		dag                                 \
		fisheye                             \
		force-labels                        \
		geo-polyhedron                      \
		geo-tile                            \
		geodesic                            \
		geom-contour                        \
		graph                               \
		hexbin                              \
		hive                                \
		horizon                             \
		interpolate-zoom                    \
		jsonp                               \
		keybinding                          \
		longscroll                          \
		qq                                  \
		rollup                              \
		sankey                              \
		superformula                        \
		urlencode


all:    distdir                             \
		box                                 \
		bullet                              \
		chernoff                            \
		dag                                 \
		fisheye                             \
		force-labels                        \
		geo-polyhedron                      \
		geo-tile                            \
		geodesic                            \
		geom-contour                        \
		graph                               \
		hexbin                              \
		hive                                \
		horizon                             \
		interpolate-zoom                    \
		jsonp                               \
		keybinding                          \
		longscroll                          \
		qq                                  \
		rollup                              \
		sankey                              \
		superformula                        \
		urlencode
	cat __header.inc | sed -e 's/@/d3-plugins/' > __dist__/d3-plugins.js
	cat box/box.js                              >> __dist__/d3-plugins.js
	cat bullet/bullet.js                        >> __dist__/d3-plugins.js
	cat chernoff/chernoff.js                    >> __dist__/d3-plugins.js
	cat dag/dag.js                              >> __dist__/d3-plugins.js
	cat fisheye/fisheye.js                      >> __dist__/d3-plugins.js
	cat force_labels/force_labels.js            >> __dist__/d3-plugins.js
	cat geo/polyhedron/polyhedron.js            >> __dist__/d3-plugins.js
	cat geo/tile/tile.js                        >> __dist__/d3-plugins.js
	cat geodesic/geodesic.js                    >> __dist__/d3-plugins.js
	cat geom/contour/contour.js                 >> __dist__/d3-plugins.js
	cat graph/graph.js                          >> __dist__/d3-plugins.js
	cat hexbin/hexbin.js                        >> __dist__/d3-plugins.js
	cat hive/hive.js                            >> __dist__/d3-plugins.js
	cat horizon/horizon.js                      >> __dist__/d3-plugins.js
	cat interpolate-zoom/interpolate-zoom.js    >> __dist__/d3-plugins.js
	cat jsonp/jsonp.js                          >> __dist__/d3-plugins.js
	cat keybinding/keybinding.js                >> __dist__/d3-plugins.js
	cat longscroll/longscroll.js                >> __dist__/d3-plugins.js
	cat qq/qq.js                                >> __dist__/d3-plugins.js
	cat rollup/rollup.js                        >> __dist__/d3-plugins.js
	cat sankey/sankey.js                        >> __dist__/d3-plugins.js
	cat superformula/superformula.js            >> __dist__/d3-plugins.js
	cat urlencode/urlencode.js                  >> __dist__/d3-plugins.js


box:
	cat __header.inc | sed -e 's/@/box/' > __dist__/d3-plugin-box.js
	cat box/box.js >> __dist__/d3-plugin-box.js


bullet:
	cat __header.inc | sed -e 's/@/bullet/' > __dist__/d3-plugin-bullet.js
	cat bullet/bullet.js >> __dist__/d3-plugin-bullet.js


chernoff:
	cat __header.inc | sed -e 's/@/chernoff/' > __dist__/d3-plugin-chernoff.js
	cat chernoff/chernoff.js >> __dist__/d3-plugin-chernoff.js


dag:
	cat __header.inc | sed -e 's/@/dag/' > __dist__/d3-plugin-dag.js
	cat dag/dag.js >> __dist__/d3-plugin-dag.js


fisheye:
	cat __header.inc | sed -e 's/@/fisheye/' > __dist__/d3-plugin-fisheye.js
	cat fisheye/fisheye.js >> __dist__/d3-plugin-fisheye.js


force-labels:
	cat __header.inc | sed -e 's/@/force-labels/' > __dist__/d3-plugin-force-labels.js
	cat force_labels/force_labels.js >> __dist__/d3-plugin-force-labels.js


geo-polyhedron:
	cat __header.inc | sed -e 's/@/geo-polyhedron/' > __dist__/d3-plugin-geo-polyhedron.js
	cat geo/polyhedron/polyhedron.js >> __dist__/d3-plugin-geo-polyhedron.js


geo-tile:
	cat __header.inc | sed -e 's/@/geo-tile/' > __dist__/d3-plugin-geo-tile.js
	cat geo/tile/tile.js >> __dist__/d3-plugin-geo-tile.js


geodesic:
	cat __header.inc | sed -e 's/@/geodesic/' > __dist__/d3-plugin-geodesic.js
	cat geodesic/geodesic.js >> __dist__/d3-plugin-geodesic.js


geom-contour:
	cat __header.inc | sed -e 's/@/geom-contour/' > __dist__/d3-plugin-geom-contour.js
	cat geom/contour/contour.js >> __dist__/d3-plugin-geom-contour.js


graph:
	cat __header.inc | sed -e 's/@/graph/' > __dist__/d3-plugin-graph.js
	cat graph/graph.js >> __dist__/d3-plugin-graph.js


hexbin:
	cat __header.inc | sed -e 's/@/hexbin/' > __dist__/d3-plugin-hexbin.js
	cat hexbin/hexbin.js >> __dist__/d3-plugin-hexbin.js


hive:
	cat __header.inc | sed -e 's/@/hive/' > __dist__/d3-plugin-hive.js
	cat hive/hive.js >> __dist__/d3-plugin-hive.js


horizon:
	cat __header.inc | sed -e 's/@/horizon/' > __dist__/d3-plugin-horizon.js
	cat horizon/horizon.js >> __dist__/d3-plugin-horizon.js


interpolate-zoom:
	cat __header.inc | sed -e 's/@/interpolate-zoom/' > __dist__/d3-plugin-interpolate-zoom.js
	cat interpolate-zoom/interpolate-zoom.js >> __dist__/d3-plugin-interpolate-zoom.js


jsonp:
	cat __header.inc | sed -e 's/@/jsonp/' > __dist__/d3-plugin-jsonp.js
	cat jsonp/jsonp.js >> __dist__/d3-plugin-jsonp.js


keybinding:
	cat __header.inc | sed -e 's/@/keybinding/' > __dist__/d3-plugin-keybinding.js
	cat keybinding/keybinding.js >> __dist__/d3-plugin-keybinding.js


longscroll:
	cat __header.inc | sed -e 's/@/longscroll/' > __dist__/d3-plugin-longscroll.js
	cat longscroll/longscroll.js >> __dist__/d3-plugin-longscroll.js


qq:
	cat __header.inc | sed -e 's/@/qq/' > __dist__/d3-plugin-qq.js
	cat qq/qq.js >> __dist__/d3-plugin-qq.js


rollup:
	cat __header.inc | sed -e 's/@/rollup/' > __dist__/d3-plugin-rollup.js
	cat rollup/rollup.js >> __dist__/d3-plugin-rollup.js


sankey:
	cat __header.inc | sed -e 's/@/sankey/' > __dist__/d3-plugin-sankey.js
	cat sankey/sankey.js >> __dist__/d3-plugin-sankey.js


superformula:
	cat __header.inc | sed -e 's/@/superformula/' > __dist__/d3-plugin-superformula.js
	cat superformula/superformula.js >> __dist__/d3-plugin-superformula.js


urlencode:
	cat __header.inc | sed -e 's/@/urlencode/' > __dist__/d3-plugin-urlencode.js
	cat urlencode/urlencode.js >> __dist__/d3-plugin-urlencode.js



clean:
	-rm -rf __dist__



distdir:
	+@[ -d __dist__ ] || mkdir __dist__




# urlencode/urlencode-test.js
# interpolate-zoom/interpolate-zoom-test.js


