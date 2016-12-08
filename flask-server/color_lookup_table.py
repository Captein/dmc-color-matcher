from collections import namedtuple
import csv
import rgbcolor as rgb  # RgbColor, is_hex_color()

DmcColor = namedtuple('DmcColor', 'hex, id, name')



class ColorLookupTable(object):

  def __init__(self, imppath=None):
    self.lookup_table = []
    if imppath is not None:
      self.import_table(imppath)


  def import_table(self, imppath):
    if imppath.split('.')[-1].lower() == 'csv':
      self._csv_import(imppath)
    elif imppath.split('.')[-1].lower() == 'json':
      self._json_import(imppath)
    else:
      print 'Warning: export_table() can only import from a file with a .csv or .json extension'



  def _csv_import(self, imppath):
    """Populates the table from imppath assuming this is a csv file.
    NB: Assumes that the csv file has headers hexstr, dmc, and name (in any order)
    """
    
    self.lookup_table = []

    with open(imppath, 'r') as csvfile:
      csvreader = csv.reader(csvfile, delimiter=',')

      headerorder = []

      for i, row in enumerate(csvreader):
        if i == 0:
          headerorder = [s.lower() for s in row]

        if rgb.is_hex_color(row[headerorder.index('hexstr')]):
          self.lookup_table.append(DmcColor(hex=rgb.RgbColor(row[headerorder.index('hexstr')].strip()),
                                            id=row[headerorder.index('dmc')].strip(),
                                            name=row[headerorder.index('name')].strip()))



  def _json_import(self, imppath):
    """Populates the table from imppath assuming this is a json file."""
    # TODO: Settle on JSON format for colortable
    pass



  def export_table(self, exppath):
    if exppath.split('.')[-1].lower() == 'csv':
      self._csv_export(exppath)
    elif exppath.split('.')[-1].lower() == 'json':
      self._json_export(exppath)
    else:
      print 'Warning: export_table() can only export to a file with a .csv or .json extension'


  def _csv_export(self, exppath):
    """Exports the table in csv format to exppath."""
    with open(exppath, 'w') as csvfile:
      csvwriter = csv.writer(csvfile, delimiter=',', skipinitialspace=True)
      csvwriter.writerow(['hexstr','dmc','name'])
      for clr in self.lookup_table:
        csvwriter.writerow([clr.hex.to_str(), clr.id, clr.name])

  def _json_export(self, exppath):
    """Exports the table in json format to exppath."""
    # TODO: Settle on JSON format for colortable
    pass


  def match_color(self, hexcolor, n_closest=1):
    """Sorts the table by distance from hexcolor and returns the n_closest colors if possible"""
    n_closest = min(int(n_closest), len(self.lookup_table))
    ref_color = rgb.RgbColor(hexcolor)

    # Returns the responses in a list of dictionaries with
    # all of the RgbColor objects cast into strings.
    matched_colorlist = map(lambda nt: dict(nt._asdict()), 
                            sorted(self.lookup_table, key=lambda clr: ref_color.distfrom(clr.hex))[:n_closest])
    for color in matched_colorlist:
      color['hex'] = str(color['hex'])

    return matched_colorlist


  def dmc_order(self):
    """Returns the table sorted by increasing dmc values."""
    return sorted(self.lookup_table, key=lambda clr: int(clr.id) if clr.id.isdigit() else 0)