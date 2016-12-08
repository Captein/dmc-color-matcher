#!/usr/bin/env python

import csv
import re

import flask
from flask_cors import CORS, cross_origin

import color_lookup_table as clt
import rgbcolor as rgb

import json

DEFAULT_DB_PATH = './dmc-colortable.csv'




class ColorServer(flask.Flask):
  """A flask app extension that gets colors from a ColorTable object."""

  def __init__(self, import_name):
    super(ColorServer, self).__init__(import_name)
    self.add_url_rule('/color', view_func=self.color, methods=['GET'])

    #TODO design a sensible path interpreter
    self.color_table = clt.ColorLookupTable(DEFAULT_DB_PATH)



  def color(self):
    #TODO Extract the color search parameter with flask.requests.args['hex']
    refcolor = flask.request.args['hex']
    if refcolor[0] != '#':
      refcolor = '#' + refcolor
    n_closest = flask.request.args['n'] if 'n' in flask.request.args else 5

    # Just the string version
    response = flask.jsonify(self.color_table.match_color(refcolor, n_closest))
    
    return response


if __name__ == '__main__':
  app = ColorServer('ColorServer')
  CORS(app)
  app.run()
