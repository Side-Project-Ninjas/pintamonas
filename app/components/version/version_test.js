'use strict';

describe('pintamonas.version module', function() {
  beforeEach(module('pintamonas.version'));

  describe('version service', function() {
    it('should return current version', inject(function(version) {
      expect(version).toEqual('0.1');
    }));
  });
});
