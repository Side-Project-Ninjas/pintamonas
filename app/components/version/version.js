'use strict';

angular.module('pintamonas.version', [
  'pintamonas.version.interpolate-filter',
  'pintamonas.version.version-directive'
])

.value('version', '0.1');
